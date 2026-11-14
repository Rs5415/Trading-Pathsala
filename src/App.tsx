import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Course, WebsiteContent } from './types';
import { getWebsiteContent } from './services/storage';
import { getCoursesList } from './services/firestoreService';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { EnquiryModal } from './components/EnquiryModal';
import { UpiPaymentModal } from './components/UpiPaymentModal';
import { MessageCircle } from 'lucide-react';

// 6 Main Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { ServicesPage } from './pages/ServicesPage';
import { OffersPage } from './pages/OffersPage';
import { ContactPage } from './pages/ContactPage';

// Course Detail Page & Separate Portals
import { CourseDetailPage } from './components/CourseDetailPage';
import { StudentLogin } from './components/StudentLogin';
import { AdminDashboard } from './pages/AdminDashboard';

function AppContent() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [content, setContent] = useState<WebsiteContent | null>(null);

  // Enquiry Modal States
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryCourseName, setEnquiryCourseName] = useState<string>('Index Option Buying');

  // UPI Payment Modal State
  const [upiPaymentCourse, setUpiPaymentCourse] = useState<Course | null>(null);

  const loadData = async () => {
    const loadedCourses = await getCoursesList();
    setCourses(loadedCourses);
    setContent(getWebsiteContent());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenEnquiry = (courseOrServiceName?: string) => {
    setEnquiryCourseName(courseOrServiceName || (courses[0]?.name ?? 'Index Option Buying'));
    setEnquiryModalOpen(true);
  };

  const handleOpenBuyCourse = (course: Course) => {
    setUpiPaymentCourse(course);
  };

  if (!content) return null;

  const availableCourseNames = courses.map((c) => c.name);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-[#FAF2DE] selection:text-[#916E16] w-full max-w-full overflow-x-hidden">
      {/* Automatically Scroll to Top on every route transition */}
      <ScrollToTop />

      {/* Consistent Header & Brand Logo */}
      <Navbar />

      {/* 6-Page Multi-Page Route Outlet */}
      <main className="flex-1 w-full max-w-full pt-[65px] sm:pt-[81px]">
        <Routes>
          {/* 1. Home Page */}
          <Route
            path="/"
            element={<HomePage courses={courses} onOpenEnquiry={handleOpenEnquiry} />}
          />

          {/* 2. About Us Page */}
          <Route
            path="/about"
            element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />}
          />

          {/* 3. Courses Page & Course Detail */}
          <Route
            path="/courses"
            element={
              <CoursesPage
                courses={courses}
                onOpenEnquiry={handleOpenEnquiry}
                onBuyCourse={handleOpenBuyCourse}
              />
            }
          />
          <Route
            path="/courses/:slug"
            element={
              <CourseDetailPage
                allCourses={courses}
                onEnquireCourse={handleOpenEnquiry}
                onBuyCourse={handleOpenBuyCourse}
              />
            }
          />

          {/* 4. Services Page */}
          <Route
            path="/services"
            element={<ServicesPage onOpenEnquiry={handleOpenEnquiry} />}
          />

          {/* 5. Offers Page */}
          <Route
            path="/offers"
            element={<OffersPage onOpenEnquiry={handleOpenEnquiry} />}
          />

          {/* 6. Contact Us Page */}
          <Route
            path="/contact"
            element={
              <ContactPage
                content={content}
                availableCourses={availableCourseNames}
              />
            }
          />

          {/* Separate Functional Portals (Not part of 6 main nav pages) */}
          <Route
            path="/student-login"
            element={<StudentLogin onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/login"
            element={<StudentLogin onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/dashboard"
            element={<StudentLogin onOpenEnquiry={handleOpenEnquiry} />}
          />
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Consistent Footer & Brand Logo */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20am%20interested%20in%20learning%20the%20art%20of%20trading%20with%20Trading%20Pathshala."
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

      {/* Global Admission & Consultation Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        initialCourseName={enquiryCourseName}
        availableCourses={availableCourseNames}
        onClose={() => setEnquiryModalOpen(false)}
        onSuccess={() => {
          loadData();
        }}
      />

      {/* Global UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={Boolean(upiPaymentCourse)}
        course={upiPaymentCourse}
        onClose={() => setUpiPaymentCourse(null)}
        onNavigateLogin={() => {
          setUpiPaymentCourse(null);
          navigate('/student-login');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
