import React from 'react';
import { PageView, WebsiteContent } from '../types';
import { ShieldCheck, Phone, MessageCircle, Instagram, User, MapPin, Navigation, ExternalLink } from 'lucide-react';

interface FooterProps {
  content: WebsiteContent;
  onNavigate: (view: PageView, courseSlug?: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({ content, onNavigate, onOpenLegal }) => {
  return (
    <footer className="bg-[#090909] text-[#A0A0A0] border-t border-[#222222] text-xs w-full max-w-full overflow-hidden">
      {/* Financial Risk Disclaimer Strip */}
      <div className="bg-[#121212] border-b border-[#1C1C1C] py-5 sm:py-6 px-4 sm:px-6 lg:px-8 w-full max-w-full">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-[#A0A0A0]">
          <div className="p-2 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[#C5A34A] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1 min-w-0">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Educational & Financial Risk Disclaimer
            </h4>
            <p className="text-[11px] leading-relaxed text-[#737373]">
              Trading Pathshala provides educational content related to financial markets. Educational information is not a recommendation to buy or sell securities. Trading and investing involve financial risk. Users should make independent decisions and understand the risks involved. We do not offer investment advice, stock tips, or portfolio management services. We make no claims of SEBI registration or guaranteed profits.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full max-w-full min-w-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand & Mission column */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <div className="flex items-center gap-3">
              <img
                src="/trading_pathshala_official_logo.png"
                alt="Trading Pathshala - Learn the Art of Trading"
                className="h-8 sm:h-12 w-auto object-contain max-w-[180px] sm:max-w-none"
              />
            </div>
            <p className="text-[#A0A0A0] text-xs leading-relaxed max-w-sm font-light">
              Learn the Art of Trading. Dedicated to structured stock market education, objective price action methodologies, and disciplined risk budgeting under mentor Prashant Kumar Sinha.
            </p>
            <div className="pt-2 text-[11px] text-[#555555] font-mono">
              Business Category: Financial Service, Financial Planner
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#222222] pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C5A34A] transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C5A34A] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#C5A34A] transition-colors"
                >
                  Our Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#C5A34A] transition-colors"
                >
                  Educational Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-[#C5A34A] transition-colors"
                >
                  Learning Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-[#C5A34A] transition-colors"
                >
                  Special Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#C5A34A] transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#222222] pb-2">
              Learning Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#C5A34A] transition-colors text-left"
                >
                  Stock Market Foundations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#C5A34A] transition-colors text-left"
                >
                  Price Action Trading Mastery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#C5A34A] transition-colors text-left"
                >
                  Options & Derivatives
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('courses')}
                  className="hover:text-[#C5A34A] transition-colors text-left"
                >
                  Technical Analysis & Confluence
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Official Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#222222] pb-2">
              Official Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <User className="w-3.5 h-3.5 text-[#C5A34A] shrink-0 mt-0.5" />
                <span className="text-white font-medium">{content.contactPerson}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A34A] shrink-0 mt-0.5" />
                <a href="tel:+918987599799" className="text-[#A0A0A0] hover:text-[#C5A34A] font-mono">
                  +91 89875 99799
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#C5A34A] shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/918987599799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A0A0A0] hover:text-[#C5A34A] font-mono"
                >
                  WhatsApp: +91 89875 99799
                </a>
              </div>
              <div className="flex items-start gap-2 pt-0.5">
                <Instagram className="w-3.5 h-3.5 text-[#C5A34A] shrink-0 mt-0.5" />
                <a
                  href="https://www.instagram.com/tradingpathsala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#C5A34A]"
                >
                  @tradingpathsala
                </a>
              </div>

              {/* Official Address */}
              <div className="pt-2 border-t border-[#1C1C1C] space-y-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A34A] shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-[11px] leading-relaxed text-[#A0A0A0]">
                    <span className="text-white font-medium block">Trading Pathshala</span>
                    <span>3rd Floor, Mahadev Inn,</span><br />
                    <span>Jalsar Road, Shivganga Muhalla,</span><br />
                    <span className="text-[#C5A34A] font-mono">Deoghar, Jharkhand – 814112, India.</span>
                  </div>
                </div>
                <div className="pt-1.5 pl-5">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Trading+Pathshala,+3rd+Floor,+Mahadev+Inn,+Jalsar+Road,+Shivganga+Muhalla,+Deoghar,+Jharkhand+814112,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#C5A34A] hover:text-[#E2C878] transition-colors"
                  >
                    <Navigation className="w-3 h-3 fill-current" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#737373]">
          <div>
            © {new Date().getFullYear()} Trading Pathshala. Learn the Art of Trading. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[#A0A0A0]">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#C5A34A] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#C5A34A] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('disclaimer')}
              className="hover:text-[#C5A34A] transition-colors cursor-pointer text-[#C5A34A]"
            >
              Financial Risk Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
