"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  EyeOff, 
  Heart, 
  Award, 
  CreditCard,
  CheckCircle2,
  Phone
} from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export default function InvisalignClearAlignersPage() {
  const keyBenefits = [
    {
      title: "Virtually Invisible Aligners",
      desc: "Patented SmartTrack® medical-grade multi-layer polymers designed specifically for tooth movement.",
      icon: EyeOff,
    },
    {
      title: "ClinCheck® 3D Simulation",
      desc: "Digitally preview your smile transformation and exact tooth movement path before treatment starts.",
      icon: Sparkles,
    },
    {
      title: "Removable & Effortless Hygiene",
      desc: "Remove aligners while dining, brushing, or flossing without any food caught in brackets.",
      icon: Award,
    },
    {
      title: "Specialist Orthodontist Care",
      desc: "Every case is planned and overseen directly by certified Invisalign Provider Dr. Preethi Subramanian.",
      icon: Heart,
    },
  ];

  return (
    <div className="pt-28 md:pt-32 pb-16 bg-[#F5F0E6]">
      
      {/* Top Ribbon Banner matching GoClear & Clinical Insights */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#FAF8F2]/90">
              <span className="bg-[#555B38] px-3 py-1 rounded-full border border-white/20">
                CERTIFIED INVISALIGN® PROVIDER
              </span>
              <span>·</span>
              <span className="text-white/95">CUSTOM DIGITAL ALIGNMENT</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-white/90">SmartTrack® Technology</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-[#FAF8F2]/80">Saibaba Colony, Coimbatore</span>
            </div>

            <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              INVISALIGN® CLEAR ALIGNERS
            </h1>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              href="/booking?treatment=Invisalign%20Clear%20Aligners"
              className="inline-flex items-center gap-2.5 px-6 h-[44px] rounded-full bg-[#FAF8F2] text-[#29291F] text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-white transition-all shadow-md group"
            >
              <span>Book Invisalign Visit</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area - Matching GoClear Showcase Layout */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 relative z-10 space-y-10">
        
        {/* Supporting Narrative */}
        <div className="max-w-3xl space-y-1.5 text-left">
          <p className="text-[17px] sm:text-[19px] font-serif italic text-[#7B8052]">
            World-Class Clear Aligner Orthodontics Tailored for Discerning Smiles
          </p>
          <p className="text-[14px] sm:text-[15px] text-[#29291F]/80 leading-[1.6] font-light">
            Invisalign® treatment uses a series of custom-made, clear, removable aligners engineered to gradually straighten teeth with clinical precision. With millions of smiles transformed worldwide, it offers superior aesthetics and lifestyle convenience.
          </p>
        </div>

        {/* Full-Screen Balanced Showcase Card with 3D Depth Shadow */}
        <div className="w-full bg-[#FAF8F2] rounded-[24px] border border-[#A5A786]/40 shadow-elevated p-6 sm:p-8 lg:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left 5 Cols: Authentic Aligner Case Photography */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-[20px] overflow-hidden border border-[#7B8052]/30 shadow-elevated bg-gradient-to-br from-[#1E293B] to-[#0F172A] aspect-square max-h-[380px] w-full flex items-center justify-center p-6 group">
                <img
                  src="/goclear-case-tray.png"
                  alt="Invisalign Aligners in Sleek Case"
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Certified Badge */}
                <div className="absolute top-4 left-4 bg-[#7B8052] text-white px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider shadow-md">
                  Official Invisalign® Provider
                </div>

                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-[#FAF8F2]/95 backdrop-blur-md border border-[#A5A786]/40 text-center shadow-md">
                  <span className="text-[11px] font-bold text-[#7B8052] uppercase tracking-wider block">
                    3D Digital Intraoral Scans
                  </span>
                  <span className="text-[10px] text-[#29291F]/70 font-medium">
                    No Messy Dental Impressions · Exact Predictable Alignment
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: High-Impact Benefits */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#7B8052] block">
                  THE INVISALIGN ADVANTAGE
                </span>
                <h3 className="text-[22px] sm:text-[26px] font-serif font-bold text-[#29291F] mt-1">
                  Why Invisalign® Under Dr. Preethi Subramanian?
                </h3>
                <p className="text-[14px] text-[#29291F]/75 leading-[1.5] mt-1 font-light">
                  Unlike direct-to-consumer mail kits, your Invisalign treatment is supervised chairside by an experienced specialist orthodontist from digital scan to smile completion.
                </p>
              </div>

              {/* 4 Crisp Benefit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {keyBenefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-[16px] bg-[#F5F0E6] border border-[#A5A786]/35 shadow-subtle hover:shadow-card hover:border-[#7B8052] transition-all flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#7B8052] text-[#FAF8F2] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Icon className="w-5 h-5 text-[#FAF8F2]" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#29291F] leading-snug">
                          {b.title}
                        </h4>
                        <p className="text-[12px] text-[#29291F]/75 leading-relaxed mt-0.5 font-light">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/booking?treatment=Invisalign%20Clear%20Aligners"
                  className="inline-flex items-center gap-2 px-6 h-[46px] rounded-full bg-[#7B8052] text-white text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#686D42] transition-all shadow-elevated"
                >
                  <span>Request Invisalign Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${clinicInfo.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-1.5 px-6 h-[46px] rounded-full bg-[#F5F0E6] text-[#29291F] text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#E0DACB] transition-colors border border-[#A5A786]/40"
                >
                  <Phone className="w-4 h-4 text-[#7B8052]" />
                  <span>Call {clinicInfo.phoneDisplay}</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
