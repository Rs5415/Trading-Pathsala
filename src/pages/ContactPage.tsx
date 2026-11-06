import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { submitEnquiry } from '../services/storage';
import { GoogleBusinessProfileSection } from '../components/GoogleBusinessProfileSection';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ContactPageProps {
  content: WebsiteContent;
  availableCourses: string[];
}

export const ContactPage: React.FC<ContactPageProps> = ({ content, availableCourses }) => {
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
    `Hello Prashant Sir, I would like to enquire about Trading Pathsala:\nName: ${formData.name || 'Learner'}\nPhone: ${formData.phone}\nCourse/Interest: ${formData.courseName}\nMessage: ${formData.message || 'Please provide upcoming batch details.'}`
  )}`;

  return (
    <div className="w-full bg-[#FCFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Connect &amp; Visit Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
            Have questions about upcoming batches, curriculum details, or visit timings? Connect directly with our team in Deoghar or message mentor Prashant Kumar Sinha.
          </p>
        </div>

        {/* Contact Information & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-6">
              <h2 className="text-2xl font-extrabold text-[#18181B]">
                Institute Contact Information
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5 text-[#C59B27]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#18181B]">Physical Campus</div>
                    <div className="text-xs sm:text-sm text-[#52525B] leading-relaxed pt-0.5">
                      3rd Floor, Mahadev Inn, Jalsar Road, Shivganga Muhalla,
                      <br />
                      Deoghar, Jharkhand – 814112, India.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center shrink-0 shadow-2xs">
                    <Phone className="w-5 h-5 text-[#C59B27]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#18181B]">Phone &amp; WhatsApp</div>
                    <div className="text-xs sm:text-sm text-[#52525B] pt-0.5">
                      <a href="tel:+918987599799" className="text-[#18181B] font-bold hover:underline">
                        +91 89875 99799
                      </a>
                    </div>
                    <div className="text-xs text-[#71717A] pt-0.5">
                      Calls &amp; WhatsApp available 9:00 AM – 7:00 PM IST
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail className="w-5 h-5 text-[#C59B27]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#18181B]">Official Support Email</div>
                    <div className="text-xs sm:text-sm pt-0.5">
                      <a
                        href="mailto:support@tradingpathsala.in"
                        className="text-[#916E16] font-semibold hover:underline"
                      >
                        support@tradingpathsala.in
                      </a>
                    </div>
                    <div className="text-xs text-[#71717A] pt-0.5">
                      Fast response within 24 hours
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5 text-[#C59B27]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#18181B]">Institute Operating Hours</div>
                    <div className="text-xs sm:text-sm text-[#52525B] pt-0.5">
                      Monday to Saturday: 9:00 AM – 7:00 PM IST
                    </div>
                    <div className="text-xs text-[#71717A] pt-0.5">
                      Sunday: Special live doubt &amp; Q&amp;A sessions only
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-[#E8E2D5]">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Chat Directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#18181B]">
                Send an Admission Enquiry
              </h2>
              <p className="text-sm text-[#52525B]">
                Fill out this quick form and our counseling team will get back to you with batch schedules and seat availability.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#FAF7F0] border border-[#E8E2D5] rounded-2xl text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#FAF2DE] text-[#916E16] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#18181B]">Enquiry Received!</h3>
                <p className="text-sm text-[#52525B] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. We have logged your enquiry for{' '}
                  <strong>{formData.courseName}</strong>. Our counselor will connect with you via phone/WhatsApp.
                </p>
                <div className="pt-2">
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
                    className="bg-black text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-neutral-900 cursor-pointer"
                  >
                    Send Another Message
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
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                      Course / Service of Interest *
                    </label>
                    <select
                      value={formData.courseName}
                      onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                    >
                      {availableCourses.map((cName, idx) => (
                        <option key={idx} value={cName}>
                          {cName}
                        </option>
                      ))}
                      <option value="General Admission Enquiry">General Admission Enquiry</option>
                      <option value="1-on-1 Mentorship Consultation">1-on-1 Mentorship Consultation</option>
                      <option value="Offline Classroom Batch Deoghar">Offline Classroom Batch Deoghar</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#27272A]">
                    Your Message / Current Trading Experience (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your background in trading and what you want to achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-sm py-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Submit Admission Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Location & GPS Map */}
        <GoogleBusinessProfileSection />
      </div>
    </div>
  );
};
