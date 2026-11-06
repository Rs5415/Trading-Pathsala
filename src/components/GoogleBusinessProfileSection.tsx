import React from 'react';
import qrCodeSvg from '../assets/google_business_qr.svg';
import { MapPin, QrCode, Navigation, Star } from 'lucide-react';

export const GoogleBusinessProfileSection: React.FC = () => {
  const googleMapsUrl =
    'https://maps.google.com/?q=Trading+Pathshala+Mahadev+Inn+Jalsar+Road+Deoghar+Jharkhand+814112';

  return (
    <section id="google-profile" className="py-12 sm:py-16 bg-[#FAF7F0] rounded-3xl border border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8E2D5] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            {/* Left Column: Information & Directions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#FAF2DE] text-[#916E16] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#E5B83A]/30">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Verified Google Location</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight leading-tight">
                Find Trading Pathsala on Google
              </h2>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
                Visit our physical institute in Deoghar, Jharkhand. Scan the official Google Business Profile QR code or click the button below to get real-time GPS navigation, view verified reviews, and find our building.
              </p>

              {/* Address Card */}
              <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#E8E2D5] space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF2DE] text-[#916E16] flex items-center justify-center shrink-0 mt-0.5 border border-[#E5B83A]/30">
                    <Navigation className="w-4 h-4 text-[#C59B27]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#916E16]">
                      Official Institute Address
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#18181B] pt-0.5">
                      Trading Pathshala
                    </div>
                    <div className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
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
                  className="bg-black hover:bg-neutral-900 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#F5D061]" />
                  <span>Open in Google Maps</span>
                </a>

                <div className="flex items-center gap-1.5 text-xs text-[#71717A] px-2 py-1">
                  <div className="flex text-[#E5B83A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#18181B]">5.0 Star Rating</span>
                  <span>on Google Profile</span>
                </div>
              </div>
            </div>

            {/* Right Column: QR Code Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#C59B27]/30 shadow-lg text-center space-y-4 max-w-sm w-full">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#916E16]">
                  <QrCode className="w-4 h-4 text-[#C59B27]" />
                  <span>Scan with Smartphone</span>
                </div>

                {/* Scannable QR Code Container */}
                <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E8E2D5] shadow-inner mx-auto flex items-center justify-center">
                  <img
                    src={qrCodeSvg}
                    alt="Scan to open Trading Pathsala on Google Maps"
                    className="w-52 h-52 sm:w-56 sm:h-56 object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#18181B]">
                    Google Business Profile QR Code
                  </div>
                  <p className="text-[11px] text-[#71717A] leading-tight">
                    Open your smartphone camera or Google Lens to access direct GPS navigation.
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
