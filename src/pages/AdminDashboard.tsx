import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getAllOrders,
  approveStudentOrder,
  rejectStudentOrder,
  getCoursesList,
  saveCourseToDb,
  deleteCourseFromDb,
  getInstituteSettings,
  updateInstituteSettings,
  seedCoursesAsAdmin,
} from '../services/firestoreService';
import { getEnquiries, updateEnquiryStatus } from '../services/storage';
import { Order, Course, InstituteSettings, Enquiry } from '../types';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  QrCode,
  DollarSign,
  BookOpen,
  Settings,
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Save,
  Eye,
  LogOut,
  AlertTriangle,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    user,
    userProfile,
    isAdmin,
    loading: authLoading,
    isRoleVerified,
    adminCheckError,
    refreshProfile,
    loginWithEmail,
    loginWithGoogle,
    logout,
  } = useAuth();

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'orders' | 'courses' | 'settings' | 'enquiries'>('orders');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [rejectionModalOrder, setRejectionModalOrder] = useState<Order | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Invalid or mismatched UTR reference.');

  // Courses State
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  // Settings State
  const [settings, setSettings] = useState<InstituteSettings | null>(null);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState<string | null>(null);

  // Enquiries State
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiryFilter, setEnquiryFilter] = useState('All');
  const [enquirySearch, setEnquirySearch] = useState('');

  // Login form states for unauthenticated admin access
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [recheckingAdmin, setRecheckingAdmin] = useState(false);
  const [copiedUid, setCopiedUid] = useState(false);

  const loadAllAdminData = async () => {
    setOrdersLoading(true);
    try {
      const [ords, crs, stg] = await Promise.all([
        getAllOrders(),
        getCoursesList(),
        getInstituteSettings(),
      ]);
      setOrders(ords);
      setCourses(crs);
      setSettings(stg);
      setEnquiries(getEnquiries());
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin && isRoleVerified) {
      loadAllAdminData();
    }
  }, [isAdmin, isRoleVerified]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    const res = await loginWithEmail(adminEmail, adminPassword);
    setLoginLoading(false);
    if (!res.success) {
      setLoginError(res.message);
    } else if (!res.isAdmin) {
      if (res.adminCheckError?.includes('permission-denied')) {
        setLoginError(
          `Firestore permission denied on 'admins/${user?.uid || 'uid'}'. Your Firestore Security Rules in Firebase Console are blocking access to the 'admins' collection. Please publish the updated firestore.rules.`
        );
      } else if (res.adminCheckError) {
        setLoginError(`Admin verification failed: ${res.adminCheckError}`);
      } else {
        setLoginError(
          `This account (${adminEmail}) does not have administrator privileges. Document 'admins/${user?.uid || 'uid'}' was not found with role: "admin".`
        );
      }
    }
  };

  // Order Actions
  const handleApprove = async (order: Order) => {
    if (!user) return;
    setActionInProgress(order.id);
    const res = await approveStudentOrder(order, user.uid);
    setActionInProgress(null);
    if (res.success) {
      const updated = await getAllOrders();
      setOrders(updated);
    } else {
      alert(res.message);
    }
  };

  const handleConfirmReject = async () => {
    if (!user || !rejectionModalOrder) return;
    setActionInProgress(rejectionModalOrder.id);
    const res = await rejectStudentOrder(rejectionModalOrder.id, user.uid, rejectionReason);
    setActionInProgress(null);
    setRejectionModalOrder(null);
    if (res.success) {
      const updated = await getAllOrders();
      setOrders(updated);
    } else {
      alert(res.message);
    }
  };

  // Course Actions
  const handleSaveCourse = async (courseToSave: Course) => {
    const res = await saveCourseToDb(courseToSave);
    if (res.success) {
      const updated = await getCoursesList();
      setCourses(updated);
      setEditingCourse(null);
      setIsCreatingCourse(false);
    } else {
      alert(res.message || 'Failed to save course.');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course from the database?')) return;
    const res = await deleteCourseFromDb(courseId);
    if (res.success) {
      const updated = await getCoursesList();
      setCourses(updated);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    const res = await updateInstituteSettings(settings);
    if (res.success) {
      setSettingsSavedMsg('UPI & Institute settings updated successfully in Firestore!');
      setTimeout(() => setSettingsSavedMsg(null), 3000);
    } else {
      alert(res.message || 'Failed to update settings.');
    }
  };

  // Enquiry status change
  const handleEnquiryStatusChange = (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    const updated = updateEnquiryStatus(id, status);
    setEnquiries(updated);
  };

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const matchesFilter = orderFilter === 'all' ? true : ord.status === orderFilter;
    const matchesSearch =
      ord.studentName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.studentEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.utr.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.courseName.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const approvedCount = orders.filter((o) => o.status === 'approved').length;
  const rejectedCount = orders.filter((o) => o.status === 'rejected').length;

  // Wait for role verification before rendering either dashboard
  if (authLoading || !isRoleVerified) {
    return (
      <div className="w-full bg-[#FCFBF7] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#C59B27] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-[#71717A] uppercase tracking-wider">
            Verifying Administrator Access...
          </p>
        </div>
      </div>
    );
  }

  // Unauthenticated / Non-Admin Access View
  if (!user || !isAdmin) {
    return (
      <div className="w-full bg-[#FCFBF7] min-h-screen py-12 sm:py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center space-y-3">
            <div className="bg-[#0B0B0C] px-5 py-3 rounded-2xl border border-[#D4AF37]/50 inline-block shadow-sm">
              <img
                src={officialLogo}
                alt="Trading Pathshala"
                className="h-12 w-auto mx-auto object-contain"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                Protected Portal
              </span>
              <h1 className="text-2xl font-black text-[#18181B]">
                Administrator Login
              </h1>
              <p className="text-xs text-[#71717A]">
                Sign in with authorized administrator credentials to manage courses, UPI orders, and settings.
              </p>
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {user && !isAdmin ? (
            /* Logged in as student or unverified admin */
            <div className="bg-amber-50 p-4 sm:p-5 rounded-2xl border border-amber-300 space-y-3.5 text-xs text-amber-900">
              <div className="font-bold flex items-center justify-between text-amber-950">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span className="text-sm">Admin Verification Notice</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded font-bold">
                  Role: {userProfile?.role || 'student'}
                </span>
              </div>

              <p className="text-gray-700">
                Signed in as <strong className="text-black">{user.email}</strong>. This account does not currently have verified administrative privileges.
              </p>

              {/* Error diagnostics if Firestore read was blocked or failed */}
              {adminCheckError && (
                <div className="p-3 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-red-900">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Firestore Authorization Alert:</span>
                  </div>
                  <p className="font-mono text-[11px] break-all">{adminCheckError}</p>
                  {adminCheckError.includes('permission-denied') && (
                    <p className="text-[11px] text-red-700 font-sans mt-1">
                      Tip: Update your <strong>firestore.rules</strong> in Firebase Console so authenticated users can read their document in the <code>admins</code> collection.
                    </p>
                  )}
                </div>
              )}

              {/* Firestore requirements card */}
              <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-2 text-[11px] text-gray-800">
                <div className="font-bold text-[#18181B] flex items-center justify-between">
                  <span>Authoritative Admin Document in Firestore:</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] bg-[#FCFBF7] p-2.5 rounded-lg border border-[#E8E2D5]">
                  <div>Collection: <strong className="text-red-700">admins</strong></div>
                  <div className="flex items-center justify-between gap-1">
                    <span>Document ID: <strong className="text-black break-all">{user.uid}</strong></span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(user.uid);
                        setCopiedUid(true);
                        setTimeout(() => setCopiedUid(false), 2000);
                      }}
                      className="shrink-0 p-1 rounded hover:bg-gray-200 cursor-pointer text-gray-600"
                      title="Copy UID"
                    >
                      {copiedUid ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div>Field: <code className="text-[#916E16]">role</code> = <code className="text-green-700">"admin"</code></div>
                  <div>Field: <code className="text-[#916E16]">email</code> = <code className="text-blue-700">"{user.email}"</code></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  disabled={recheckingAdmin}
                  onClick={async () => {
                    setRecheckingAdmin(true);
                    setLoginError(null);
                    await refreshProfile();
                    setRecheckingAdmin(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold py-2.5 px-4 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${recheckingAdmin ? 'animate-spin' : ''}`} />
                  <span>{recheckingAdmin ? 'Verifying admins Collection...' : 'Re-check Admin Role'}</span>
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer text-center"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                  Admin Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@tradingpathsala.in"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                  Admin Password *
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
              >
                <span>{loginLoading ? 'Verifying...' : 'Sign In as Administrator'}</span>
              </button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-[#E8E2D5]">
            <Link to="/" className="text-xs font-bold text-[#916E16] hover:underline">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="w-full bg-[#FCFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#916E16] hover:underline bg-white px-4 py-2 rounded-xl border border-[#E8E2D5] shadow-2xs self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Website</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200">
              Admin: {user.email}
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#FAF7F0] hover:bg-[#F3EFE4] text-red-700 px-3 py-1.5 rounded-xl border border-[#E8E2D5] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#0B0B0C] p-3 rounded-2xl border border-[#D4AF37]/50 shadow-xs">
              <img
                src={officialLogo}
                alt="Trading Pathshala"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
                Administrator Control Center
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                Trading Pathshala Management Desk
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/student-login"
              className="bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#18181B] font-bold text-xs px-4 py-2.5 rounded-xl border border-[#E8E2D5] transition-colors"
            >
              Student Portal →
            </Link>
          </div>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs space-y-1">
            <div className="text-xs font-bold text-[#71717A] uppercase">Total Orders</div>
            <div className="text-2xl sm:text-3xl font-black text-[#18181B]">{orders.length}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs space-y-1">
            <div className="text-xs font-bold text-amber-700 uppercase">Pending UTRs</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-700">{pendingCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs space-y-1">
            <div className="text-xs font-bold text-emerald-700 uppercase">Approved Orders</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">{approvedCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs space-y-1">
            <div className="text-xs font-bold text-blue-700 uppercase">Total Enquiries</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700">{enquiries.length}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E2D5] gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-black text-[#F5D061] shadow-sm'
                : 'bg-white text-[#52525B] hover:bg-[#FAF7F0] border border-[#E8E2D5]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>UPI Orders &amp; Verification</span>
            {pendingCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-black text-[#F5D061] shadow-sm'
                : 'bg-white text-[#52525B] hover:bg-[#FAF7F0] border border-[#E8E2D5]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Management ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-black text-[#F5D061] shadow-sm'
                : 'bg-white text-[#52525B] hover:bg-[#FAF7F0] border border-[#E8E2D5]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>UPI &amp; Institute Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-black text-[#F5D061] shadow-sm'
                : 'bg-white text-[#52525B] hover:bg-[#FAF7F0] border border-[#E8E2D5]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquiries Desk</span>
          </button>
        </div>

        {/* TAB 1: UPI ORDERS & PAYMENT VERIFICATION */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#18181B]">
                  UPI Payment Verification Desk
                </h2>
                <p className="text-xs text-[#71717A]">
                  Review student UTR submissions against bank statement. Approving unlocks course instantly for the student.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      orderFilter === st
                        ? 'bg-black text-[#F5D061]'
                        : 'bg-[#FAF7F0] text-[#52525B] hover:bg-[#F3EFE4] border border-[#E8E2D5]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search orders by student name, email, course, or UTR number..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
              />
            </div>

            {ordersLoading ? (
              <div className="py-12 text-center text-sm text-gray-500">Loading orders from Firestore...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-[#71717A] text-sm bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] space-y-2">
                <p className="font-bold text-[#18181B]">No orders found for this view.</p>
                <p className="text-xs">When students buy a course via UPI QR, their order and UTR will appear here for verification.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D5] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-base text-[#18181B]">{ord.studentName}</span>
                          <span
                            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              ord.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : ord.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-red-100 text-red-800 border border-red-300'
                            }`}
                          >
                            {ord.status}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">Ref: {ord.id}</span>
                        </div>
                        <div className="text-xs text-[#52525B]">
                          Course: <strong className="text-[#18181B]">{ord.courseName}</strong> • Fee: <strong className="text-[#916E16]">₹{ord.amount.toLocaleString('en-IN')}</strong> • Date: {new Date(ord.createdAt).toLocaleString()}
                        </div>
                        <div className="text-xs text-[#71717A]">
                          Student Email: <strong className="text-neutral-800">{ord.studentEmail}</strong> {ord.studentPhone && `• Phone: ${ord.studentPhone}`}
                        </div>
                      </div>

                      {/* UTR Highlight Card */}
                      <div className="bg-white p-3 rounded-xl border-2 border-[#D4AF37] text-right shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block">
                          Submitted UTR / Ref ID
                        </span>
                        <span className="text-base font-black font-mono text-[#916E16] select-all">
                          {ord.utr}
                        </span>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-[#E8E2D5] flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-gray-500">
                        {ord.status === 'pending' && (
                          <span className="text-amber-700 font-semibold">
                            ⚠️ Verify UTR in bank app before approving.
                          </span>
                        )}
                        {ord.status === 'approved' && (
                          <span className="text-emerald-700 font-semibold">
                            ✓ Course unlocked in student's dashboard.
                          </span>
                        )}
                        {ord.status === 'rejected' && ord.rejectionReason && (
                          <span className="text-red-700 font-semibold">
                            Rejection note: {ord.rejectionReason}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {ord.studentPhone && (
                          <a
                            href={`https://wa.me/${ord.studentPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${ord.studentName}, this is Prashant Kumar Sinha from Trading Pathshala regarding your enrollment for ${ord.courseName}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 shadow-2xs"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        {ord.status !== 'approved' && (
                          <button
                            onClick={() => handleApprove(ord)}
                            disabled={actionInProgress === ord.id}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-2xs cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve &amp; Unlock</span>
                          </button>
                        )}

                        {ord.status !== 'rejected' && (
                          <button
                            onClick={() => setRejectionModalOrder(ord)}
                            disabled={actionInProgress === ord.id}
                            className="bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs px-3 py-1.5 rounded-lg border border-red-200 cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COURSE MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#18181B]">
                  Course Offerings &amp; Pricing Management
                </h2>
                <p className="text-xs text-[#71717A]">
                  Manage tuition fees, descriptions, syllabus topics, and publication status in Cloud Firestore.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
                <button
                  onClick={async () => {
                    const res = await seedCoursesAsAdmin();
                    alert(res.message);
                    if (res.success) {
                      const updated = await getCoursesList();
                      setCourses(updated);
                    }
                  }}
                  className="bg-white hover:bg-neutral-50 text-[#18181B] border border-[#D5CEBE] font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
                  title="Upload the initial 6 courses into Firestore"
                >
                  <Save className="w-3.5 h-3.5 text-[#916E16]" />
                  <span>Sync 6 Courses to Firestore</span>
                </button>

                <button
                  onClick={() => {
                    setEditingCourse({
                      id: `course-${Date.now()}`,
                      slug: 'new-course',
                      name: 'New Trading Program',
                      category: 'Technical Analysis',
                      shortDescription: 'Comprehensive training program.',
                      fullDescription: 'In-depth market training and strategies.',
                      price: 15000,
                      image: '/src/assets/images/course_technical_analysis_1793416380606.jpg',
                      tags: ['Price Action', 'Risk Management'],
                      curriculum: [
                        {
                          moduleTitle: 'Module 1: Foundations',
                          lessons: ['Introduction to Market Concepts', 'Key Chart Patterns'],
                        },
                      ],
                      published: true,
                    });
                    setIsCreatingCourse(true);
                  }}
                  className="bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] text-black font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-2xs inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Course</span>
                </button>
              </div>
            </div>

            {/* Course Editor Modal / Inline Form */}
            {editingCourse && (
              <div className="p-6 bg-[#FAF7F0] rounded-2xl border-2 border-[#D4AF37] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D5]">
                  <h3 className="font-bold text-base text-[#18181B]">
                    {isCreatingCourse ? 'Create New Course' : `Edit: ${editingCourse.name}`}
                  </h3>
                  <button
                    onClick={() => {
                      setEditingCourse(null);
                      setIsCreatingCourse(false);
                    }}
                    className="text-xs text-gray-500 hover:text-black font-bold"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Course Name</label>
                    <input
                      type="text"
                      value={editingCourse.name}
                      onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5CEBE] text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">URL Slug</label>
                    <input
                      type="text"
                      value={editingCourse.slug}
                      onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5CEBE] text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Category</label>
                    <select
                      value={editingCourse.category}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          category: e.target.value as Course['category'],
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5CEBE] text-sm"
                    >
                      <option value="Options">Options</option>
                      <option value="Technical Analysis">Technical Analysis</option>
                      <option value="Wealth & Investing">Wealth &amp; Investing</option>
                      <option value="Swing & Forex">Swing &amp; Forex</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Price (INR ₹)</label>
                    <input
                      type="number"
                      value={editingCourse.price}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, price: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5CEBE] text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-gray-700">Short Description</label>
                    <textarea
                      rows={2}
                      value={editingCourse.shortDescription}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, shortDescription: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5CEBE] text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-gray-700">Full Description</label>
                    <textarea
                      rows={3}
                      value={editingCourse.fullDescription}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, fullDescription: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5CEBE] text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-gray-700">Image Asset Path / URL</label>
                    <input
                      type="text"
                      value={editingCourse.image}
                      onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D5CEBE] text-sm font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setEditingCourse(null);
                      setIsCreatingCourse(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-white border border-gray-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSaveCourse(editingCourse)}
                    className="px-5 py-2 rounded-xl bg-black text-[#F5D061] text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Course to Firestore</span>
                  </button>
                </div>
              </div>
            )}

            {/* Courses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#FCFBF7] rounded-2xl border border-[#E8E2D5] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 bg-gray-100 overflow-hidden relative">
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 left-2.5 bg-black/80 text-[#E5B83A] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {c.category}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-base text-[#18181B] leading-snug">{c.name}</h4>
                      <p className="text-xs text-[#52525B] line-clamp-2">{c.shortDescription}</p>
                      <div className="text-lg font-black text-[#916E16]">
                        ₹{c.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-[#E8E2D5] mt-2 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setEditingCourse(c);
                        setIsCreatingCourse(false);
                      }}
                      className="text-xs font-bold bg-white hover:bg-gray-50 border border-gray-300 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-[#18181B]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteCourse(c.id)}
                      className="text-xs font-bold text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: UPI & SETTINGS */}
        {activeTab === 'settings' && settings && (
          <div className="bg-white rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#18181B]">
                Institute Payment &amp; Contact Settings
              </h2>
              <p className="text-xs text-[#71717A]">
                Configure official UPI payment details, QR image, instructions, and communication channels.
              </p>
            </div>

            {settingsSavedMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{settingsSavedMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Official UPI ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.upiId}
                    onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                    placeholder="e.g. prashantsinha68-2@okhdfcbank"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm font-mono text-[#18181B]"
                  />
                  <span className="text-[11px] text-[#71717A]">
                    Official UPI ID displayed on student payment screens and QR code.
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    UPI Payee Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.upiPayeeName}
                    onChange={(e) => setSettings({ ...settings, upiPayeeName: e.target.value })}
                    placeholder="Prashant Kr Sinha"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B]"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Custom QR Code Image URL (optional)
                  </label>
                  <input
                    type="text"
                    value={settings.qrImageUrl || ''}
                    onChange={(e) => setSettings({ ...settings, qrImageUrl: e.target.value })}
                    placeholder="/google_business_qr.svg or external image URL"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm font-mono text-xs text-[#18181B]"
                  />
                  <span className="text-[11px] text-[#71717A]">
                    Leave blank to automatically generate dynamic UPI QR codes per course price.
                  </span>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Payment Instructions for Students
                  </label>
                  <textarea
                    rows={4}
                    value={settings.paymentInstructions}
                    onChange={(e) => setSettings({ ...settings, paymentInstructions: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-xs sm:text-sm text-[#18181B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Official Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        whatsappNumber: e.target.value,
                        supportPhone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-black text-[#F5D061] hover:brightness-110 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings to Firestore</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#18181B]">
                  Admission Enquiries
                </h2>
                <p className="text-xs text-[#71717A]">
                  Website contact forms and course enquiries submitted by visitors.
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {['All', 'New', 'Contacted', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setEnquiryFilter(st)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      enquiryFilter === st
                        ? 'bg-black text-[#F5D061]'
                        : 'bg-[#FAF7F0] text-[#52525B] hover:bg-[#F3EFE4] border border-[#E8E2D5]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search enquiries by name, phone, or course..."
                value={enquirySearch}
                onChange={(e) => setEnquirySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B]"
              />
            </div>

            <div className="space-y-4">
              {enquiries
                .filter((enq) => {
                  const matchesFilter = enquiryFilter === 'All' ? true : enq.status === enquiryFilter;
                  const matchesSearch =
                    enq.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
                    enq.phone.includes(enquirySearch) ||
                    enq.courseName.toLowerCase().includes(enquirySearch.toLowerCase());
                  return matchesFilter && matchesSearch;
                })
                .map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D5] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-[#18181B]">{enq.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                            {enq.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#71717A]">
                          Course: <strong>{enq.courseName}</strong> • {new Date(enq.submittedAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${enq.name}, this is Prashant Kumar Sinha from Trading Pathshala.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] text-white font-bold text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          onClick={() => handleEnquiryStatusChange(enq.id, 'Contacted')}
                          className="text-xs font-semibold bg-white border border-gray-300 px-2.5 py-1.5 rounded-lg text-blue-700"
                        >
                          Mark Contacted
                        </button>
                        <button
                          onClick={() => handleEnquiryStatusChange(enq.id, 'Closed')}
                          className="text-xs font-semibold bg-white border border-gray-300 px-2.5 py-1.5 rounded-lg text-emerald-700"
                        >
                          Mark Closed
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#52525B] pt-2 border-t border-[#E8E2D5]">
                      <div>Phone: {enq.phone}</div>
                      <div>Email: {enq.email}</div>
                    </div>

                    {enq.message && (
                      <div className="bg-white p-3 rounded-xl border border-[#E8E2D5] text-xs text-[#3F3F46]">
                        {enq.message}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Rejection Reason Modal */}
        {rejectionModalOrder && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E8E2D5]">
              <h3 className="font-bold text-base text-[#18181B]">
                Reject Order: {rejectionModalOrder.courseName}
              </h3>
              <p className="text-xs text-[#71717A]">
                Student: {rejectionModalOrder.studentName} (UTR: {rejectionModalOrder.utr})
              </p>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Reason for Rejection</label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setRejectionModalOrder(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReject}
                  className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
