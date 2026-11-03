import React from 'react';
import qrCodeSvg from '../assets/google_business_qr.svg';
import { MapPin, QrCode, ExternalLink, Navigation, CheckCircle2, Star } from 'lucide-react';

export const GoogleBusinessProfileSection: React.FC = () => {
  const googleMapsUrl =
    'https://maps.google.com/?q=Trading+Pathshala+Mahadev+Inn+Jalsar+Road+Deoghar+Jharkhand+814112';

  return (
    <section id="google-profile" className="py-16 sm:py-24 bg-[#F4F7F4] border-b border-[#E3EBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E3EBE4] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            {/* Left Column: Information & Directions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#E7F0E9] text-[#174D32] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#174D32]" />
                <span>Verified Location</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#202923] tracking-tight leading-tight">
                Find Trading Pathsala on Google
              </h2>

              <p className="text-base sm:text-lg text-[#68736B] leading-relaxed">
                Visit our physical institute in Deoghar, Jharkhand. Scan the official Google Business Profile QR code or click the button below to get real-time GPS navigation, view our verified listing, and find our exact building.
              </p>

              {/* Address Card */}
              <div className="bg-[#F4F7F4] p-5 rounded-2xl border border-[#E3EBE4] space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF3EC] text-[#174D32] flex items-center justify-center shrink-0 mt-0.5">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#174D32]">
                      Official Institute Address
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#202923] pt-0.5">
                      Trading Pathshala
                    </div>
                    <div className="text-xs sm:text-sm text-[#68736B] leading-relaxed">
                      3rd Floor, Mahadev Inn, Jalsar Road, Shivganga Muhalla,
                      <br />
                      Deoghar, Jharkhand – 814112, India.
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Maps Action Button */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#174D32] hover:bg-[#123E28] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#75D68A]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>

                <a
                  href="tel:+918987599799"
                  className="bg-white hover:bg-[#F4F7F4] text-[#202923] border border-[#E3EBE4] font-bold text-sm px-5 py-3.5 rounded-xl transition-colors cursor-pointer"
                >
                  Call Desk: +91 89875 99799
                </a>
              </div>
            </div>

            {/* Right Column: Genuine Scannable QR Code */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#174D32]/20 shadow-lg text-center space-y-4 max-w-sm w-full">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#174D32]">
                  <QrCode className="w-4 h-4" />
                  <span>Scan with Smartphone</span>
                </div>

                {/* Scannable QR Code Container */}
                <div className="p-4 bg-white rounded-2xl border border-[#E3EBE4] shadow-inner mx-auto flex items-center justify-center">
                  <img
                    src={qrCodeSvg}
                    alt="Scan to open Trading Pathsala on Google Maps"
                    className="w-52 h-52 sm:w-56 sm:h-56 object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#202923]">
                    Google Business Profile QR Code
                  </div>
                  <p className="text-[11px] text-[#68736B] leading-tight">
                    Open your smartphone camera or Google Lens and point at this code to open instant GPS directions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
