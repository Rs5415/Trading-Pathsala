import React, { useState, useEffect } from 'react';
import { PageView, Course, SpecialOffer, LearningResource, Testimonial, Enquiry, WebsiteContent } from './types';
import {
  getCourses,
  getOffers,
  getResources,
  getTestimonials,
  getEnquiries,
  getWebsiteContent,
  getCourseBySlug,
} from './services/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { CourseSection } from './components/CourseSection';
import { ServicesSection } from './components/ServicesSection';
import { CourseDetailPage } from './components/CourseDetailPage';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { LearningResourcesSection } from './components/LearningResourcesSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { GoogleMapsSection } from './components/GoogleMapsSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModal } from './components/LegalModals';
import { MessageCircle, Bell } from 'lucide-react';

export default function App() {
  // Application Data States
  const [courses, setCourses] = useState<Course[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [content, setContent] = useState<WebsiteContent | null>(null);

  // Navigation & View States
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Modals
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryCourseName, setEnquiryCourseName] = useState<string>('');
  const [enquiryOfferCode, setEnquiryOfferCode] = useState<string>('');

  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  // Load data from client storage
  const loadData = () => {
    const loadedCourses = getCourses();
    setCourses(loadedCourses);
    setOffers(getOffers());
    setResources(getResources());
    setTestimonials(getTestimonials());
    setEnquiries(getEnquiries());
    setContent(getWebsiteContent());

    if (selectedCourse) {
      const updated = loadedCourses.find((c) => c.id === selectedCourse.id);
      if (updated) setSelectedCourse(updated);
    }
  };

  useEffect(() => {
    loadData();

    // Check URL Hash for static routing compatibility
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash.startsWith('course/')) {
        const slug = hash.replace('course/', '');
        const found = getCourseBySlug(slug);
        if (found) {
          setSelectedCourse(found);
          setCurrentView('course-detail');
        }
      } else if (hash === 'admin') {
        setAdminLoginOpen(true);
      } else if (['home', 'about', 'courses', 'services', 'resources', 'offers', 'contact', 'location'].includes(hash)) {
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

    setCurrentView(view);
    window.location.hash = `#/${view}`;

    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(view);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
    window.location.hash = `#/course/${course.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiryForCourse = (courseName?: string) => {
    setEnquiryCourseName(courseName || (courses[0]?.name ?? 'Stock Market Foundations'));
    setEnquiryOfferCode('');
    setEnquiryModalOpen(true);
  };

  const handleOpenEnquiryForOffer = (offerCode: string, offerTitle: string) => {
    setEnquiryCourseName(`Enrollment with ${offerTitle}`);
    setEnquiryOfferCode(offerCode);
    setEnquiryModalOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setAdminLoginOpen(false);
    setCurrentView('admin');
    window.location.hash = '#/admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!content) return null;

  // Render Admin View
  if (currentView === 'admin' && isAdminAuthenticated) {
    return (
      <AdminDashboard
        courses={courses}
        offers={offers}
        resources={resources}
        testimonials={testimonials}
        enquiries={enquiries}
        content={content}
        onRefreshData={loadData}
        onExitAdmin={() => {
          setCurrentView('home');
          window.location.hash = '#/home';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col font-sans selection:bg-[#C5A34A]/30 selection:text-[#E2C878] w-full max-w-full overflow-x-hidden">
      {/* Top Announcement Bar */}
      {content.announcementText && (
        <div className="bg-[#121212] border-b border-[#222222] text-[10px] sm:text-xs py-2 px-3 sm:px-4 text-center text-[#A0A0A0] flex items-center justify-center gap-2 w-full max-w-full overflow-hidden">
          <Bell className="w-3.5 h-3.5 text-[#C5A34A] shrink-0" />
          <span className="font-medium text-white truncate max-w-[270px] sm:max-w-none">{content.announcementText}</span>
          <span className="hidden md:inline text-[#333333]">·</span>
          <button
            onClick={() => handleNavigate('courses')}
            className="hidden md:inline text-[#C5A34A] hover:underline font-bold uppercase tracking-wider text-[10px] cursor-pointer"
          >
            Explore Batches
          </button>
        </div>
      )}

      {/* Primary Top Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAdmin={() => {
          if (isAdminAuthenticated) {
            setCurrentView('admin');
            window.location.hash = '#/admin';
          } else {
            setAdminLoginOpen(true);
          }
        }}
        onOpenEnquiry={handleOpenEnquiryForCourse}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'course-detail' && selectedCourse ? (
          <CourseDetailPage
            course={selectedCourse}
            allCourses={courses}
            onBack={() => handleNavigate('courses')}
            onSelectCourse={handleSelectCourse}
            onEnquireCourse={handleOpenEnquiryForCourse}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onNavigate={handleNavigate}
              onOpenEnquiry={() => handleOpenEnquiryForCourse('Prospectus & Batch Request')}
            />

            {/* About Trading Pathshala */}
            <AboutSection />

            {/* Our Courses */}
            <CourseSection
              courses={courses}
              onSelectCourse={handleSelectCourse}
              onEnquireCourse={handleOpenEnquiryForCourse}
            />

            {/* Educational Services (Dedicated Section) */}
            <ServicesSection onEnquire={(srv) => handleOpenEnquiryForCourse(srv)} />

            {/* Why Choose Us */}
            <WhyChooseUsSection />

            {/* Learning Resources */}
            <LearningResourcesSection resources={resources} />

            {/* Special Offers */}
            <SpecialOffersSection
              offers={offers}
              onEnquireOffer={handleOpenEnquiryForOffer}
            />

            {/* Testimonials */}
            <TestimonialsSection testimonials={testimonials} />

            {/* FAQ */}
            <FAQSection />

            {/* Google Maps Location Section */}
            <GoogleMapsSection content={content} />

            {/* Contact Section */}
            <ContactSection
              content={content}
              availableCourses={courses.map((c) => c.name)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        content={content}
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Floating Direct WhatsApp Desk Action */}
      <a
        href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20am%20interested%20in%20learning%20the%20art%20of%20trading%20with%20Trading%20Pathshala."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 sm:p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-200 hover:scale-105 cursor-pointer"
        title="Chat with Prashant Kumar Sinha on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-bold text-xs tracking-wider uppercase pr-1">
          WhatsApp Desk
        </span>
      </a>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        initialCourseName={enquiryCourseName}
        offerCode={enquiryOfferCode}
        availableCourses={courses.map((c) => c.name)}
        onClose={() => setEnquiryModalOpen(false)}
        onSuccess={() => {
          loadData();
        }}
      />

      {/* Admin Access Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Legal Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
