import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ServicesPageProps {
  onOpenEnquiry: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenEnquiry }) => {
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
