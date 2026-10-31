import React from 'react';
import { Target, Compass, BookOpenCheck, ShieldAlert, Award, UserCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'First-Principles Market Architecture',
      desc: 'We demystify how the stock exchange, clearing corporations, order matching engines, and participants interact before looking at a single chart.',
    },
    {
      number: '02',
      title: 'Risk-First Mentality',
      desc: 'Capital protection is priority zero. Every setup starts by determining where the premise is invalidated and how much capital is at risk.',
    },
    {
      number: '03',
      title: 'Objective Price Action Reading',
      desc: 'We train students to decipher raw price action, market structure shifts, and institutional volume rather than relying on lagging indicator noise.',
    },
    {
      number: '04',
      title: 'Post-Market Review & Trade Journaling',
      desc: 'Systematic review of executed trades to isolate psychological biases, improve execution efficiency, and achieve repeatable discipline.',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#090909] border-b border-[#222222] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
              <span>About Trading Pathshala</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase">
              Dedicated To The <br />
              <span className="text-[#C5A34A]">Art of Trading</span>
            </h2>
            <div className="p-4 bg-[#121212] border-l-2 border-[#C5A34A] rounded-r text-xs text-[#A0A0A0] space-y-1">
              <div className="font-semibold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#C5A34A]" />
                <span>Mentor: Prashant Kumar Sinha</span>
              </div>
              <p>Financial Service & Financial Planner specializing in structured market education.</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-light">
            <p>
              <strong className="text-white font-medium">Trading Pathshala</strong> was established with a singular conviction: real trading success is not about chasing random social media tips or miraculous indicators—it is a disciplined craft requiring deep structural understanding, emotional control, and mathematical risk management.
            </p>
            <p>
              Under the guidance of Prashant Kumar Sinha, our educational programs bridge the gap between academic theory and real-time market execution. Whether you are an absolute beginner taking your first steps into equities or an experienced market participant refining price action precision, we focus on repeatable, rule-based processes.
            </p>
          </div>
        </div>

        {/* Mission & Vision - Editorial Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#121212] border border-[#222222] rounded-lg p-8 lg:p-10 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A34A]/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#1C1C1C] border border-[#2E2E2E] flex items-center justify-center text-[#C5A34A]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Our Mission</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
              To empower students, retail participants, and aspiring investors with objective, institutional-grade market literacy. We aim to replace emotional speculation and dependency on tips with grounded understanding of price behavior, market structure, and disciplined risk budgeting.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#222222] rounded-lg p-8 lg:p-10 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A34A]/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#1C1C1C] border border-[#2E2E2E] flex items-center justify-center text-[#C5A34A]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Our Vision</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
              To be the benchmark for honest financial education in India and beyond—known for curriculum rigor, ethical transparency, and a steadfast refusal to promote unrealistic promises of overnight wealth.
            </p>
          </div>
        </div>

        {/* Our 4-Pillar Learning Approach */}
        <div className="space-y-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#222222] pb-6">
            <div>
              <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-1">
                Pedagogy & Methodology
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                Our Learning Approach
              </h3>
            </div>
            <span className="text-xs font-mono text-[#737373]">
              Four Progressive Stages of Market Comprehension
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item) => (
              <div
                key={item.number}
                className="bg-[#121212] border border-[#222222] hover:border-[#C5A34A]/40 rounded-lg p-6 space-y-3 transition-colors"
              >
                <span className="font-mono text-xs font-bold text-[#C5A34A] block">
                  Pillar {item.number}
                </span>
                <h4 className="text-base font-bold text-white leading-snug">{item.title}</h4>
                <p className="text-xs text-[#A0A0A0] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency Box */}
        <div className="bg-[#121212] border border-[#262626] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[#C5A34A] shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Educational Integrity & Regulatory Notice
              </h4>
              <p className="text-xs text-[#A0A0A0] max-w-3xl leading-relaxed">
                Trading Pathshala is solely a training and research education platform. We do not operate portfolio management services, advisory channels, or provide buy/sell stock recommendations. We do not claim fabricated regulatory certifications. Your progress depends on practice, emotional discipline, and risk management.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[#C5A34A] bg-[#C5A34A]/10 border border-[#C5A34A]/20 px-3.5 py-2 rounded">
            <Award className="w-4 h-4" />
            <span>Ethical Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
};
