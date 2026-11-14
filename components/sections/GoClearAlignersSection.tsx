"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  EyeOff, 
  Heart, 
  Smartphone, 
  Award, 
  CreditCard, 
  UserCheck 
} from "lucide-react";

export const GoClearAlignersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

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

  // Quick treatable cases pill tags
  const treatablePills = [
    "Crowded Teeth",
    "Gapped Teeth",
    "Overbite",
    "Underbite",
    "Crossbite",
    "Deep Bite",
    "Mid-line Shift"
  ];

  return (
    <section id="goclear" className="relative bg-[#F5F0E6] py-16 md:py-24 border-b border-[#A5A786]/30 overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#7B8052]/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#A5A786]/20 blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header: Focused, Crisp & Elegant */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B8052]/15 border border-[#7B8052]/30 text-[#7B8052] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-4 h-4 text-[#7B8052]" />
            <span>AFFORDABLE ORTHODONTIC EXCELLENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#29291F] tracking-tight leading-tight">
            GoClear Clear Aligners
            <span className="block font-serif italic font-normal text-[#7B8052] text-2xl sm:text-3xl md:text-4xl mt-1">
              Straight Teeth, Clear Confidence — Custom-Crafted Under Specialist Care
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#29291F]/80 leading-relaxed font-light max-w-2xl mx-auto">
            Experience discrete orthodontic alignment with GoClear aligners—our high-precision clear aligner system with custom 3D staging, zero food restrictions, and flexible plans from just <strong>₹2,500/month</strong>.
          </p>
        </div>

        {/* Full-Screen Balanced Showcase Card (Alphanumeric Depth & Shadows) */}
        <div className="w-full bg-[#FAF8F2] rounded-3xl border border-[#A5A786]/40 shadow-elevated p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 5 Cols: Authentic Aligner Case & Tray Reference Imagery */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#7B8052]/30 shadow-card bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A] aspect-square max-h-[420px] w-full flex items-center justify-center p-6 group">
                <img
                  src="/goclear-case-tray.png"
                  alt="GoClear Clear Aligner Arch Tray and Sleek Travel Case"
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Price Ribbon */}
                <div className="absolute top-4 left-4 bg-[#7B8052] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  From ₹2,500/Month
                </div>

                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-[#FAF8F2]/95 backdrop-blur-md border border-[#A5A786]/40 text-center shadow-md">
                  <span className="text-[11px] font-bold text-[#7B8052] uppercase tracking-wider block">
                    Certified Medical-Grade Polymer
                  </span>
                  <span className="text-[10px] text-[#29291F]/70 font-medium">
                    100% Removable · Transparent · Pain-Free
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Short, Sweet & High-Impact Benefits */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#7B8052] block">
                  THE GOCLEAR ADVANTAGE
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#29291F] mt-1">
                  Why Choose GoClear Over Braces?
                </h3>
                <p className="text-xs sm:text-sm text-[#29291F]/75 leading-relaxed mt-1 font-light">
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
                      className="p-4 rounded-2xl bg-[#F5F0E6] border border-[#A5A786]/40 shadow-subtle hover:shadow-card hover:border-[#7B8052] transition-all flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#7B8052] text-[#FAF8F2] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Icon className="w-5 h-5 text-[#FAF8F2]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#29291F]">
                          {b.title}
                        </h4>
                        <p className="text-[11px] text-[#29291F]/75 leading-relaxed mt-1">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Treatable Cases Tags */}
              <div className="pt-1 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#29291F]/70 block">
                  Treatable Conditions:
                </span>
                <div className="flex flex-wrap gap-2">
                  {treatablePills.map((pill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#FAF8F2] border border-[#A5A786]/50 text-[11px] font-semibold text-[#7B8052] shadow-subtle"
                    >
                      ✓ {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Row */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/booking?treatment=GoClear%20Aligners"
                  className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#7B8052] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#555B38] transition-all shadow-md group"
                >
                  <span>Request GoClear Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="tel:07812871829"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#A5A786]/50 text-[#29291F] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF8F2] transition-all shadow-sm"
                >
                  <span>Call 078128 71829</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
