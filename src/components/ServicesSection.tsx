import React from 'react';
import { EducationalService } from '../types';
import { INITIAL_SERVICES } from '../data/initialData';
import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ServicesSectionProps {
  onEnquire: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onEnquire }) => {
  const services: EducationalService[] = INITIAL_SERVICES;

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#090909] border-b border-[#222222] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
              <span>Confirmed Educational Offerings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              Our Educational Services
            </h2>
            <p className="mt-3 text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
              Trading Pathshala provides structured training, analytical frameworks, and practical market knowledge across 5 specialized learning domains.
            </p>
          </div>

          <div className="shrink-0 text-xs text-[#737373] flex items-center gap-2 bg-[#121212] border border-[#222222] px-4 py-2.5 rounded">
            <ShieldCheck className="w-4 h-4 text-[#C5A34A]" />
            <span>Strictly Educational · Non-Advisory</span>
          </div>
        </div>

        {/* Editorial Layout for Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div
              key={srv.id}
              className="bg-[#121212] border border-[#222222] hover:border-[#C5A34A]/50 rounded-lg p-8 flex flex-col justify-between transition-all duration-200 group hover:shadow-xl hover:shadow-[#C5A34A]/5"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
                  <span className="font-mono text-xs font-bold text-[#C5A34A]">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="text-[11px] font-mono text-[#737373] uppercase tracking-wider">
                    {srv.focus}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#E2C878] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                  {srv.description}
                </p>

                {/* Outcomes checklist */}
                <div className="space-y-2 pt-2 border-t border-[#1C1C1C]">
                  <span className="text-[11px] font-semibold text-[#737373] uppercase tracking-wider block mb-1">
                    Core Learning Scope:
                  </span>
                  {srv.outcomes.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A34A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-[#1F1F1F]">
                <button
                  onClick={() => onEnquire(`Service Inquiry: ${srv.title}`)}
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white hover:text-[#090909] bg-[#171717] hover:bg-[#C5A34A] border border-[#2A2A2A] hover:border-[#C5A34A] rounded transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Enquire for Curriculum</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
