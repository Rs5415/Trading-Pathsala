import React, { useState } from 'react';
import { LearningResourceItem, AnnouncementItem } from '../types';
import { getResources, getAnnouncements } from '../services/storage';
import { FileText, Download, Bell, BookOpen } from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  const [resources] = useState<LearningResourceItem[]>(getResources());
  const [announcements] = useState<AnnouncementItem[]>(getAnnouncements());

  const handleDownload = (item: LearningResourceItem) => {
    alert(`Downloading ${item.title} (${item.fileSize})...`);
  };

  return (
    <section id="resources" className="py-16 sm:py-24 bg-white border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-block bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Student Resource Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight">
            Learning Materials & Resources
          </h2>
          <p className="text-base text-[#52525B]">
            Access educational PDFs, trading guides, course study notes, and important institute announcements.
          </p>
        </div>

        {/* Announcements Banner Grid */}
        <div className="bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#916E16]">
            <Bell className="w-4 h-4 text-[#C59B27]" />
            <span>Important Announcements</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-xl bg-white border border-[#E8E2D5] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 px-2.5 py-0.5 rounded-md">
                    {ann.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#71717A]">{ann.date}</span>
                </div>
                <h3 className="font-bold text-[#18181B] text-base">{ann.title}</h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Materials & PDFs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#18181B] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#916E16]" />
              <span>Downloadable Study Guides & PDFs</span>
            </h3>
            <span className="text-xs font-semibold text-[#71717A]">{resources.length} items available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="bg-[#FCFBF7] p-6 rounded-2xl border border-[#E8E2D5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#916E16] bg-[#FAF2DE] border border-[#E5B83A]/30 px-2.5 py-1 rounded-md">
                      {res.category}
                    </span>
                    <span className="text-xs font-semibold text-[#71717A]">{res.fileSize}</span>
                  </div>

                  <h4 className="text-lg font-bold text-[#18181B] group-hover:text-[#916E16] transition-colors">
                    {res.title}
                  </h4>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8E2D5] flex items-center justify-between">
                  <span className="text-xs text-[#71717A]">Added: {res.dateAdded}</span>
                  <button
                    onClick={() => handleDownload(res)}
                    className="bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] hover:brightness-105 text-black text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-black" />
                    <span>Download Resource</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
