import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  Auth,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'trading-pathsala-14c2e.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'trading-pathsala-14c2e',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'trading-pathsala-14c2e.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey.trim().length > 0 &&
  firebaseConfig.apiKey !== 'YOUR_API_KEY'
);

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  // If no apiKey is set, provide a dummy config so Firebase initializes without throw
  const configToUse = isFirebaseConfigured
    ? firebaseConfig
    : {
        apiKey: 'AIzaSyDemoPlaceholderConfigOnly000000',
        authDomain: 'trading-pathsala-14c2e.firebaseapp.com',
        projectId: 'trading-pathsala-14c2e',
        storageBucket: 'trading-pathsala-14c2e.firebasestorage.app',
        messagingSenderId: '1234567890',
        appId: '1:1234567890:web:demo000000000000',
      };
  app = initializeApp(configToUse);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { app, auth, db };

export type OperationType = 'create' | 'read' | 'update' | 'delete' | 'list';

export function handleFirestoreError(error: unknown, operation: OperationType, path: string): string {
  const err = error as { code?: string; message?: string };
  const code = err?.code || 'unknown';
  const detail = err?.message || String(error);

  console.error(`Firestore ${operation} failed on [${path}]: ${code} - ${detail}`);

  if (code === 'permission-denied') {
    return `Access denied: You do not have permission to ${operation} ${path}. Please check that your account has the required role (e.g. Admin).`;
  }
  if (code === 'not-found') {
    return `Resource not found at ${path}.`;
  }
  if (code === 'already-exists') {
    return `A record with this identifier already exists.`;
  }
  if (code === 'unauthenticated') {
    return `Please log in to complete this action.`;
  }
  return `Error during ${operation}: ${detail}`;
}
