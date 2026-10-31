import React, { useState } from 'react';
import { WebsiteContent } from '../types';
import { MapPin, Navigation, ExternalLink, Copy, Check, Compass, Building2, MessageCircle } from 'lucide-react';

interface GoogleMapsSectionProps {
  content: WebsiteContent;
}

export const GoogleMapsSection: React.FC<GoogleMapsSectionProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const officialAddressLines = [
    'Trading Pathshala',
    '3rd Floor, Mahadev Inn,',
    'Jalsar Road, Shivganga Muhalla,',
    'Deoghar, Jharkhand – 814112, India.',
  ];

  const fullAddressString = officialAddressLines.join('\n');

  const directionsUrl =
    content.googleMapsDirectionsUrl ||
    'https://www.google.com/maps/dir/?api=1&destination=Trading+Pathshala,+3rd+Floor,+Mahadev+Inn,+Jalsar+Road,+Shivganga+Muhalla,+Deoghar,+Jharkhand+814112,+India';

  const viewOnMapUrl =
    'https://www.google.com/maps/search/?api=1&query=Trading+Pathshala,+3rd+Floor,+Mahadev+Inn,+Jalsar+Road,+Shivganga+Muhalla,+Deoghar,+Jharkhand+814112,+India';

  const mapEmbedUrl =
    'https://maps.google.com/maps?q=Trading+Pathshala,+3rd+Floor,+Mahadev+Inn,+Jalsar+Road,+Shivganga+Muhalla,+Deoghar,+Jharkhand+814112&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddressString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-24 bg-[#090909] border-b border-[#222222] relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A34A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A34A]" />
            <span>Official Campus & Office Coordinates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
            Google Maps & Office Location
          </h2>
          <p className="mt-3 text-[#A0A0A0] text-sm sm:text-base leading-relaxed font-light">
            Visit the official Trading Pathshala education centre in Deoghar, Jharkhand. Plan your route, open direct turn-by-turn navigation, or verify our registered campus premises.
          </p>
        </div>

        {/* Main Grid: Info Card + Interactive Map Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Official Address & Navigation Card (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#121212] border border-[#262626] rounded-xl p-7 sm:p-8 shadow-2xl relative">
            <div className="space-y-6">
              {/* Badge & Title */}
              <div className="border-b border-[#1F1F1F] pb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A34A]/10 border border-[#C5A34A]/30 text-[#E2C878] text-[11px] font-mono uppercase tracking-wider mb-3">
                  <Compass className="w-3.5 h-3.5 text-[#C5A34A]" />
                  <span>Physical Learning Centre</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight uppercase">
                  Official Business Address
                </h3>
                <p className="text-xs text-[#737373] mt-1">
                  Registered education desk & offline classroom facility
                </p>
              </div>

              {/* Exact 4-Line Address Display */}
              <div className="bg-[#171717] border border-[#292929] rounded-lg p-5 relative group hover:border-[#C5A34A]/40 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-[#090909] text-[#C5A34A] border border-[#222222] shrink-0 mt-0.5">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-bold text-white tracking-wide">
                      {officialAddressLines[0]}
                    </p>
                    <p className="text-xs text-[#D4D4D4] leading-relaxed">
                      {officialAddressLines[1]}
                    </p>
                    <p className="text-xs text-[#D4D4D4] leading-relaxed">
                      {officialAddressLines[2]}
                    </p>
                    <p className="text-xs font-mono font-medium text-[#C5A34A] leading-relaxed">
                      {officialAddressLines[3]}
                    </p>
                  </div>
                </div>

                {/* Quick Copy Button */}
                <div className="mt-4 pt-3.5 border-t border-[#222222] flex items-center justify-between">
                  <span className="text-[11px] text-[#737373] font-mono">
                    Postal Code: 814112
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs text-[#A0A0A0] hover:text-[#E2C878] transition-colors cursor-pointer font-medium"
                    title="Copy full address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C5A34A]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Landmark & Verification Note */}
              <div className="space-y-2.5 text-xs text-[#A0A0A0]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
                  <span><strong>Landmark:</strong> Mahadev Inn 3rd Floor, near Shivganga Muhalla & Jalsar Road</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
                  <span><strong>Mentor on Site:</strong> Prashant Kumar Sinha</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
                  <span><strong>Business Category:</strong> Financial Service, Financial Planner</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Direct Google Maps Navigation */}
            <div className="mt-8 pt-6 border-t border-[#1F1F1F] space-y-3">
              {/* Working Directions Link */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded-lg transition-all duration-200 shadow-lg shadow-[#C5A34A]/10 group cursor-pointer"
              >
                <Navigation className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>

              {/* Direct View Location Button & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={viewOnMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-white bg-[#1A1A1A] hover:bg-[#222222] border border-[#2E2E2E] hover:border-[#C5A34A]/50 rounded-lg transition-colors text-center"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C5A34A]" />
                  <span>Open in Maps</span>
                </a>

                <a
                  href="https://wa.me/918987599799?text=Hello%20Prashant%20Sir,%20I%20am%20visiting%20Trading%20Pathshala%20office%20at%20Deoghar."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-white bg-[#1A1A1A] hover:bg-[#222222] border border-[#2E2E2E] hover:border-[#25D366]/50 rounded-lg transition-colors text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Notify Visit</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Preview Container (7 columns) */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#262626] rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[460px]">
            {/* Map Frame Top Bar */}
            <div className="bg-[#171717] border-b border-[#222222] px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-[#737373] ml-2 truncate">
                  maps.google.com · Deoghar, Jharkhand 814112
                </span>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono font-bold text-[#C5A34A] hover:text-[#E2C878] inline-flex items-center gap-1"
              >
                <span>Live GPS Route</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="relative flex-1 w-full min-h-[380px] bg-[#0A0A0A]">
              <iframe
                title="Trading Pathshala Office Location on Google Maps"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />

              {/* Floating Pin Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#090909]/95 backdrop-blur-md border border-[#C5A34A]/40 rounded-lg p-3.5 shadow-2xl pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#C5A34A] shrink-0" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Trading Pathshala</span>
                </div>
                <p className="text-[11px] text-[#A0A0A0] leading-snug">
                  3rd Floor, Mahadev Inn, Jalsar Road, Shivganga Muhalla, Deoghar, Jharkhand – 814112
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
