import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, Shield, CheckCircle2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, userProfile, isAdmin } = useAuth();

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

  const displayName = userProfile?.name || user?.displayName || (user ? 'Student' : '');

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0B0B0C] text-white border-b border-[#D4AF37]/30 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo on the Left - Clean, seamless & stable */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="cursor-pointer flex items-center justify-start shrink-0 select-none py-1 group"
            aria-label="Trading Pathsala Home"
          >
            <img
              src={officialLogo}
              alt="Trading Pathsala - Learn the Art of Trading"
              className="h-[42px] sm:h-14 w-auto object-contain object-left block transition-transform group-hover:scale-[1.01]"
              style={{ aspectRatio: '2000/923' }}
            />
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

          {/* User Auth Portal Actions on Right (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-1.5 text-xs font-bold rounded-lg border border-red-400/40 bg-red-950/40 text-red-300 hover:bg-red-900/50 flex items-center gap-1.5 transition-colors"
                title="Administrator Management Desk"
              >
                <Shield className="w-3.5 h-3.5 text-red-400" />
                <span>Admin Desk</span>
              </Link>
            )}

            <Link
              to={isAdmin ? '/admin' : '/student-login'}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs ${
                location.pathname === '/student-login' || location.pathname === '/admin'
                  ? 'bg-gradient-to-r from-[#F5D061] to-[#D4AF37] text-black font-extrabold shadow-md'
                  : 'bg-gradient-to-r from-[#E5B83A] to-[#C59B27] hover:brightness-110 text-black font-extrabold'
              }`}
            >
              <User className="w-4 h-4 text-black" />
              <span>{user ? (isAdmin ? 'Admin Desk' : `Portal (${displayName.split(' ')[0]})`) : 'Student Login'}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle & Portal Button Aligned on Right */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              to={isAdmin ? '/admin' : '/student-login'}
              onClick={closeMobileMenu}
              className="text-[11px] min-[360px]:text-xs font-bold text-black bg-[#E5B83A] hover:bg-[#d4a82b] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors shrink-0 flex items-center gap-1 shadow-2xs"
            >
              <User className="w-3.5 h-3.5 text-black" />
              <span>{user ? (isAdmin ? 'Admin' : 'Portal') : 'Login'}</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-gray-300 hover:text-white rounded-lg cursor-pointer shrink-0 min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#E5B83A]" /> : <Menu className="w-5 h-5 text-[#E5B83A]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121315] border-t border-[#D4AF37]/30 px-4 py-4 space-y-2 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
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

          {isAdmin && (
            <Link
              to="/admin"
              onClick={closeMobileMenu}
              className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-red-300 bg-red-950/40 border border-red-400/30 flex items-center gap-2 cursor-pointer mt-2"
            >
              <Shield className="w-4 h-4 text-red-400" />
              <span>Admin Desk</span>
            </Link>
          )}

          <Link
            to="/student-login"
            onClick={closeMobileMenu}
            className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-black bg-[#E5B83A] flex items-center gap-2 cursor-pointer mt-2"
          >
            <User className="w-4 h-4" />
            <span>{user ? `Student Dashboard (${displayName})` : 'Student Login'}</span>
          </Link>
        </div>
      )}
    </header>
  );
};
