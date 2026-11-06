import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Enquiry, Course } from '../types';
import { getEnquiries, updateEnquiryStatus, getCourses } from '../services/storage';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import {
  Users,
  MessageSquare,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Phone,
  Mail,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadData = () => {
    setEnquiries(getEnquiries());
    setCourses(getCourses());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = (id: string, newStatus: 'New' | 'Contacted' | 'Closed') => {
    const updated = updateEnquiryStatus(id, newStatus);
    setEnquiries(updated);
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesFilter = filterStatus === 'All' ? true : item.status === filterStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === 'New').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;
  const closedCount = enquiries.filter((e) => e.status === 'Closed').length;

  return (
    <div className="w-full bg-[#FCFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#916E16] hover:underline bg-white px-4 py-2 rounded-xl border border-[#E8E2D5] shadow-2xs self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Website</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-red-100 text-red-800 font-bold px-3 py-1 rounded-full border border-red-200">
              Admin Portal
            </span>
            <span className="text-xs text-[#71717A]">Management Desk</span>
          </div>
        </div>

        {/* Admin Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#0B0B0C] p-3 rounded-2xl border border-[#D4AF37]/50 shadow-xs">
              <img
                src={officialLogo}
                alt="Trading Pathsala"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
                Administrator Control Center
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                Enquiries &amp; Admissions Desk
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student-login"
              className="bg-[#FAF7F0] hover:bg-[#F3EFE4] text-[#18181B] font-bold text-xs px-4 py-2.5 rounded-xl border border-[#E8E2D5] transition-colors"
            >
              Open Student Portal →
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs space-y-1">
            <div className="text-xs font-bold text-[#71717A] uppercase">Total Enquiries</div>
            <div className="text-2xl sm:text-3xl font-black text-[#18181B]">{totalCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs space-y-1">
            <div className="text-xs font-bold text-amber-700 uppercase">New Inquiries</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-700">{newCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs space-y-1">
            <div className="text-xs font-bold text-blue-700 uppercase">In Contact</div>
            <div className="text-2xl sm:text-3xl font-black text-blue-700">{contactedCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8E2D5] shadow-2xs space-y-1">
            <div className="text-xs font-bold text-emerald-700 uppercase">Enrolled / Closed</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">{closedCount}</div>
          </div>
        </div>

        {/* Enquiries Management Area */}
        <div className="bg-white rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#18181B]">
                Student Admission Enquiries
              </h2>
              <p className="text-xs text-[#71717A]">
                View, search, and update follow-up statuses for incoming course and service queries.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'New', 'Contacted', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filterStatus === st
                      ? 'bg-black text-[#F5D061]'
                      : 'bg-[#FAF7F0] text-[#52525B] hover:bg-[#F3EFE4] border border-[#E8E2D5]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by student name, phone number, email, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5CEBE] bg-[#FCFBF7] text-sm text-[#18181B] focus:outline-hidden focus:border-[#C59B27]"
            />
          </div>

          {/* Enquiries Table / List */}
          {filteredEnquiries.length === 0 ? (
            <div className="p-12 text-center text-[#71717A] text-sm bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] space-y-2">
              <p className="font-bold text-[#18181B]">No enquiries match the current filter.</p>
              <p className="text-xs">When users submit admission forms on the website, they will appear here in real time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEnquiries.map((enq) => {
                const waLink = `https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${enq.name}, this is Prashant Kumar Sinha from Trading Pathshala regarding your enquiry for ${enq.courseName}.`
                )}`;

                return (
                  <div
                    key={enq.id}
                    className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#E8E2D5] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-[#18181B]">{enq.name}</span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              enq.status === 'New'
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : enq.status === 'Contacted'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#71717A]">
                          Course / Topic: <strong className="text-[#18181B]">{enq.courseName}</strong> • {new Date(enq.submittedAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-2 sm:pt-0">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>WhatsApp Student</span>
                        </a>

                        <div className="flex items-center gap-1">
                          {enq.status !== 'Contacted' && (
                            <button
                              onClick={() => handleStatusChange(enq.id, 'Contacted')}
                              className="text-xs font-semibold bg-white hover:bg-gray-50 border border-gray-300 px-2.5 py-1.5 rounded-lg text-blue-700 cursor-pointer"
                            >
                              Mark Contacted
                            </button>
                          )}
                          {enq.status !== 'Closed' && (
                            <button
                              onClick={() => handleStatusChange(enq.id, 'Closed')}
                              className="text-xs font-semibold bg-white hover:bg-gray-50 border border-gray-300 px-2.5 py-1.5 rounded-lg text-emerald-700 cursor-pointer"
                            >
                              Mark Closed
                            </button>
                          )}
                          {enq.status !== 'New' && (
                            <button
                              onClick={() => handleStatusChange(enq.id, 'New')}
                              className="text-xs font-semibold bg-white hover:bg-gray-50 border border-gray-300 px-2.5 py-1.5 rounded-lg text-gray-700 cursor-pointer"
                            >
                              Reset to New
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#52525B] pt-2 border-t border-[#E8E2D5]">
                      <div>
                        <strong>Phone:</strong> <a href={`tel:${enq.phone}`} className="hover:underline">{enq.phone}</a>
                      </div>
                      <div>
                        <strong>Email:</strong> <a href={`mailto:${enq.email}`} className="hover:underline">{enq.email}</a>
                      </div>
                    </div>

                    {enq.message && (
                      <div className="bg-white p-3 rounded-xl border border-[#E8E2D5] text-xs text-[#3F3F46]">
                        <span className="font-semibold text-[#18181B]">Message: </span>
                        {enq.message}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
