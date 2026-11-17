"use client";

import React, { useState } from "react";
import { Sparkles, Check, ArrowRight, ShieldCheck, Clock, Calendar } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";

export const AlignerAssessmentWidget: React.FC = () => {
  const { openBookingModal } = useBookingModal();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    concern: "Mild Crowding",
    ageGroup: "Adult (22+ years)",
    priorBraces: "No",
    priority: "Discreet Appearance",
  });

  const concerns = [
    { label: "Mild Crowding", time: "6 – 9 Months", type: "GoClear Express / Invisalign Lite" },
    { label: "Deep Gap / Spacing", time: "7 – 12 Months", type: "Invisalign Comprehensive" },
    { label: "Overbite / Deep Bite", time: "10 – 14 Months", type: "Orthodontic Aligner Protocol" },
    { label: "Crooked Teeth", time: "8 – 12 Months", type: "Custom 3D Staged Aligners" },
  ];

  const currentPlan = concerns.find((c) => c.label === answers.concern) || concerns[0];

  return (
    <section className="bg-white py-14 sm:py-20 border-t border-[#E5E8E1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7B8052] bg-[#7B8052]/10 px-3 py-1 rounded-full inline-block">
            SMILE ASSESSMENT TOOL
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#29291F]">
            Discover Your Clear Aligner Pathway
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Get an instant clinical projection for Dr. Preethi Subramanian’s specialized 3D alignment protocol in Saibaba Colony.
          </p>
        </div>

        {/* Assessment Card */}
        <div className="bg-[#FAF9F5] rounded-3xl border border-[#E5E8E1] p-6 sm:p-10 shadow-subtle grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Selector */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] block mb-2">
                1. What would you like to improve about your smile?
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {concerns.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setAnswers({ ...answers, concern: c.label })}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      answers.concern === c.label
                        ? "bg-[#7B8052] text-white border-[#7B8052] shadow-sm"
                        : "bg-white text-[#29291F] border-[#E5E8E1] hover:border-[#7B8052]"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#666666] block mb-2">
                2. Have you previously undergone braces treatment?
              </label>
              <div className="flex gap-3">
                {["No, first time", "Yes, relapse case"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, priorBraces: option })}
                    className={`flex-1 py-2.5 px-4 rounded-xl border text-xs font-semibold transition-all ${
                      answers.priorBraces === option
                        ? "bg-[#7B8052] text-white border-[#7B8052] shadow-sm"
                        : "bg-white text-[#29291F] border-[#E5E8E1] hover:border-[#7B8052]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#666666] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#7B8052]" />
              <span>Certified Invisalign® &amp; GoClear Specialist Center in Coimbatore</span>
            </div>
          </div>

          {/* Right: Projected Clinical Pathway Output */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E8E1] shadow-elevated space-y-5">
            <div className="border-b border-[#E5E8E1] pb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B8052] block">
                PREDICTIVE ESTIMATE
              </span>
              <h3 className="text-lg font-serif font-bold text-[#29291F] mt-1">
                {currentPlan.type}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#666666] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7B8052]" />
                  Estimated Duration:
                </span>
                <span className="font-bold text-[#29291F]">{currentPlan.time}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#666666] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#7B8052]" />
                  Monthly Flexibility:
                </span>
                <span className="font-bold text-[#7B8052]">From ₹2,500 / month</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[#666666] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#7B8052]" />
                  Technology:
                </span>
                <span className="font-bold text-[#29291F]">Custom 3D Digital Scan</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openBookingModal(`Clear Aligners Assessment: ${answers.concern}`)}
                className="w-full py-3 rounded-full bg-[#7B8052] hover:bg-[#465239] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Book 3D Scan Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <p className="text-[9.5px] text-gray-400 text-center leading-relaxed">
              *Clinical suitability and exact tray count verified by Dr. Preethi Subramanian via intraoral digital scan.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
