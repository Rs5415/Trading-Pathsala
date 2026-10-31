import React, { useState } from 'react';
import { Course } from '../types';
import { Clock, Search, ArrowRight, Send, Layers } from 'lucide-react';

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
  const [activeCategory, setActiveCategory] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === 'All' ? true : course.category === activeCategory;
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories: Array<'All' | 'Beginner' | 'Intermediate' | 'Advanced'> = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  return (
    <section id="courses" className="py-24 bg-[#0E0E0E] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
              <span>Structured Educational Roadmaps</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
              Trading Programs & Courses
            </h2>
            <p className="mt-2 text-[#A0A0A0] text-sm sm:text-base max-w-2xl font-light">
              From absolute market fundamentals to quantitative price action and derivatives risk management. Select the curriculum tailored to your experience.
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, price action..."
              className="w-full bg-[#171717] border border-[#2A2A2A] focus:border-[#C5A34A] rounded pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-[#737373] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#737373] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? courses.length
                : courses.filter((c) => c.category === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#C5A34A] text-[#090909] shadow-md shadow-[#C5A34A]/20'
                    : 'bg-[#171717] hover:bg-[#222222] text-[#A0A0A0] hover:text-white border border-[#262626]'
                }`}
              >
                <span>{cat === 'All' ? 'All Programs' : `${cat} Level`}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-[#090909]/20 text-[#090909]' : 'bg-[#262626] text-[#737373]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-[#121212] border border-[#222222] rounded-lg p-12 text-center max-w-md mx-auto">
            <p className="text-white font-medium">No courses match your criteria</p>
            <p className="text-[#737373] text-xs mt-1">Try adjusting your filter or search keywords.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#090909] bg-[#C5A34A] rounded uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#121212] border border-[#222222] hover:border-[#C5A34A]/50 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200 group hover:shadow-xl hover:shadow-[#C5A34A]/5"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#090909]">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-90" />

                    {/* Metadata overlays */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#090909]/90 border border-[#C5A34A]/40 text-[#C5A34A] text-[10px] font-mono">
                        {course.level}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#090909]/90 border border-[#2A2A2A] text-[#A0A0A0] text-[11px] font-mono">
                        <Clock className="w-3 h-3 text-[#C5A34A]" />
                        <span>{course.duration}</span>
                      </span>
                    </div>

                    {course.featured && (
                      <div className="absolute bottom-3 left-3 text-[10px] font-bold font-mono uppercase tracking-wider text-[#090909] bg-[#C5A34A] px-2 py-0.5 rounded">
                        Featured Cohort
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-[#737373] uppercase tracking-wider">
                        {course.category} Track · {course.curriculum.length} Modules
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#E2C878] transition-colors leading-snug">
                        {course.name}
                      </h3>
                      <p className="text-xs text-[#A0A0A0] leading-relaxed line-clamp-3">
                        {course.shortDescription}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#A0A0A0] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#262626]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer / Price & Actions */}
                <div className="p-6 pt-0 space-y-4 border-t border-[#1C1C1C]">
                  <div className="flex items-baseline justify-between pt-4">
                    <div>
                      <span className="text-[11px] text-[#737373] uppercase block font-mono">Tuition Fee</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-mono text-white">
                          ₹{course.price.toLocaleString()}
                        </span>
                        {course.originalPrice > course.price && (
                          <span className="text-xs font-mono text-[#555555] line-through">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#C5A34A]">
                      Interactive Cohort
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-[#A0A0A0] hover:text-white bg-[#171717] hover:bg-[#222222] border border-[#2E2E2E] rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onEnquireCourse(course.name)}
                      className="w-full py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-[#C5A34A]/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enquiry</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
