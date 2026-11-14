"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight } from "lucide-react";
import { testimonialsData } from "@/data/testimonialsData";

export const MediumPartnershipTestimonials: React.FC = () => {
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (amount: number) => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section id="testimonials" className="relative bg-[#F5F0E6]">
      
      {/* Top Banner matching other ribbon banners */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#FAF8F2]/90 block">
              PATIENT TESTIMONIALS &amp; GOOGLE REVIEWS
            </span>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              WHAT OUR PATIENTS SAY
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount(-380)}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-[#FAF8F2] text-[#29291F] flex items-center justify-center hover:bg-white transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 text-[#7B8052]" />
              </button>
              <button
                onClick={() => scrollByAmount(380)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-[#FAF8F2] text-[#29291F] flex items-center justify-center hover:bg-white transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5 text-[#7B8052]" />
              </button>
            </div>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 h-[44px] rounded-full bg-[#FAF8F2] text-[#29291F] text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-white transition-all shadow-md group"
            >
              <span>All Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track with 3D Depth Shadows and NO scrollbar */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14">
        <div
          ref={scrollTrackRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scrollbar-none scroll-smooth pb-4 pt-2"
        >
          {testimonialsData.map((review) => (
            <div
              key={review.id}
              className="shrink-0 w-[290px] sm:w-[350px] md:w-[380px] p-6 sm:p-7 rounded-[20px] bg-[#FAF8F2] border border-[#A5A786]/40 shadow-elevated hover:shadow-2xl hover:border-[#7B8052] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E5A93C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#7B8052] bg-[#7B8052]/10 px-2.5 py-0.5 rounded-full">
                    {review.treatmentCategory || "Orthodontics"}
                  </span>
                </div>

                <p className="text-[13.5px] sm:text-[14.5px] text-[#29291F]/85 leading-[1.6] font-light italic">
                  &ldquo;{review.review}&rdquo;
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#A5A786]/25 mt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#29291F] font-serif">
                    {review.patientDisplayName}
                  </h4>
                  <span className="text-[11px] text-[#29291F]/60">{review.source || "Verified Patient"}</span>
                </div>
                <Quote className="w-5 h-5 text-[#7B8052]/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
