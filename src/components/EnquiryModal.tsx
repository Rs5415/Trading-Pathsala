import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Phone, Tag } from 'lucide-react';
import { submitEnquiry } from '../services/storage';

interface EnquiryModalProps {
  isOpen: boolean;
  initialCourseName?: string;
  offerCode?: string;
  availableCourses: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  initialCourseName,
  offerCode,
  availableCourses,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [courseName, setCourseName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialCourseName) {
      setCourseName(initialCourseName);
    } else if (availableCourses.length > 0) {
      setCourseName(availableCourses[0]);
    }
    if (offerCode) {
      setMessage(`Applying Offer Code: ${offerCode}`);
    } else {
      setMessage('');
    }
    setSubmitted(false);
    setErrors({});
  }, [initialCourseName, offerCode, isOpen, availableCourses]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Full name is required.';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = '10-digit mobile number is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        courseName: courseName || 'General Inquiry',
        message: message.trim() || (offerCode ? `Applied Promo: ${offerCode}` : 'General batch inquiry'),
      });
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccess();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090909]/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-[#2E2E2E] rounded-lg w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4.5 border-b border-[#222222] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#C5A34A] uppercase tracking-wider">
              Trading Pathshala Admissions
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
              Course Enquiry & Registration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#737373] hover:text-white hover:bg-[#1C1C1C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-[#C5A34A]/20 border border-[#C5A34A]/30 rounded-full flex items-center justify-center text-[#C5A34A] mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wider">Enquiry Registered</h4>
              <p className="text-xs text-[#A0A0A0] max-w-xs mx-auto leading-relaxed">
                We have registered your details for <span className="text-white font-medium">{courseName}</span>. Prashant Kumar Sinha or our desk will contact you via WhatsApp / Call.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <a
                  href={`https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20have%20enquired%20for%20${encodeURIComponent(courseName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold uppercase text-[#090909] bg-[#C5A34A] rounded flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-white bg-[#1A1A1A] border border-[#2E2E2E] rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {offerCode && (
                <div className="p-2.5 rounded bg-[#C5A34A]/10 border border-[#C5A34A]/30 text-xs text-[#E2C878] flex items-center gap-2">
                  <Tag className="w-4 h-4 shrink-0 text-[#C5A34A]" />
                  <span>Promo code <strong>{offerCode}</strong> applied!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className={`w-full bg-[#090909] border rounded px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#555555] focus:outline-none ${
                    errors.name ? 'border-rose-500' : 'border-[#262626] focus:border-[#C5A34A]'
                  }`}
                />
                {errors.name && <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.name}</span>}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={`w-full bg-[#090909] border rounded px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#555555] focus:outline-none ${
                    errors.phone ? 'border-rose-500' : 'border-[#262626] focus:border-[#C5A34A]'
                  }`}
                />
                {errors.phone && <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.phone}</span>}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Program of Interest</label>
                <select
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                >
                  {availableCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="General Consultation">General Consultation / Mentor Discussion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Query / Note</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Optional question about cohort timing or demo..."
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-xs sm:text-sm text-white placeholder-[#555555] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href="tel:+918987599799"
                  className="text-xs text-[#737373] hover:text-[#C5A34A] flex items-center gap-1 font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A34A]" />
                  <span>Call: +91 89875 99799</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 text-xs font-medium text-[#737373] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded transition-all shadow-md shadow-[#C5A34A]/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Submit Enquiry'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
