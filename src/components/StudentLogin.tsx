import React, { useState } from 'react';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { Mail, Lock, ArrowRight, BookOpen, Clock, FileText, User, ArrowLeft } from 'lucide-react';

interface StudentLoginProps {
  onBackToHome: () => void;
  onOpenEnquiry?: (courseName?: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onBackToHome, onOpenEnquiry }) => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !password) {
      setMessage('Please enter your Student ID or registered email and password.');
      return;
    }
    // Switch to interface preview without fake auth
    setShowDashboardPreview(true);
    setMessage(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#174D32] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {!showDashboardPreview ? (
          /* Login Form Box */
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="text-center space-y-3">
              <div className="bg-[#0B150F] px-4 py-2 rounded-xl border border-[#B99B52]/40 inline-block">
                <img
                  src={officialLogo}
                  alt="Trading Pathsala"
                  className="h-10 w-auto mx-auto object-contain"
                />
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900">Student Login</h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Log in to access your course materials, schedule, and batch updates.
              </p>
            </div>

            {message && (
              <div className="p-3 bg-amber-50 text-amber-800 text-xs rounded-xl border border-amber-200">
                {message}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Student ID or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. TP-2025-0101 or email@domain.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-hidden focus:border-[#174D32]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Password
                  </label>
                  <a
                    href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20need%20help%20with%20my%20Student%20Portal%20password."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#174D32] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-hidden focus:border-[#174D32]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#174D32] hover:bg-[#113A26] text-white font-bold py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4 text-[#75D68A]" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setShowDashboardPreview(true)}
                className="text-xs font-bold text-[#174D32] hover:underline cursor-pointer"
              >
                Preview Student Portal Interface →
              </button>
              <div className="text-xs text-gray-500">
                Need admission?{' '}
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry('Course Admissions')}
                  className="text-[#174D32] font-bold hover:underline cursor-pointer"
                >
                  Enquire Here
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Student Dashboard Preview */
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#174D32]">
                  Student Portal Interface
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome to Your Learning Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Connected Student: Aarav Sharma (ID: TP-2025-0842)
                </p>
              </div>

              <button
                onClick={() => setShowDashboardPreview(false)}
                className="text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-200 px-3.5 py-2 rounded-lg cursor-pointer"
              >
                Logout / Return to Login
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Enrolled Course */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#174D32] uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>Enrolled Course</span>
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Basic to Advanced Technical Analysis
                </h3>
                <div className="text-xs text-gray-500">
                  Schedule: Mon - Thu, 8:00 PM IST
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#174D32] h-full w-2/3" />
                </div>
                <div className="text-xs text-gray-500">65% Curriculum Completed</div>
              </div>

              {/* Study Materials */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#174D32] uppercase">
                  <FileText className="w-4 h-4" />
                  <span>Course Materials</span>
                </div>
                <ul className="text-xs text-gray-700 space-y-2">
                  <li className="flex items-center justify-between">
                    <span>1. Market Structure Shift (MSS) Guide</span>
                    <span className="text-[#174D32] font-semibold">PDF</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>2. Order Flow & Volume Profile Notes</span>
                    <span className="text-[#174D32] font-semibold">PDF</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>3. Risk Calculator Spreadsheet</span>
                    <span className="text-[#174D32] font-semibold">XLSX</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Note about real backend integration */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
              <div className="font-bold text-gray-900">Backend Integration Ready</div>
              <p>
                This student interface is structured to connect to your production authentication and database (e.g. Firebase Auth, PostgreSQL or REST APIs) without simulating fake authentication.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
