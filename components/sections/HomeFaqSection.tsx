"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { faqData } from "@/data/faqData";

export const HomeFaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const displayedFaqs = faqData.slice(0, 6);

  return (
    <section id="faq" className="relative bg-[#F2F5ED]">
      
      {/* Top Olive Ribbon Banner matching all other sections */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#465239]/40 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#F2F5ED]/90 block">
              PATIENT INQUIRIES &amp; GUIDANCE
            </span>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2.5 px-6 h-[44px] rounded-full bg-white text-black text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#F2F5ED] transition-all shadow-md group border border-[#E5E8E1]"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2-Column Responsive Card Grid Structure with 3D Depth Shadows & Full Width Alignment */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {displayedFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[18px] bg-white border border-[#E5E8E1] shadow-elevated overflow-hidden transition-all duration-300 hover:border-[#7B8052] flex flex-col justify-between"
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
                    <h3 className="text-[16px] sm:text-[17px] font-serif font-bold text-black group-hover:text-[#7B8052] transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors mt-1 ${
                      isOpen ? "bg-[#7B8052] text-white" : "bg-[#F2F5ED] text-black border border-[#E5E8E1]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-[13px] sm:text-[14px] text-[#666666] leading-relaxed border-t border-[#E5E8E1] bg-[#F2F5ED]/40">
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
