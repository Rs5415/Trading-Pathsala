import React from 'react';
import { Layers, Lightbulb, Compass, Library, Users, Calendar } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      number: '01',
      title: 'Structured Step-by-Step Learning',
      description: 'Progress from market definitions to price action and quantitative derivative spreads in logical phases without missing crucial foundations.',
    },
    {
      number: '02',
      title: 'Practical Market Mechanics',
      description: 'Understand real terminal order routing (MIS/CNC/SL-L), order book dynamics, and market depth rather than detached theoretical concepts.',
    },
    {
      number: '03',
      title: 'Beginner-Friendly Environment',
      description: 'No prior financial background required. Complex market terms are unpacked in clear, simple vernacular with structured case studies.',
    },
    {
      number: '04',
      title: 'Comprehensive Study Materials',
      description: 'Gain ongoing access to high-resolution candlestick cheat-sheets, position sizing calculators, and risk-management checklists.',
    },
    {
      number: '05',
      title: 'Mentorship Under Prashant Kumar Sinha',
      description: 'Direct instruction led by an experienced market practitioner focusing solely on pedagogy, process refinement, and trading psychology.',
    },
    {
      number: '06',
      title: 'Weekend & Flexible Learning Formats',
      description: 'Tailored for working professionals and university students with interactive weekend sessions and complete archival replay access.',
    },
  ];

  return (
    <section className="py-24 bg-[#090909] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
            <span>The Trading Pathshala Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
            Why Trading Pathshala?
          </h2>
          <p className="mt-3 text-[#A0A0A0] text-sm sm:text-base leading-relaxed font-light">
            We are dedicated to pure financial literacy. Here is how our educational methodology provides clarity and discipline in an industry often filled with noise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => (
            <div
              key={feat.number}
              className="bg-[#121212] border border-[#222222] hover:border-[#C5A34A]/40 rounded-lg p-8 transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1C1C1C] pb-3">
                  <span className="font-mono text-xs font-bold text-[#C5A34A]">
                    FEATURE {feat.number}
                  </span>
                  <span className="text-[10px] font-mono text-[#737373] uppercase">
                    Core Standard
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#E2C878] transition-colors leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] text-[#737373] font-mono">
                <span>Verified Education</span>
                <span className="text-[#C5A34A]">Learn the Art</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
