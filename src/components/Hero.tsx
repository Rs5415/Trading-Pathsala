import React from 'react';
import { Link } from 'react-router-dom';
import heroTradingImg from '../assets/images/hero_trading_market_1793416378138.jpg';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onNavigate?: (view: any) => void;
  onOpenEnquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="bg-gradient-to-b from-[#FCFBF7] via-[#FFFDF9] to-[#F8F5EE] py-16 sm:py-20 md:py-24 border-b border-[#E8E2D5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Learn • Practice • Grow</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#18181B] tracking-tight leading-tight">
                Trading Pathshala
              </h1>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#C59B27] tracking-tight">
                Learn • Practice • Grow
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
              Your complete platform to learn stock market trading with simple lessons, expert guidance and practical learning resources.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-[#27272A] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Multi-Market Technical Analysis & MSS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Index Options & Advanced Option Selling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Order Flow & Volume Profile Concepts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Forex & Systematic Swing Trading</span>
              </div>
            </div>

            {/* Action Buttons: Start Learning & Explore Courses */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <Link
                to="/courses"
                className="bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-base px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/courses"
                className="bg-black hover:bg-neutral-900 text-white border border-[#E5B83A]/40 font-bold text-base px-7 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Explore Courses</span>
              </Link>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#71717A]">
              <span>📍 Deoghar, Jharkhand</span>
              <span>•</span>
              <a href="mailto:support@tradingpathsala.in" className="text-[#916E16] font-semibold hover:underline">
                support@tradingpathsala.in
              </a>
              <span>•</span>
              <a href="tel:+918987599799" className="text-[#18181B] font-bold">
                +91 89875 99799
              </a>
            </div>
          </div>

          {/* Right Visual: Golden Bull & Laptop Trading Chart Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#D4AF37]/30 via-[#E5B83A]/20 to-transparent rounded-3xl blur-md opacity-70" />
            
            <div className="relative bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xl p-2.5 space-y-2.5">
              {/* Laptop Trading Workstation Image */}
              <div className="rounded-xl overflow-hidden relative">
                <img
                  src={heroTradingImg}
                  alt="Trading Pathshala Chart Analysis Workstation"
                  className="w-full h-60 sm:h-72 md:h-80 object-cover"
                  loading="eager"
                />

                {/* Golden Bull Official Logo Badge Overlay */}
                <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-md p-1.5 px-3 rounded-xl border border-[#E5B83A]/50 shadow-md flex items-center gap-2">
                  <img
                    src={officialLogo}
                    alt="Trading Pathsala Logo"
                    className="h-9 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#E8E2D5] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black text-[#E5B83A] flex items-center justify-center font-bold shadow-xs">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#916E16]">
                      Comprehensive Learning
                    </div>
                    <div className="text-sm font-extrabold text-[#18181B]">
                      6 Professional Programs
                    </div>
                  </div>
                </div>

                <div className="bg-[#E5B83A] text-black text-xs font-black px-3 py-1.5 rounded-lg shadow-2xs">
                  Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
