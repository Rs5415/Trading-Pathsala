import React from 'react';
import { PageView } from '../types';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[#E8E2D5] text-[#52525B] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Logo & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-[#0B0B0C] p-3 rounded-xl border border-[#D4AF37]/50 inline-block shadow-xs">
              <img
                src={officialLogo}
                alt="Trading Pathshala - Learn • Practice • Grow"
                className="h-10 w-auto max-w-[200px] object-contain"
              />
            </div>
            <p className="text-sm text-[#52525B] max-w-sm leading-relaxed">
              Trading Pathshala is dedicated to structured stock market and trading education. Learn • Practice • Grow with professional guidance and disciplined risk control.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#916E16] text-[#52525B] cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-[#916E16] text-[#52525B] cursor-pointer">
                  Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#916E16] text-[#52525B] cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-[#916E16] text-[#52525B] cursor-pointer">
                  Resources
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#916E16] text-[#52525B] cursor-pointer">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-login')} className="hover:text-[#916E16] text-[#52525B] cursor-pointer">
                  Student Login
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <h4 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">Contact & Email</h4>
            <div className="space-y-2 text-[#52525B]">
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
