import React, { useState } from 'react';
import {
  Course,
  SpecialOffer,
  LearningResource,
  Testimonial,
  Enquiry,
  WebsiteContent,
} from '../types';
import {
  saveCourse,
  deleteCourse,
  saveOffer,
  deleteOffer,
  saveResource,
  deleteResource,
  saveTestimonial,
  deleteTestimonial,
  saveWebsiteContent,
  deleteEnquiry,
  updateEnquiryStatus,
  exportEnquiriesCSV,
  resetAllDataToDefault,
} from '../services/storage';
import {
  LayoutDashboard,
  GraduationCap,
  Tag,
  BookOpen,
  MessageSquare,
  Globe,
  Inbox,
  Plus,
  Trash2,
  Edit2,
  Download,
  RotateCcw,
  LogOut,
  CheckCircle,
  AlertTriangle,
  Eye,
  MessageCircle,
  Phone,
} from 'lucide-react';

interface AdminDashboardProps {
  courses: Course[];
  offers: SpecialOffer[];
  resources: LearningResource[];
  testimonials: Testimonial[];
  enquiries: Enquiry[];
  content: WebsiteContent;
  onRefreshData: () => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  courses,
  offers,
  resources,
  testimonials,
  enquiries,
  content,
  onRefreshData,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'offers' | 'resources' | 'testimonials' | 'content' | 'enquiries'
  >('overview');

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Course Form State ---
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // --- Offer Form State ---
  const [editingOffer, setEditingOffer] = useState<Partial<SpecialOffer> | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // --- Resource Form State ---
  const [editingResource, setEditingResource] = useState<Partial<LearningResource> | null>(null);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  // --- Website Content State ---
  const [siteContent, setSiteContent] = useState<WebsiteContent>({ ...content });

  // Course handlers
  const handleOpenAddCourse = () => {
    setEditingCourse({
      id: `course-${Date.now()}`,
      slug: `course-track-${Date.now().toString().slice(-4)}`,
      name: '',
      category: 'Beginner',
      level: 'Beginner',
      shortDescription: '',
      fullDescription: '',
      duration: '4 Weeks (24 Hours)',
      price: 4999,
      originalPrice: 7999,
      image: '/src/assets/images/course_technical_analysis_1793416380606.jpg',
      tags: ['Technical Analysis', 'Stock Market'],
      highlights: [
        'Fundamental and practical chart mastery',
        'Capital preservation and position sizing discipline',
        'Live terminal trade simulation',
      ],
      curriculum: [
        {
          moduleTitle: 'Module 1: Foundations & Core Concepts',
          lessons: ['Introduction to Market Mechanics', 'Order Flow & Participant Behavior'],
          duration: '6 Hours',
        },
      ],
      prerequisites: 'Open to all students with basic market curiosity.',
      featured: false,
    });
    setIsCourseModalOpen(true);
  };

