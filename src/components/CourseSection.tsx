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
    <section id="courses" className="py-16 sm:py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#174D32]">
            Educational Programs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Courses
          </h2>
          <p className="text-base text-gray-600">
            Structured trading education programs designed for practical market understanding and disciplined execution.
          </p>
        </div>

        {/* Six Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="h-48 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {course.name}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Highlight for Technical Analysis Course */}
                  {course.id === 'course-2' && (
                    <div className="pt-2">
                      <span className="inline-block bg-[#EBF3ED] text-[#174D32] text-xs font-semibold px-2.5 py-1 rounded-md">
                        Covers Indian, Forex & Crypto, Order Flow, Volume Profile & MSS
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Enquire Now Action */}
              <div className="p-6 pt-0 border-t border-gray-100 mt-4 space-y-4">
                <div className="flex items-baseline justify-between pt-4">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Course Fee
                  </div>
                  <div className="text-2xl font-extrabold text-[#174D32]">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer text-center"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onEnquireCourse(course.name)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#174D32] hover:bg-[#113A26] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="w-4 h-4 text-[#75D68A]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
