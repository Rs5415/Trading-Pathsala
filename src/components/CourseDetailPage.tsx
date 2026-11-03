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
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#174D32] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </button>
        </div>

        {/* Main Course Header Box */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="md:col-span-7 space-y-4">
              <span className="inline-block bg-[#EBF3ED] text-[#174D32] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                {course.category}
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {course.name}
              </h1>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {course.fullDescription || course.shortDescription}
              </p>

              {/* Price & Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100 pt-4">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase">Fee</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#174D32]">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => onEnquireCourse(course.name)}
                    className="flex-1 sm:flex-none bg-[#174D32] hover:bg-[#113A26] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="w-4 h-4 text-[#75D68A]" />
                  </button>

                  <a
                    href={`https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20am%20interested%20in%20the%20${encodeURIComponent(course.name)}%20course.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                    title="WhatsApp Enquiry"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Course Image */}
            <div className="md:col-span-5">
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-56 sm:h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Coverage & Curriculum */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            {/* Key Topics */}
            {course.coverageTopics && course.coverageTopics.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
                <h2 className="text-lg font-bold text-gray-900">What You Will Learn</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.coverageTopics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-[#174D32] shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#174D32]" />
                <span>Curriculum Modules</span>
              </h2>

              <div className="space-y-3">
                {course.curriculum.map((mod, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 font-bold text-sm text-gray-900 border-b border-gray-200">
                      {mod.moduleTitle}
                    </div>
                    <ul className="p-4 space-y-2 text-sm text-gray-600">
                      {mod.lessons.map((lesson, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-2">
                          <span className="text-[#174D32] font-bold">•</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other Courses Column */}
          <div className="md:col-span-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4 h-fit">
            <h3 className="font-bold text-base text-gray-900">Other Courses</h3>
            <div className="space-y-2">
              {otherCourses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCourse(c)}
                  className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#174D32] hover:bg-gray-50 transition-colors text-left flex items-center justify-between text-xs font-semibold text-gray-800 cursor-pointer"
                >
                  <span className="truncate pr-2">{c.name}</span>
                  <span className="text-[#174D32] font-bold shrink-0">
                    ₹{c.price.toLocaleString('en-IN')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
