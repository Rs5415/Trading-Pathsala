import React, { useState } from 'react';
import { Menu, X, Shield, Phone, MessageCircle } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView, courseSlug?: string) => void;
  onOpenAdmin: () => void;
  onOpenEnquiry: (courseName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAdmin,
  onOpenEnquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About', view: 'about' },
    { label: 'Courses', view: 'courses' },
    { label: 'Services', view: 'services' },
    { label: 'Learning Resources', view: 'resources' },
    { label: 'Offers', view: 'offers' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090909]/95 backdrop-blur-md border-b border-[#222222]">
      {/* Top micro-bar for direct contact & official handles */}
      <div className="bg-[#121212] border-b border-[#1f1f1f] text-xs text-[#A0A0A0] py-1.5 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <a
              href="tel:+918987599799"
              className="hover:text-[#C5A34A] transition-colors flex items-center gap-1.5 text-[11px] sm:text-xs shrink-0"
            >
              <Phone className="w-3 h-3 text-[#C5A34A]" />
              <span className="font-mono text-white tracking-wide">+91 89875 99799</span>
            </a>
            <span className="hidden md:inline text-[#333333]">|</span>
            <span className="hidden md:inline text-[11px] text-[#A0A0A0] truncate">
              Mentor: <strong className="text-white font-medium">Prashant Kumar Sinha</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] shrink-0">
            <a
              href="https://wa.me/918987599799"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A34A] hover:text-[#E2C878] transition-colors flex items-center gap-1 font-medium whitespace-nowrap"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
            <span className="text-[#333333] hidden sm:inline">|</span>
            <a
              href="https://www.instagram.com/tradingpathsala/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C5A34A] transition-colors font-medium text-white hidden sm:inline whitespace-nowrap"
            >
              @tradingpathsala
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-6 h-16 sm:h-20">
          {/* Official Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none shrink-0 group cursor-pointer min-w-0"
          >
            <img
              src={`${import.meta.env.BASE_URL}trading_pathshala_official_logo.png`}
              alt="Trading Pathshala - Learn the Art of Trading"
              className="h-8 sm:h-12 w-auto object-contain max-w-[150px] sm:max-w-none"
            />
          </button>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs sm:text-sm font-medium tracking-wide">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative uppercase text-[12px] tracking-wider font-semibold ${
                    isActive
                      ? 'text-[#C5A34A]'
                      : 'text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A34A]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Join Now */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              title="Admin Console (Passkey: zxcvbnm)"
              className="p-2 text-[#737373] hover:text-[#C5A34A] hover:bg-[#171717] rounded border border-[#262626] transition-colors"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenEnquiry('Join Now - Cohort Admission')}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#090909] bg-gradient-to-r from-[#C5A34A] to-[#E2C878] hover:brightness-110 rounded transition-all duration-150 shadow-md shadow-[#C5A34A]/20 cursor-pointer"
            >
              Join Now
            </button>
          </div>

          {/* Mobile menu triggers */}
          <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => onOpenEnquiry('Join Now')}
              className="px-2.5 py-1.5 sm:px-3 text-[10px] sm:text-[11px] font-bold uppercase text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded transition-colors whitespace-nowrap"
            >
              Join Now
            </button>
            <button
              onClick={onOpenAdmin}
              title="Admin Portal"
              className="p-1.5 sm:p-2 text-[#737373] hover:text-[#C5A34A] rounded border border-[#262626]"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-white hover:text-[#C5A34A] rounded hover:bg-[#171717] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#262626] bg-[#0E0E0E] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => handleNavClick(link.view)}
              className={`w-full text-left px-3.5 py-3 rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-between ${
                currentView === link.view
                  ? 'bg-[#171717] text-[#C5A34A]'
                  : 'text-[#A0A0A0] hover:bg-[#171717] hover:text-white'
              }`}
            >
              <span>{link.label}</span>
            </button>
          ))}

          <div className="pt-4 border-t border-[#1F1F1F] space-y-2">
            <div className="text-xs text-[#A0A0A0] px-3 space-y-1">
              <div>Contact Person: <strong className="text-white">Prashant Kumar Sinha</strong></div>
              <div>Direct Phone: <a href="tel:+918987599799" className="text-[#C5A34A] font-mono">+91 89875 99799</a></div>
            </div>
            <div className="pt-2 flex gap-2">
              <a
                href="https://wa.me/918987599799"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 bg-[#171717] border border-[#262626] text-white hover:text-[#C5A34A] text-xs font-semibold rounded"
              >
                WhatsApp Us
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry('Mobile Join Now');
                }}
                className="flex-1 text-center py-2.5 bg-[#C5A34A] text-[#090909] font-bold text-xs uppercase tracking-wider rounded"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
