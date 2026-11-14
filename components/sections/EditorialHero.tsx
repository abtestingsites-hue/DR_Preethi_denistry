"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export const EditorialHero: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Reveal triggers on:
    // 1. Mouse movement anywhere over the page
    // 2. Touch screen tap or touch movement on mobile
    // 3. Wheel or keyboard scroll
    const handleTrigger = () => {
      setIsRevealed(true);
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsRevealed(true);
      }
    };

    window.addEventListener("mousemove", handleTrigger, { once: true, passive: true });
    window.addEventListener("touchstart", handleTrigger, { once: true, passive: true });
    window.addEventListener("pointerdown", handleTrigger, { once: true, passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleTrigger);
      window.removeEventListener("touchstart", handleTrigger);
      window.removeEventListener("pointerdown", handleTrigger);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const triggerReveal = () => {
    setIsRevealed(true);
  };

  return (
    <section 
      onClick={triggerReveal}
      className="relative min-h-[96vh] sm:min-h-screen flex items-center overflow-hidden bg-[#29291F] pt-24 pb-16 cursor-default select-none"
    >
      
      {/* Preserved authentic clinic reception photograph with exact crop and composition */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/Clinic.png"
          alt="Dr. Preethi's Dentistry Reception Lounge"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.02]"
        />
        {/* Calibrated directional gradient overlay: Leaves wall Invisalign branding crystal clear on left while guaranteeing WCAG AAA text legibility on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#29291F]/25 via-[#29291F]/50 to-[#29291F]/85" />
      </div>

      {/* Prompt cue before interaction: Minimalist architectural bouncing down arrow */}
      {!isRevealed && (
        <button
          onClick={triggerReveal}
          aria-label="Explore clinic"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center w-11 h-11 rounded-full bg-[#7B8052]/90 hover:bg-[#7B8052] text-white border border-white/30 backdrop-blur-sm transition-all animate-bounce cursor-pointer shadow-float group"
        >
          <ChevronDown className="w-5 h-5 text-[#FAF8F2] group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* 12-Column Grid Container with 5-6% Horizontal Margins (px-5 sm:px-8 lg:px-[5.5vw]) */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-[5.5vw] flex justify-end">
        
        {/* Right Focal Zone: max 620px width, occupies right half with breathing room from edge */}
        <div
          className={`w-full md:w-[580px] lg:w-[620px] max-w-[620px] flex flex-col text-left transition-all duration-700 ease-out ${
            isRevealed
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-95 pointer-events-none"
          }`}
        >
          
          {/* Eyebrow text: 14-16px, uppercase, letter-spacing 3-4px, aligned to content left edge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1.5px] bg-[#FAF8F2]/60 shrink-0" />
            <span className="text-[14px] sm:text-[15px] uppercase font-semibold tracking-[0.24em] text-[#FAF8F2]/90 drop-shadow-sm font-sans">
              DR. PREETHI'S DENTISTRY
            </span>
          </div>

          {/* Main Heading: 64-76px on desktop (40-48px tablet, 34-42px mobile), elegant serif font, 2-3 lines */}
          <h1 className="text-[34px] sm:text-[44px] md:text-[54px] lg:text-[68px] xl:text-[72px] font-serif font-bold text-white leading-[1.06] tracking-tight drop-shadow-lg mb-6">
            Care Designed{" "}
            <span className="font-serif italic font-normal text-[#E2E8B8] block">
              Around Your Smile
            </span>
          </h1>

          {/* Supporting Description: 20-22px (Golden ratio 1.618: ~42px/68px scale), line-height 1.5 */}
          <p className="text-[17px] sm:text-[19px] lg:text-[21px] text-[#FAF8F2]/90 font-light leading-[1.5] drop-shadow-md mb-8 max-w-[560px]">
            Advanced Orthodontic &amp; Invisalign® Care in a Comfortable, Personalized Environment.
          </p>

          {/* Fine horizontal architectural line rule */}
          <div className="w-full max-w-[480px] h-[1px] bg-[#A5A786]/40 mb-8" />

          {/* CTA Buttons: Horizontally aligned with 16-20px gap, 16px semibold text */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2.5 px-8 h-[50px] rounded-full bg-[#7B8052] text-white font-semibold text-[16px] hover:bg-[#555B38] transition-all shadow-card hover:shadow-elevated active:scale-98 border border-white/20 shrink-0"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
            
            <a
              href="#treatments"
              className="inline-flex items-center justify-center px-8 h-[50px] rounded-full bg-[#FAF8F2] text-[#29291F] font-semibold text-[16px] hover:bg-white transition-all border border-[#A5A786]/50 shadow-card hover:shadow-elevated active:scale-98 shrink-0"
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
