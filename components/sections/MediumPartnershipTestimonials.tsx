"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonialsData";

export const MediumPartnershipTestimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Synchronize vertical scroll of the section container into horizontal card scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollTrackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the container the user has scrolled
      const totalScrollableDistance = rect.height - windowHeight;
      if (totalScrollableDistance <= 0) return;

      const currentScrollProgress = -rect.top / totalScrollableDistance;
      const clampedProgress = Math.min(Math.max(currentScrollProgress, 0), 1);

      const maxHorizontalScroll = scrollTrackRef.current.scrollWidth - scrollTrackRef.current.clientWidth;
      scrollTrackRef.current.scrollLeft = clampedProgress * maxHorizontalScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollByAmount = (amount: number) => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} id="testimonials" className="relative bg-[#F5F0E6] py-16">
      
      {/* Top Banner with clean, plain blended architectural styling */}
      <div className="bg-[#7B8052] text-white py-8 px-6 sm:px-12 text-center shadow-sm border-y border-[#555B38]/30 mb-12">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
          OUR GOAL IS TO CREATE <span className="font-extrabold text-[#FAF8F2] underline decoration-white/40 underline-offset-4">CONFIDENT SMILES</span> & LASTING RELATIONSHIPS.
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-[#7B8052] bg-[#FAF8F2] px-3.5 py-1.5 rounded-full inline-block border border-[#A5A786]/50">
            5.0 ⭐ VERIFIED PATIENT STORIES
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#29291F] mt-3">
            Real Experiences from Our Coimbatore Patients
          </h3>
          <p className="text-xs sm:text-sm text-[#29291F]/70 mt-1">
            Scroll vertically or swipe horizontally to discover patient journeys
          </p>
        </div>

        {/* Manual Arrow Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollByAmount(-380)}
            aria-label="Scroll left"
            className="w-11 h-11 rounded-full border border-[#A5A786]/60 bg-[#FAF8F2] hover:bg-[#7B8052] hover:text-white text-[#29291F] flex items-center justify-center transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollByAmount(380)}
            aria-label="Scroll right"
            className="w-11 h-11 rounded-full border border-[#A5A786]/60 bg-[#FAF8F2] hover:bg-[#7B8052] hover:text-white text-[#29291F] flex items-center justify-center transition-colors shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Card Track */}
      <div
        ref={scrollTrackRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 px-6 sm:px-12 scrollbar-none no-scrollbar snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {testimonialsData.map((item, idx) => (
          <div
            key={item.id}
            className="w-[340px] sm:w-[420px] shrink-0 bg-[#FAF8F2] border border-[#A5A786]/50 rounded-3xl p-8 sm:p-9 shadow-card flex flex-col justify-between snap-start hover:border-[#7B8052] transition-all duration-300"
          >
            <div className="space-y-4">
              {/* Star Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-[#29291F] ml-1.5">5.0 ⭐</span>
                </div>
                <Quote className="w-7 h-7 text-[#A5A786]/40" />
              </div>

              {/* Review Quote */}
              <p className="text-base sm:text-lg font-serif italic text-[#29291F] leading-relaxed line-clamp-5">
                "{item.review}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-6 border-t border-[#A5A786]/30 mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-[#7B8052] flex items-center justify-center text-[#7B8052] font-serif text-xl font-bold bg-[#F5F0E6] shrink-0">
                {item.patientDisplayName.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-serif font-bold text-[#29291F]">
                  {item.patientDisplayName}
                </h4>
                <p className="text-[11px] uppercase tracking-wider text-[#7B8052] font-bold">
                  {item.treatmentCategory || "Orthodontic Patient"}
                </p>
                <p className="text-[10px] text-[#29291F]/60">
                  {item.source} · Verified Review
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Read All Reviews Card CTA */}
        <div className="w-[300px] shrink-0 bg-[#7B8052] rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white snap-start shadow-card">
          <span className="text-xs uppercase font-bold tracking-widest text-[#FAF8F2]/80">Google Rating</span>
          <p className="text-5xl font-serif font-bold my-2">5.0 ⭐</p>
          <p className="text-xs text-[#FAF8F2]/90 mb-6">34+ Verified Patient Reviews on Google Business Profile</p>
          <Link
            href="/testimonials"
            className="px-6 py-3 rounded-full bg-[#FAF8F2] text-[#29291F] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md flex items-center gap-2"
          >
            <span>Read All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#7B8052]" />
          </Link>
        </div>
      </div>

    </section>
  );
};
