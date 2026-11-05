import React from 'react';
import { Course } from '../types';
import { ArrowLeft, ArrowUpRight, MessageCircle, BookOpen, Check } from 'lucide-react';

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
  const otherCourses = allCourses.filter((c) => c.id !== course.id);

  return (
    <div className="bg-[#FCFBF7] min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#916E16] hover:underline cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#E8E2D5] shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </button>
        </div>

        {/* Main Course Header Box */}
        <div className="bg-white rounded-2xl border border-[#E8E2D5] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="inline-block bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/40 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md">
                {course.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] leading-tight">
                {course.name}
              </h1>

              <p className="text-base text-[#52525B] leading-relaxed">
                {course.fullDescription}
              </p>

              <div className="pt-4 border-t border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#71717A] uppercase">Course Fee</div>
                  <div className="text-3xl font-black text-[#916E16]">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEnquireCourse(course.name)}
                    className="bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-sm px-7 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="w-4 h-4 text-black" />
                  </button>

                  <a
                    href={`https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20am%20interested%20in%20enquiring%20about%20the%20${encodeURIComponent(course.name)}%20course.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center shadow-xs"
                    title="WhatsApp Enquiry"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#E8E2D5] bg-gray-50 shadow-sm">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-64 sm:h-72 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus & Coverage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            {course.coverageTopics && course.coverageTopics.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-4">
                <h2 className="text-xl font-bold text-[#18181B]">Key Syllabus Coverage</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.coverageTopics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF7F0] border border-[#E8E2D5]">
                      <Check className="w-4 h-4 text-[#916E16] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#27272A] font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#18181B] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#916E16]" />
                <span>Curriculum Modules</span>
              </h2>

              <div className="space-y-4">
                {course.curriculum.map((mod, idx) => (
                  <div key={idx} className="border border-[#E8E2D5] rounded-xl overflow-hidden bg-[#FAF7F0]/40">
                    <div className="bg-[#FAF2DE] px-5 py-3 font-bold text-sm sm:text-base text-[#916E16] border-b border-[#E8E2D5]">
                      {mod.moduleTitle}
                    </div>
                    <ul className="p-4 sm:p-5 space-y-2.5 text-sm text-[#52525B]">
                      {mod.lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#C59B27] mt-2 shrink-0" />
                          <span className="leading-relaxed">{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D5] shadow-xs space-y-4">
              <h3 className="font-bold text-base text-[#18181B]">Explore Other Courses</h3>
              <div className="space-y-2.5">
                {otherCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCourse(c)}
                    className="w-full p-3 rounded-xl border border-[#E8E2D5] hover:border-[#C59B27] hover:bg-[#FAF7F0] transition-colors text-left flex items-center justify-between text-xs font-bold text-[#18181B] cursor-pointer"
                  >
                    <span className="truncate pr-2">{c.name}</span>
                    <span className="text-[#916E16] shrink-0 font-extrabold">₹{c.price.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
