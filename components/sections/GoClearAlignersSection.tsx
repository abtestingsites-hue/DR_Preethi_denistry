"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  EyeOff, 
  Heart, 
  Award, 
  CreditCard 
} from "lucide-react";

export const GoClearAlignersSection: React.FC = () => {
  // Short & Sweet 4 core benefits
  const keyBenefits = [
    {
      title: "Nearly Invisible",
      desc: "Ultra-clear medical polymers undetectable during everyday speech and smiling.",
      icon: EyeOff,
    },
    {
      title: "Maximum Comfort",
      desc: "Laser-trimmed smooth borders with zero sharp metal brackets or gum irritation.",
      icon: Heart,
    },
    {
      title: "100% Removable",
      desc: "Eat freely with zero diet restrictions and maintain effortless oral hygiene.",
      icon: Award,
    },
    {
      title: "Affordable & Supervised",
      desc: "Flexible plans from ₹2,500/month directly planned by Dr. Preethi Subramanian.",
      icon: CreditCard,
    },
  ];

  return (
    <section id="goclear" className="relative bg-white">
      
      {/* Top Olive Ribbon Banner matching WATCH OUR CLINICAL INSIGHTS style */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#465239]/40 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#F2F5ED]/90">
              <span className="bg-[#465239] px-3 py-1 rounded-full border border-white/20">
                AFFORDABLE ORTHODONTIC EXCELLENCE
              </span>
              <span>·</span>
              <span className="text-white/95">FROM ₹2,500/MONTH</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-white/90">Custom 3D Digital Fabrication</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-[#F2F5ED]/80">Saibaba Colony, Coimbatore</span>
            </div>

            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-white">
              GOCLEAR CLEAR ALIGNERS
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              href="/booking?treatment=GoClear%20Aligners"
              className="inline-flex items-center gap-2.5 px-6 h-[44px] rounded-full bg-white text-black text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#F2F5ED] transition-all shadow-md group border border-[#E5E8E1]"
            >
              <span>Request Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Area - Full screen padding matching Navbar & Footer */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-14 relative z-10 space-y-8">
        
        {/* Supporting Narrative - Full width aligned with navbar bounds */}
        <div className="w-full space-y-1.5 text-left">
          <p className="text-[17px] sm:text-[19px] font-serif italic text-[#7B8052]">
            Straight Teeth, Clear Confidence — Custom-Crafted Under Specialist Care
          </p>
          <p className="text-[14px] sm:text-[15px] text-[#666666] leading-[1.6] font-light">
            Experience discrete orthodontic alignment with GoClear aligners—our high-precision clear aligner system with custom 3D staging, zero food restrictions, and flexible plans from just <strong>₹2,500/month</strong>.
          </p>
        </div>

        {/* Full-Screen Balanced Showcase Card with 3D Depth Shadow */}
        <div className="w-full bg-[#F2F5ED] rounded-[24px] border border-[#E5E8E1] shadow-elevated p-6 sm:p-8 lg:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left 5 Cols: Authentic Aligner Case & Tray Reference Imagery */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-[20px] overflow-hidden border border-[#E5E8E1] shadow-elevated bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A] aspect-square max-h-[380px] w-full flex items-center justify-center p-6 group">
                <img
                  src="/goclear-case-tray.png"
                  alt="GoClear Clear Aligner Arch Tray and Sleek Travel Case"
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Price Ribbon */}
                <div className="absolute top-4 left-4 bg-[#7B8052] text-white px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider shadow-md">
                  From ₹2,500/Month
                </div>

                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#E5E8E1] text-center shadow-md">
                  <span className="text-[11px] font-bold text-[#7B8052] uppercase tracking-wider block">
                    Certified Medical-Grade Polymer
                  </span>
                  <span className="text-[10px] text-[#666666] font-medium">
                    100% Removable · Transparent · Pain-Free
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Short, Sweet & High-Impact Benefits */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-[12px] uppercase tracking-widest font-extrabold text-[#7B8052] block">
                  THE GOCLEAR ADVANTAGE
                </span>
                <h3 className="text-[22px] sm:text-[26px] font-serif font-bold text-black mt-1">
                  Why Choose GoClear Over Traditional Braces?
                </h3>
                <p className="text-[14px] text-[#666666] leading-[1.5] mt-1 font-light">
                  Engineered for busy professionals, teenagers, and adults who desire an invisible smile transformation without the burden of metal brackets.
                </p>
              </div>

              {/* 4 Crisp Benefit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {keyBenefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-[16px] bg-white border border-[#E5E8E1] shadow-subtle hover:shadow-card hover:border-[#7B8052] transition-all flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#7B8052] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-black leading-snug">
                          {b.title}
                        </h4>
                        <p className="text-[12px] text-[#666666] leading-relaxed mt-0.5 font-light">
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
                  href="/booking?treatment=GoClear%20Aligners"
                  className="inline-flex items-center gap-2 px-6 h-[46px] rounded-full bg-[#7B8052] text-white text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#465239] transition-all shadow-elevated"
                >
                  <span>Request GoClear Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:07812871829"
                  className="inline-flex items-center justify-center px-6 h-[46px] rounded-full bg-white text-black text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#F2F5ED] transition-colors border border-[#E5E8E1]"
                >
                  Call 078128 71829
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