  const handleEditCourse = (c: Course) => {
    setEditingCourse({ ...c });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.name || !editingCourse.shortDescription) {
      alert('Please fill out the course title and description.');
      return;
    }
    saveCourse(editingCourse as Course);
    setIsCourseModalOpen(false);
    setEditingCourse(null);
    onRefreshData();
    showNotification('Course saved successfully!');
  };

  const handleDeleteCourse = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the course: "${name}"?`)) {
      deleteCourse(id);
      onRefreshData();
      showNotification('Course deleted.');
    }
  };

  // Offer handlers
  const handleOpenAddOffer = () => {
    setEditingOffer({
      id: `offer-${Date.now()}`,
      title: '',
      code: 'PATHSHALA' + Math.floor(100 + Math.random() * 900),
      description: '',
      discount: '25% Flat Discount',
      validTill: '2026-11-30',
      applicableCourses: 'All Active Cohorts',
      isActive: true,
    });
    setIsOfferModalOpen(true);
  };

  const handleEditOffer = (offer: SpecialOffer) => {
    setEditingOffer({ ...offer });
    setIsOfferModalOpen(true);
  };

  const handleSaveOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer || !editingOffer.title || !editingOffer.code) {
      alert('Please fill in title and code.');
      return;
    }
    saveOffer(editingOffer as SpecialOffer);
    setIsOfferModalOpen(false);
    setEditingOffer(null);
    onRefreshData();
    showNotification('Offer saved successfully!');
  };

  const handleDeleteOffer = (id: string) => {
    if (confirm('Delete this promotional offer?')) {
      deleteOffer(id);
      onRefreshData();
      showNotification('Offer removed.');
    }
  };

  const handlePurgeExpiredOffers = () => {
    const today = new Date().toISOString().slice(0, 10);
    const expired = offers.filter((o) => o.validTill < today);
    if (expired.length === 0) {
      alert('No expired offers found.');
      return;
    }
    if (confirm(`Remove ${expired.length} expired offer(s)?`)) {
      expired.forEach((o) => deleteOffer(o.id));
      onRefreshData();
      showNotification(`${expired.length} expired offers removed.`);
    }
  };

  // Resource handlers
  const handleOpenAddResource = () => {
    setEditingResource({
      id: `res-${Date.now()}`,
      title: '',
      category: 'Study Materials',
      readTime: '6 min read',
      summary: '',
      content: '### Key Concepts\n- Write educational guidance here.\n\n### Practical Example\n- Details of market scenario.',
      tags: ['Guide', 'Basics'],
      updatedAt: 'October 2026',
      downloadLabel: 'TradingPathshala_Guide.pdf',
    });
    setIsResourceModalOpen(true);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource?.title || !editingResource?.content) {
      alert('Please provide title and content.');
      return;
    }
    saveResource(editingResource as LearningResource);
    setIsResourceModalOpen(false);
    setEditingResource(null);
    onRefreshData();
    showNotification('Educational resource saved!');
  };

  const handleDeleteResource = (id: string) => {
    if (confirm('Delete this educational resource?')) {
      deleteResource(id);
      onRefreshData();
      showNotification('Resource removed.');
    }
  };

  // Content handler
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    saveWebsiteContent(siteContent);
    onRefreshData();
    showNotification('Official business information updated successfully!');
  };

  // Factory reset
  const handleFactoryReset = () => {
    if (
      confirm(
        'Reset all courses, offers, study resources, and settings back to original initial defaults?'
      )
    ) {
      resetAllDataToDefault();
      onRefreshData();
      showNotification('All platform data restored to defaults.');
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col font-sans">
      {/* Admin Top Bar */}
      <header className="bg-[#121212] border-b border-[#222222] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/trading_pathshala_official_logo.png"
            alt="Trading Pathshala"
            className="h-8 w-auto object-contain"
          />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <span>Admin Management Dashboard</span>
              <span className="text-[10px] font-mono text-[#090909] bg-[#C5A34A] px-2 py-0.5 rounded font-bold">
                CMS v2
              </span>
            </h1>
            <p className="text-[11px] text-[#A0A0A0]">
              Mentor: Prashant Kumar Sinha · Direct Mobile: +91 89875 99799
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExitAdmin}
            className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#1A1A1A] hover:bg-[#262626] border border-[#333333] hover:border-[#C5A34A] rounded flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A34A]" />
            <span>View Public Website</span>
          </button>
          <button
            onClick={onExitAdmin}
            className="p-1.5 text-[#737373] hover:text-rose-400 hover:bg-[#1A1A1A] rounded"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#C5A34A] text-[#090909] font-bold px-4 py-2 text-xs text-center flex items-center justify-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#0E0E0E] border-r border-[#222222] p-4 space-y-1 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded text-xs uppercase tracking-wider font-bold flex items-center gap-3 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#C5A34A] text-[#090909]'
                : 'text-[#A0A0A0] hover:bg-[#171717] hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full text-left px-3.5 py-2.5 rounded text-xs uppercase tracking-wider font-bold flex items-center justify-between cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-[#C5A34A] text-[#090909]'
                : 'text-[#A0A0A0] hover:bg-[#171717] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4" />
              <span>Courses ({courses.length})</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full text-left px-3.5 py-2.5 rounded text-xs uppercase tracking-wider font-bold flex items-center justify-between cursor-pointer ${
              activeTab === 'offers'
                ? 'bg-[#C5A34A] text-[#090909]'
                : 'text-[#A0A0A0] hover:bg-[#171717] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4" />
              <span>Offers ({offers.length})</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`w-full text-left px-3.5 py-2.5 rounded text-xs uppercase tracking-wider font-bold flex items-center justify-between cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-[#C5A34A] text-[#090909]'
                : 'text-[#A0A0A0] hover:bg-[#171717] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4" />
              <span>Resources ({resources.length})</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full text-left px-3.5 py-2.5 rounded text-xs uppercase tracking-wider font-bold flex items-center justify-between cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-[#C5A34A] text-[#090909]'
                : 'text-[#A0A0A0] hover:bg-[#171717] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              <span>Admissions Leads</span>
            </div>
            {enquiries.filter((e) => e.status === 'New').length > 0 && (
              <span className="bg-[#C5A34A] text-[#090909] font-mono text-[10px] font-bold px-1.5 py-0.2 rounded">
                {enquiries.filter((e) => e.status === 'New').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full text-left px-3.5 py-2.5 rounded text-xs uppercase tracking-wider font-bold flex items-center gap-3 cursor-pointer ${
              activeTab === 'testimonials'
                ? 'bg-[#C5A34A] text-[#090909]'
                : 'text-[#A0A0A0] hover:bg-[#171717] hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Testimonials ({testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`w-full text-left px-3.5 py-2.5 rounded text-xs uppercase tracking-wider font-bold flex items-center gap-3 cursor-pointer ${
              activeTab === 'content'
                ? 'bg-[#C5A34A] text-[#090909]'
                : 'text-[#A0A0A0] hover:bg-[#171717] hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Brand Information</span>
          </button>

          <div className="pt-6 mt-6 border-t border-[#1C1C1C]">
            <button
              onClick={handleFactoryReset}
              className="w-full text-left px-3.5 py-2 rounded text-[11px] text-[#737373] hover:text-[#C5A34A] hover:bg-[#121212] flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default Sample Data</span>
            </button>
          </div>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[#090909]">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Platform Metrics</h2>
                <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1 font-light">
                  Active educational modules and incoming student enquiries for Trading Pathshala.
                </p>
              </div>

              {/* Metrics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-[#121212] border border-[#222222] rounded-lg p-5 space-y-2">
                  <div className="flex items-center justify-between text-[#A0A0A0] text-xs">
                    <span>Active Courses</span>
                    <GraduationCap className="w-4 h-4 text-[#C5A34A]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">{courses.length}</div>
                  <span className="text-[11px] text-[#737373] font-mono">Beginner, Inter, Adv</span>
                </div>

                <div className="bg-[#121212] border border-[#222222] rounded-lg p-5 space-y-2">
                  <div className="flex items-center justify-between text-[#A0A0A0] text-xs">
                    <span>Active Offers</span>
                    <Tag className="w-4 h-4 text-[#C5A34A]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {offers.filter((o) => o.isActive).length}
                  </div>
                  <span className="text-[11px] text-[#737373] font-mono">Cohort fee waivers</span>
                </div>

                <div className="bg-[#121212] border border-[#222222] rounded-lg p-5 space-y-2">
                  <div className="flex items-center justify-between text-[#A0A0A0] text-xs">
                    <span>Study Guides</span>
                    <BookOpen className="w-4 h-4 text-[#C5A34A]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">{resources.length}</div>
                  <span className="text-[11px] text-[#737373] font-mono">Open access materials</span>
                </div>

                <div className="bg-[#121212] border border-[#222222] rounded-lg p-5 space-y-2">
                  <div className="flex items-center justify-between text-[#A0A0A0] text-xs">
                    <span>Student Enquiries</span>
                    <Inbox className="w-4 h-4 text-[#C5A34A]" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">{enquiries.length}</div>
                  <span className="text-[11px] text-[#C5A34A] font-mono">
                    {enquiries.filter((e) => e.status === 'New').length} New Leads
                  </span>
                </div>
              </div>

              {/* GitHub Pages Storage Notice */}
              <div className="bg-[#121212] border border-[#262626] rounded-lg p-6 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#C5A34A]">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Static Client-Side Persistence Note</span>
                </div>
                <div className="text-xs text-[#A0A0A0] space-y-2 leading-relaxed">
                  <p>
                    All changes made in this dashboard (courses added, offers edited, enquiry records) are stored in your browser's persistent localStorage, ensuring seamless static compatibility with GitHub Pages without requiring a paid server.
                  </p>
                  <p>
                    You can download all captured student admission leads as a <code>.csv</code> spreadsheet anytime from the Admissions Leads tab.
                  </p>
                </div>
              </div>

              {/* Recent Enquiries Preview */}
              <div className="bg-[#121212] border border-[#222222] rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[#1C1C1C] pb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recent Enquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-mono text-[#C5A34A] hover:underline"
                  >
                    View All ({enquiries.length})
                  </button>
                </div>

                {enquiries.length === 0 ? (
                  <p className="text-xs text-[#737373] py-2">No enquiries submitted yet.</p>
                ) : (
                  <div className="divide-y divide-[#1C1C1C]">
                    {enquiries.slice(0, 3).map((enq) => (
                      <div key={enq.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">{enq.name}</span>
                          <span className="text-[#A0A0A0] font-mono text-[11px]">
                            {enq.courseName} · Phone: {enq.phone}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#090909] bg-[#C5A34A] font-bold px-2 py-0.5 rounded">
                          {enq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Course Catalogue</h2>
                  <p className="text-xs text-[#A0A0A0]">
                    Add new programs, adjust tuition fees, modify syllabus modules.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddCourse}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Course</span>
                </button>
              </div>

              <div className="space-y-4">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-[#121212] border border-[#222222] rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={course.image}
                        alt=""
                        className="w-16 h-12 rounded object-cover bg-[#090909] shrink-0 border border-[#262626]"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono text-[#C5A34A]">
                            {course.level}
                          </span>
                          <span className="text-[#333333]">·</span>
                          <span className="text-xs text-[#A0A0A0] font-mono">{course.duration}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white">{course.name}</h3>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-mono font-bold text-white">
                            ₹{course.price.toLocaleString()}
                          </span>
                          {course.originalPrice > course.price && (
                            <span className="font-mono text-[#555555] line-through text-[11px]">
                              ₹{course.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <span className="text-[#737373]">
                            ({course.curriculum.length} Modules)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="p-2 text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded border border-[#262626] text-xs flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#C5A34A]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id, course.name)}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded border border-[#262626] text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Special Offers</h2>
                  <p className="text-xs text-[#A0A0A0]">
                    Manage active coupon codes and fee concessions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePurgeExpiredOffers}
                    className="px-3.5 py-2 text-xs font-medium text-[#A0A0A0] hover:text-white bg-[#1A1A1A] border border-[#2A2A2A] rounded"
                  >
                    Remove Expired
                  </button>
                  <button
                    onClick={handleOpenAddOffer}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Offer</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-[#121212] border border-[#222222] rounded-lg p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono text-[#E2C878] bg-[#C5A34A]/10 px-2 py-0.5 rounded border border-[#C5A34A]/20">
                        {offer.code}
                      </span>
                      <span className="text-[11px] font-mono text-[#737373]">
                        Expires: {offer.validTill}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{offer.title}</h3>
                    <p className="text-xs text-[#A0A0A0] leading-relaxed">{offer.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-[#1C1C1C] text-xs text-[#737373]">
                      <span>Discount: {offer.discount}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditOffer(offer)}
                          className="text-[#A0A0A0] hover:text-white"
                        >
                          Edit
                        </button>
                        <span>·</span>
                        <button
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="text-rose-400 hover:text-rose-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: RESOURCES */}
          {activeTab === 'resources' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Study Guides</h2>
                  <p className="text-xs text-[#A0A0A0]">
                    Add study guides, candlestick cheatsheets, and risk calculators.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddResource}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Study Document</span>
                </button>
              </div>

              <div className="space-y-3">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#121212] border border-[#222222] rounded-lg p-4 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold text-[#C5A34A] uppercase">
                        {res.category} · {res.readTime}
                      </span>
                      <h3 className="text-sm font-bold text-white">{res.title}</h3>
                      <p className="text-xs text-[#737373] line-clamp-1">{res.summary}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteResource(res.id)}
                      className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ENQUIRIES INBOX */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Admissions Leads</h2>
                  <p className="text-xs text-[#A0A0A0]">
                    {enquiries.length} total student enquiries captured via website forms.
                  </p>
                </div>
                <button
                  onClick={exportEnquiriesCSV}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#1A1A1A] hover:bg-[#262626] border border-[#333333] hover:border-[#C5A34A] rounded flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#C5A34A]" />
                  <span>Export Leads (.CSV)</span>
                </button>
              </div>

              {enquiries.length === 0 ? (
                <div className="bg-[#121212] border border-[#222222] rounded-lg p-12 text-center text-xs text-[#737373]">
                  No admissions enquiries yet. Submit a test enquiry in the Contact section!
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="bg-[#121212] border border-[#222222] rounded-lg p-5 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wide">{enq.name}</h3>
                            <span className="text-[11px] font-mono text-[#090909] bg-[#C5A34A] font-bold px-2 py-0.5 rounded">
                              {enq.courseName}
                            </span>
                          </div>
                          <div className="text-xs text-[#A0A0A0] font-mono mt-1 flex items-center gap-3">
                            <span className="flex items-center gap-1 text-white">
                              <Phone className="w-3 h-3 text-[#C5A34A]" />
                              {enq.phone}
                            </span>
                            <a
                              href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#C5A34A] hover:underline flex items-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>Open WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={enq.status}
                            onChange={(e) => {
                              updateEnquiryStatus(
                                enq.id,
                                e.target.value as 'New' | 'Contacted' | 'Closed'
                              );
                              onRefreshData();
                            }}
                            className="bg-[#090909] border border-[#262626] text-[11px] rounded px-2.5 py-1 text-white font-mono"
                          >
                            <option value="New">Status: New</option>
                            <option value="Contacted">Status: Contacted</option>
                            <option value="Closed">Status: Closed</option>
                          </select>
                          <button
                            onClick={() => {
                              if (confirm('Delete this enquiry record?')) {
                                deleteEnquiry(enq.id);
                                onRefreshData();
                              }
                            }}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-[#1A1A1A] rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {enq.message && (
                        <div className="p-3 bg-[#090909] rounded border border-[#1F1F1F] text-xs text-[#CCCCCC] font-mono">
                          "{enq.message}"
                        </div>
                      )}
                      <div className="text-[10px] text-[#555555] font-mono">
                        Logged on: {new Date(enq.submittedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Testimonials Management</h2>
                <p className="text-xs text-[#A0A0A0]">
                  Edit or remove placeholder feedback when genuine student submissions are received.
                </p>
              </div>

              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#121212] border border-[#222222] rounded-lg p-5 space-y-2 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{t.name}</span>
                        <span className="text-xs text-[#C5A34A]">({t.role})</span>
                      </div>
                      <p className="text-xs text-[#A0A0A0] italic mt-1 font-light">"{t.feedback}"</p>
                      <span className="text-[11px] text-[#555555] block mt-1 font-mono">
                        Course: {t.courseTaken} · Rated {t.rating}/5
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Remove testimonial?')) {
                          deleteTestimonial(t.id);
                          onRefreshData();
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-[#1A1A1A] rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTENT & BRAND SETTINGS */}
          {activeTab === 'content' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                  Official Brand & Contact Settings
                </h2>
                <p className="text-xs text-[#A0A0A0]">
                  Maintain verified contact coordinates for Trading Pathshala and mentor Prashant Kumar Sinha.
                </p>
              </div>

              <form onSubmit={handleSaveContent} className="bg-[#121212] border border-[#222222] rounded-lg p-7 space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">
                    Announcement Banner
                  </label>
                  <input
                    type="text"
                    value={siteContent.announcementText}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, announcementText: e.target.value })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">
                      Contact Person & Mentor
                    </label>
                    <input
                      type="text"
                      value={siteContent.contactPerson}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, contactPerson: e.target.value })
                      }
                      className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">
                      Official Phone / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={siteContent.officialPhone}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          officialPhone: e.target.value,
                          whatsappNumber: e.target.value,
                        })
                      }
                      className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">
                      Instagram Username
                    </label>
                    <input
                      type="text"
                      value={siteContent.instagramHandle}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, instagramHandle: e.target.value })
                      }
                      className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="text"
                      value={siteContent.instagramUrl}
                      onChange={(e) =>
                        setSiteContent({ ...siteContent, instagramUrl: e.target.value })
                      }
                      className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">
                    Official Business Address (Consistent Everywhere)
                  </label>
                  <textarea
                    rows={4}
                    value={siteContent.officeAddress}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, officeAddress: e.target.value })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                  />
                  <span className="text-[10px] text-[#737373] mt-1 block">
                    Format: Trading Pathshala / 3rd Floor, Mahadev Inn / Jalsar Road, Shivganga Muhalla / Deoghar, Jharkhand – 814112, India.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">
                    Google Maps Directions URL
                  </label>
                  <input
                    type="url"
                    value={siteContent.googleMapsDirectionsUrl}
                    onChange={(e) =>
                      setSiteContent({ ...siteContent, googleMapsDirectionsUrl: e.target.value })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded transition-all shadow-md cursor-pointer"
                  >
                    Save Verified Coordinates
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Course Edit/Create Modal */}
      {isCourseModalOpen && editingCourse && (
        <div className="fixed inset-0 z-50 bg-[#090909]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2E2E2E] rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-[#222222] flex items-center justify-between">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                {editingCourse.name ? 'Edit Course Program' : 'Create New Course Program'}
              </h3>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="p-1 text-[#737373] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Course Name *</label>
                <input
                  type="text"
                  required
                  value={editingCourse.name || ''}
                  onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  placeholder="e.g. Price Action Trading & Market Structure"
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-4 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Level</label>
                  <select
                    value={editingCourse.level || 'Beginner'}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        level: e.target.value as Course['level'],
                        category: e.target.value as Course['category'],
                      })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Tuition Fee (₹)</label>
                  <input
                    type="number"
                    value={editingCourse.price || 0}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, price: Number(e.target.value) })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingCourse.originalPrice || 0}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, originalPrice: Number(e.target.value) })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration || '6 Weeks (36 Hours)'}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3.5 py-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Course Image Asset</label>
                  <select
                    value={editingCourse.image}
                    onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white focus:outline-none text-xs"
                  >
                    <option value="/src/assets/images/course_price_action_1793416379591.jpg">
                      Preset: Price Action Candlestick Chart
                    </option>
                    <option value="/src/assets/images/course_options_derivatives_1793416378747.jpg">
                      Preset: Options & Derivatives Workstation
                    </option>
                    <option value="/src/assets/images/course_technical_analysis_1793416380606.jpg">
                      Preset: Multi-Indicator Trading Desk
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingCourse.shortDescription || ''}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, shortDescription: e.target.value })
                  }
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3.5 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Full Detailed Overview</label>
                <textarea
                  rows={3}
                  value={editingCourse.fullDescription || ''}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, fullDescription: e.target.value })
                  }
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3.5 py-2 text-white focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#1C1C1C] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-[#737373] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offer Modal */}
      {isOfferModalOpen && editingOffer && (
        <div className="fixed inset-0 z-50 bg-[#090909]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2E2E2E] rounded-lg w-full max-w-md shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Create / Edit Offer</h3>
            <form onSubmit={handleSaveOffer} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  value={editingOffer.title || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                  placeholder="e.g. New Batch Concession"
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={editingOffer.code || ''}
                    onChange={(e) =>
                      setEditingOffer({ ...editingOffer, code: e.target.value.toUpperCase() })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Discount Tag</label>
                  <input
                    type="text"
                    required
                    value={editingOffer.discount || ''}
                    onChange={(e) => setEditingOffer({ ...editingOffer, discount: e.target.value })}
                    placeholder="25% Flat Discount"
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Valid Till Date</label>
                <input
                  type="date"
                  value={editingOffer.validTill || '2026-11-30'}
                  onChange={(e) => setEditingOffer({ ...editingOffer, validTill: e.target.value })}
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingOffer.description || ''}
                  onChange={(e) =>
                    setEditingOffer({ ...editingOffer, description: e.target.value })
                  }
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#737373]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {isResourceModalOpen && editingResource && (
        <div className="fixed inset-0 z-50 bg-[#090909]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2E2E2E] rounded-lg w-full max-w-xl shadow-2xl p-6 space-y-4 max-h-[90vh] flex flex-col">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Add / Edit Study Resource</h3>
            <form onSubmit={handleSaveResource} className="space-y-3 overflow-y-auto text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingResource.title || ''}
                  onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Category</label>
                  <select
                    value={editingResource.category}
                    onChange={(e) =>
                      setEditingResource({
                        ...editingResource,
                        category: e.target.value as LearningResource['category'],
                      })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white"
                  >
                    <option value="Study Materials">Study Materials</option>
                    <option value="Trading Guides">Trading Guides</option>
                    <option value="Market Basics">Market Basics</option>
                    <option value="Technical Analysis">Technical Analysis</option>
                    <option value="Educational Articles">Educational Articles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingResource.readTime || '5 min read'}
                    onChange={(e) =>
                      setEditingResource({ ...editingResource, readTime: e.target.value })
                    }
                    className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Brief Summary</label>
                <textarea
                  rows={2}
                  value={editingResource.summary || ''}
                  onChange={(e) =>
                    setEditingResource({ ...editingResource, summary: e.target.value })
                  }
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#A0A0A0] mb-1">Content / Notes</label>
                <textarea
                  rows={6}
                  required
                  value={editingResource.content || ''}
                  onChange={(e) =>
                    setEditingResource({ ...editingResource, content: e.target.value })
                  }
                  className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded px-3 py-2 text-white font-mono text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsResourceModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#737373]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
