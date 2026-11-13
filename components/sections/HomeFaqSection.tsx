"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight, HelpCircle } from "lucide-react";
import { faqData } from "@/data/faqData";

export const HomeFaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const displayedFaqs = faqData.slice(0, 6);

  return (
    <section id="faq" className="py-20 md:py-24 bg-[#FAF8F2] border-t border-[#A5A786]/30">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        
        {/* Header Styled in Contact Section Banner Style */}
        <div className="bg-[#7B8052] text-[#FAF8F2] py-8 px-8 sm:px-12 rounded-3xl torn-edge-top torn-edge-bottom shadow-md flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] uppercase tracking-widest text-[#FAF8F2]/75 font-bold block">
              PATIENT INQUIRIES & GUIDANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-[#FAF8F2]/85 font-medium">
              CLEAR CLINICAL ANSWERS TO COMMON QUESTIONS ABOUT INVISALIGN & CARE
            </p>
          </div>
          <Link
            href="/faq"
            className="shrink-0 px-6 py-3 rounded-full bg-[#FAF8F2] text-[#29291F] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md flex items-center gap-2"
          >
            <span>View All FAQs</span>
            <ArrowRight className="w-4 h-4 text-[#7B8052]" />
          </Link>
        </div>

        {/* 2-Column Responsive Card Grid Structure for FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayedFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#F5F0E6] border border-[#A5A786]/40 shadow-sm overflow-hidden transition-all duration-300 hover:border-[#7B8052]/60 flex flex-col justify-between"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 group"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7B8052]">
                      {faq.category || "Consultation"}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#29291F] group-hover:text-[#7B8052] transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors mt-1 ${
                      isOpen ? "bg-[#7B8052] text-white" : "bg-[#FAF8F2] text-[#29291F] border border-[#A5A786]/30"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#29291F]/80 leading-relaxed border-t border-[#A5A786]/20 bg-[#FAF8F2]/60">
                    {faq.answer}
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
