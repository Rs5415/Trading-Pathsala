import React, { useState, useEffect } from 'react';
import { Course, InstituteSettings } from '../types';
import { useAuth } from '../context/AuthContext';
import { submitUpiOrder, getInstituteSettings } from '../services/firestoreService';
import upiQrImage from '../assets/upi_qr_prashant_kr_sinha.jpg';
import {
  X,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import officialLogo from '../assets/trading_pathshala_official_logo.png';

interface UpiPaymentModalProps {
  isOpen: boolean;
  course: Course | null;
  onClose: () => void;
  onNavigateLogin?: () => void;
}

export const UpiPaymentModal: React.FC<UpiPaymentModalProps> = ({
  isOpen,
  course,
  onClose,
  onNavigateLogin,
}) => {
  const { user, userProfile } = useAuth();
  const [settings, setSettings] = useState<InstituteSettings | null>(null);
  const [utrInput, setUtrInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<{ id: string; utr: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setSuccessOrder(null);
      setUtrInput('');
      setPhoneInput(userProfile?.phone || '');

      getInstituteSettings().then((s) => {
        setSettings(s);
      });
    }
  }, [isOpen, course, userProfile]);

  if (!isOpen || !course) return null;

  const handleCopyUpi = () => {
    if (!settings?.upiId) return;
    navigator.clipboard.writeText(settings.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!user || !userProfile) {
      setErrorMessage('Please login or register your student account first to link your course purchase.');
      return;
    }

    const cleanUtr = utrInput.trim().toUpperCase();
    if (cleanUtr.length < 6) {
      setErrorMessage('Please enter a valid 6-12 digit UTR / Transaction Reference Number.');
      return;
    }

    setLoading(true);
    const res = await submitUpiOrder({
      studentUid: user.uid,
      studentName: userProfile.name || user.displayName || 'Student',
      studentEmail: userProfile.email || user.email || '',
      studentPhone: phoneInput.trim() || userProfile.phone || '',
      courseId: course.id,
      courseName: course.name,
      courseSlug: course.slug,
      amount: course.price,
      utr: cleanUtr,
    });
    setLoading(false);

    if (res.success && res.orderId) {
      setSuccessOrder({ id: res.orderId, utr: cleanUtr });
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border border-[#E8E2D5] shadow-2xl overflow-hidden my-6">
        {/* Header Strip */}
        <div className="bg-[#0B0B0C] px-6 py-5 text-white flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <img
              src={officialLogo}
              alt="Trading Pathsala"
              className="h-9 w-auto object-contain"
            />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#E5B83A]">
                Secure UPI Enrollment
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Course Admission &amp; Payment
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Success State */}
          {successOrder ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-extrabold text-[#18181B]">
                  Payment Submitted Successfully!
                </h4>
                <p className="text-sm text-[#52525B]">
                  Your course order for <strong className="text-[#18181B]">{course.name}</strong> is now pending admin verification.
                </p>
              </div>

              <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#E8E2D5] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Order Reference:</span>
                  <span className="font-mono font-bold text-[#18181B]">{successOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Submitted UTR:</span>
                  <span className="font-mono font-bold text-[#916E16]">{successOrder.utr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Course Fee:</span>
                  <span className="font-bold text-[#18181B]">₹{course.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Verification Time:</span>
                  <span className="text-emerald-700 font-bold">Within 1-2 hours</span>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-left flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Our administration team will check your UTR with the bank statement and unlock the course materials in your <strong>Student Portal</strong>.
                </span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/918987599799?text=${encodeURIComponent(
                    `Hello Prashant Sir, I have submitted payment for "${course.name}" (UTR: ${successOrder.utr}, Order: ${successOrder.id}). Please verify and approve my admission.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-xl text-xs sm:text-sm text-center shadow-xs"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 bg-black text-white font-bold py-3 rounded-xl text-xs sm:text-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Course Summary Card */}
              <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#E8E2D5] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#916E16]">
                    Selected Program
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#18181B]">
                    {course.name}
                  </h4>
                  <span className="text-xs text-[#71717A]">One-time lifetime batch access</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#71717A] uppercase font-semibold">Total Payable</span>
                  <div className="text-2xl font-black text-[#916E16]">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Authentication check notice */}
              {!user && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-900 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>Student Login Recommended</span>
                    </p>
                    <p className="text-amber-800">
                      Please log in or register before submitting your UTR so this course is instantly linked to your student account.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onNavigateLogin) onNavigateLogin();
                    }}
                    className="shrink-0 bg-black text-[#F5D061] px-3.5 py-1.5 rounded-xl font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Login / Register
                  </button>
                </div>
              )}

              {/* UPI QR & Payment Info Box */}
              <div className="bg-[#FCFBF7] p-5 sm:p-6 rounded-2xl border border-[#E8E2D5] space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  {/* Left Column: Original Uploaded QR Image */}
                  <div className="sm:col-span-6 flex flex-col items-center text-center space-y-2.5">
                    <div className="bg-white p-2 rounded-2xl border-2 border-[#D4AF37] shadow-sm max-w-[230px] w-full">
                      <img
                        src={upiQrImage}
                        alt="Prashant Kr Sinha UPI QR Code"
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-[#71717A] uppercase tracking-wider block">
                        Scan to Pay with Any UPI App
                      </span>
                      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-semibold">
                        <span>Google Pay</span> • <span>PhonePe</span> • <span>Paytm</span> • <span>BHIM</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Payment Details */}
                  <div className="sm:col-span-6 space-y-3.5 sm:border-l sm:border-[#E8E2D5] sm:pl-5">
                    {/* Course & Amount summary */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                        Course Selected
                      </div>
                      <div className="text-sm font-bold text-[#18181B] line-clamp-2">
                        {course.name}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                        Payable Amount
                      </div>
                      <div className="text-2xl font-black text-[#916E16]">
                        ₹{course.price.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Payee Name */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                        Payee Name
                      </div>
                      <div className="text-sm font-extrabold text-[#18181B] flex items-center gap-1.5">
                        <span>{settings?.upiPayeeName || 'Prashant Kr Sinha'}</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Official UPI ID with Copy button */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                        Official UPI ID
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono font-bold bg-white px-2.5 py-1.5 rounded-lg border border-[#D5CEBE] text-[#916E16] select-all break-all">
                          {settings?.upiId || 'prashantsinha68-2@okhdfcbank'}
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="bg-white hover:bg-gray-100 text-[#18181B] p-2 rounded-lg border border-[#D5CEBE] text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[10px] text-emerald-700 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[10px]">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Direct UPI Mobile Link */}
                    <div className="pt-1">
                      <a
                        href={`upi://pay?pa=${encodeURIComponent(
                          settings?.upiId || 'prashantsinha68-2@okhdfcbank'
                        )}&pn=${encodeURIComponent(
                          settings?.upiPayeeName || 'Prashant Kr Sinha'
                        )}&am=${course.price}&cu=INR&tn=${encodeURIComponent(course.name.substring(0, 24))}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#916E16] bg-[#FAF2DE] hover:bg-[#F5E6BF] px-3 py-1.5 rounded-lg border border-[#E5B83A]/40 transition-colors"
                      >
                        <span>Open in UPI App on Phone</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#E8E2D5] space-y-1.5 text-xs text-[#52525B]">
                <div className="font-bold text-[#18181B] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#916E16]" />
                  <span>How to complete admission:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px] sm:text-xs">
                  <li>Scan the QR code or pay to the UPI ID above.</li>
                  <li>After paying ₹{course.price.toLocaleString('en-IN')}, check your app's transaction receipt.</li>
                  <li>Find the <strong>12-digit UTR / UPI Ref ID</strong>.</li>
                  <li>Enter it in the form below and submit.</li>
                </ol>
              </div>

              {/* Submit UTR Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Enter 12-Digit UTR / Transaction Reference ID *
                    </label>
                    <span className="text-[10px] text-[#916E16] font-mono font-bold">
                      {utrInput.length}/12 Digits
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={24}
                    value={utrInput}
                    onChange={(e) => setUtrInput(e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase())}
                    placeholder="e.g. 432109876543 (from GPay, PhonePe, Paytm, BHIM)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm font-mono text-[#18181B] focus:outline-hidden focus:border-[#C59B27] tracking-wider"
                  />
                  <p className="text-[11px] text-[#71717A]">
                    Every UPI payment generates a unique 12-digit UTR/UPI Ref number on your bank payment slip. Duplicate UTR submissions will be rejected.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    WhatsApp Phone Number (for batch communication)
                  </label>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 disabled:opacity-50 text-black font-extrabold py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <span>Verifying &amp; Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Order &amp; Verify Payment</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
