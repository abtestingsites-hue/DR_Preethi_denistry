"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const EditorialHero: React.FC = () => {
  return (
    <section 
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#29291F]/15 to-[#29291F]/55" />
      </div>

      {/* Grid Container matching reference composition */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex justify-end">
        
        {/* Content Box: Perfectly aligned with reference layout */}
        <div className="w-full md:w-[620px] lg:w-[680px] max-w-[680px] flex flex-col text-left pr-2 lg:pr-8">
          
          {/* Eyebrow Label with Architectural Lines flanking DR. PREETHI'S DENTISTRY */}
          <div className="flex items-center gap-3.5 mb-6">
            <span className="w-12 sm:w-16 h-[2px] bg-[#9EA657] shrink-0" />
            <span className="text-[12px] sm:text-[13px] uppercase font-semibold tracking-[0.22em] text-[#FAF8F2] drop-shadow-sm font-sans">
              DR. PREETHI&apos;S DENTISTRY
            </span>
            <span className="w-12 sm:w-16 h-[2px] bg-[#9EA657] shrink-0" />
          </div>

          {/* Main Heading: Matches reference typography exactly */}
          <h1 className="text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-serif font-bold text-white leading-[1.02] tracking-tight drop-shadow-md mb-6">
            Care Designed{" "}
            <span className="font-serif italic font-normal text-[#C5CE7C] block sm:inline">
              Around Your Smile
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="text-[18px] sm:text-[20px] lg:text-[22px] text-[#FAF8F2]/95 font-light leading-[1.45] drop-shadow-sm mb-7 max-w-[560px]">
            Advanced Orthodontic &amp; Invisalign® Care in a Comfortable, Personalized Environment.
          </p>

          {/* Bold lime-olive architectural underline bar matching reference */}
          <div className="w-full max-w-[460px] h-[3px] bg-[#9EA657] mb-7" />

          {/* Action Buttons: Request Consultation (olive) & Explore Treatments (warm cream) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2.5 px-8 h-[48px] rounded-full bg-[#7B8052] text-white font-semibold text-[14px] uppercase tracking-[0.05em] hover:bg-[#686D42] transition-all shadow-md hover:shadow-lg active:scale-98 border border-white/20 shrink-0"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            
            <a
              href="#treatments"
              className="inline-flex items-center justify-center px-8 h-[48px] rounded-full bg-[#FAF8F2] text-[#29291F] font-semibold text-[14px] uppercase tracking-[0.05em] hover:bg-white transition-all border border-[#A5A786]/50 shadow-md hover:shadow-lg active:scale-98 shrink-0"
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
