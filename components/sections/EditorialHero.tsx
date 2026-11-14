"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const EditorialHero: React.FC = () => {
  return (
    <section 
      className="relative min-h-[96vh] sm:min-h-screen flex items-center overflow-hidden bg-[#29291F] pt-24 pb-16 cursor-default select-none"
    >
      
      {/* Preserved authentic clinic reception photograph with exact crop and composition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Clinic.png"
          alt="Dr. Preethi's Dentistry Reception Lounge"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02]"
        />
        {/* Soft atmospheric gradient matching the reference image */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#29291F]/20 to-[#29291F]/70" />
      </div>

      {/* Grid Container matching reference composition */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-[5.5vw] flex justify-end">
        
        {/* Content Box: Perfectly aligned with reference layout */}
        <div className="w-full md:w-[600px] lg:w-[650px] max-w-[650px] flex flex-col text-left">
          
          {/* Eyebrow Label with Architectural Lines flanking DR. PREETHI'S DENTISTRY */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 sm:w-14 h-[1.5px] bg-[#A5A786]/70 shrink-0" />
            <span className="text-[12px] sm:text-[13px] lg:text-[14px] uppercase font-medium tracking-[0.22em] text-[#FAF8F2]/90 drop-shadow-sm font-sans">
              DR. PREETHI&apos;S DENTISTRY
            </span>
            <span className="w-10 sm:w-14 h-[1.5px] bg-[#A5A786]/70 shrink-0" />
          </div>

          {/* Main Heading: Matches reference typography exactly */}
          <h1 className="text-[42px] sm:text-[54px] md:text-[62px] lg:text-[72px] font-serif font-bold text-white leading-[1.05] tracking-tight drop-shadow-md mb-5">
            Care Designed{" "}
            <span className="font-serif italic font-normal text-[#D7DE9E] block sm:inline">
              Around Your Smile
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="text-[17px] sm:text-[19px] lg:text-[21px] text-[#FAF8F2]/90 font-light leading-[1.5] drop-shadow-sm mb-7 max-w-[580px]">
            Advanced Orthodontic &amp; Invisalign® Care in a Comfortable, Personalized Environment.
          </p>

          {/* Thin horizontal architectural divider line */}
          <div className="w-full max-w-[520px] h-[1px] bg-[#A5A786]/40 mb-7" />

          {/* Action Buttons: Request Consultation (olive) & Explore Treatments (warm cream) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2.5 px-7 h-[48px] rounded-full bg-[#7B8052] text-white font-semibold text-[14px] sm:text-[15px] uppercase tracking-[0.05em] hover:bg-[#686D42] transition-all shadow-card hover:shadow-elevated active:scale-98 border border-white/20 shrink-0"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            
            <a
              href="#treatments"
              className="inline-flex items-center justify-center px-7 h-[48px] rounded-full bg-[#FAF8F2] text-[#29291F] font-semibold text-[14px] sm:text-[15px] uppercase tracking-[0.05em] hover:bg-white transition-all border border-[#A5A786]/50 shadow-card hover:shadow-elevated active:scale-98 shrink-0"
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
