import React from 'react';
import { Link } from 'react-router-dom';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E8E2D5] text-[#52525B] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Logo & Tagline */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <div className="bg-[#0B0B0C] p-3 rounded-xl border border-[#D4AF37]/50 inline-block shadow-xs">
                <img
                  src={officialLogo}
                  alt="Trading Pathsala - Learn the Art of Trading"
                  className="h-14 w-auto max-w-[220px] object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-[#52525B] max-w-sm leading-relaxed">
              Trading Pathshala is dedicated to structured stock market and trading education. Learn • Practice • Grow with professional guidance, price action, and disciplined risk control.
            </p>
          </div>

          {/* Quick Links (6 Main Pages) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#916E16] text-[#52525B] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#916E16] text-[#52525B] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#916E16] text-[#52525B] transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#916E16] text-[#52525B] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-[#916E16] text-[#52525B] transition-colors">
                  Offers &amp; Bundles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#916E16] text-[#52525B] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Separate Portals & Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/student-login" className="hover:text-[#916E16] text-[#52525B] font-semibold transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/student-login" className="hover:text-[#916E16] text-[#52525B] transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#916E16] text-[#52525B] text-xs transition-colors flex items-center gap-1 text-neutral-400 hover:text-neutral-700">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Desk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-3 space-y-3 text-sm">
            <h4 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">Campus &amp; Support</h4>
            <div className="space-y-2.5 text-[#52525B]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#916E16] shrink-0" />
                <a href="mailto:support@tradingpathsala.in" className="hover:text-[#916E16] underline font-medium">
                  support@tradingpathsala.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#916E16] shrink-0" />
                <a href="tel:+918987599799" className="hover:text-[#916E16] font-medium">
                  +91 89875 99799
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-xs text-[#71717A]">
                <MapPin className="w-4 h-4 text-[#916E16] shrink-0 mt-0.5" />
                <span>3rd Floor, Mahadev Inn, Jalsar Road, Shivganga Muhalla, Deoghar, Jharkhand – 814112</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <div>© {new Date().getFullYear()} TRADING PATHSHALA. All rights reserved.</div>
          <div className="font-semibold text-[#916E16]">Tagline: Learn • Practice • Grow</div>
        </div>
      </div>
    </footer>
  );
};
