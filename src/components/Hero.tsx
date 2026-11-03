import React from 'react';
import { PageView } from '../types';
import heroTradingImg from '../assets/images/hero_trading_market_1793416378138.jpg';
import { ArrowRight, Mail } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: PageView) => void;
  onOpenEnquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-block bg-[#EBF3ED] text-[#174D32] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Stock Market & Trading Education
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Learn the Art of Trading.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Trading Pathshala provides structured education across technical analysis, index options, swing trading, and forex markets to build disciplined market competence.
            </p>

            {/* Two Action Buttons: Explore Courses and Contact Us */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('courses')}
                className="bg-[#174D32] hover:bg-[#113A26] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-[#75D68A]" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Contact Us</span>
              </button>
            </div>

            <div className="pt-2 text-xs text-gray-500">
              Official Email:{' '}
              <a href="mailto:support@tradingpathsala.in" className="text-[#174D32] font-semibold hover:underline">
                support@tradingpathsala.in
              </a>
            </div>
          </div>

          {/* Right: One Professional Trading-Related Image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <img
                src={heroTradingImg}
                alt="Professional Stock Market and Trading Workspace"
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
