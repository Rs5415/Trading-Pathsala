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
    `Hello, I would like to enquire about Trading Pathsala courses.\nName: ${formData.name || 'Learner'}\nPhone: ${formData.phone}\nCourse: ${formData.courseName}\nMessage: ${formData.message || 'Please provide upcoming batch details.'}`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#174D32]">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Contact Us
          </h2>
          <p className="text-base text-gray-600">
            Reach out directly for admissions, course queries, or schedule consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Details Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Contact Details</h3>

            <div className="space-y-5 text-sm">
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gray-50 text-[#174D32] border border-gray-200 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">Official Email</div>
                  <a
                    href="mailto:support@tradingpathsala.in"
                    className="font-bold text-gray-900 hover:text-[#174D32] hover:underline break-all"
                  >
                    support@tradingpathsala.in
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gray-50 text-[#174D32] border border-gray-200 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">Phone Number</div>
                  <a
                    href="tel:+918987599799"
                    className="font-bold text-gray-900 hover:text-[#174D32] hover:underline"
                  >
                    +91 89875 99799
                  </a>
                  <div className="text-xs text-gray-500">Contact: Prashant Kumar Sinha</div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">WhatsApp</div>
                  <a
                    href="https://wa.me/918987599799"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-gray-900 hover:text-[#174D32] hover:underline"
                  >
                    +91 89875 99799
                  </a>
                  <div className="text-xs text-gray-500">Direct WhatsApp desk support</div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 pt-2 border-t border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gray-50 text-[#174D32] border border-gray-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">Institute Address</div>
                  <div className="text-gray-800 leading-relaxed font-medium">
                    Trading Pathshala, 3rd Floor, Mahadev Inn,
                    <br />
                    Jalsar Road, Shivganga Muhalla,
                    <br />
                    Deoghar, Jharkhand – 814112, India.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Simple Clean Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Admission Enquiry</h3>
            <p className="text-sm text-gray-600 mb-6">
              Send us your course enquiry and we will get back to you promptly.
            </p>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EBF3ED] text-[#174D32] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Enquiry Submitted!</h4>
                <p className="text-sm text-gray-600">
                  Thank you, {formData.name}. We have recorded your interest in{' '}
                  <strong>{formData.courseName}</strong>.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Chat on WhatsApp</span>
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
                    className="text-xs text-gray-500 hover:text-gray-900 underline cursor-pointer"
                  >
                    Submit Another Query
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-hidden focus:border-[#174D32] focus:ring-1 focus:ring-[#174D32]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-hidden focus:border-[#174D32] focus:ring-1 focus:ring-[#174D32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-hidden focus:border-[#174D32] focus:ring-1 focus:ring-[#174D32]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                      Course Interested In *
                    </label>
                    <select
                      value={formData.courseName}
                      onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-hidden focus:border-[#174D32] focus:ring-1 focus:ring-[#174D32] bg-white"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message or questions here..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-hidden focus:border-[#174D32] focus:ring-1 focus:ring-[#174D32]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="bg-[#174D32] hover:bg-[#113A26] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Send className="w-4 h-4 text-[#75D68A]" />
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
