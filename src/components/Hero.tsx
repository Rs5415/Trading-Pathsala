import React from 'react';
import { ArrowRight, Phone, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PageView } from '../types';

interface HeroProps {
  onNavigate: (view: PageView) => void;
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenEnquiry }) => {
  const tickerItems = [
    { name: 'NIFTY 50', val: '24,312.45', change: '+142.10 (+0.59%)', positive: true },
    { name: 'BANK NIFTY', val: '51,884.20', change: '+288.75 (+0.56%)', positive: true },
    { name: 'SENSEX', val: '80,126.80', change: '+498.30 (+0.63%)', positive: true },
    { name: 'INDIA VIX', val: '13.42', change: '-0.38 (-2.75%)', positive: false },
    { name: 'CRUDE OIL', val: '6,145.00', change: '+24.00 (+0.39%)', positive: true },
  ];

  return (
    <section className="relative overflow-hidden pt-4 sm:pt-6 pb-16 sm:pb-20 lg:pt-10 lg:pb-28 bg-[#090909] border-b border-[#222222] w-full max-w-full">
      {/* Subtle gold radial ambient illumination */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(197,163,74,0.08),rgba(9,9,9,0))] pointer-events-none" />

      {/* Market Watch Ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 w-full max-w-full min-w-0">
        <div className="bg-[#121212] border border-[#222222] rounded-lg p-2 sm:px-4 sm:py-2.5 flex items-center gap-3 sm:gap-6 text-xs text-[#A0A0A0] w-full max-w-full min-w-0 overflow-hidden">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 bg-[#171717] sm:bg-transparent px-2.5 py-1 sm:p-0 rounded border border-[#262626] sm:border-0">
            <span className="w-2 h-2 rounded-full bg-[#C5A34A] animate-pulse" />
            <span className="font-semibold text-white tracking-wider uppercase text-[10px] sm:text-[11px] whitespace-nowrap">
              Market Watch
            </span>
            <span className="text-[#333333] hidden sm:inline">|</span>
          </div>

          {/* Horizontally scrollable index strip */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none font-mono text-[12px] sm:text-[13px] tabular-nums min-w-0 flex-1 touch-pan-x py-1">
            {tickerItems.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap">
                <span className="text-[#A0A0A0] font-sans text-[11px] sm:text-xs">{item.name}</span>
                <span className="text-white font-medium">{item.val}</span>
                <span className={item.positive ? 'text-[#C5A34A]' : 'text-rose-400'}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>

          <span className="hidden xl:inline text-[11px] text-[#737373] shrink-0 whitespace-nowrap">
            Educational Reference Quotes
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Heading and Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 min-w-0">
            {/* Official Kicker */}
            <div className="inline-flex flex-wrap items-center gap-2 border-b border-[#C5A34A]/40 pb-1 text-[11px] sm:text-xs font-semibold tracking-widest text-[#C5A34A] uppercase">
              <span>Official Financial Education</span>
              <span className="text-[#404040]">/</span>
              <span>Mentor: Prashant Kumar Sinha</span>
            </div>

            {/* Official Heading */}
            <h1 className="text-2xl sm:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.15] sm:leading-[1.1] uppercase break-words">
              LEARN THE ART <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A34A] via-[#E2C878] to-[#C5A34A]">
                OF TRADING
              </span>
            </h1>

            {/* Official Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-[#A0A0A0] leading-relaxed max-w-2xl font-light">
              Explore financial markets through structured trading education, market knowledge and practical learning resources.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 text-xs sm:text-sm text-[#E5E5E5]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A34A] shrink-0" />
                <span>Structured Price Action & Market Structure</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A34A] shrink-0" />
                <span>Strict Capital Protection & 1% Risk Rule</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A34A] shrink-0" />
                <span>No Advisory or Speculative Calls</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A34A] shrink-0" />
                <span>Practical Live Terminal Understanding</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-3">
              <button
                onClick={() => onNavigate('courses')}
                className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#090909] bg-gradient-to-r from-[#C5A34A] to-[#E2C878] hover:brightness-110 rounded transition-all duration-150 shadow-lg shadow-[#C5A34A]/25 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#171717] hover:bg-[#222222] border border-[#333333] hover:border-[#C5A34A]/60 rounded transition-colors cursor-pointer text-center"
              >
                Contact Us
              </button>

              <a
                href="https://wa.me/918987599799"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 text-xs sm:text-sm font-semibold text-[#C5A34A] hover:text-[#E2C878] transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#C5A34A]/20 sm:border-0 rounded"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick WhatsApp</span>
              </a>
            </div>

            {/* Direct Official Contact line */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-[#737373]">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A34A]" />
                <span>Direct Line: <a href="tel:+918987599799" className="text-white hover:text-[#C5A34A] font-mono">+91 89875 99799</a></span>
              </div>
              <span className="hidden sm:inline text-[#333333]">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A34A]" />
                <span>Pure Educational Institution</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual featuring Official Brand Symbol & Trading Desk */}
          <div className="lg:col-span-5 relative w-full min-w-0">
            <div className="relative rounded-xl overflow-hidden border border-[#262626] bg-[#121212] shadow-2xl w-full">
              {/* Image asset */}
              <img
                src={`${import.meta.env.BASE_URL}assets/images/hero_trading_market_1793416378138.jpg`}
                alt="Trading Pathshala professional multi-display market terminal"
                className="w-full h-[280px] sm:h-[420px] lg:h-[460px] object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-transparent" />

              {/* Official Logo Watermark Card Overlay */}
              <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 bg-[#090909]/95 backdrop-blur-md border border-[#C5A34A]/30 rounded-lg p-2.5 sm:p-3.5 flex items-center justify-between gap-2 sm:gap-3 shadow-xl">
                <img
                  src="/trading_pathshala_official_logo.png"
                  alt="Trading Pathshala Official Logo"
                  className="h-7 sm:h-9 w-auto object-contain max-w-[160px] sm:max-w-none"
                />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#C5A34A] bg-[#C5A34A]/10 px-2 py-0.5 sm:py-1 rounded border border-[#C5A34A]/20 shrink-0">
                  Est. Brand
                </span>
              </div>

              {/* Bottom Feature Card */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#121212]/95 backdrop-blur-md border border-[#262626] rounded-lg p-3 sm:p-4 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white uppercase tracking-wider text-[10px] sm:text-[11px]">
                    Curriculum Framework
                  </span>
                  <span className="text-[#C5A34A] font-mono text-[10px] sm:text-[11px] font-semibold">
                    1:2+ R:R Focus
                  </span>
                </div>
                <p className="text-[#A0A0A0] text-[11px] sm:text-[12px] leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Learn to analyze equity market structure, demand-supply imbalance, and derivatives flow with structured discipline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
