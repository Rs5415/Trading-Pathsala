import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { useAuth } from '../context/AuthContext';
import {
  formatOrderDate,
  subscribeStudentEnrollments,
  subscribeStudentOrders,
  subscribeStudentBatchLinks,
  validateExternalUrl,
} from '../services/firestoreService';
import { Enrollment, Order, BatchLink } from '../types';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BookOpen,
  FileText,
  Bell,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  User as UserIcon,
  Copy,
  Check,
  Link2,
  ChevronRight,
} from 'lucide-react';

interface StudentLoginProps {
  onBackToHome?: () => void;
  onOpenEnquiry?: (courseName?: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onBackToHome, onOpenEnquiry }) => {
  const navigate = useNavigate();
  const {
    user,
    userProfile,
    isAdmin,
    loading: authLoading,
    isRoleVerified,
    isFirebaseConfigured,
    signUpStudent,
    loginWithEmail,
    loginWithGoogle,
    resetPassword,
    logout,
  } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Form states
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);

  // Student data states
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Batch-wise private links states
  const [openedBatchId, setOpenedBatchId] = useState<string | null>(null);
  const [batchLinks, setBatchLinks] = useState<BatchLink[]>([]);
  const [batchLinksLoading, setBatchLinksLoading] = useState(false);
  const [batchLinksError, setBatchLinksError] = useState<string | null>(null);

  // Real-time listeners for student enrollments & orders
  useEffect(() => {
    if (!user || !isRoleVerified || isAdmin) {
      setEnrollments([]);
      setOrders([]);
      return;
    }

    setLoadingData(true);
    let enrDone = false;
    let ordDone = false;
    const markDone = () => {
      if (enrDone && ordDone) setLoadingData(false);
    };

    const unsubEnrollments = subscribeStudentEnrollments(
      user.uid,
      (enrs) => {
        setEnrollments(enrs);
        enrDone = true;
        markDone();
      },
      () => {
        enrDone = true;
        markDone();
      }
    );

    const unsubOrders = subscribeStudentOrders(
      user.uid,
      (ords) => {
        setOrders(ords);
        ordDone = true;
        markDone();
      },
      () => {
        ordDone = true;
        markDone();
      }
    );

    return () => {
      unsubEnrollments();
      unsubOrders();
    };
  }, [user, isRoleVerified, isAdmin]);

  // Strict purchase verification: active enrollment must match an approved order
  const approvedOrderIds = new Set(
    orders.filter((o) => o.status === 'approved').map((o) => o.id)
  );
  const verifiedPurchasedBatches = enrollments.filter(
    (enr) =>
      enr.active === true &&
      Boolean(user?.uid && enr.studentUid === user.uid) &&
      Boolean(enr.orderId && approvedOrderIds.has(enr.orderId))
  );

  // Real-time listener for the opened purchased batch's published links
  useEffect(() => {
    if (!user || !isRoleVerified || isAdmin || !openedBatchId) {
      setBatchLinks([]);
      setBatchLinksError(null);
      return;
    }

    const isVerifiedBatch = verifiedPurchasedBatches.some(
      (b) => b.courseId === openedBatchId
    );
    if (!isVerifiedBatch) {
      setOpenedBatchId(null);
      setBatchLinks([]);
      return;
    }

    setBatchLinksLoading(true);
    setBatchLinksError(null);

    const unsubLinks = subscribeStudentBatchLinks(
      openedBatchId,
      (links) => {
        setBatchLinks(links);
        setBatchLinksLoading(false);
      },
      (errMsg) => {
        setBatchLinksError(errMsg);
        setBatchLinks([]);
        setBatchLinksLoading(false);
      }
    );

    return () => unsubLinks();
  }, [user, isRoleVerified, isAdmin, openedBatchId, enrollments, orders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setActionLoading(true);

    const res = await loginWithEmail(emailInput, passwordInput);
    setActionLoading(false);

    if (res.success) {
      if (res.isAdmin) {
        navigate('/admin');
      } else {
        setSuccessMsg('Logged in successfully!');
      }
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setActionLoading(true);

    const res = await signUpStudent(nameInput, emailInput, passwordInput, phoneInput);
    setActionLoading(false);

    if (res.success) {
      if (res.isAdmin) {
        navigate('/admin');
      } else {
        setSuccessMsg('Account created successfully! Welcome to Trading Pathshala.');
      }
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setActionLoading(true);

    const res = await loginWithGoogle();
    setActionLoading(false);

    if (res.success) {
      if (res.isAdmin) {
        navigate('/admin');
      } else {
        setSuccessMsg('Signed in with Google successfully!');
      }
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }
    setErrorMsg(null);
    setActionLoading(true);
    const res = await resetPassword(emailInput);
    setActionLoading(false);
    if (res.success) {
      setSuccessMsg(res.message);
      setIsForgotPassword(false);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    setEmailInput('');
    setPasswordInput('');
    setNameInput('');
    setPhoneInput('');
    setSuccessMsg(null);
    setErrorMsg(null);
    setEnrollments([]);
    setOrders([]);
    setOpenedBatchId(null);
    setBatchLinks([]);
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (onBackToHome) onBackToHome();
              else navigate('/');
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#916E16] hover:underline cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#E8E2D5] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {isAdmin && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-black text-[#F5D061] px-3.5 py-2 rounded-xl border border-[#C59B27]/40 shadow-xs"
            >
              <span>Go to Admin Dashboard →</span>
            </Link>
          )}
        </div>

        {/* Configuration notice if Firebase keys are empty in environment */}
        {!isFirebaseConfigured && (
          <div className="bg-amber-50 border border-amber-300 p-4 rounded-2xl text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Firebase Credentials Notice</span>
            </div>
            <p>
              To enable live Firebase Authentication and Cloud Firestore for your project (<strong>trading-pathsala-14c2e</strong>), add your Firebase Web App configuration to your <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono">.env</code> file:
            </p>
            <code className="block bg-neutral-900 text-amber-300 p-2.5 rounded-xl font-mono text-[11px] overflow-x-auto">
              VITE_FIREBASE_API_KEY=your_actual_api_key<br />
              VITE_FIREBASE_AUTH_DOMAIN=trading-pathsala-14c2e.firebaseapp.com<br />
              VITE_FIREBASE_PROJECT_ID=trading-pathsala-14c2e<br />
              VITE_FIREBASE_STORAGE_BUCKET=trading-pathsala-14c2e.firebasestorage.app<br />
              VITE_FIREBASE_APP_ID=your_web_app_id
            </code>
          </div>
        )}

        {authLoading || !isRoleVerified ? (
          <div className="bg-white rounded-3xl border border-[#E8E2D5] p-12 text-center shadow-xs space-y-4">
            <div className="w-10 h-10 border-4 border-[#C59B27] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-[#71717A] uppercase tracking-wider">
              Verifying account credentials &amp; permissions...
            </p>
          </div>
        ) : user && isAdmin ? (
          /* If user is verified as Admin, immediately redirect to Admin Dashboard */
          <Navigate to="/admin" replace />
        ) : user ? (
          /* Logged In: Student Dashboard */
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D5] p-4 sm:p-8 md:p-10 shadow-xs space-y-6 sm:space-y-8">
            <div className="pb-6 border-b border-[#E8E2D5] space-y-4">
              {/* Top row: Logo on the left, Sign Out on the right */}
              <div className="flex items-center justify-between gap-3">
                <div className="bg-[#0B0B0C] px-3 py-1.5 rounded-xl border border-[#D4AF37]/50 shadow-xs shrink-0 flex items-center h-11 sm:h-12">
                  <img
                    src={officialLogo}
                    alt="Trading Pathsala"
                    className="h-8 sm:h-9 w-auto max-w-[150px] sm:max-w-[190px] object-contain block"
                    style={{ aspectRatio: '210/48' }}
                  />
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#18181B] font-bold text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#E8E2D5] transition-colors cursor-pointer shrink-0 min-h-[38px] flex items-center justify-center shadow-2xs"
                >
                  Sign Out
                </button>
              </div>

              {/* Student Identification & Status Details */}
              <div className="space-y-1.5 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#916E16]">
                    Student Portal Dashboard
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    Active Student
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#18181B] leading-tight break-words">
                  Welcome, {userProfile?.name || user.displayName || 'Trader'}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-[#71717A] pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span>Student ID:</span>
                    <span className="font-mono font-bold text-[#916E16] bg-[#FAF2DE] px-2 py-0.5 rounded border border-[#E5B83A]/30">
                      {userProfile?.studentId || 'TP-ACTIVE'}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-gray-300">•</span>
                  <div className="text-neutral-700 break-all font-medium">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            {successMsg && (
              <div className="p-3 bg-[#FAF2DE] text-[#916E16] text-xs rounded-xl border border-[#E5B83A]/40 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
              {/* Main Column: Purchased Batches, Enrolled Courses & Orders */}
              <div className="md:col-span-8 space-y-6">
                {/* My Purchased Batches (Batch-Wise Private Links) */}
                <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E2D5] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#18181B] flex items-center gap-2">
                      <Link2 className="w-4 sm:w-5 h-4 sm:h-5 text-[#916E16]" />
                      <span>My Purchased Batches</span>
                    </h3>
                    <span className="text-[11px] sm:text-xs font-bold bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 px-2.5 py-1 rounded-md">
                      {verifiedPurchasedBatches.length} Verified {verifiedPurchasedBatches.length === 1 ? 'Batch' : 'Batches'}
                    </span>
                  </div>

                  {loadingData ? (
                    <div className="bg-white p-5 rounded-xl border border-[#E8E2D5] text-center text-xs text-[#71717A]">
                      Loading your verified batches...
                    </div>
                  ) : verifiedPurchasedBatches.length === 0 ? (
                    <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#E8E2D5] text-center space-y-3">
                      <p className="text-sm text-[#52525B]">
                        You have no active verified batch purchases yet. Once your payment is approved by the admin, your batch links will unlock automatically here.
                      </p>
                      <Link
                        to="/courses"
                        className="inline-block bg-black text-[#F5D061] text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs"
                      >
                        Browse Courses →
                      </Link>
                    </div>
                  ) : openedBatchId ? (
                    /* Opened Purchased Batch View */
                    (() => {
                      const activeBatch = verifiedPurchasedBatches.find(
                        (b) => b.courseId === openedBatchId
                      );
                      return (
                        <div className="space-y-4">
                          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#D4AF37]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#916E16]">
                                Purchased Batch Resources
                              </span>
                              <h4 className="font-extrabold text-base sm:text-lg text-[#18181B]">
                                {activeBatch?.courseName || 'Course Batch'}
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={() => setOpenedBatchId(null)}
                              className="self-start sm:self-auto text-xs font-bold bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#18181B] px-3.5 py-2 rounded-lg border border-[#E8E2D5] inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5 text-[#916E16]" />
                              <span>All My Batches</span>
                            </button>
                          </div>

                          {batchLinksError ? (
                            <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                              {batchLinksError}
                            </div>
                          ) : batchLinksLoading ? (
                            <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] text-center text-xs text-[#71717A]">
                              Loading batch learning links...
                            </div>
                          ) : batchLinks.length === 0 ? (
                            <div className="bg-white p-6 rounded-xl border border-[#E8E2D5] text-center space-y-1.5">
                              <p className="font-bold text-sm text-[#18181B]">
                                No published links available yet
                              </p>
                              <p className="text-xs text-[#71717A]">
                                New links shared by your mentor for this batch will appear here automatically.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {batchLinks.map((link) => {
                                const urlValidation = validateExternalUrl(link.url);
                                return (
                                  <div
                                    key={link.id}
                                    className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8E2D5] shadow-2xs space-y-3"
                                  >
                                    <h5 className="font-bold text-sm sm:text-base text-[#18181B] leading-snug">
                                      {link.title}
                                    </h5>

                                    {/* Description ALWAYS displayed above the Open Link button */}
                                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed whitespace-pre-line">
                                      {link.description}
                                    </p>

                                    <div className="pt-1">
                                      {urlValidation.valid && urlValidation.normalizedUrl ? (
                                        <a
                                          href={urlValidation.normalizedUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-2xs transition-all cursor-pointer"
                                        >
                                          <span>Open Link</span>
                                          <ExternalLink className="w-4 h-4 text-black" />
                                        </a>
                                      ) : (
                                        <span className="text-xs text-red-600 font-semibold">
                                          Invalid link URL
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    /* List of Purchased Batches */
                    <div className="space-y-3">
                      {verifiedPurchasedBatches.map((enr) => (
                        <div
                          key={enr.id}
                          className="bg-white p-4 rounded-xl border border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-sm sm:text-base text-[#18181B]">
                                {enr.courseName}
                              </span>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                Purchased
                              </span>
                            </div>
                            <p className="text-xs text-[#71717A]">
                              Tap below to view all published learning links for this batch.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setOpenedBatchId(enr.courseId)}
                            className="w-full sm:w-auto bg-black hover:bg-neutral-900 text-[#F5D061] font-bold text-xs px-4 py-2.5 rounded-xl inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
                          >
                            <span>Open Batch Links</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Active Courses */}
                <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E2D5] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#18181B] flex items-center gap-2">
                      <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-[#916E16]" />
                      <span>Unlocked Courses</span>
                    </h3>
                    <span className="text-[11px] sm:text-xs font-bold bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 px-2.5 py-1 rounded-md">
                      {verifiedPurchasedBatches.length} Active {verifiedPurchasedBatches.length === 1 ? 'Program' : 'Programs'}
                    </span>
                  </div>

                  {verifiedPurchasedBatches.length === 0 ? (
                    <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#E8E2D5] text-center space-y-3">
                      <p className="text-sm text-[#52525B]">
                        You don't have any approved course enrollments yet.
                      </p>
                      <Link
                        to="/courses"
                        className="inline-block bg-black text-[#F5D061] text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs"
                      >
                        Explore Courses &amp; Buy via UPI →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {verifiedPurchasedBatches.map((enr) => (
                        <div key={enr.id} className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E8E2D5] space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                            <div className="font-bold text-[#18181B] text-sm sm:text-base leading-snug">{enr.courseName}</div>
                            <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                              Active Access
                            </span>
                          </div>
                          <div className="text-[11px] sm:text-xs text-[#71717A] leading-relaxed">
                            Batch: {enr.batchName || 'Batch 14 (Mon - Thu, 8:00 PM IST)'} • Enrolled: {new Date(enr.enrolledAt).toLocaleDateString()}
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1.5 border-t border-gray-100">
                            <span className="text-[#52525B]">Status: Live Mentorship Active</span>
                            <Link
                              to={`/courses/${enr.courseSlug}`}
                              className="text-[#916E16] font-bold hover:underline inline-flex items-center gap-1 py-1"
                            >
                              <span>View Curriculum</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Orders / Payment Status */}
                <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E2D5] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-[#18181B] flex items-center gap-2">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[#916E16]" />
                      <span>Payment &amp; Order Status</span>
                    </h3>
                  </div>

                  {orders.length === 0 ? (
                    <p className="text-xs text-[#71717A]">No payment orders placed yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((ord) => (
                        <div key={ord.id} className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#E8E2D5] text-xs space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                            <span className="font-bold text-[#18181B] text-sm leading-snug">{ord.courseName}</span>
                            <span
                              className={`self-start sm:self-auto px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] shrink-0 ${
                                ord.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : ord.status === 'pending'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-red-100 text-red-800 border border-red-300'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-2 text-[#52525B] bg-[#FCFBF7] p-2.5 rounded-lg border border-[#E8E2D5]">
                            <div>
                              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Amount:</span>
                              <strong className="text-neutral-900">₹{ord.amount.toLocaleString('en-IN')}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Submitted UTR:</span>
                              <strong className="font-mono text-[#916E16] break-all select-all font-bold">{ord.utr}</strong>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Date:</span>
                              <span className="text-neutral-700">{formatOrderDate(ord.createdAt)}</span>
                            </div>
                          </div>
                          {ord.status === 'pending' && (
                            <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 leading-relaxed">
                              Payment verification in progress. Our team will verify your UTR and grant course access shortly.
                            </p>
                          )}
                          {ord.status === 'rejected' && ord.rejectionReason && (
                            <p className="text-[11px] text-red-800 bg-red-50 p-2.5 rounded-lg border border-red-200 leading-relaxed">
                              Verification note: {ord.rejectionReason}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Learning Materials & PDFs */}
                <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E2D5] space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-[#18181B] flex items-center gap-2">
                    <FileText className="w-4 sm:w-5 h-4 sm:h-5 text-[#916E16]" />
                    <span>Learning Study Notes &amp; Tools</span>
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { title: 'Market Structure Shift (MSS) Reference Guide', size: '3.4 MB PDF' },
                      { title: 'Order Flow & Volume Profile Study Notes', size: '2.8 MB PDF' },
                      { title: 'Index Option Buying Journal Template', size: '1.5 MB XLSX' },
                    ].map((mat, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 sm:p-3.5 rounded-xl border border-[#E8E2D5] flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-2.5 text-xs sm:text-sm"
                      >
                        <div className="space-y-0.5">
                          <span className="font-medium text-[#27272A] block leading-snug">{mat.title}</span>
                          <span className="text-[11px] text-gray-400">{mat.size}</span>
                        </div>
                        <a
                          href={`https://wa.me/918987599799?text=${encodeURIComponent(
                            `Hello Prashant Sir, please send me the download link for ${mat.title}. My Student ID is ${userProfile?.studentId || 'registered'}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] hover:brightness-105 text-black font-bold px-3 py-2 rounded-lg text-xs shadow-2xs inline-flex items-center justify-center gap-1 self-start min-[480px]:self-auto min-h-[36px]"
                        >
                          Request File
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-4 space-y-6">
                <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E2D5] space-y-3">
                  <h3 className="font-bold text-base text-[#18181B] flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#C59B27]" />
                    <span>Batch Notice</span>
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#E8E2D5] space-y-1">
                      <div className="font-bold text-[#916E16]">Live Market Q&amp;A</div>
                      <p className="text-[#52525B] leading-relaxed">Saturday at 7:00 PM IST with Prashant Sir on Zoom/Meet.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF7F0] p-4 sm:p-6 rounded-2xl border border-[#E8E2D5] space-y-3">
                  <h3 className="font-bold text-base text-[#18181B]">Student Profile</h3>
                  <div className="space-y-2 text-xs text-[#52525B]">
                    <div className="flex justify-between py-1 border-b border-[#E8E2D5]">
                      <span>Name:</span>
                      <strong className="text-[#18181B] text-right">{userProfile?.name || user.displayName || 'Student'}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E8E2D5]">
                      <span>Student ID:</span>
                      <strong className="font-mono text-[#916E16]">{userProfile?.studentId || 'Pending'}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E8E2D5]">
                      <span>Email:</span>
                      <span className="text-[#18181B] font-medium break-all text-right max-w-[200px]">{user.email}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E8E2D5]">
                      <span>Role:</span>
                      <span className="capitalize font-bold text-neutral-800">{userProfile?.role || 'student'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Institute:</span>
                      <span className="text-[#18181B]">Trading Pathshala</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Authentication Box: Login / Register / Forgot Password */
          <div className="max-w-md mx-auto bg-white rounded-2xl sm:rounded-3xl border border-[#E8E2D5] p-5 sm:p-8 shadow-xs space-y-5 sm:space-y-6">
            <div className="text-center space-y-3">
              <div className="bg-[#0B0B0C] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl border border-[#D4AF37]/50 inline-flex items-center shadow-sm h-11 sm:h-13">
                <img
                  src={officialLogo}
                  alt="Trading Pathsala - Learn the Art of Trading"
                  className="h-8 sm:h-9 w-auto max-w-[170px] sm:max-w-[210px] mx-auto object-contain block"
                  style={{ aspectRatio: '210/48' }}
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#18181B]">
                {isForgotPassword
                  ? 'Reset Password'
                  : isRegistering
                  ? 'Student Registration'
                  : 'Student Login'}
              </h1>
              <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
                {isForgotPassword
                  ? 'Enter your registered email to receive a password reset link.'
                  : isRegistering
                  ? 'Create your student account to access your courses, study notes, and batch notices.'
                  : 'Enter your credentials to access your student portal dashboard.'}
              </p>
            </div>

            {/* Error or Success notification */}
            {errorMsg && (
              errorMsg.startsWith('UNAUTHORIZED_DOMAIN:') ? (
                <div className="p-4 bg-amber-50 text-amber-950 text-xs rounded-2xl border border-amber-300 space-y-3">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Google Sign-In: Domain Authorization Required</span>
                  </div>
                  <p className="text-[#52525B] leading-relaxed">
                    Google OAuth requires you to whitelist your website's domain in your Firebase project for security.
                  </p>
                  <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Your Current Domain:
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono font-bold bg-[#FAF7F0] px-2.5 py-1.5 rounded-lg border border-[#D5CEBE] text-[#916E16] flex-1 truncate select-all">
                        {errorMsg.replace('UNAUTHORIZED_DOMAIN:', '')}
                      </code>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(errorMsg.replace('UNAUTHORIZED_DOMAIN:', ''));
                          setCopiedDomain(true);
                          setTimeout(() => setCopiedDomain(false), 2500);
                        }}
                        className="bg-black hover:bg-neutral-800 text-[#F5D061] px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer shrink-0 shadow-2xs"
                      >
                        {copiedDomain ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedDomain ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="text-[11px] text-gray-600 space-y-1 pt-1">
                      <p className="font-bold text-gray-800">Quick steps to authorize in Firebase Console:</p>
                      <ol className="list-decimal list-inside space-y-0.5 pl-1">
                        <li>Go to Firebase Console &gt; <strong>Authentication</strong>.</li>
                        <li>Click <strong>Settings</strong> tab &gt; <strong>Authorized domains</strong>.</li>
                        <li>Click <strong>Add domain</strong> and paste the domain above.</li>
                      </ol>
                    </div>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] flex items-center justify-between">
                    <span>💡 Tip: You can also register or log in instantly with <strong>Email &amp; Password</strong> below!</span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )
            )}
            {successMsg && (
              <div className="p-3.5 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Google Login Button */}
            {!isForgotPassword && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={actionLoading}
                  className="w-full bg-white hover:bg-neutral-50 text-[#18181B] font-bold py-2.5 px-4 rounded-xl border border-[#D5CEBE] flex items-center justify-center gap-3 text-xs sm:text-sm shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-[#E8E2D5] w-full" />
                  <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-[#71717A] absolute">
                    or with email
                  </span>
                </div>
              </>
            )}

            {isForgotPassword ? (
              /* Forgot password flow */
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Registered Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
                >
                  <span>{actionLoading ? 'Sending...' : 'Send Password Reset Email'}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setErrorMsg(null);
                    }}
                    className="text-xs font-bold text-[#916E16] hover:underline cursor-pointer"
                  >
                    ← Back to Login
                  </button>
                </div>
              </form>
            ) : isRegistering ? (
              /* Student Registration form */
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    WhatsApp Number (optional)
                  </label>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Create Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
                >
                  <span>{actionLoading ? 'Creating Account...' : 'Register Student Account'}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </form>
            ) : (
              /* Student Login form */
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setErrorMsg(null);
                      }}
                      className="text-xs text-[#916E16] hover:underline font-semibold cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
                >
                  <span>{actionLoading ? 'Logging In...' : 'Student Login'}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </form>
            )}

            {!isForgotPassword && (
              <div className="text-center pt-3 border-t border-[#E8E2D5] space-y-2">
                <button
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setErrorMsg(null);
                  }}
                  className="text-xs font-bold text-[#916E16] hover:underline cursor-pointer"
                >
                  {isRegistering ? 'Already have an account? Login Now' : 'New Student? Register Now →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
