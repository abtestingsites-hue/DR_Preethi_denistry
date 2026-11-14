"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { treatmentsData } from "@/data/treatmentsData";

export const ServicesGallerySection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const treatments = treatmentsData.slice(0, 6);

  return (
    <section id="treatments" className="relative bg-[#F5F0E6]">
      
      {/* Top Olive Ribbon Banner with clean, plain blended architectural styling */}
      <div className="bg-[#7B8052] text-white py-10 px-6 sm:px-12 border-b border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#FAF8F2]">
              CLINICAL SPECIALITIES · ADVANCED ORTHODONTIC & DENTAL TREATMENTS
            </h2>
            <p className="text-sm sm:text-base text-white/95 font-light leading-relaxed">
              From precision Invisalign® clear aligners to cosmetic smile makeovers, dental implants, and gentle restorative treatments in Saibaba Colony, Coimbatore.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-6">
            <div className="hidden lg:block w-[1px] h-12 bg-white/30" />
            <Link
              href="/treatments"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-wider font-bold text-white hover:text-[#FAF8F2] transition-colors group"
            >
              <span>TREATMENTS</span>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Grid Gallery Style: Elegant, balanced proportioned cards */}
      <div className="max-w-[1350px] mx-auto px-4 sm:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full">
          {treatments.map((treatment) => {
            const isHovered = hoveredId === treatment.id;
            return (
              <div
                key={treatment.id}
                onMouseEnter={() => setHoveredId(treatment.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden bg-[#29291F] aspect-[16/10] max-h-[300px] rounded-xl cursor-pointer shadow-sm transition-all duration-300"
              >
                {/* Background Image filling the tile edge-to-edge */}
                <img
                  src={treatment.heroImage}
                  alt={treatment.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle base gradient so photo looks vibrant */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300" />

                {/* Default Visible Category Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded bg-[#FAF8F2]/90 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#7B8052] shadow-sm">
                    {treatment.category}
                  </span>
                </div>

                {/* Default visible title in subtle typography */}
                <div className={`absolute bottom-3 left-4 right-4 z-10 transition-all duration-300 ${
                  isHovered ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
                }`}>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-white drop-shadow-md leading-tight">
                    {treatment.title}
                  </h4>
                </div>

                {/* Hover Reveal Overlay (matches The Medium studio hover effect) */}
                <div
                  className={`absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white transition-all duration-300 ${
                    isHovered
                      ? "bg-[#29291F]/90 opacity-100 backdrop-blur-[2px]"
                      : "bg-transparent opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#A5A786] mb-1">
                    Speciality Treatment
                  </span>

                  <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#FAF8F2] leading-snug">
                    {treatment.title}
                  </h4>
                  
                  <p className="text-xs text-[#FAF8F2]/85 line-clamp-3 mt-2 leading-relaxed font-light">
                    {treatment.shortDescription}
                  </p>

                  {/* Know More CTA Button on Hover */}
                  <div className="pt-4 flex items-center justify-between border-t border-[#A5A786]/30 mt-4">
                    <Link
                      href={`/treatments#${treatment.id}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F2] hover:text-[#A5A786] transition-colors group/cta"
                    >
                      <span>Know More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover/cta:translate-x-1" />
                    </Link>

                    <Link
                      href={`/booking?treatment=${encodeURIComponent(treatment.title)}`}
                      className="px-3.5 py-1 rounded-full bg-[#7B8052] text-[10px] uppercase font-bold tracking-wider text-white hover:bg-[#555B38] transition-colors"
                    >
                      Book Visit
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
