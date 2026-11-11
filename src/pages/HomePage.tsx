import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Hero } from '../components/Hero';
import { CtaBanner } from '../components/CtaBanner';
import { ArrowRight, Star, TrendingUp, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

interface HomePageProps {
  courses: Course[];
  onOpenEnquiry: (courseName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ courses, onOpenEnquiry }) => {
  // Take first 3 featured courses for home preview
  const featuredCourses = courses.slice(0, 3);

  const testimonials = [
    {
      name: 'Rohan Verma',
      location: 'Deoghar, Jharkhand',
      role: 'Full-Time Index Trader',
      text: 'Learning directly with Prashant Kumar Sinha changed my entire view of Nifty Options. No more gambling on lagging indicators—MSS and Order Flow give crystal clear entries.',
      rating: 5,
    },
    {
      name: 'Pooja Agarwal',
      location: 'Ranchi, Jharkhand',
      role: 'Swing & Positional Trader',
      text: 'The Technical Analysis and Price Action course at Trading Pathshala is phenomenal. The risk-management rules saved my capital from unnecessary drawdowns.',
      rating: 5,
    },
    {
      name: 'Vikramaditya Sahay',
      location: 'Patna, Bihar',
      role: 'Option Seller',
      text: 'Their advanced Option Selling and Hedging strategy gives me peace of mind. The physical classroom batches in Deoghar offer exceptional mentor accessibility.',
      rating: 5,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero
        onNavigate={(view) => {
          if (view === 'courses') {
            window.location.href = '/courses';
          }
        }}
        onOpenEnquiry={() => onOpenEnquiry('General Admission Enquiry')}
      />

      {/* Featured Courses Showcase */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <div className="inline-block bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                Featured Programs
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight">
                Our Most Popular Trading Programs
              </h2>
              <p className="text-base text-[#52525B] max-w-2xl">
                Explore our flagship courses designed to build structured, independent trading skills with real price action.
              </p>
            </div>

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#916E16] hover:text-[#7A5B10] transition-colors cursor-pointer self-start md:self-end"
            >
              <span>Explore All 6 Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#FCFBF7] rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
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

                  <div className="p-4 sm:p-6 space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-[#18181B] group-hover:text-[#916E16] transition-colors leading-snug">
                      {course.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52525B] line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
                      {course.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#F4EEDF] text-[#816112] text-[11px] font-semibold px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0 border-t border-[#E8E2D5] mt-4 flex flex-wrap items-center justify-between gap-2.5">
                  <div>
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#71717A] font-medium">
                      One-Time Fee
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-[#18181B]">
                      ₹{course.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Link
                      to={`/courses/${course.slug}`}
                      className="bg-black hover:bg-neutral-900 text-white font-bold text-xs px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl transition-colors cursor-pointer min-h-[38px] flex items-center"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => onOpenEnquiry(course.name)}
                      className="bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-xs px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl transition-all cursor-pointer shadow-2xs min-h-[38px] flex items-center"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#18181B] border border-[#E8E2D5] font-bold text-sm px-7 py-3 rounded-xl transition-all shadow-xs"
            >
              <span>View All Programs & Full Curriculum</span>
              <ArrowRight className="w-4 h-4 text-[#916E16]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Pillars */}
      <section className="py-16 sm:py-24 bg-[#F8F5EE] border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                Why Trading Pathshala
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight leading-tight">
                Built on Rigorous Education, Integrity & Discipline
              </h2>
              <p className="text-base text-[#52525B] leading-relaxed">
                Trading Pathshala stands apart by teaching institutional concepts—order flow imbalances, volume profile, liquidity sweeps, and structured risk control—without false get-rich-quick claims.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-[#18181B]">Capital Preservation Discipline</div>
                    <div className="text-xs text-[#71717A]">Strict 1:2+ risk-to-reward metrics before any live position.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-xs">
                  <TrendingUp className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-[#18181B]">Institutional Market Structure</div>
                    <div className="text-xs text-[#71717A]">Identify smart money accumulation, manipulation, and distribution.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-[#E8E2D5] shadow-xs">
                  <Users className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-[#18181B]">Direct Mentor Accessibility</div>
                    <div className="text-xs text-[#71717A]">Interactive doubt clearing directly with Prashant Kumar Sinha.</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="bg-black hover:bg-neutral-900 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Learn About Our Institute →
                </Link>
                <Link
                  to="/services"
                  className="text-sm font-bold text-[#916E16] hover:underline"
                >
                  Explore Mentorship Services →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-[#E8E2D5] shadow-md space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
                    Student Reviews & Feedback
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#18181B]">
                    What Our Traders Say
                  </h3>
                </div>

                <div className="space-y-4">
                  {testimonials.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D5] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-[#18181B]">{t.name}</div>
                          <div className="text-xs text-[#71717A]">{t.role} • {t.location}</div>
                        </div>
                        <div className="flex items-center text-[#E5B83A]">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed italic">
                        "{t.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner
        onNavigate={(view) => {
          if (view === 'courses') {
            window.location.href = '/courses';
          }
        }}
      />
    </div>
  );
};
