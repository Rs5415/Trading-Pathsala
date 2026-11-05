import React from 'react';
import { Course } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CourseSectionProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onEnquireCourse: (courseName: string) => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  courses,
  onSelectCourse,
  onEnquireCourse,
}) => {
  return (
    <section id="courses" className="py-16 sm:py-24 bg-white border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-block bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Our Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight">
            Our Six Actual Courses
          </h2>
          <p className="text-base text-[#52525B]">
            Structured stock market education programs with transparent pricing and real market methodologies.
          </p>
        </div>

        {/* 6 Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => {
            const isTechAnalysis = course.id === 'course-2';
            return (
              <div
                key={course.id}
                className="bg-[#FCFBF7] rounded-2xl border border-[#E8E2D5] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Course Image */}
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

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-[#18181B] group-hover:text-[#916E16] transition-colors leading-snug">
                      {course.name}
                    </h3>

                    <p className="text-sm text-[#52525B] leading-relaxed">
                      {course.shortDescription}
                    </p>

                    {/* Specific coverage badge for Course 2 */}
                    {isTechAnalysis && (
                      <div className="pt-2 p-3 bg-[#FAF2DE]/80 rounded-xl border border-[#E5B83A]/40 space-y-1">
                        <div className="text-[11px] font-bold text-[#916E16] uppercase tracking-wide">
                          Key Coverage:
                        </div>
                        <p className="text-xs text-[#27272A] font-medium leading-relaxed">
                          Covers Indian, Forex and Crypto markets, Order Flow, Volume Profile and MSS.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="p-6 pt-0 border-t border-[#E8E2D5]/70 mt-4 space-y-4">
                  <div className="flex items-baseline justify-between pt-4">
                    <div className="text-xs font-bold text-[#71717A] uppercase tracking-wider">
                      Course Fee
                    </div>
                    <div className="text-2xl font-extrabold text-[#916E16]">
                      ₹{course.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="w-full py-2.5 px-3 rounded-xl border border-[#D5CEBE] bg-white text-xs sm:text-sm font-bold text-[#18181B] hover:bg-[#F8F5EE] transition-colors cursor-pointer text-center shadow-2xs"
                    >
                      Course Details
                    </button>

                    <button
                      onClick={() => onEnquireCourse(course.name)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F0C94D] via-[#E5B83A] to-[#D4AF37] hover:brightness-105 text-black text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Enquire Now</span>
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
