import React from 'react';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { Shield, BookOpen, MapPin, Phone, Mail, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FCFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-block bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              About Trading Pathshala
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight leading-tight">
              Practical Stock Market Education & Trading Knowledge
            </h2>

            <div className="space-y-4 text-base text-[#52525B] leading-relaxed">
              <p>
                <strong>Trading Pathshala</strong> is a professional educational platform established to provide practical stock market education, thorough technical analysis training, and genuine trading knowledge. Guided by our tagline—<em>Learn • Practice • Grow</em>—we empower aspiring traders and students to navigate financial markets with discipline and competence.
              </p>
              <p>
                Based in Deoghar, Jharkhand, our institute focuses on demystifying equities, index options, swing trading, and forex markets. Under the educational leadership of <strong>Prashant Kumar Sinha</strong>, our structured curriculum emphasizes price action, order flow, volume profile, market structure shifts, and strict risk management.
              </p>
              <p>
                We believe in transparent education, zero exaggerated profit claims, and building real analytical skills so learners can develop independent trading strategies.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E8E2D5] shadow-xs flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#916E16] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#18181B]">Disciplined Risk Control</div>
                  <div className="text-xs text-[#71717A]">Strict capital protection rules from day one.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E2D5] shadow-xs flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#916E16] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#18181B]">Structured Curriculum</div>
                  <div className="text-xs text-[#71717A]">Step-by-step modular lessons for clear learning.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Logo & Institute Info Box */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] text-center space-y-6 shadow-sm">
              <div className="bg-[#0B0B0C] p-4 sm:p-5 rounded-xl border border-[#D4AF37]/50 inline-block shadow-md">
                <img
                  src={officialLogo}
                  alt="Trading Pathsala"
                  className="h-20 sm:h-24 mx-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-lg font-bold text-[#18181B]">Trading Pathshala</div>
                <div className="text-xs text-[#C59B27] font-extrabold uppercase tracking-widest">
                  Learn • Practice • Grow
                </div>
              </div>

              <div className="space-y-3 text-left text-xs sm:text-sm text-[#52525B] pt-2 border-t border-[#E8E2D5]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#916E16] shrink-0 mt-0.5" />
                  <span>3rd Floor, Mahadev Inn, Jalsar Road, Shivganga Muhalla, Deoghar, Jharkhand – 814112, India.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#916E16] shrink-0" />
                  <a href="mailto:support@tradingpathsala.in" className="text-[#916E16] font-semibold underline">
                    support@tradingpathsala.in
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#916E16] shrink-0" />
                  <a href="tel:+918987599799" className="text-[#18181B] font-bold">
                    +91 89875 99799
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
