import React from 'react';
import { Layers, Globe2, BarChart3, Users, CheckCircle2 } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      title: 'Structured Trading Education',
      icon: Layers,
      description:
        'Step-by-step modular curriculum developed to transition students progressively from raw chart basics to advanced institutional execution.',
      points: [
        'Organized modules from foundational to advanced',
        'Systematic risk-to-reward frameworks',
        'Clear rules for entry, stop-loss, and exit',
      ],
    },
    {
      title: 'Multiple Market Learning',
      icon: Globe2,
      description:
        'Breadth of exposure across diverse financial instruments so learners can find and specialize in the domain matching their temperament.',
      points: [
        'Indian Equities, Nifty & Bank Nifty Options',
        'Global Foreign Exchange (Forex) pairs',
        'Cryptocurrency & digital asset market mechanics',
      ],
    },
    {
      title: 'Practical Market Concepts',
      icon: BarChart3,
      description:
        'Emphasis on modern, actionable market dynamics rather than obsolete lagging indicators or speculative guesswork.',
      points: [
        'Market Structure Shift (MSS) and liquidity sweeps',
        'Volume Profile (POC, Value Area High & Low)',
        'Order Flow imbalances and buyer-seller exhaustion',
      ],
    },
    {
      title: 'Student Learning Support',
      icon: Users,
      description:
        'Continuous educational guidance and interactive doubt resolution directly with instructor Prashant Kumar Sinha throughout your learning pathway.',
      points: [
        'Direct instructor accessibility for concept clarifications',
        'Batch Q&A sessions and case-study reviews',
        'Constructive feedback on trading journal discipline',
      ],
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white border-b border-[#E3EBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E7F0E9] text-[#174D32] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            Why Trading Pathsala
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202923] tracking-tight">
            Built on Rigorous Education & Integrity
          </h2>
          <p className="text-base sm:text-lg text-[#68736B] leading-relaxed">
            Our educational approach centers on four core pillars engineered to help you develop independent analysis and genuine market competence.
          </p>
        </div>

        {/* The 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-[#F4F7F4] hover:bg-white p-7 sm:p-8 rounded-2xl border border-[#E3EBE4] hover:border-[#174D32]/30 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#EAF3EC] border border-[#E3EBE4] flex items-center justify-center text-[#174D32] shadow-2xs transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-[#202923] group-hover:text-[#174D32] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-[#68736B] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 pt-2 border-t border-[#E3EBE4]">
                  {feat.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#202923]">
                      <CheckCircle2 className="w-4 h-4 text-[#75D68A] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
