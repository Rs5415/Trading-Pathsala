import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured, handleFirestoreError } from '../firebase';
import { UserProfile } from '../types';

export interface AuthResult {
  success: boolean;
  message: string;
  isAdmin?: boolean;
  adminCheckError?: string | null;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  isRoleVerified: boolean;
  isFirebaseConfigured: boolean;
  adminCheckError: string | null;
  signUpStudent: (name: string, email: string, password: string, phone?: string) => Promise<AuthResult>;
  loginWithEmail: (email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  resetPassword: (email: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authoritative check: Reads admins/{uid} document from Firestore.
 * Does not rely on email address or client-side assumptions.
 */
export const verifyAdminRole = async (
  firebaseUser: User
): Promise<{ isAdmin: boolean; error: string | null; data?: any }> => {
  try {
    console.log(`[Auth] Checking admins collection for UID: ${firebaseUser.uid} (email: ${firebaseUser.email})`);
    const adminDocRef = doc(db, 'admins', firebaseUser.uid);
    const adminSnap = await getDoc(adminDocRef);

    if (adminSnap.exists()) {
      const adminData = adminSnap.data();
      console.log(`[Auth] admins/${firebaseUser.uid} document found:`, adminData);
      const rawRole = String(adminData?.role ?? '').trim().toLowerCase();

      // Authorized if role field equals 'admin' (case-insensitive) or if omitted (presence in admins collection)
      if (rawRole === 'admin' || !adminData?.role) {
        console.log(`[Auth] Authoritative admin verification SUCCESS for UID: ${firebaseUser.uid}`);
        return { isAdmin: true, error: null, data: adminData };
      } else {
        const mismatchMsg = `Document exists in 'admins' collection, but field 'role' is "${adminData?.role}" instead of "admin".`;
        console.warn(`[Auth] ${mismatchMsg}`);
        return { isAdmin: false, error: mismatchMsg, data: adminData };
      }
    } else {
      console.log(`[Auth] Document admins/${firebaseUser.uid} does NOT exist in Firestore.`);
      return { isAdmin: false, error: null };
    }
  } catch (err: any) {
    const code = err?.code || 'unknown';
    const message = err?.message || String(err);
    console.error(`[Auth] Failed reading admins/${firebaseUser.uid}: [${code}] ${message}`);
    return { isAdmin: false, error: `[${code}] ${message}` };
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRoleVerified, setIsRoleVerified] = useState<boolean>(false);
  const [adminCheckError, setAdminCheckError] = useState<string | null>(null);

  // Fetch or sync user profile & admin verification from Firestore
  const fetchUserProfile = async (
    firebaseUser: User
  ): Promise<{ profile: UserProfile | null; isAdmin: boolean; adminCheckError: string | null }> => {
    // STEP 1: Authoritative check on admins/{firebaseUser.uid}
    const adminCheck = await verifyAdminRole(firebaseUser);
    let isUserAdmin = adminCheck.isAdmin;
    setAdminCheckError(adminCheck.error);

    // STEP 2: Check or sync users/{firebaseUser.uid}
    try {
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;

        // Fallback: If users doc also marks role as admin
        const usersRoleStr = String(data.role || '').trim().toLowerCase();
        if (usersRoleStr === 'admin') {
          isUserAdmin = true;
        }

        // AUTHORITATIVE OVERRIDE RULE:
        // If admins/{uid} document exists with role === 'admin', isUserAdmin is true.
        // A users/{uid} document with role 'student' can NEVER demote or override this verified admin!
        const effectiveRole: 'admin' | 'student' = isUserAdmin ? 'admin' : 'student';

        const resolvedProfile: UserProfile = {
          ...data,
          uid: firebaseUser.uid,
          name: data.name || firebaseUser.displayName || (isUserAdmin ? 'Administrator' : 'Student'),
          email: data.email || firebaseUser.email || '',
          role: effectiveRole,
          studentId: isUserAdmin ? 'TP-ADMIN' : (data.studentId || `TP-${new Date().getFullYear()}-0001`),
          phone: data.phone || firebaseUser.phoneNumber || '',
        };

        // If the user is verified as admin in admins/{uid} but users/{uid} previously stored 'student',
        // synchronize users/{uid} so both collections reflect the administrative role.
        if (isUserAdmin && data.role !== 'admin') {
          try {
            await setDoc(userDocRef, { role: 'admin', studentId: 'TP-ADMIN' }, { merge: true });
            console.log(`[Auth] Synchronized admin role to users/${firebaseUser.uid}`);
          } catch (syncErr) {
            console.warn('[Auth] Notice: could not sync admin role to users collection:', syncErr);
          }
        }

        setUserProfile(resolvedProfile);
        setIsAdmin(isUserAdmin);
        setIsRoleVerified(true);
        return { profile: resolvedProfile, isAdmin: isUserAdmin, adminCheckError: adminCheck.error };
      } else {
        // No users doc exists yet (e.g. first login after Firebase Console creation or Google Sign-In)
        const effectiveRole: 'admin' | 'student' = isUserAdmin ? 'admin' : 'student';
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || (isUserAdmin ? 'Administrator' : 'Student'),
          email: firebaseUser.email || '',
          role: effectiveRole,
          studentId: isUserAdmin ? 'TP-ADMIN' : `TP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          phone: firebaseUser.phoneNumber || '',
          createdAt: new Date().toISOString(),
        };

        try {
          await setDoc(userDocRef, newProfile);
        } catch (createErr) {
          console.warn('[Auth] Notice: could not create users document:', createErr);
        }

        setUserProfile(newProfile);
        setIsAdmin(isUserAdmin);
        setIsRoleVerified(true);
        return { profile: newProfile, isAdmin: isUserAdmin, adminCheckError: adminCheck.error };
      }
    } catch (err: any) {
      console.warn('[Auth] Notice reading users document, applying verified profile:', err);
      const fallbackProfile: UserProfile = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || (isUserAdmin ? 'Administrator' : 'Student'),
        email: firebaseUser.email || '',
        role: isUserAdmin ? 'admin' : 'student',
        studentId: isUserAdmin ? 'TP-ADMIN' : `TP-${new Date().getFullYear()}-0001`,
        createdAt: new Date().toISOString(),
      };
      setUserProfile(fallbackProfile);
      setIsAdmin(isUserAdmin);
      setIsRoleVerified(true);
      return { profile: fallbackProfile, isAdmin: isUserAdmin, adminCheckError: adminCheck.error };
    }
  };

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      setIsRoleVerified(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser);
      } else {
        setUserProfile(null);
        setIsAdmin(false);
        setAdminCheckError(null);
        setIsRoleVerified(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      setLoading(true);
      await fetchUserProfile(user);
      setLoading(false);
    }
  };

  const signUpStudent = async (name: string, email: string, password: string, phone?: string): Promise<AuthResult> => {
    if (!isFirebaseConfigured) {
      return {
        success: false,
        message: 'Firebase is not connected yet. Please add your Firebase Web App configuration to .env.',
      };
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }

      // Check if user is in 'admins' collection
      let role: 'admin' | 'student' = 'student';
      try {
        const adminCheck = await verifyAdminRole(cred.user);
        if (adminCheck.isAdmin) {
          role = 'admin';
        }
      } catch (e) {
        // Default to student
      }

      const studentId = role === 'admin' ? 'TP-ADMIN' : `TP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const profile: UserProfile = {
        uid: cred.user.uid,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
        studentId,
        phone: phone?.trim() || '',
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', cred.user.uid), profile);
      setUserProfile(profile);
      setIsAdmin(role === 'admin');
      setIsRoleVerified(true);
      return { success: true, message: 'Account registered successfully!', isAdmin: role === 'admin' };
    } catch (error: any) {
      console.error('Sign-up error:', error);
      let message = 'Failed to create student account.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'This email is already registered. Please log in instead.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Please provide a valid email address.';
      }
      return { success: false, message };
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    if (!isFirebaseConfigured) {
      return {
        success: false,
        message: 'Firebase is not connected yet. Please add your Firebase Web App configuration to .env.',
      };
    }
    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      setUser(cred.user);
      const res = await fetchUserProfile(cred.user);
      setLoading(false);
      return {
        success: true,
        message: 'Logged in successfully.',
        isAdmin: res.isAdmin,
        adminCheckError: res.adminCheckError,
      };
    } catch (error: any) {
      setLoading(false);
      console.error('Login error:', error);
      let message = 'Invalid email or password.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password. Please verify your credentials.';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Access temporarily locked due to multiple failed attempts. Try again later.';
      }
      return { success: false, message };
    }
  };

  const loginWithGoogle = async (): Promise<AuthResult> => {
    if (!isFirebaseConfigured) {
      return {
        success: false,
        message: 'Firebase is not connected yet. Please add your Firebase Web App configuration to .env.',
      };
    }
    try {
      setLoading(true);
      const cred = await signInWithPopup(auth, googleProvider);
      setUser(cred.user);
      const res = await fetchUserProfile(cred.user);
      setLoading(false);
      return {
        success: true,
        message: 'Google Sign-In successful.',
        isAdmin: res.isAdmin,
        adminCheckError: res.adminCheckError,
      };
    } catch (error: any) {
      setLoading(false);
      console.error('Google Sign-In error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, message: 'Sign-in popup was closed before completing.' };
      }
      if (error.code === 'auth/unauthorized-domain') {
        const hostname = window.location.hostname;
        return {
          success: false,
          message: `UNAUTHORIZED_DOMAIN:${hostname}`,
        };
      }
      return { success: false, message: error.message || 'Google sign-in failed.' };
    }
  };

  const resetPassword = async (email: string): Promise<AuthResult> => {
    if (!isFirebaseConfigured) {
      return {
        success: false,
        message: 'Firebase is not connected yet. Please add your Firebase Web App configuration to .env.',
      };
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return { success: true, message: 'Password reset link sent to your email.' };
    } catch (error: any) {
      console.error('Password reset error:', error);
      let message = 'Failed to send password reset email.';
      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email.';
      }
      return { success: false, message };
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    setUser(null);
    setUserProfile(null);
    setIsAdmin(false);
    setAdminCheckError(null);
    setIsRoleVerified(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isAdmin,
        loading,
        isRoleVerified,
        isFirebaseConfigured,
        adminCheckError,
        signUpStudent,
        loginWithEmail,
        loginWithGoogle,
        resetPassword,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
