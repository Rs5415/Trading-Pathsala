import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { CheckCircle2, ArrowRight, Sparkles, Filter, BookOpen, QrCode } from 'lucide-react';
import { UpiPaymentModal } from '../components/UpiPaymentModal';

interface CoursesPageProps {
  courses: Course[];
  onOpenEnquiry: (courseName?: string) => void;
  onBuyCourse?: (course: Course) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ courses, onOpenEnquiry, onBuyCourse }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState<Course | null>(null);

  const categories = [
    'All',
    'Options',
    'Technical Analysis',
    'Wealth & Investing',
    'Swing & Forex',
  ];

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const handleOpenBuy = (c: Course) => {
    if (onBuyCourse) {
      onBuyCourse(c);
    } else {
      setSelectedCourseForPayment(c);
    }
  };

  return (
    <div className="w-full bg-[#FCFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Comprehensive Curriculum</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
            Our Six Actual Courses
          </h1>
          <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
            Choose from our structured stock market programs with transparent fees, hands-on charting, and disciplined risk-reward principles.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-black text-[#F5D061] shadow-sm'
                  : 'bg-white hover:bg-[#FAF7F0] text-[#52525B] border border-[#E8E2D5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Course Banner Image */}
                <div className="h-52 w-full bg-gray-100 overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-xs text-[#E5B83A] text-xs font-bold px-3 py-1 rounded-full border border-[#E5B83A]/30 shadow-xs">
                    {course.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-[#18181B] group-hover:text-[#916E16] transition-colors leading-snug">
                      {course.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                      {course.shortDescription}
                    </p>
                  </div>

                  {/* Highlights Topics */}
                  {course.coverageTopics && course.coverageTopics.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#E8E2D5]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#916E16]">
                        Key Syllabus Topics
                      </div>
                      <ul className="space-y-1 text-xs text-[#27272A]">
                        {course.coverageTopics.slice(0, 3).map((topic, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                            <span className="truncate">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FAF2DE] text-[#816112] text-[11px] font-semibold px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action Strip */}
              <div className="p-4 sm:p-6 pt-0 border-t border-[#E8E2D5] mt-4 flex flex-wrap items-center justify-between gap-2.5">
                <div>
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#71717A] font-medium">
                    Program Fee
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#916E16]">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleOpenBuy(course)}
                    className="bg-black hover:bg-neutral-900 text-[#F5D061] font-extrabold text-xs px-3 py-2 sm:py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs border border-[#D4AF37]/40 flex items-center gap-1 min-h-[38px]"
                    title="Pay via UPI QR"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>

                  <Link
                    to={`/courses/${course.slug}`}
                    className="bg-white hover:bg-neutral-100 text-[#18181B] border border-gray-300 font-bold text-xs px-3 py-2 sm:py-2.5 rounded-xl transition-colors cursor-pointer min-h-[38px] flex items-center"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Pathway Recommendation Box */}
        <div className="bg-[#FAF7F0] p-8 sm:p-10 rounded-3xl border border-[#E8E2D5] space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
              Educational Roadmap
            </div>
            <h3 className="text-2xl font-extrabold text-[#18181B]">
              Which Course Should You Choose First?
            </h3>
            <p className="text-sm text-[#52525B] max-w-2xl leading-relaxed">
              We recommend starting with our foundational <strong>Technical Analysis</strong> curriculum before trading leveraged derivatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] space-y-2">
              <span className="text-xs font-bold bg-[#FAF2DE] text-[#916E16] px-2 py-0.5 rounded-md">Step 1 • Beginner</span>
              <h4 className="font-bold text-[#18181B] text-base">Basic to Advanced Technical Analysis</h4>
              <p className="text-xs text-[#52525B]">Candlestick anatomy, trend structure, MSS, support-resistance and volume confirmation.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] space-y-2">
              <span className="text-xs font-bold bg-[#FAF2DE] text-[#916E16] px-2 py-0.5 rounded-md">Step 2 • Intermediate</span>
              <h4 className="font-bold text-[#18181B] text-base">Index Option Buying or Swing Trading</h4>
              <p className="text-xs text-[#52525B]">Master momentum breakouts in Nifty/Bank Nifty or multi-week equity swings with high R:R.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] space-y-2">
              <span className="text-xs font-bold bg-[#FAF2DE] text-[#916E16] px-2 py-0.5 rounded-md">Step 3 • Advanced</span>
              <h4 className="font-bold text-[#18181B] text-base">Option Selling, Hedging &amp; Forex</h4>
              <p className="text-xs text-[#52525B]">Consistent probability edge with theta decay, delta-neutral spreads, and global currency pairs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={Boolean(selectedCourseForPayment)}
        course={selectedCourseForPayment}
        onClose={() => setSelectedCourseForPayment(null)}
        onNavigateLogin={() => navigate('/student-login')}
      />
    </div>
  );
};
