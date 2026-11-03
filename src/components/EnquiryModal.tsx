import React, { useState, useEffect } from 'react';
import { submitEnquiry } from '../services/storage';
import { X, Send, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  initialCourseName?: string;
  availableCourses: string[];
  onClose: () => void;
  onSuccess: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  initialCourseName,
  availableCourses,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    courseName: initialCourseName || availableCourses[0] || 'Index Option Buying',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialCourseName) {
      setFormData((prev) => ({ ...prev, courseName: initialCourseName }));
    }
  }, [initialCourseName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your Name, Phone Number, and Email.');
      return;
    }

    try {
      submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        courseName: formData.courseName,
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setErrorMsg(null);
      onSuccess();
    } catch (err) {
      setErrorMsg('Failed to record enquiry. You can connect directly via WhatsApp.');
    }
  };

  const directWhatsAppUrl = `https://wa.me/918987599799?text=${encodeURIComponent(
    `Hello Prashant Sir,\nI am enquiring from Trading Pathsala website:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nCourse: ${formData.courseName}\nMessage: ${formData.message || 'I would like more information on upcoming batches.'}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E3EBE4] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#68736B] hover:text-[#202923] hover:bg-[#F4F7F4] transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EAF3EC] text-[#174D32] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#202923]">Enquiry Received</h3>
            <p className="text-sm text-[#68736B]">
              Thank you, {formData.name}. We have logged your request for{' '}
              <strong>{formData.courseName}</strong>.
            </p>

            <div className="pt-3 flex flex-col gap-2.5">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Continue on WhatsApp with Prashant Sir</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full bg-[#F4F7F4] text-[#202923] hover:bg-[#EAEFEA] font-bold py-2.5 rounded-xl transition-colors cursor-pointer text-xs"
              >
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#174D32]">
                Course Admission
              </div>
              <h3 className="text-2xl font-bold text-[#202923]">Course Enquiry</h3>
              <p className="text-xs text-[#68736B]">
                Submit your details below to receive batch timing, syllabus prospectus, and fee details.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#202923]">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Verma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EBE4] bg-[#F4F7F4] text-sm text-[#202923] focus:outline-hidden focus:border-[#174D32] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#202923]">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EBE4] bg-[#F4F7F4] text-sm text-[#202923] focus:outline-hidden focus:border-[#174D32] focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#202923]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EBE4] bg-[#F4F7F4] text-sm text-[#202923] focus:outline-hidden focus:border-[#174D32] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#202923]">
                  Course Selected *
                </label>
                <select
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3EBE4] bg-[#F4F7F4] text-sm text-[#202923] focus:outline-hidden focus:border-[#174D32] focus:bg-white"
                >
                  {availableCourses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#202923]">
                  Message / Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any questions on prerequisites or schedule..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E3EBE4] bg-[#F4F7F4] text-sm text-[#202923] focus:outline-hidden focus:border-[#174D32] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="w-full bg-[#174D32] hover:bg-[#123E28] text-white font-bold py-3 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#75D68A]" />
                  <span>Submit Form</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
