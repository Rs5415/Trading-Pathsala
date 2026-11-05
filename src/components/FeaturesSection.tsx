import React from 'react';
import { Award, BookOpen, Clock, ShieldCheck } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Expert-Led Courses',
      description: 'Learn directly from experienced market practitioners with structured insights.',
      icon: Award,
    },
    {
      title: 'Easy Learning',
      description: 'Simple, crystal-clear concepts designed to take you from beginner to confident trader.',
      icon: BookOpen,
    },
    {
      title: '24/7 Access',
      description: 'Learn anytime, anywhere with unrestricted access to study notes and student resources.',
      icon: Clock,
    },
    {
      title: 'Get Certified',
      description: 'Showcase your trading knowledge, technical competence, and market discipline.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-[#F8F5EE] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E8E2D5] shadow-xs hover:shadow-md transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-[#C59B27]" />
                </div>
                <h3 className="text-lg font-bold text-[#18181B] group-hover:text-[#916E16] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
