import React, { useState } from 'react';
import { PageView } from '../types';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { Menu, X, User } from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  onOpenEnquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Courses', view: 'courses' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleLinkClick = (view: PageView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Gold Bull Logo */}
          <div
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer flex items-center group py-2"
            role="button"
            tabIndex={0}
            aria-label="Trading Pathsala Home"
          >
            <div className="bg-[#0B150F] px-3 py-1.5 rounded-xl border border-[#B99B52]/40 shadow-xs flex items-center">
              <img
                src={officialLogo}
                alt="Trading Pathsala - Learn the Art of Trading"
                className="h-10 sm:h-11 w-auto max-w-[210px] object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleLinkClick(link.view)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#174D32] bg-[#EBF3ED]'
                      : 'text-gray-700 hover:text-[#174D32] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Student Login Button */}
            <button
              onClick={() => handleLinkClick('student-login')}
              className={`ml-2 px-4 py-2 text-sm font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'student-login'
                  ? 'bg-[#174D32] text-white border-[#174D32]'
                  : 'text-[#174D32] border-[#174D32]/30 hover:bg-[#EBF3ED]'
              }`}
            >
              <User className="w-4 h-4 text-[#B99B52]" />
              <span>Student Login</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => handleLinkClick('student-login')}
              className="text-xs font-bold text-[#174D32] bg-[#EBF3ED] px-3 py-2 rounded-lg border border-[#174D32]/20"
            >
              Student Login
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#174D32] rounded-lg cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 shadow-md">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => handleLinkClick(link.view)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
                currentView === link.view
                  ? 'text-[#174D32] bg-[#EBF3ED] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('student-login')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-[#174D32] bg-[#EBF3ED] flex items-center gap-2 cursor-pointer mt-1"
          >
            <User className="w-4 h-4 text-[#B99B52]" />
            <span>Student Login</span>
          </button>
        </div>
      )}
    </header>
  );
};
