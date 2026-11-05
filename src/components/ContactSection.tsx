import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { submitEnquiry } from '../services/storage';
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  content: WebsiteContent;
  availableCourses: string[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({ content, availableCourses }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    courseName: availableCourses[0] || 'Index Option Buying',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name, phone number, and email.');
      return;
    }

    submitEnquiry({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      courseName: formData.courseName,
      message: formData.message.trim(),
    });

    setSubmitted(true);
    setErrorMsg(null);
  };

  const whatsappLink = `https://wa.me/918987599799?text=${encodeURIComponent(
    `Hello Prashant Sir, I would like to enquire about Trading Pathsala courses.\nName: ${formData.name || 'Learner'}\nPhone: ${formData.phone}\nCourse: ${formData.courseName}\nMessage: ${formData.message || 'Please provide upcoming batch details.'}`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-block bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Contact & Enquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight">
            Get in Touch With Us
          </h2>
          <p className="text-base text-[#52525B]">
            Reach out to our institute in Deoghar or send an admission enquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Contact Information Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#18181B]">Institute Contact Info</h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center shrink-0 shadow-2xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#71717A] uppercase">Official Email</div>
                  <a
                    href="mailto:support@tradingpathsala.in"
                    className="font-bold text-[#18181B] hover:text-[#916E16] hover:underline break-all"
                  >
                    support@tradingpathsala.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#71717A] uppercase">Phone / WhatsApp</div>
                  <a
                    href="tel:+918987599799"
                    className="font-bold text-[#18181B] hover:text-[#916E16] hover:underline"
                  >
                    +91 89875 99799
                  </a>
                  <div className="text-xs text-[#71717A]">Contact Person: Prashant Kumar Sinha</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#71717A] uppercase">WhatsApp Desk</div>
                  <a
                    href="https://wa.me/918987599799"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#18181B] hover:text-[#916E16] hover:underline"
                  >
                    +91 89875 99799
                  </a>
                  <div className="text-xs text-[#71717A]">Direct chat support</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-[#E8E2D5]">
                <div className="w-10 h-10 rounded-xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#71717A] uppercase">Business Address</div>
                  <div className="text-[#27272A] leading-relaxed font-medium">
                    Trading Pathshala
                    <br />
                    3rd Floor, Mahadev Inn, Jalsar Road, Shivganga Muhalla,
                    <br />
                    Deoghar, Jharkhand – 814112, India.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs">
            <h3 className="text-xl font-bold text-[#18181B] mb-2">Send an Enquiry</h3>
            <p className="text-sm text-[#52525B] mb-6">
              Fill in your details below and we will contact you regarding admissions and batches.
            </p>

            {submitted ? (
              <div className="text-center py-8 space-y-4 bg-[#FAF7F0] p-6 rounded-2xl border border-[#E5B83A]/50">
                <div className="w-12 h-12 rounded-full bg-[#FAF2DE] text-[#916E16] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-[#18181B]">Enquiry Submitted Successfully!</h4>
                <p className="text-sm text-[#52525B]">
                  Thank you, {formData.name}. We have logged your enquiry for <strong>{formData.courseName}</strong>.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        courseName: availableCourses[0] || 'Index Option Buying',
                        message: '',
                      });
                    }}
                    className="text-xs text-[#71717A] hover:text-[#18181B] underline cursor-pointer py-2"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Course Interested In *
                    </label>
                    <select
                      value={formData.courseName}
                      onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    >
                      {availableCourses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message or questions here..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-sm px-7 py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Submit Enquiry</span>
                  </button>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
