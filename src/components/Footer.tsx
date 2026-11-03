import React from 'react';
import { PageView } from '../types';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView, courseSlug?: string) => void;
  onOpenEnquiry?: (courseName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-[#0B150F] p-3 rounded-xl border border-[#B99B52]/40 inline-block shadow-xs">
              <img
                src={officialLogo}
                alt="Trading Pathsala - Learn the Art of Trading"
                className="h-10 w-auto max-w-[200px] object-contain"
              />
            </div>
            <p className="text-sm text-gray-600 max-w-sm">
              Trading Pathshala is dedicated to structured financial and stock market education. Learn the Art of Trading with discipline and risk control.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#174D32] text-gray-600 cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#174D32] text-gray-600 cursor-pointer"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#174D32] text-gray-600 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#174D32] text-gray-600 cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('student-login')}
                  className="hover:text-[#174D32] text-gray-600 cursor-pointer"
                >
                  Student Login
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Email */}
          <div className="md:col-span-4 space-y-3 text-sm">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Contact & Support</h4>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#174D32] shrink-0" />
                <a href="mailto:support@tradingpathsala.in" className="hover:text-[#174D32] underline font-medium">
                  support@tradingpathsala.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#174D32] shrink-0" />
                <a href="tel:+918987599799" className="hover:text-[#174D32] font-medium">
                  +91 89875 99799
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-xs text-gray-500">
                <MapPin className="w-4 h-4 text-[#174D32] shrink-0 mt-0.5" />
                <span>3rd Floor, Mahadev Inn, Jalsar Road, Deoghar, Jharkhand – 814112</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Trading Pathsala. All rights reserved.</div>
          <div>Tagline: Learn the Art of Trading</div>
        </div>
      </div>
    </footer>
  );
};
