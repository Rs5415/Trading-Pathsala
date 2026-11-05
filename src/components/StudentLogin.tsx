import React, { useState } from 'react';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { getStudentSession, setStudentSession, loginStudent, registerStudent, StudentUser } from '../services/storage';
import { Mail, Lock, Eye, EyeOff, BookOpen, FileText, Bell, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface StudentLoginProps {
  onBackToHome: () => void;
  onOpenEnquiry?: (courseName?: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onBackToHome, onOpenEnquiry }) => {
  const [currentUser, setCurrentUser] = useState<StudentUser | null>(getStudentSession());
  const [isRegistering, setIsRegistering] = useState(false);

  // Form states
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = loginStudent(emailInput, passwordInput);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setSuccessMsg('Logged in successfully!');
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const res = registerStudent(nameInput, emailInput, passwordInput);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setSuccessMsg('Registration & Student account creation successful!');
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleLogout = () => {
    setStudentSession(null);
    setCurrentUser(null);
    setEmailInput('');
    setPasswordInput('');
    setNameInput('');
    setSuccessMsg(null);
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#916E16] hover:underline cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#E8E2D5] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {currentUser ? (
          /* Student Dashboard */
          <div className="bg-white rounded-2xl border border-[#E8E2D5] p-6 sm:p-10 shadow-xs space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D5]">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
                  Student Portal Dashboard
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                  Welcome, {currentUser.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#71717A]">
                  Student ID: <span className="font-mono font-bold text-[#916E16]">{currentUser.studentId}</span> • Email: {currentUser.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#18181B] font-bold text-xs px-4 py-2.5 rounded-xl border border-[#E8E2D5] transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>

            {successMsg && (
              <div className="p-3 bg-[#FAF2DE] text-[#916E16] text-xs rounded-xl border border-[#E5B83A]/40 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Main Column: Enrolled Courses & Content */}
              <div className="md:col-span-8 space-y-6">
                <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#E8E2D5] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#18181B] flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#916E16]" />
                      <span>Enrolled Courses</span>
                    </h3>
                    <span className="text-xs font-bold bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 px-2.5 py-1 rounded-md">
                      Active Access
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentUser.enrolledCourses.map((courseName, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-[#E8E2D5] space-y-2">
                        <div className="font-bold text-[#18181B]">{courseName}</div>
                        <div className="text-xs text-[#71717A]">Batch: {currentUser.batchName}</div>
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-[#52525B]">Progress: 68% Completed</span>
                          <span className="text-[#916E16] font-bold cursor-pointer hover:underline">
                            Continue Lessons →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Materials */}
                <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#E8E2D5] space-y-4">
                  <h3 className="text-lg font-bold text-[#18181B] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#916E16]" />
                    <span>Learning Materials & PDFs</span>
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { title: 'Market Structure Shift (MSS) Reference Guide', size: '3.4 MB PDF' },
                      { title: 'Order Flow & Volume Profile Study Notes', size: '2.8 MB PDF' },
                      { title: 'Index Option Buying Journal Template', size: '1.5 MB XLSX' },
                    ].map((mat, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E8E2D5] flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-[#27272A]">{mat.title}</span>
                        <button
                          onClick={() => alert(`Downloading ${mat.title}...`)}
                          className="bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] text-black font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-2xs"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar: Profile & Announcements */}
              <div className="md:col-span-4 space-y-6">
                <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#E8E2D5] space-y-4">
                  <h3 className="font-bold text-base text-[#18181B] flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#C59B27]" />
                    <span>Announcements</span>
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-[#E8E2D5] space-y-1">
                      <div className="font-bold text-[#916E16]">Weekend Q&A Session</div>
                      <p className="text-[#52525B]">Join this Saturday at 7:00 PM IST with Prashant Sir.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF7F0] p-6 rounded-2xl border border-[#E8E2D5] space-y-3">
                  <h3 className="font-bold text-base text-[#18181B]">Student Profile</h3>
                  <div className="space-y-2 text-xs text-[#52525B]">
                    <div className="flex justify-between py-1 border-b border-[#E8E2D5]">
                      <span>Name:</span>
                      <span className="font-bold text-[#18181B]">{currentUser.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E8E2D5]">
                      <span>Student ID:</span>
                      <span className="font-mono font-bold text-[#916E16]">{currentUser.studentId}</span>
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
          /* Login / Register Card */
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="text-center space-y-3">
              <div className="bg-[#0B0B0C] px-4 py-2 rounded-xl border border-[#D4AF37]/50 inline-block shadow-sm">
                <img
                  src={officialLogo}
                  alt="Trading Pathshala"
                  className="h-10 w-auto mx-auto object-contain"
                />
              </div>
              <h1 className="text-2xl font-extrabold text-[#18181B]">
                {isRegistering ? 'Student Registration' : 'Student Login'}
              </h1>
              <p className="text-xs sm:text-sm text-[#71717A]">
                {isRegistering
                  ? 'Create your student account to access portal courses and study materials.'
                  : 'Enter your credentials to access your student dashboard.'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

            {isRegistering ? (
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
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Create password"
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
                  className="w-full bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Register Account</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Username / Email / Student ID *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="TP-2025-0842 or email@domain.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Password *
                    </label>
                    <a
                      href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20need%20help%20with%20my%20Student%20Portal%20password."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#916E16] hover:underline font-semibold"
                    >
                      Forgot Password?
                    </a>
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
                  className="w-full bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </form>
            )}

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
          </div>
        )}
      </div>
    </div>
  );
};
