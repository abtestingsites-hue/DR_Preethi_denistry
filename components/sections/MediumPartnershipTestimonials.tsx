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
    <section id="testimonials" className="relative bg-white">
      
      {/* Top Banner - Pista Green card styling */}
      <div className="bg-[#93C572] text-[#1E3014] py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#7EAF5E] relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-bold text-[#1E3014]/90 block">
              PATIENT TESTIMONIALS &amp; GOOGLE REVIEWS
            </span>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-[#0F1E08]">
              WHAT OUR PATIENTS SAY
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount(-380)}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#F2F5ED] transition-all shadow-sm border border-[#E5E8E1]"
              >
                <ChevronLeft className="w-5 h-5 text-[#7B8052]" />
              </button>
              <button
                onClick={() => scrollByAmount(380)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#F2F5ED] transition-all shadow-sm border border-[#E5E8E1]"
              >
                <ChevronRight className="w-5 h-5 text-[#7B8052]" />
              </button>
            </div>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 h-[44px] rounded-full bg-[#7B8052] text-white text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#465239] transition-all shadow-md group"
            >
              <span>All Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" />
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
              className="shrink-0 w-[290px] sm:w-[350px] md:w-[380px] p-6 sm:p-7 rounded-[20px] bg-white border border-[#E5E8E1] shadow-elevated hover:shadow-2xl hover:border-[#7B8052] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#E5A93C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#7B8052] bg-[#F2F5ED] px-2.5 py-0.5 rounded-full border border-[#E5E8E1]">
                    {review.treatmentCategory || "Orthodontics"}
                  </span>
                </div>

                <p className="text-[13.5px] sm:text-[14.5px] text-[#666666] leading-[1.6] font-light italic">
                  &ldquo;{review.review}&rdquo;
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#E5E8E1] mt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-[13.5px] font-bold text-black font-serif">
                    {review.patientDisplayName}
                  </h4>
                  <span className="text-[11px] text-[#666666]">{review.source || "Verified Patient"}</span>
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
