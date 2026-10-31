import React, { useState } from 'react';
import { LearningResource } from '../types';
import { BookOpen, Download, Clock, ArrowRight, X, FileText, Check } from 'lucide-react';

interface LearningResourcesSectionProps {
  resources: LearningResource[];
}

export const LearningResourcesSection: React.FC<LearningResourcesSectionProps> = ({ resources }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingResource, setReadingResource] = useState<LearningResource | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = [
    'All',
    'Study Materials',
    'Trading Guides',
    'Market Basics',
    'Technical Analysis',
    'Educational Articles',
  ];

  const filteredResources = resources.filter((res) => {
    if (selectedCategory === 'All') return true;
    return res.category === selectedCategory;
  });

  const handleDownload = (res: LearningResource) => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `# TRADING PATHSHALA — LEARN THE ART OF TRADING\n# ${res.title}\nCategory: ${res.category}\nMentor: Prashant Kumar Sinha\nOfficial Phone / WhatsApp: +91 89875 99799\nInstagram: https://www.instagram.com/tradingpathsala/\n\n${res.content}`,
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = res.downloadLabel || `${res.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccess(res.id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <section id="resources" className="py-24 bg-[#0E0E0E] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
            <span>Open Access Library</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
            Learning Resources & Study Guides
          </h2>
          <p className="mt-3 text-[#A0A0A0] text-sm sm:text-base leading-relaxed font-light">
            High-yield reference notes, market structure handbooks, and candlestick checklists prepared to accelerate your independent market comprehension.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#C5A34A] text-[#090909] shadow-md shadow-[#C5A34A]/20'
                    : 'bg-[#171717] text-[#A0A0A0] hover:text-white border border-[#262626]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-[#121212] border border-[#222222] hover:border-[#C5A34A]/40 rounded-lg p-7 flex flex-col justify-between transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs border-b border-[#1C1C1C] pb-3">
                  <span className="text-[#C5A34A] font-mono text-[11px] font-bold uppercase">
                    {res.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-[#737373]">
                    <Clock className="w-3 h-3 text-[#C5A34A]" />
                    {res.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#E2C878] transition-colors leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-[#A0A0A0] leading-relaxed line-clamp-3">
                  {res.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {res.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-[#A0A0A0] bg-[#1A1A1A] border border-[#262626] px-2 py-0.5 rounded font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1C1C1C] flex items-center justify-between gap-3">
                <button
                  onClick={() => setReadingResource(res)}
                  className="text-xs font-bold uppercase tracking-wider text-[#C5A34A] hover:text-[#E2C878] flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>

                <button
                  onClick={() => handleDownload(res)}
                  className="px-3 py-1.5 rounded bg-[#171717] hover:bg-[#222222] text-xs font-medium text-[#CCCCCC] hover:text-white border border-[#2E2E2E] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Download Document"
                >
                  {downloadSuccess === res.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C5A34A]" />
                      <span className="text-[#C5A34A] text-xs">Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {readingResource && (
        <div className="fixed inset-0 z-50 bg-[#090909]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2E2E2E] rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#222222] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#C5A34A] uppercase">
                  {readingResource.category} · {readingResource.readTime}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {readingResource.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingResource(null)}
                className="p-1.5 rounded text-[#737373] hover:text-white hover:bg-[#1C1C1C]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#CCCCCC] leading-relaxed font-sans">
              <div className="p-3 bg-[#0A0A0A] rounded border border-[#222222] text-xs text-[#A0A0A0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C5A34A] shrink-0" />
                  <span>Trading Pathshala Educational Guide · Prashant Kumar Sinha</span>
                </div>
                <span className="text-[11px] font-mono text-[#C5A34A]">Free Study Resource</span>
              </div>

              <div className="whitespace-pre-line leading-relaxed space-y-4">
                {readingResource.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#222222] bg-[#0A0A0A] flex items-center justify-between">
              <span className="text-xs font-mono text-[#555555]">Updated: {readingResource.updatedAt}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownload(readingResource)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#171717] hover:bg-[#222222] border border-[#2A2A2A] rounded flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A34A]" />
                  <span>Download Document</span>
                </button>
                <button
                  onClick={() => setReadingResource(null)}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
