import React from 'react';
import officialLogo from '../assets/trading_pathshala_official_logo.png';
import { MapPin, Mail, Phone } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-[#174D32]">
              About Us
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              About Trading Pathshala
            </h2>

            <div className="space-y-4 text-base text-gray-600 leading-relaxed">
              <p>
                <strong>Trading Pathshala</strong> is an educational institute committed to teaching the art and science of stock market trading. Founded on the principle of <em>"Learn the Art of Trading"</em>, our goal is to help aspiring learners and traders understand market mechanics with clarity and discipline.
              </p>
              <p>
                Based in Deoghar, Jharkhand, our curriculum focuses on structured learning across technical analysis, index options (buying and selling), swing trading, and forex. We teach traders how to read price action, evaluate order flow and volume profile, manage downside risks, and trade with a rule-based plan rather than random speculation.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-gray-700 font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#174D32]" />
                <span>Deoghar, Jharkhand</span>
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#174D32]" />
                <span>support@tradingpathsala.in</span>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#174D32]" />
                <span>+91 89875 99799</span>
              </span>
            </div>
          </div>

          {/* Right Logo Presentation Card */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200 text-center space-y-5 shadow-xs">
              <div className="bg-[#0B150F] p-4 sm:p-5 rounded-xl border border-[#B99B52]/40 inline-block shadow-sm">
                <img
                  src={officialLogo}
                  alt="Trading Pathsala - Learn the Art of Trading"
                  className="h-14 sm:h-16 mx-auto object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="text-sm font-bold text-gray-900">Trading Pathshala</div>
                <div className="text-xs text-[#B99B52] font-semibold uppercase tracking-wider">
                  Learn the Art of Trading
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                3rd Floor, Mahadev Inn, Jalsar Road, Shivganga Muhalla, Deoghar, Jharkhand – 814112, India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
