import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleBusinessProfileSection } from '../components/GoogleBusinessProfileSection';
import { ArrowRight } from 'lucide-react';

// Owner profile photo path — update this path or replace the image file in /public/assets/aistudio/ to swap the photo later
const OWNER_PHOTO_URL = `${import.meta.env.BASE_URL}assets/aistudio/IMG-20261113-WA0003_5055527e.jpg`;

interface AboutPageProps {
  onOpenEnquiry: (courseName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="w-full bg-[#FCFBF7] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
            About Trading Pathshala
          </h1>
          <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
            Empowering students, retail traders, and aspiring market professionals with practical stock market education, rigorous risk control, and authentic market knowledge.
          </p>
        </div>

        {/* Our Mission */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
            Our Mission: <span className="text-[#916E16]">Learn • Practice • Grow</span>
          </h2>

          <div className="space-y-3.5 text-sm sm:text-base text-[#52525B] leading-relaxed">
            <p>
              <strong>Trading Pathshala</strong> was founded with a single uncompromising principle: to replace speculation and lagging indicator guesswork with structured, rule-based market education.
            </p>
            <p>
              Headquartered in <strong>Deoghar, Jharkhand</strong>, our institute offers classroom programs and online cohorts covering Indian equities, Nifty &amp; Bank Nifty options, swing trading, and global forex pairs—focused on Market Structure Shifts (MSS), Order Flow, Volume Profile, and disciplined capital protection.
            </p>
          </div>
        </section>

        {/* Clean Founder Profile */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Owner Photo & Profile Card */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-full bg-[#FCFBF7] rounded-2xl border border-[#E8E2D5] p-3 shadow-sm">
                <div className="overflow-hidden rounded-xl border border-[#D4AF37]/30 shadow-xs bg-[#121315]">
                  <img
                    src={OWNER_PHOTO_URL}
                    alt="Prashant Kumar Sinha - Founder & Chief Market Mentor, Trading Pathshala"
                    className="w-full aspect-square object-cover object-top block"
                  />
                </div>
                <div className="pt-3.5 pb-1 text-center space-y-0.5">
                  <div className="text-base sm:text-lg font-extrabold text-[#18181B]">
                    Prashant Kumar Sinha
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
                    Founder &amp; Chief Market Mentor
                  </div>
                </div>
              </div>
            </div>

            {/* Founder & Mentorship Details Alongside Photo */}
            <div className="md:col-span-7 lg:col-span-8 space-y-5">
              <div className="pb-5 border-b border-[#E8E2D5] space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
                  Founder &amp; Chief Market Mentor
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                  Prashant Kumar Sinha
                </h2>
                <p className="text-sm text-[#71717A]">
                  Market Practitioner • Derivatives Strategist • Institutional Price Action Educator
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Prashant Kumar Sinha mentors learners directly on reading live price action, institutional liquidity levels, options Greeks, and disciplined risk management—helping traders build consistent, independent execution habits without relying on tips or hype.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20would%20like%20to%20learn%20more%20about%20Trading%20Pathshala."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  Chat on WhatsApp
                </a>
                <button
                  onClick={() => onOpenEnquiry('Mentorship with Prashant Sir')}
                  className="bg-black hover:bg-neutral-900 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                >
                  Request Enquiry
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Find Trading Pathshala on Google (QR Code & Location Details) */}
        <GoogleBusinessProfileSection />

        {/* Final Contact / Enquiry CTA */}
        <section className="bg-black text-white p-6 sm:p-10 rounded-2xl border border-[#D4AF37]/40 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold max-w-xl mx-auto leading-snug">
            Take the First Step Towards Structured Market Competence
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/courses"
              className="bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <Link
              to="/contact"
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-[#D4AF37]/40 font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Contact Our Institute
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
