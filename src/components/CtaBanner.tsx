import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onNavigate?: (view: any) => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = () => {
  return (
    <section className="bg-black text-white py-14 sm:py-16 border-t border-[#B99B52]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#B99B52]/20 text-[#B99B52] border border-[#B99B52]/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#B99B52]" />
          <span>Trading Pathshala Institute</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto leading-snug">
          "Start Learning Today and Take Your Trading Skills to the Next Level!"
        </h2>

        <div className="pt-2">
          <Link
            to="/courses"
            className="bg-[#B99B52] hover:bg-[#A3843F] text-black font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-105"
          >
            <span>Join Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
