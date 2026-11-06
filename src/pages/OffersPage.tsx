import React from 'react';
import {
  Tag,
  Percent,
  Sparkles,
  Gift,
  Clock,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface OffersPageProps {
  onOpenEnquiry: (offerName?: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({ onOpenEnquiry }) => {
  const offers = [
    {
      id: 'combo-master',
      title: 'Master Trader Combo Pack',
      badge: 'Most Popular • 25% Off',
      badgeColor: 'bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] text-black',
      tagline: 'Technical Analysis + Index Option Buying',
      regularPrice: '₹34,998',
      offerPrice: '₹26,250',
      savings: 'Save ₹8,748 (Flat 25% Off)',
      icon: Percent,
      description:
        'The definitive blueprint for aspiring active traders. Master chart dynamics from candlestick basics to institutional Order Flow, then learn explosive Index Option Buying.',
      features: [
        'Full Basic to Advanced Technical Analysis curriculum',
        'Complete Index Option Buying & Momentum Breakout masterclass',
        '2 months of live market level briefings included',
        'Certificate of Completion upon finishing both programs',
      ],
      validity: 'Valid for Upcoming Batch Enrollments',
    },
    {
      id: 'derivatives-bundle',
      title: 'Complete Derivatives Mastery Bundle',
      badge: 'Best Value • Save ₹3,000',
      badgeColor: 'bg-black text-[#F5D061]',
      tagline: 'Option Buying + Option Selling & Hedging',
      regularPrice: '₹44,998',
      offerPrice: '₹41,998',
      savings: 'Save ₹3,000 on Dual Registration',
      icon: Gift,
      description:
        'Become a two-way market participant. Learn when to buy options for explosive asymmetric upside, and when to sell options for high-probability theta decay consistency.',
      features: [
        'Directional Option Buying momentum tactics',
        'Non-directional Delta-Neutral option writing strategies',
        'Adjustment rules for sudden gap-ups and gap-downs',
        'VIX spike & Greeks management frameworks',
      ],
      validity: 'Limited to First 15 Seats per Batch',
    },
    {
      id: 'early-bird',
      title: 'Early-Bird Batch Registration Token',
      badge: 'Instant ₹1,500 Off',
      badgeColor: 'bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/40',
      tagline: 'Applicable across any single program',
      regularPrice: 'Standard Fee',
      offerPrice: 'Fee - ₹1,500',
      savings: 'Instant ₹1,500 Early Deduction',
      icon: Clock,
      description:
        'Plan ahead and save. Enroll at least 7 days before the official batch kick-off date to automatically unlock an instant ₹1,500 waiver on your course fee.',
      features: [
        'Applicable to any of our 6 main courses',
        'Secures your seat in preferred timing slot (Morning/Evening)',
        'Early access to prep study guide and reading material',
        'Combine with batch study materials',
      ],
      validity: 'Register ≥ 7 Days Before Batch Start',
    },
    {
      id: 'student-scholarship',
      title: 'College Student Merit Scholarship',
      badge: 'Education Support • 20% Off',
      badgeColor: 'bg-emerald-900 text-emerald-200',
      tagline: 'Fostering financial literacy among university youth',
      regularPrice: 'Standard Fee',
      offerPrice: '20% Concession',
      savings: 'Flat 20% Educational Subsidy',
      icon: GraduationCap,
      description:
        'We believe in empowering young minds with real market skills. Present a valid college or university identity card to claim a 20% educational concession.',
      features: [
        'Available for undergraduate and postgraduate students',
        'Valid college photo ID required during admission',
        'Full curriculum access identical to standard enrollments',
        'Flexible evening or weekend cohort schedules',
      ],
      validity: 'Valid with Verified Student ID',
    },
    {
      id: 'duo-enrollment',
      title: 'Peer / Duo Learning Enrollment Offer',
      badge: 'Group Special • ₹2,000 Total',
      badgeColor: 'bg-neutral-800 text-white',
      tagline: 'Enroll together with a trading partner',
      regularPrice: 'Standard x 2',
      offerPrice: '₹1,000 Off Each',
      savings: '₹2,000 Total Savings for Both',
      icon: Users,
      description:
        'Accountability breeds disciplined traders. Join any batch alongside a friend, colleague, or family member, and both of you enjoy ₹1,000 off your enrollment fee.',
      features: [
        'Both learners enrolled in the same batch or different batches',
        'Shared journal review exercises for peer feedback',
        'Access to our alumni community for both traders',
        'Instant token deduction upon dual sign-up',
      ],
      validity: 'When 2 Students Register Simultaneously',
    },
    {
      id: 'doubt-pass',
      title: 'Complimentary 30-Day Live Doubt Pass',
      badge: 'Bonus Feature • 100% Free',
      badgeColor: 'bg-[#C59B27] text-black font-extrabold',
      tagline: 'Included Free with any Course Registration',
      regularPrice: '₹4,999 Value',
      offerPrice: 'FREE (₹0)',
      savings: '100% Complimentary Add-on',
      icon: Sparkles,
      description:
        'Never get stuck after class. Every student enrolling this season receives an additional 30 days of direct live market doubt clearing with Prashant Kumar Sinha.',
      features: [
        'Weekend live Zoom chart breakdown lounges',
        'WhatsApp audio critique for your executed setups',
        'Feedback on trade entries, stop losses, and targets',
        'Automatically bundled with your admission',
      ],
      validity: 'Included with All Current Admissions',
    },
  ];

  return (
    <div className="w-full bg-[#FCFBF7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Tag className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Special Admissions &amp; Bundles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-tight">
            Current Offers &amp; Combo Packages
          </h1>
          <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
            Invest in your trading career with our seasonal bundle discounts, early-bird concessions, and verified student scholarships.
          </p>
        </div>

        {/* 6 Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl p-7 border border-[#E8E2D5] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF2DE] text-[#916E16] border border-[#E5B83A]/30 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6 text-[#C59B27]" />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${offer.badgeColor}`}>
                      {offer.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-[#18181B] group-hover:text-[#916E16] transition-colors leading-snug">
                      {offer.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#C59B27]">
                      {offer.tagline}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#E8E2D5] flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#71717A] uppercase font-medium line-through">
                        {offer.regularPrice}
                      </div>
                      <div className="text-2xl font-black text-[#18181B]">
                        {offer.offerPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-[#FAF2DE] text-[#916E16] text-xs font-bold px-2.5 py-1 rounded-md">
                        {offer.savings}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="pt-2 border-t border-[#E8E2D5] space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#916E16]">
                      Offer Inclusions:
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#27272A]">
                      {offer.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 text-[11px] text-[#71717A] italic">
                    ℹ️ {offer.validity}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E8E2D5]">
                  <button
                    onClick={() => onOpenEnquiry(`Claim Offer: ${offer.title}`)}
                    className="w-full bg-gradient-to-r from-[#F0C94D] to-[#D4AF37] hover:brightness-105 text-black font-extrabold text-xs py-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>Claim This Offer Now</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Admissions Guarantee Box */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-[#916E16]">
            <ShieldAlert className="w-6 h-6 text-[#C59B27]" />
            <h3 className="text-xl font-bold text-[#18181B]">
              Transparent Enrollment Guarantee
            </h3>
          </div>
          <p className="text-sm text-[#52525B] leading-relaxed max-w-3xl">
            At Trading Pathshala, all offers and combo discounts are 100% transparent with no hidden conditions. We do not engage in artificial countdown timers or aggressive sales tactics. Our discounts reflect genuine educational bundles to make comprehensive learning accessible.
          </p>
        </div>
      </div>
    </div>
  );
};
