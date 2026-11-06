import React from 'react';
import { Link } from 'react-router-dom';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { GoogleBusinessProfileSection } from '../components/GoogleBusinessProfileSection';
import {
  ShieldCheck,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  onOpenEnquiry: (courseName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="w-full bg-[#FCFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Breadcrumb / Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Institute Story &amp; Leadership</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
            About Trading Pathshala
          </h1>
          <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
            Empowering students, retail traders, and aspiring market professionals with practical stock market education, rigorous risk control, and authentic market knowledge.
          </p>
        </div>

        {/* Institute Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D5] shadow-xs">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
              Our Mission: Learn • Practice • Grow
            </h2>

            <div className="space-y-4 text-base text-[#52525B] leading-relaxed">
              <p>
                <strong>Trading Pathshala</strong> was founded with a single uncompromising principle: to eradicate the noise, speculation, and lagging indicator traps that cause 90% of retail traders to lose capital.
              </p>
              <p>
                Headquartered at <strong>Mahadev Inn, Jalsar Road, Deoghar, Jharkhand</strong>, our institute provides structured classroom courses and online cohorts covering Indian equities, Nifty &amp; Bank Nifty options, swing trading, and global forex pairs.
              </p>
              <p>
                We do not sell speculative tips, fake screenshots, or get-rich-quick shortcuts. Instead, we teach market mechanics: <em>Market Structure Shift (MSS)</em>, <em>Order Flow imbalances</em>, <em>Volume Profile Value Areas</em>, and <em>calculable probability frameworks</em>.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#916E16] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#18181B]">Capital Protection First</div>
                  <div className="text-xs text-[#71717A]">Strict risk parameters before executing any position.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5] flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#916E16] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#18181B]">Modular Learning Path</div>
                  <div className="text-xs text-[#71717A]">Progression from candle basics to institutional order flow.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-[#FAF7F0] rounded-2xl p-6 sm:p-8 border border-[#E8E2D5] text-center space-y-6 shadow-xs">
              <div className="bg-[#0B0B0C] p-4 sm:p-5 rounded-xl border border-[#D4AF37]/50 inline-block shadow-md">
                <img
                  src={officialLogo}
                  alt="Trading Pathsala"
                  className="h-20 sm:h-24 mx-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-xl font-extrabold text-[#18181B]">Trading Pathshala</div>
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

        {/* Lead Mentor Spotlight */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E2D5]">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
                Founder &amp; Chief Market Mentor
              </div>
              <h2 className="text-3xl font-extrabold text-[#18181B]">
                Prashant Kumar Sinha
              </h2>
              <p className="text-sm text-[#71717A]">
                Market Practitioner • Derivatives Strategist • Institutional Price Action Educator
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20would%20like%20to%20learn%20more%20about%20Trading%20Pathshala."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                Chat on WhatsApp
              </a>
              <button
                onClick={() => onOpenEnquiry('Mentorship with Prashant Sir')}
                className="bg-black hover:bg-neutral-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                Request Mentorship
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2DE] text-[#916E16] flex items-center justify-center font-bold">
                <Target className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="text-base font-bold text-[#18181B]">Practical Price Action</h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Prashant Sir trains learners to read live candlesticks, key order block levels, and volume exhaustion rather than cluttering charts with lagging RSI or MACD crossovers.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2DE] text-[#916E16] flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="text-base font-bold text-[#18181B]">Options &amp; Greek Mechanics</h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Demystifying Delta, Gamma, Theta decay, and Implied Volatility (IV) spikes so students understand the exact math behind option buying explosions and option selling edge.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2DE] text-[#916E16] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5 text-[#C59B27]" />
              </div>
              <h3 className="text-base font-bold text-[#18181B]">Psychological Conditioning</h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                90% of trading performance is mental. Prashant Sir provides personalized trade journal audits to eliminate FOMO, revenge trading, and over-leveraging.
              </p>
            </div>
          </div>
        </div>

        {/* Google Business Profile & Campus Location */}
        <GoogleBusinessProfileSection />

        {/* CTA Strip */}
        <div className="bg-black text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/40 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Ready to Begin?
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold max-w-xl mx-auto leading-snug">
            Take the First Step Towards Structured Market Competence
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/courses"
              className="bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-sm px-7 py-3.5 rounded-xl transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <span>Explore All Courses</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <Link
              to="/contact"
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-[#D4AF37]/40 font-bold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer"
            >
              Contact Our Institute
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
