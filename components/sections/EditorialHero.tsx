"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const EditorialHero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#F5F0E6] pt-28 pb-20">
      
      {/* Background authentic clinic interior with Warm Cream & Olive color grade */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Clinic.png"
          alt="Dr. Preethi's Dentistry Reception Lounge"
          className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.04]"
        />
        {/* Warm Overlay in Warm Charcoal tones */}
        <div className="absolute inset-0 bg-[#29291F]/50 backdrop-blur-[1px]" />
      </div>

      {/* Center Studio Content */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-6 text-center text-white space-y-6">
        
        {/* Small subtitle tag */}
        <div className="inline-block">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#FAF8F2] font-semibold bg-[#7B8052]/85 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            WELCOME TO OUR CLINIC
          </p>
        </div>

        {/* Big Editorial Headline with Frame-by-Frame Stroke Write Animation */}
        <div className="relative py-2 max-w-5xl mx-auto flex flex-col items-center justify-center">
          
          <div className="w-full flex justify-center">
            <svg
              viewBox="0 0 1100 170"
              className="w-full max-w-[1050px] h-auto overflow-visible"
              aria-label="DR. PREETHI'S DENTISTRY"
            >
              <defs>
                <filter id="hero-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.6"/>
                </filter>
              </defs>
              
              {/* Primary Main Line: DR. PREETHI'S DENTISTRY with genuine stroke animation */}
              <text
                x="50%"
                y="55%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-serif font-bold text-[72px] sm:text-[92px] md:text-[104px] tracking-[0.14em] fill-transparent stroke-white animate-stroke-write"
                style={{
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                  strokeWidth: "2.2px",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  filter: "url(#hero-glow)"
                }}
              >
                DR. PREETHI'S DENTISTRY
              </text>
            </svg>
          </div>

          {/* Tagline: Treatment-related line */}
          <div className="mt-1 mb-2">
            <span className="text-sm sm:text-base md:text-lg font-serif italic tracking-[0.2em] uppercase text-[#FAF8F2] font-semibold drop-shadow-md">
              INVISALIGN® CLEAR ALIGNERS & SPECIALIST ORTHODONTIC CARE
            </span>
          </div>

          {/* Elegant Olive divider line */}
          <div className="w-full max-w-sm h-[2px] bg-[#A5A786] my-2" />

          {/* Subtitle in clean typography */}
          <div className="space-y-1.5 pt-1">
            <p className="text-sm sm:text-base font-serif font-semibold uppercase tracking-wider text-white drop-shadow-sm">
              ORTHODONTIST & INVISALIGN® PROVIDER
            </p>
            <p className="text-xs sm:text-sm uppercase tracking-wider text-[#FAF8F2]/90 font-medium drop-shadow-sm">
              SAIBABA COLONY · COIMBATORE
            </p>
          </div>
        </div>

        {/* Action Buttons in Olive & Soft Cream */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/booking"
            className="px-8 py-3.5 rounded-full bg-[#7B8052] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#555B38] transition-all shadow-float hover:scale-105 flex items-center gap-3 border border-white/20"
          >
            <span>Request Consultation</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
          <a
            href="#treatments"
            className="px-8 py-3.5 rounded-full bg-[#FAF8F2]/90 text-[#29291F] font-semibold text-xs uppercase tracking-wider hover:bg-white transition-all border border-[#A5A786]/50 shadow-sm"
          >
            Explore Treatments
          </a>
        </div>

      </div>

      {/* Torn Edge Bottom Divider into the Olive Care Banner */}
      <div className="absolute bottom-0 inset-x-0 h-5 bg-[#7B8052] torn-edge-top z-20 pointer-events-none" />
    </section>
  );
};
