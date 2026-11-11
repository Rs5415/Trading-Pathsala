import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BarChart2,
  FileCheck,
  Building,
  Shield,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

interface ServicesPageProps {
  onOpenEnquiry: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenEnquiry }) => {
  const services = [
    {
      id: 'mentorship',
      title: 'Structured 1-on-1 Trading Mentorship',
      icon: Users,
      badge: 'Flagship',
      tagline: 'Personalized guidance tailored to your schedule and trading style.',
      description:
        'Work directly with Prashant Kumar Sinha to construct a personalized trading methodology. From chart reading fundamentals to advanced execution, we eliminate bad habits and establish mechanical discipline.',
      deliverables: [
        'Weekly one-on-one review sessions',
        'Direct chart critique and setup validation',
        'Custom risk-to-reward parameters for your capital',
        'Unrestricted doubt clearance on WhatsApp',
      ],
    },
    {
      id: 'pre-market',
      title: 'Daily Pre-Market & Live Analysis Briefs',
      icon: BarChart2,
      badge: 'Live Market',
      tagline: 'Actionable institutional market structure levels every trading morning.',
      description:
        'Start every trading day prepared. Receive key Market Structure Shift (MSS) zones, Volume Profile Point of Control (POC), Value Area High/Low, and liquidity sweep trigger points before 9:15 AM IST.',
      deliverables: [
        'Nifty 50 and Bank Nifty morning levels',
        'Key institutional order block markings',
        'Mid-day trend adjustments and fakeout warnings',
        'Post-market execution review and takeaways',
      ],
    },
    {
      id: 'journal-audit',
      title: 'Trading Journal & Risk Profile Audit',
      icon: FileCheck,
      badge: 'Performance',
      tagline: 'Scientific diagnosis of your trading stats to plug capital leaks.',
      description:
        'Bring your last 30 to 90 days of trade logs. We analyze your win-rate, average risk-to-reward ratio, slippage, trade duration, and psychological revenge-trading triggers to systematically raise your expectancy.',
      deliverables: [
        'Granular trade-by-trade breakdown',
        'Calculation of true profit factor and expectancy',
        'Identification of emotional tilt patterns',
        'Actionable written restructuring plan',
      ],
    },
    {
      id: 'classroom',
      title: 'Offline Physical Desk Training in Deoghar',
      icon: Building,
      badge: 'In-Person',
      tagline: 'Face-to-face classroom learning at our campus in Mahadev Inn.',
      description:
        'Immerse yourself in our dedicated trading facility in Deoghar, Jharkhand. Interact directly with mentors, observe real-time chart analysis on multi-monitor setups, and experience structured peer collaboration.',
      deliverables: [
        'Comfortable air-conditioned classroom facility',
        'Hands-on live charting sessions with fellow traders',
        'Immediate real-time instructor doubt resolution',
        'Access to physical institute study material',
      ],
    },
    {
      id: 'hedging',
      title: 'Advanced Options Hedging & Wealth Structuring',
      icon: Shield,
      badge: 'Institutions',
      tagline: 'Delta-neutral and theta-decay strategies for sustainable capital growth.',
      description:
        'Tailored for HNIs, business owners, and serious capital allocators looking for disciplined 2% to 4% monthly risk-managed returns rather than reckless high-stakes directional gambling.',
      deliverables: [
        'Iron condors, jade lizards, and calendar spreads',
        'VIX spike defensive management and rolling rules',
        'Portfolio beta hedging against market crashes',
        'Tax-efficient derivative positioning insights',
      ],
    },
    {
      id: 'community',
      title: 'Alumni Trading Community & Floor Access',
      icon: MessageSquare,
      badge: 'Lifetime',
      tagline: 'Surround yourself with disciplined, growth-oriented traders.',
      description:
        'Trading can be isolating. Our alumni network provides a respectful, spam-free space where members share institutional trade ideas, verify MSS breakouts, and hold each other accountable to risk rules.',
      deliverables: [
        'Private Discord / Telegram student forum',
        'Weekly weekend Zoom case-study sessions',
        'Guest sessions with veteran alumni traders',
        'Strict zero-tip, education-first community rules',
      ],
    },
  ];

  return (
    <div className="w-full bg-[#FCFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Professional Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
            Our Mentorship &amp; Trading Services
          </h1>
          <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
            Beyond structured courses, Trading Pathshala offers dedicated mentorship, live market briefings, portfolio audits, and in-person desk training.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-white rounded-3xl p-7 border border-[#E8E2D5] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-[#C59B27]" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-black text-[#F5D061]">
                      {svc.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-[#18181B] group-hover:text-[#916E16] transition-colors leading-snug">
                      {svc.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#C59B27]">
                      {svc.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="pt-2 border-t border-[#E8E2D5] space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#916E16]">
                      What's Included:
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#27272A]">
                      {svc.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E2D5]">
                  <button
                    onClick={() => onOpenEnquiry(`Service: ${svc.title}`)}
                    className="w-full bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#18181B] hover:text-[#916E16] border border-[#E8E2D5] font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:border-[#C59B27]/50"
                  >
                    <span>Enquire About This Service</span>
                    <ArrowRight className="w-4 h-4 text-[#C59B27]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix: Self Study vs Trading Pathshala */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
              Why Dedicated Mentorship Matters
            </h3>
            <p className="text-sm text-[#52525B]">
              Compare random internet YouTube tutorials against structured mentorship at Trading Pathshala.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[#E8E2D5] text-[#71717A] text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Feature / Aspect</th>
                  <th className="py-3 px-4 text-red-600">Unstructured Self-Study</th>
                  <th className="py-3 px-4 text-[#916E16] font-bold">Trading Pathshala Mentorship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D5] text-xs sm:text-sm text-[#27272A]">
                <tr>
                  <td className="py-3.5 px-4 font-bold">Chart Analysis Logic</td>
                  <td className="py-3.5 px-4 text-[#71717A]">Lagging indicators (RSI, MACD, Stochastics)</td>
                  <td className="py-3.5 px-4 font-bold text-[#18181B]">Institutional Order Flow &amp; MSS Price Action</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold">Risk Management</td>
                  <td className="py-3.5 px-4 text-[#71717A]">Emotional sizing, hoping and holding losses</td>
                  <td className="py-3.5 px-4 font-bold text-[#18181B]">Strict 1:2+ R:R, predefined stop-loss rules</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold">Doubt Clarification</td>
                  <td className="py-3.5 px-4 text-[#71717A]">Comment section guesswork or ignored messages</td>
                  <td className="py-3.5 px-4 font-bold text-[#18181B]">Direct WhatsApp &amp; In-Person with Prashant Sir</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold">Live Market Readiness</td>
                  <td className="py-3.5 px-4 text-[#71717A]">Overwhelmed by morning volatility</td>
                  <td className="py-3.5 px-4 font-bold text-[#18181B]">Pre-Market Levels, Volume Profile &amp; POC plans</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#FAF7F0] p-8 sm:p-12 rounded-3xl border border-[#E8E2D5] text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FAF2DE] text-[#916E16] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Custom Consultation
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] max-w-xl mx-auto">
            Need a Customized Learning or Advisory Plan?
          </h2>
          <p className="text-sm text-[#52525B] max-w-lg mx-auto">
            Connect with our counseling desk to evaluate your current trading experience and match you with the right program.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry('Customized Mentorship Consultation')}
              className="bg-black hover:bg-neutral-900 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
            >
              <span>Book Educational Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#F5D061]" />
            </button>
            <a
              href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20would%20like%20to%20know%20more%20about%20Trading%20Pathshala%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              WhatsApp Us Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
