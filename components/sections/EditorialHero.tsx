"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const EditorialHero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#29291F] pt-20 pb-12 cursor-default select-none"
    >
      
      {/* Preserved authentic clinic reception photograph with exact crop and composition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Clinic.png"
          alt="Dr. Preethi's Dentistry Reception Lounge"
          className="w-full h-full object-cover object-[center_35%] filter brightness-[0.94] contrast-[1.01]"
        />
        {/* Soft natural ambient gradient from reference image */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#29291F]/15 to-[#29291F]/55 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`} />
      </div>

      {/* Grid Container matching reference composition */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex justify-end">
        
        {/* Content Box: Revealed when cursor is on the hero page */}
        <div className={`w-full md:w-[580px] lg:w-[620px] max-w-[620px] flex flex-col text-left lg:mr-8 xl:mr-10 transition-all duration-500 ease-out ${
          isHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}>
          
          {/* Eyebrow Label with Architectural Lines flanking DR. PREETHI'S DENTISTRY */}
          <div className="flex items-center gap-3.5 mb-5">
            <span className="w-10 sm:w-14 h-[2px] bg-[#9EA657] shrink-0" />
            <span className="text-[12px] sm:text-[13px] uppercase font-semibold tracking-[0.22em] text-[#FAF8F2] drop-shadow-sm font-sans">
              DR. PREETHI&apos;S DENTISTRY
            </span>
            <span className="w-10 sm:w-14 h-[2px] bg-[#9EA657] shrink-0" />
          </div>

          {/* Main Heading: Reduced by ~8-10% (68px max desktop) with deliberate 2-line break */}
          <h1 className="text-[40px] sm:text-[50px] md:text-[60px] lg:text-[68px] font-serif font-bold text-white leading-[1.05] tracking-tight drop-shadow-md mb-5">
            <span className="block">Care Designed</span>
            <span className="font-serif italic font-normal text-[#C5CE7C] block">
              Around Your Smile
            </span>
          </h1>

          {/* Supporting Description: Maintained at max-width ~520px for comfortable reading */}
          <p className="text-[17px] sm:text-[19px] lg:text-[20px] text-[#FAF8F2]/95 font-light leading-[1.48] drop-shadow-sm mb-6 max-w-[520px]">
            Advanced Orthodontic &amp; Invisalign® Care in a Comfortable, Personalized Environment.
          </p>

          {/* Bold lime-olive architectural underline bar matching reference */}
          <div className="w-full max-w-[420px] h-[3px] bg-[#9EA657] mb-7" />

          {/* CTA Buttons: Keep on one row with consistent 16-20px gap */}
          <div className="flex flex-row items-center gap-4 sm:gap-5">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 h-[48px] rounded-full bg-[#7B8052] text-white font-semibold text-[14px] uppercase tracking-[0.05em] hover:bg-[#686D42] transition-all shadow-md hover:shadow-lg active:scale-98 border border-white/20 shrink-0"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            
            <a
              href="#treatments"
              className="inline-flex items-center justify-center px-7 sm:px-8 h-[48px] rounded-full bg-[#FAF8F2] text-[#29291F] font-semibold text-[14px] uppercase tracking-[0.05em] hover:bg-white transition-all border border-[#A5A786]/50 shadow-md hover:shadow-lg active:scale-98 shrink-0"
            >
              Explore Treatments
            </a>
          </div>

        </div>

      </div>

      {/* Clean blended base transition */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-white/20 z-20 pointer-events-none" />
    </section>
  );
};
