import React, { useState } from 'react';
import { Course } from '../types';
import { ArrowLeft, Clock, BarChart3, CheckCircle2, ChevronDown, ChevronUp, Send, MessageCircle, Phone, FileText } from 'lucide-react';

interface CourseDetailPageProps {
  course: Course;
  allCourses: Course[];
  onBack: () => void;
  onSelectCourse: (course: Course) => void;
  onEnquireCourse: (courseName: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  allCourses,
  onBack,
  onSelectCourse,
  onEnquireCourse,
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  const toggleModule = (index: number) => {
    setOpenModuleIndex(openModuleIndex === index ? null : index);
  };

  const relatedCourses = allCourses
    .filter((c) => c.id !== course.id)
    .slice(0, 2);

  return (
    <div className="py-12 bg-[#090909] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 text-xs text-[#737373]">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#A0A0A0] hover:text-[#C5A34A] transition-colors cursor-pointer py-1 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </button>
          <span>/</span>
          <span className="text-[#555555]">{course.category} Track</span>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{course.name}</span>
        </div>

        {/* Hero Header for Course Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-2.5 py-1 rounded bg-[#C5A34A]/10 border border-[#C5A34A]/30 text-[#C5A34A] font-bold font-mono uppercase text-[11px]">
                {course.level} Level
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[#A0A0A0]">
                <Clock className="w-3.5 h-3.5 text-[#C5A34A]" />
                {course.duration}
              </span>
              <span className="text-[#333333]">·</span>
              <span className="flex items-center gap-1.5 text-[#A0A0A0] font-mono">
                <BarChart3 className="w-3.5 h-3.5 text-[#C5A34A]" />
                {course.curriculum.length} Structured Modules
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight uppercase">
              {course.name}
            </h1>

            <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed font-light">
              {course.shortDescription}
            </p>

            <div className="p-6 rounded-lg bg-[#121212] border border-[#222222] text-xs sm:text-sm text-[#A0A0A0] leading-relaxed space-y-2">
              <strong className="text-white block font-semibold uppercase tracking-wider text-xs">
                Comprehensive Syllabus Overview:
              </strong>
              <p>{course.fullDescription}</p>
            </div>

            {/* Prerequisites */}
            <div className="text-xs text-[#737373] flex items-start gap-2 pt-2">
              <span className="text-[#C5A34A] font-bold uppercase tracking-wider shrink-0">Prerequisites:</span>
              <span className="text-[#A0A0A0]">{course.prerequisites}</span>
            </div>
          </div>

          {/* Pricing & Enrollment Sticky Card */}
          <div className="lg:col-span-4 bg-[#121212] border border-[#262626] rounded-lg p-6 space-y-6 shadow-2xl sticky top-28">
            <div className="relative rounded overflow-hidden aspect-video bg-[#090909]">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-[#737373] block mb-1">
                Program Tuition Fee
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold font-mono text-white">
                  ₹{course.price.toLocaleString()}
                </span>
                {course.originalPrice > course.price && (
                  <span className="text-sm font-mono text-[#555555] line-through">
                    ₹{course.originalPrice.toLocaleString()}
                  </span>
                )}
                {course.originalPrice > course.price && (
                  <span className="text-[11px] font-bold font-mono text-[#C5A34A] bg-[#C5A34A]/10 px-2 py-0.5 rounded">
                    Save ₹{(course.originalPrice - course.price).toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#737373] mt-1.5 leading-relaxed">
                Led by Mentor Prashant Kumar Sinha. Includes live interactive cohort sessions, curriculum documentation, and post-market reviews.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => onEnquireCourse(course.name)}
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#090909] bg-gradient-to-r from-[#C5A34A] to-[#E2C878] hover:brightness-110 rounded transition-all shadow-lg shadow-[#C5A34A]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enquire / Reserve Seat</span>
              </button>

              <a
                href={`https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20am%20interested%20in%20the%20${encodeURIComponent(course.name)}%20program.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#171717] hover:bg-[#222222] border border-[#333333] hover:border-[#C5A34A] rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#C5A34A]" />
                <span>WhatsApp Admissions Desk</span>
              </a>

              <a
                href="tel:+918987599799"
                className="w-full py-2 px-4 text-[11px] text-[#A0A0A0] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A34A]" />
                <span>Call Directly: +91 89875 99799</span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#1F1F1F] text-xs text-[#737373] space-y-2 font-mono">
              <div className="flex items-center justify-between">
                <span>Mentor:</span>
                <span className="text-white font-sans font-medium">Prashant Kumar Sinha</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Format:</span>
                <span className="text-white font-sans font-medium">Live Interactive Cohort</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Risk Guidance:</span>
                <span className="text-[#C5A34A] font-sans font-medium">1%–2% Maximum Capital Rule</span>
              </div>
            </div>
          </div>
        </div>

        {/* What You Will Learn Section */}
        <div className="bg-[#121212] border border-[#222222] rounded-lg p-8 sm:p-10 space-y-6">
          <div>
            <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-1">
              Curriculum Competencies
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
              What You Will Learn
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C5A34A] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Structured Curriculum Breakdown */}
        <div className="space-y-6">
          <div className="border-b border-[#222222] pb-4">
            <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-1">
              Module-by-Module Progression
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
              Course Curriculum
            </h2>
          </div>

          <div className="space-y-3">
            {course.curriculum.map((mod, index) => {
              const isOpen = openModuleIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#121212] border border-[#222222] hover:border-[#333333] rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleModule(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#171717] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-[#C5A34A] font-bold">
                        MODULE {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-white">
                        {mod.moduleTitle}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-[#737373] hidden sm:inline">
                        {mod.duration}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#C5A34A]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#737373]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#1C1C1C] bg-[#0E0E0E] space-y-3">
                      <div className="text-[11px] font-bold text-[#737373] uppercase tracking-wider">
                        Syllabus Topics Covered:
                      </div>
                      <ul className="space-y-2">
                        {mod.lessons.map((lesson, lIdx) => (
                          <li
                            key={lIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A0A0A0]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A] mt-2 shrink-0" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="pt-10 border-t border-[#222222] space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Complementary Learning Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCourses.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-[#121212] border border-[#222222] hover:border-[#C5A34A]/50 rounded-lg p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C5A34A]">
                      {rel.level} Level · {rel.duration}
                    </span>
                    <h3 className="text-base font-bold text-white hover:text-[#C5A34A] transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-[#A0A0A0] line-clamp-2">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectCourse(rel)}
                    className="shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#171717] hover:bg-[#C5A34A] hover:text-[#090909] border border-[#2E2E2E] rounded transition-all cursor-pointer whitespace-nowrap"
                  >
                    View Curriculum
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
