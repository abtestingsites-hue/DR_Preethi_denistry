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
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="max-w-2xl space-y-2 text-center md:text-left">
            <h2 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#FAF8F2]">
              CLINICAL SPECIALITIES · ADVANCED ORTHODONTIC &amp; DENTAL TREATMENTS
            </h2>
            <p className="text-[15px] sm:text-[16px] text-white/95 font-light leading-[1.5]">
              From precision Invisalign® &amp; GoClear aligners to needle-free anesthesia, dental implants, and gentle restorative treatments in Saibaba Colony, Coimbatore.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-6">
            <div className="hidden lg:block w-[1px] h-12 bg-white/30" />
            <Link
              href="/treatments"
              className="inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.08em] font-semibold text-white hover:text-[#FAF8F2] transition-colors group"
            >
              <span>ALL TREATMENTS</span>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Promoted Innovation Banner: Direct Callout to Needle-Free Technology */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-8 pb-3">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F2] border-2 border-[#7B8052] shadow-elevated flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#7B8052] text-white flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-base font-bold">✨</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#7B8052]/15 text-[11px] font-extrabold uppercase tracking-widest text-[#7B8052]">
                  FEATURED SPECIALITY
                </span>
                <span className="text-[13px] font-bold text-[#29291F]">100% Needle-Free Dental Injections</span>
              </div>
              <p className="text-[12px] sm:text-[13px] text-[#29291F]/70 mt-0.5 font-normal">
                Eliminate dental fear with advanced jet injectors &amp; computer-regulated digital anesthesia.
              </p>
            </div>
          </div>
          <a
            href="#needle-free"
            className="shrink-0 px-5 h-[42px] inline-flex items-center justify-center rounded-full bg-[#7B8052] text-white font-semibold text-[13px] uppercase tracking-[0.06em] hover:bg-[#686D42] transition-colors shadow-sm"
          >
            Explore Needle-Free Care →
          </a>
        </div>
      </div>

      {/* Full-Screen Edge-Aligned Grid with reduced height (-25px) and elevated 3D depth shadows */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {treatments.map((treatment) => {
            const isHovered = hoveredId === treatment.id;
            return (
              <div
                key={treatment.id}
                onMouseEnter={() => setHoveredId(treatment.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden bg-[#29291F] h-[205px] sm:h-[225px] md:h-[245px] lg:h-[255px] rounded-[18px] cursor-pointer shadow-elevated hover:shadow-2xl transition-all duration-300 border border-[#A5A786]/35"
              >
                {/* Background Image filling the tile edge-to-edge */}
                <img
                  src={treatment.heroImage}
                  alt={treatment.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle base gradient for high legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300" />

                {/* Default Visible Category Tag */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 rounded bg-[#FAF8F2]/95 backdrop-blur-md text-[11px] uppercase font-bold tracking-wider text-[#7B8052] shadow-md border border-[#A5A786]/20">
                    {treatment.category}
                  </span>
                </div>

                {/* Default visible title in subtle typography */}
                <div className={`absolute bottom-3.5 left-4 right-4 z-10 transition-all duration-300 ${
                  isHovered ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
                }`}>
                  <h4 className="text-[17px] sm:text-[19px] font-serif font-bold text-white drop-shadow-md leading-tight">
                    {treatment.title}
                  </h4>
                </div>

                {/* Hover Reveal Overlay */}
                <div
                  className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white transition-all duration-300 ${
                    isHovered
                      ? "bg-[#29291F]/90 opacity-100 backdrop-blur-[2px]"
                      : "bg-transparent opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#A5A786] mb-1">
                    Speciality Treatment
                  </span>

                  <h4 className="text-[19px] sm:text-[21px] font-serif font-bold tracking-tight text-[#FAF8F2] leading-snug">
                    {treatment.title}
                  </h4>
                  
                  <p className="text-[12px] sm:text-[13px] text-[#FAF8F2]/85 line-clamp-2 mt-1 leading-[1.45] font-light">
                    {treatment.shortDescription}
                  </p>

                  {/* Know More CTA Button on Hover */}
                  <div className="pt-3 flex items-center justify-between border-t border-[#A5A786]/30 mt-3">
                    <Link
                      href={`/treatments#${treatment.id}`}
                      className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#FAF8F2] hover:text-[#A5A786] transition-colors group/cta"
                    >
                      <span>Know More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group/cta:translate-x-1" />
                    </Link>

                    <Link
                      href={`/booking?treatment=${encodeURIComponent(treatment.title)}`}
                      className="px-3.5 py-1.5 rounded-full bg-[#7B8052] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#686D42] transition-colors shadow-sm"
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
