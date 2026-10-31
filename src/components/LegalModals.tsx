import React from 'react';
import { X, ShieldAlert, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    disclaimer: {
      title: 'Financial Market Educational & Risk Disclaimer',
      icon: ShieldAlert,
      badge: 'Regulatory Risk Disclosure',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
          <div className="p-4 rounded bg-[#171717] border border-[#C5A34A]/40 text-[#E2C878] space-y-1">
            <strong className="block text-white font-bold text-sm uppercase tracking-wide">
              Mandatory Regulatory Notice
            </strong>
            <p className="text-xs text-[#E5E5E5] leading-relaxed">
              Trading Pathshala provides educational content related to financial markets. Educational information is not a recommendation to buy or sell securities. Trading and investing involve financial risk. Users should make independent decisions and understand the risks involved.
            </p>
          </div>

          <h4 className="text-white font-bold text-sm uppercase tracking-wider pt-2">1. Pure Educational Objective</h4>
          <p>
            All content, modules, charts, case studies, live mentorship webinars, and materials published by Trading Pathshala under Prashant Kumar Sinha are strictly for academic and educational purposes. Nothing on this website or in our training sessions constitutes financial advice, investment advisory, research reporting, or solicitation.
          </p>

          <h4 className="text-white font-bold text-sm uppercase tracking-wider pt-2">2. No Guaranteed Returns or Profit Promises</h4>
          <p>
            Stock market trading (equities, futures, options, commodities) involves substantial risk of capital loss. Past hypothetical or historical chart setups do not guarantee future performance. Anyone trading the markets must practice strict risk management and independent discretion.
          </p>

          <h4 className="text-white font-bold text-sm uppercase tracking-wider pt-2">3. Regulatory Status</h4>
          <p>
            Trading Pathshala does not claim SEBI (Securities and Exchange Board of India) registration as a Research Analyst (RA) or Investment Adviser (IA). We do not run tip services, Telegram buy/sell channels, or managed accounts.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Lock,
      badge: 'Data Protection & Transparency',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
          <p>
            At Trading Pathshala, we are committed to safeguarding your privacy and respecting the confidentiality of any personal details you share with us during course enquiry or registration.
          </p>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider pt-2">1. Information We Collect</h4>
          <p>
            When you submit an admission enquiry form or connect via WhatsApp (+91 89875 99799), we collect your name, phone number, and learning preferences. We do not sell, rent, or trade your contact data to third-party commercial marketing networks.
          </p>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider pt-2">2. Communication Usage</h4>
          <p>
            Your information is solely used by mentor Prashant Kumar Sinha or our direct admissions desk to communicate batch timings, syllabus outlines, and enrollment confirmations.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions of Enrollment',
      icon: FileText,
      badge: 'Academic Terms of Service',
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">1. Academic Enrollment</h4>
          <p>
            Admission to cohorts is granted on a seat-availability basis. Course syllabus schedules, mentor timing, and lecture recordings are provided for educational enrichment.
          </p>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider pt-2">2. Intellectual Property</h4>
          <p>
            All course videos, study guides, presentation slides, and learning resources authored by Trading Pathshala are the intellectual property of the platform. Unauthorized recording, commercial redistribution, or sharing of course materials is strictly prohibited.
          </p>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider pt-2">3. Code of Conduct</h4>
          <p>
            Students are expected to maintain professional and respectful decorum in live sessions and community forums. We encourage constructive questioning and disciplined study habits.
          </p>
        </div>
      ),
    },
  };

  const current = contentMap[type];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 bg-[#090909]/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-[#2E2E2E] rounded-lg w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="px-6 py-5 border-b border-[#222222] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[#C5A34A]">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#C5A34A] font-bold uppercase tracking-wider">
                {current.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">{current.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#737373] hover:text-white hover:bg-[#1C1C1C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">{current.body}</div>

        <div className="px-6 py-4 border-t border-[#222222] bg-[#0A0A0A] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded transition-colors cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
