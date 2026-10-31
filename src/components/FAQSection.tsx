import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Trading Pathshala?',
      a: 'Trading Pathshala is an independent financial education and trading knowledge platform led by mentor Prashant Kumar Sinha. We deliver structured education on stock market fundamentals, price action, technical analysis, and derivatives risk management. We do not provide stock tips, investment calls, or portfolio management.',
    },
    {
      q: 'What programs are currently available?',
      a: 'We offer courses organized by progression levels: Stock Market Foundations & Investing Basics (Beginner), Price Action Trading & Market Structure (Intermediate), Technical Analysis & Multi-Indicator Confluence (Intermediate), and Options Trading & Derivatives Risk Management (Advanced).',
    },
    {
      q: 'Are these courses suitable for absolute beginners?',
      a: 'Yes, completely. Our Beginner Trading Education and Stock Market Foundations tracks are designed for students and working professionals with zero prior market exposure. We teach every operational concept in plain language with real trading terminal demonstrations before moving to candlestick charts.',
    },
    {
      q: 'How can I enrol or enquire about upcoming batches?',
      a: 'You can submit an enquiry form directly on this website, connect directly with Prashant Kumar Sinha on WhatsApp (+91 89875 99799), or call us. We will provide upcoming batch dates, schedule timings, and syllabus outlines.',
    },
    {
      q: 'Does Trading Pathshala guarantee profits or provide buy/sell signals?',
      a: 'No. We strictly reject the culture of "guaranteed returns" and tips channels. Trading in financial markets carries substantial risk. Our mission is to educate you on market mechanics, price behavior, and strict capital allocation so that you can make educated, independent financial decisions.',
    },
    {
      q: 'How can I contact the mentor directly?',
      a: 'You can reach Prashant Kumar Sinha directly via phone at +91 89875 99799 or via WhatsApp (wa.me/918987599799). You can also follow our official Instagram handle @tradingpathsala.',
    },
  ];

  return (
    <section className="py-24 bg-[#090909] border-b border-[#222222]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#C5A34A] uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Answered Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase">
            Questions & Clarifications
          </h2>
          <p className="mt-2 text-[#A0A0A0] text-sm sm:text-base font-light">
            Everything you need to know about our educational philosophy, curriculum scope, and enrollment.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#121212] border border-[#222222] hover:border-[#333333] rounded-lg overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#171717] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-4 leading-snug">
                    {faq.q}
                  </span>
                  <div className="shrink-0 text-[#737373]">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-[#C5A34A]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#A0A0A0] leading-relaxed border-t border-[#1C1C1C] font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
