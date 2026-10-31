import React from 'react';
import { Testimonial } from '../types';
import { Star, ShieldCheck } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#0E0E0E] border-b border-[#222222] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
              <span>Student Learning Observations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              Student Experiences & Feedback
            </h2>
            <p className="mt-2 text-[#A0A0A0] text-sm sm:text-base max-w-2xl font-light">
              Reflections on disciplined chart reading, risk containment, and mindset transformation.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#121212] border border-[#222222] text-xs text-[#737373] shrink-0 font-mono">
            <ShieldCheck className="w-4 h-4 text-[#C5A34A]" />
            <span>Sample Student Records · Editable via Admin</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#121212] border border-[#222222] hover:border-[#C5A34A]/40 rounded-lg p-8 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C5A34A] text-[#C5A34A]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed italic font-light">
                  "{t.feedback}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1C1C1C] space-y-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">{t.name}</h3>
                  <span className="text-[10px] font-mono text-[#555555]">{t.date}</span>
                </div>
                <p className="text-xs text-[#C5A34A] font-medium">{t.role}</p>
                <p className="text-[11px] text-[#737373] truncate font-mono">Course: {t.courseTaken}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
