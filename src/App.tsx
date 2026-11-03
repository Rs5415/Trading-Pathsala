import React, { useState, useEffect } from 'react';
import { PageView, Course, WebsiteContent } from './types';
import { getCourses, getWebsiteContent, getCourseBySlug } from './services/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseSection } from './components/CourseSection';
import { CourseDetailPage } from './components/CourseDetailPage';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { StudentLogin } from './components/StudentLogin';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [content, setContent] = useState<WebsiteContent | null>(null);

  // Navigation & View States
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Enquiry Modal States
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryCourseName, setEnquiryCourseName] = useState<string>('Index Option Buying');

  const loadData = () => {
    const loadedCourses = getCourses();
    setCourses(loadedCourses);
    setContent(getWebsiteContent());

    if (selectedCourse) {
      const updated = loadedCourses.find((c) => c.id === selectedCourse.id);
      if (updated) setSelectedCourse(updated);
    }
  };

  useEffect(() => {
    loadData();

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash.startsWith('course/')) {
        const slug = hash.replace('course/', '');
        const found = getCourseBySlug(slug);
        if (found) {
          setSelectedCourse(found);
          setCurrentView('course-detail');
        }
      } else if (hash === 'student-login') {
        setCurrentView('student-login');
      } else if (['home', 'about', 'courses', 'contact'].includes(hash)) {
        setCurrentView(hash as PageView);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: PageView, courseSlug?: string) => {
    if (view === 'course-detail' && courseSlug) {
      const found = getCourseBySlug(courseSlug);
      if (found) {
        setSelectedCourse(found);
        setCurrentView('course-detail');
        window.location.hash = `#/course/${found.slug}`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    if (view === 'student-login') {
      setCurrentView('student-login');
      window.location.hash = '#/student-login';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Default multi-section view
    setCurrentView(view);
    window.location.hash = `#/${view}`;

    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const el = document.getElementById(view);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
    window.location.hash = `#/course/${course.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (courseName?: string) => {
    setEnquiryCourseName(courseName || (courses[0]?.name ?? 'Index Option Buying'));
    setEnquiryModalOpen(true);
  };

  if (!content) return null;

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-[#EBF3ED] selection:text-[#174D32] w-full max-w-full overflow-x-hidden">
      {/* 1. HEADER */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenEnquiry={() => handleOpenEnquiry('Course Admission Enquiry')}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full max-w-full">
        {currentView === 'course-detail' && selectedCourse ? (
          <CourseDetailPage
            course={selectedCourse}
            allCourses={courses}
            onBack={() => handleNavigate('courses')}
            onSelectCourse={handleSelectCourse}
            onEnquireCourse={handleOpenEnquiry}
          />
        ) : currentView === 'student-login' ? (
          <StudentLogin
            onBackToHome={() => handleNavigate('home')}
            onOpenEnquiry={handleOpenEnquiry}
          />
        ) : (
          <>
            {/* 2. HERO */}
            <Hero
              onNavigate={handleNavigate}
              onOpenEnquiry={() => handleOpenEnquiry('General Admission Enquiry')}
            />

            {/* 3. OUR COURSES (Exactly 6 courses with prices) */}
            <CourseSection
              courses={courses}
              onSelectCourse={handleSelectCourse}
              onEnquireCourse={handleOpenEnquiry}
            />

            {/* 4. ABOUT US */}
            <AboutSection />

            {/* 5. CONTACT */}
            <ContactSection
              content={content}
              availableCourses={courses.map((c) => c.name)}
            />
          </>
        )}
      </main>

      {/* 6. FOOTER */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Floating WhatsApp Action */}
      <a
        href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20am%20interested%20in%20learning%20the%20art%20of%20trading%20with%20Trading%20Pathsala."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 sm:p-3.5 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
        title="Chat on WhatsApp with Prashant Kumar Sinha"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-bold text-xs tracking-wider uppercase pr-1">
          WhatsApp
        </span>
      </a>

      {/* Simple Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        initialCourseName={enquiryCourseName}
        availableCourses={courses.map((c) => c.name)}
        onClose={() => setEnquiryModalOpen(false)}
        onSuccess={() => {
          loadData();
        }}
      />
    </div>
  );
}
