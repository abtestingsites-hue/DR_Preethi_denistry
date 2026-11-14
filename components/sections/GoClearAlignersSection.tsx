"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  X, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Smile, 
  Layers, 
  Clock, 
  Smartphone 
} from "lucide-react";

export const GoClearAlignersSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  const treatableCases = [
    { title: "Crowded Teeth", desc: "Straightens overlapping teeth by gently expanding and formatting the arch contour." },
    { title: "Gapped Teeth", desc: "Closes unsightly spacing and gaps between teeth for a continuous smile line." },
    { title: "Deep / Overbite", desc: "Restores balanced vertical overlap so bottom teeth don't impact the palate." },
    { title: "Crossbite", desc: "Corrects lateral misalignment where upper teeth bite inside lower teeth." },
    { title: "Open Bite", desc: "Aligns upper and lower anterior teeth so they meet naturally when chewing." },
  ];

  const comparisonRows = [
    { feature: "Visibility", goclear: "Nearly Invisible Ultra-Clear Trays", traditional: "Prominent Metal Wires & Brackets" },
    { feature: "Comfort", goclear: "Laser-trimmed smooth edges, zero cheek cuts", traditional: "Sharp brackets requiring dental wax" },
    { feature: "Removability", goclear: "100% Removable for meals & oral hygiene", traditional: "Fixed permanently for 12-24 months" },
    { feature: "Diet Restrictions", goclear: "None — enjoy all foods freely", traditional: "Strict avoidance of crunchy & sticky foods" },
    { feature: "Doctor Supervision", goclear: "Specialist Orthodontist planned & tracked", traditional: "Frequent in-office wire adjustments" },
    { feature: "Starting From", goclear: "₹2,500/month flexible installments", traditional: "Lump sum orthodontic fees" },
  ];

  return (
    <section id="goclear" className="relative bg-[#F5F0E6] py-20 md:py-28 border-b border-[#A5A786]/30 overflow-hidden">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-[#7B8052]/10 blur-3xl" />
        <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#A5A786]/20 blur-3xl" />
      </div>

      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header: The Clinic's Custom Clear Aligner Brand */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B8052]/15 border border-[#7B8052]/30 text-[#7B8052] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#7B8052]" />
            <span>AFFORDABLE ORTHODONTIC EXCELLENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#29291F] tracking-tight leading-tight">
            GoClear Clear Aligners
            <span className="block font-serif italic font-normal text-[#7B8052] text-2xl sm:text-3xl md:text-4xl mt-1">
              Straight Teeth, Clear Confidence — Custom-Crafted Under Specialist Supervision
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#29291F]/80 leading-relaxed font-light max-w-2xl mx-auto">
            Alongside Invisalign®, Dr. Preethi's Dentistry provides <strong>GoClear Aligners</strong>—our high-precision, in-house aligner system offering Coimbatore patients invisible orthodontic alignment with flexible plans starting from just ₹2,500/month.
          </p>
        </div>

        {/* Highlight Banner Card: Proportioned in Golden Ratio (5:8) with Architectural Clean Grid */}
        <div className="bg-[#FAF8F2] rounded-3xl border border-[#A5A786]/40 shadow-card p-6 sm:p-10 lg:p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 5 Cols: Product Photography Display with Clean Framed Fit */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-[#A5A786]/50 shadow-elevated bg-[#29291F] aspect-[4/5] max-h-[440px] w-full max-w-sm">
                <img
                  src="/goclear-box.jpg"
                  alt="Dr. Preethi Presenting GoClear Aligners Box"
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
                />
                
                {/* Price Ribbon */}
                <div className="absolute top-4 left-4 bg-[#7B8052] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  From ₹2,500/Month
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Value Proposition & Treatable Cases Selector */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#7B8052] block">
                  CUSTOM 3D DIGITAL FABRICATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#29291F] mt-1">
                  Why Thousands Choose GoClear
                </h3>
                <p className="text-xs sm:text-sm text-[#29291F]/75 leading-relaxed mt-2 font-light">
                  Fabricated using medical-grade thermoformed polymers, each GoClear tray applies calibrated micro-forces to guide your teeth into harmonious alignment. Monitored directly by Dr. Preethi Subramanian in Saibaba Colony.
                </p>
              </div>

              {/* Treatable Cases Micro-Buttons */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#29291F]/90 block">
                  What Can GoClear Correct?
                </span>
                <div className="flex flex-wrap gap-2">
                  {treatableCases.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCase(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                        selectedCase === idx
                          ? "bg-[#7B8052] text-white shadow-sm"
                          : "bg-[#F5F0E6] text-[#29291F]/80 hover:bg-[#A5A786]/30 border border-[#A5A786]/40"
                      }`}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
                {/* Description for selected case */}
                <div className="p-4 rounded-xl bg-[#F5F0E6] border border-[#A5A786]/30 text-xs text-[#29291F]/85 leading-relaxed">
                  <strong className="text-[#7B8052] font-bold">{treatableCases[selectedCase].title}: </strong>
                  {treatableCases[selectedCase].desc}
                </div>
              </div>

              {/* 3 Pillars Metric Cards */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#A5A786]/30">
                  <span className="text-base sm:text-lg font-serif font-bold text-[#7B8052] block leading-none">99%</span>
                  <span className="text-[10px] uppercase font-bold text-[#29291F]/70 tracking-tight mt-1 block">Virtually Invisible</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#A5A786]/30">
                  <span className="text-base sm:text-lg font-serif font-bold text-[#7B8052] block leading-none">0</span>
                  <span className="text-[10px] uppercase font-bold text-[#29291F]/70 tracking-tight mt-1 block">Food Restrictions</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F0E6] border border-[#A5A786]/30">
                  <span className="text-base sm:text-lg font-serif font-bold text-[#7B8052] block leading-none">3D</span>
                  <span className="text-[10px] uppercase font-bold text-[#29291F]/70 tracking-tight mt-1 block">Digital Preview</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/booking?treatment=GoClear%20Aligners"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7B8052] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#555B38] transition-all shadow-md group"
                >
                  <span>Request GoClear Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`tel:07812871829`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#A5A786]/50 text-[#29291F] text-xs uppercase tracking-wider font-semibold hover:bg-[#FAF8F2] transition-all shadow-sm"
                >
                  <span>Call 078128 71829</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Clean Architectural Comparison Table: GoClear vs Traditional Braces */}
        <div className="bg-[#FAF8F2] rounded-3xl border border-[#A5A786]/40 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#29291F]">
              GoClear vs Conventional Metal Braces
            </h4>
            <p className="text-xs text-[#29291F]/70">
              Clear clinical advantages tailored for adult and teenage lifestyle flexibility.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#A5A786]/40 text-[#29291F]">
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-[11px] text-[#29291F]/70">Feature</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-[11px] text-[#7B8052] bg-[#7B8052]/10 rounded-t-xl">
                    GoClear Clear Aligners
                  </th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider text-[11px] text-[#29291F]/70">
                    Traditional Braces
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A5A786]/20">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F5F0E6]/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#29291F]">{row.feature}</td>
                    <td className="py-3.5 px-4 font-medium text-[#7B8052] bg-[#7B8052]/5">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#7B8052] shrink-0" />
                        <span>{row.goclear}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#29291F]/70">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
