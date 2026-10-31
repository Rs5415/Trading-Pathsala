import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { submitEnquiry } from '../services/storage';
import { Phone, MessageCircle, Instagram, User, Send, CheckCircle2, ShieldCheck, AlertCircle, MapPin, Navigation, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  content: WebsiteContent;
  availableCourses: string[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content, availableCourses }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    courseName: availableCourses[0] || 'General Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your full name (minimum 2 characters).';
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 3) {
      errs.message = 'Please provide a brief query or your trading experience.';
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
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        courseName: formData.courseName,
        message: formData.message.trim(),
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({
        name: '',
        phone: '',
        courseName: availableCourses[0] || 'General Inquiry',
        message: '',
      });
    }, 400);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#090909] border-b border-[#222222] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
            <span>Official Communications</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase">
            Connect With Trading Pathshala
          </h2>
          <p className="mt-3 text-[#A0A0A0] text-xs sm:text-base leading-relaxed font-light">
            Have questions about upcoming batches, syllabus scope, or which progression level fits your background? Connect directly with mentor Prashant Kumar Sinha.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
          {/* Direct Verified Details Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 w-full min-w-0">
            <div className="bg-[#121212] border border-[#222222] rounded-lg p-5 sm:p-8 space-y-5 sm:space-y-6">
              <div className="border-b border-[#1C1C1C] pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#737373] block mb-1">
                  Official Business Identity
                </span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  Trading Pathshala
                </h3>
                <span className="text-xs text-[#C5A34A] font-mono">Financial Service · Financial Planner</span>
              </div>

              <div className="space-y-4">
                {/* Contact Person */}
                <div className="flex items-start gap-3.5 p-3.5 rounded bg-[#171717] border border-[#262626]">
                  <div className="p-2 rounded bg-[#090909] text-[#C5A34A] shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#737373] block">
                      Contact Person & Mentor
                    </span>
                    <span className="text-sm font-bold text-white">
                      Prashant Kumar Sinha
                    </span>
                  </div>
                </div>

                {/* Click-to-Call */}
                <a
                  href="tel:+918987599799"
                  className="flex items-start gap-3.5 p-3.5 rounded bg-[#171717] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#C5A34A]/50 transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded bg-[#090909] text-[#C5A34A] shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono uppercase text-[#737373] block">
                      Official Phone (Click to Call)
                    </span>
                    <span className="text-sm font-mono font-bold text-white group-hover:text-[#C5A34A] transition-colors">
                      +91 89875 99799
                    </span>
                  </div>
                </a>

                {/* WhatsApp Enquiry Button */}
                <a
                  href="https://wa.me/918987599799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded bg-[#171717] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#C5A34A]/50 transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded bg-[#090909] text-[#C5A34A] shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono uppercase text-[#737373] block">
                      Direct WhatsApp Desk
                    </span>
                    <span className="text-sm font-mono font-bold text-white group-hover:text-[#C5A34A] transition-colors">
                      +91 89875 99799 (Chat Now)
                    </span>
                  </div>
                </a>

                {/* Instagram Profile Link */}
                <a
                  href="https://www.instagram.com/tradingpathsala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded bg-[#171717] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#C5A34A]/50 transition-colors group cursor-pointer"
                >
                  <div className="p-2 rounded bg-[#090909] text-[#C5A34A] shrink-0 group-hover:scale-110 transition-transform">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-mono uppercase text-[#737373] block">
                      Official Instagram
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-[#C5A34A] transition-colors">
                      @tradingpathsala
                    </span>
                  </div>
                </a>

                {/* Official Business Address */}
                <div className="p-3.5 rounded bg-[#171717] border border-[#262626] space-y-2">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded bg-[#090909] text-[#C5A34A] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-[#737373] block">
                        Official Business Address
                      </span>
                      <p className="text-sm font-bold text-white">Trading Pathshala</p>
                      <p className="text-xs text-[#D4D4D4]">3rd Floor, Mahadev Inn,</p>
                      <p className="text-xs text-[#D4D4D4]">Jalsar Road, Shivganga Muhalla,</p>
                      <p className="text-xs font-mono text-[#C5A34A]">Deoghar, Jharkhand – 814112, India.</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#222222] flex items-center justify-between">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Trading+Pathshala,+3rd+Floor,+Mahadev+Inn,+Jalsar+Road,+Shivganga+Muhalla,+Deoghar,+Jharkhand+814112,+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#C5A34A] hover:text-[#E2C878] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 fill-current" />
                      <span>Get Directions on Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="bg-[#121212] border border-[#222222] rounded p-4 text-[11px] text-[#A0A0A0] space-y-1">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#C5A34A]" />
                <span>Verified Direct Channels</span>
              </div>
              <p className="leading-relaxed">
                We strictly communicate through official mobile and WhatsApp numbers verified above. No unverified email addresses or third-party telemarketers.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 w-full min-w-0">
            <div className="bg-[#121212] border border-[#222222] rounded-lg p-5 sm:p-8 lg:p-10 shadow-xl w-full">
              {submittedSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-[#C5A34A]/20 border border-[#C5A34A]/30 rounded-full flex items-center justify-center text-[#C5A34A] mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    Enquiry Logged Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Prashant Kumar Sinha or our academic desk will contact you via phone or WhatsApp shortly.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <a
                      href="https://wa.me/918987599799"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] rounded"
                    >
                      Connect on WhatsApp Now
                    </a>
                    <button
                      onClick={() => setSubmittedSuccess(false)}
                      className="px-4 py-2.5 text-xs font-medium text-white bg-[#1A1A1A] border border-[#333333] rounded"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                      Send an Admission Enquiry
                    </h3>
                    <p className="text-xs text-[#737373] mt-1 font-mono">
                      Directly reviewed by Prashant Kumar Sinha
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className={`w-full bg-[#090909] border rounded px-4 py-3 text-xs sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-[#262626] focus:border-[#C5A34A]'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.name}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1.5">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-[#090909] border rounded px-4 py-3 text-xs sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                          errors.phone ? 'border-rose-500' : 'border-[#262626] focus:border-[#C5A34A]'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.phone}</span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1.5">
                        Program of Interest
                      </label>
                      <select
                        value={formData.courseName}
                        onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                        className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-3 text-xs sm:text-sm text-white focus:outline-none"
                      >
                        {availableCourses.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                        <option value="General Consultation">General Consultation / Unsure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1.5">
                        Your Query / Learning Goals *
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your current trading experience or questions regarding cohort schedules..."
                        className={`w-full bg-[#090909] border rounded px-4 py-3 text-xs sm:text-sm text-white placeholder-[#555555] focus:outline-none transition-colors ${
                          errors.message ? 'border-rose-500' : 'border-[#262626] focus:border-[#C5A34A]'
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">{errors.message}</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-[#090909] bg-gradient-to-r from-[#C5A34A] to-[#E2C878] hover:brightness-110 disabled:opacity-50 rounded transition-all shadow-md shadow-[#C5A34A]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Enquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Admission Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
