"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonialsData";

export const MediumPartnershipTestimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current || !trackRef.current) {
            ticking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalDistance = rect.height - windowHeight;

          if (totalDistance > 0) {
            // How much of the sticky parent has been scrolled through
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / totalDistance, 0), 1);

            // Maximum horizontal travel for the cards track
            const maxHorizontalTravel = trackRef.current.scrollWidth - window.innerWidth + 96; // 96px buffer for right padding
            if (maxHorizontalTravel > 0) {
              trackRef.current.style.transform = `translateX(-${progress * maxHorizontalTravel}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} id="testimonials" className="relative bg-[#F5F0E6] h-[250vh]">
      
      {/* Sticky Viewport Container: Locks onto screen while user scrolls through the 250vh parent */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        
        {/* Top Banner matching other ribbon banners */}
        <div className="bg-[#7B8052] text-white py-6 sm:py-7 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#555B38]/30 relative z-20 shadow-sm shrink-0">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#FAF8F2]/90 block">
                PATIENT TESTIMONIALS &amp; GOOGLE REVIEWS
              </span>
              <h2 className="text-[22px] sm:text-[26px] md:text-[28px] font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
                WHAT OUR PATIENTS SAY
              </h2>
            </div>

            <div className="shrink-0 flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-[12px] text-[#FAF8F2]/80 uppercase tracking-wider font-semibold">
                <span>Scroll vertically to browse</span>
                <span className="animate-pulse">→</span>
              </div>
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 px-6 h-[40px] rounded-full bg-[#FAF8F2] text-[#29291F] text-[12px] uppercase tracking-[0.08em] font-semibold hover:bg-white transition-all shadow-md group"
              >
                <span>All Reviews</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Vertically Centered Horizontal Cards Stage */}
        <div className="flex-1 flex items-center px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 will-change-transform transition-transform duration-75 ease-out select-none py-4"
          >
            {testimonialsData.map((review) => (
              <div
                key={review.id}
                className="shrink-0 w-[320px] sm:w-[380px] md:w-[420px] p-6 sm:p-8 rounded-[22px] bg-[#FAF8F2] border border-[#A5A786]/40 shadow-elevated hover:shadow-2xl hover:border-[#7B8052] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#E5A93C]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#7B8052] bg-[#7B8052]/10 px-2.5 py-0.5 rounded-full">
                      {review.treatmentCategory || "Orthodontics"}
                    </span>
                  </div>

                  <p className="text-[14px] sm:text-[15px] text-[#29291F]/85 leading-[1.65] font-light italic">
                    &ldquo;{review.review}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#A5A786]/25 mt-6 flex items-center justify-between">
                  <div>
                    <h4 className="text-[15px] font-bold text-[#29291F] font-serif">
                      {review.patientDisplayName}
                    </h4>
                    <span className="text-[11px] text-[#29291F]/60">{review.source || "Verified Patient"}</span>
                  </div>
                  <Quote className="w-6 h-6 text-[#7B8052]/30" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom indicator bar */}
        <div className="px-6 md:px-10 py-3 border-t border-[#A5A786]/20 bg-[#F5F0E6] flex items-center justify-between text-[11px] text-[#29291F]/60 uppercase tracking-widest shrink-0">
          <span>Dr. Preethi&apos;s Dentistry · Verified Patient Experiences</span>
          <span>5.0 ★★★★★ on Google</span>
        </div>

      </div>
    </section>
  );
};
