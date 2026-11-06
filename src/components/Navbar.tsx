import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { Menu, X, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Courses', path: '/courses' },
    { label: 'Services', path: '/services' },
    { label: 'Offers', path: '/offers' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B0B0C] text-white border-b border-[#D4AF37]/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo on the Left */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="cursor-pointer flex items-center group py-2"
            aria-label="Trading Pathsala Home"
          >
            <div className="bg-[#121415] px-3.5 py-1.5 rounded-xl border border-[#D4AF37]/50 shadow-xs flex items-center transition-transform group-hover:scale-[1.02]">
              <img
                src={officialLogo}
                alt="Trading Pathsala - Learn the Art of Trading"
                className="h-11 sm:h-12 w-auto max-w-[210px] object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    active
                      ? 'text-[#F5D061] bg-white/10 font-bold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Golden-Yellow Student Login Button on Right */}
          <div className="hidden md:flex items-center">
            <Link
              to="/student-login"
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                location.pathname === '/student-login'
                  ? 'bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-black font-extrabold shadow-md'
                  : 'bg-gradient-to-r from-[#E5B83A] to-[#C59B27] hover:brightness-110 text-black font-extrabold'
              }`}
            >
              <User className="w-4 h-4 text-black" />
              <span>Student Login</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/student-login"
              onClick={closeMobileMenu}
              className="text-xs font-bold text-black bg-[#E5B83A] px-3 py-2 rounded-lg"
            >
              Login
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E5B83A]" /> : <Menu className="w-6 h-6 text-[#E5B83A]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121315] border-t border-[#D4AF37]/30 px-4 py-4 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                  active
                    ? 'text-[#F5D061] bg-white/10 font-bold'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/student-login"
            onClick={closeMobileMenu}
            className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-black bg-[#E5B83A] flex items-center gap-2 cursor-pointer mt-2"
          >
            <User className="w-4 h-4" />
            <span>Student Login</span>
          </Link>
        </div>
      )}
    </header>
  );
};
