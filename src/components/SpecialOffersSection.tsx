import React, { useState } from 'react';
import { SpecialOffer } from '../types';
import { Tag, Calendar, Copy, Check, Send } from 'lucide-react';

interface SpecialOffersSectionProps {
  offers: SpecialOffer[];
  onEnquireOffer: (offerCode: string, offerTitle: string) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({
  offers,
  onEnquireOffer,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = offers.filter((o) => o.isActive);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  if (activeOffers.length === 0) {
    return null;
  }

  return (
    <section id="offers" className="py-16 sm:py-24 bg-[#090909] border-b border-[#222222] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full min-w-0">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A34A]" />
            <span>Cohort Concessions & Grants</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
            Special Offers & Enrollment Waivers
          </h2>
          <p className="mt-3 text-[#A0A0A0] text-sm sm:text-base leading-relaxed font-light">
            Verified fee waivers and batch concessions for upcoming programs. Valid until specified cohort closure dates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-[#121212] border border-[#222222] hover:border-[#C5A34A]/50 rounded-lg p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-200 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-[#1C1C1C] pb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5A34A]">
                    <Tag className="w-4 h-4" />
                    <span>{offer.discount}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#737373]">
                    <Calendar className="w-3.5 h-3.5 text-[#555555]" />
                    <span>Till {offer.validTill}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E2C878] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#A0A0A0] mt-2 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="text-xs text-[#737373]">
                  <span className="text-[#555555] block text-[10px] uppercase font-mono">Applicable:</span>
                  <span className="text-[#CCCCCC] font-medium">{offer.applicableCourses}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1C1C1C] space-y-3">
                {/* Coupon Code Block */}
                <div className="flex items-center justify-between bg-[#090909] border border-[#222222] rounded px-3 py-2">
                  <div>
                    <span className="text-[10px] text-[#555555] uppercase block font-mono">
                      Promo Code
                    </span>
                    <span className="text-xs font-bold font-mono text-[#E2C878] tracking-widest">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="p-1.5 rounded text-[#737373] hover:text-white hover:bg-[#1C1C1C] transition-colors flex items-center gap-1 text-xs cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedCode === offer.code ? (
                      <Check className="w-4 h-4 text-[#C5A34A]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => onEnquireOffer(offer.code, offer.title)}
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded transition-all shadow-sm shadow-[#C5A34A]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enquire With This Offer</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
