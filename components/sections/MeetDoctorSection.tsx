import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const MeetDoctorSection: React.FC = () => {
  return (
    <section id="doctor" className="relative bg-[#F5F0E6]">
      
      {/* Top Olive Ribbon Banner with clean, plain blended architectural styling */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="max-w-2xl space-y-2 text-center md:text-left">
            <h2 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#FAF8F2]">
              CLINICAL LEADERSHIP · MEET OUR DOCTOR
            </h2>
            <p className="text-[15px] sm:text-[16px] text-white/95 font-light leading-[1.5]">
              Dr. Preethi Subramanian — Specialist Orthodontist &amp; certified Invisalign Provider dedicated to gentle, predictable, and aesthetic smile transformations in Coimbatore.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-6">
            <div className="hidden lg:block w-[1px] h-12 bg-white/30" />
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.08em] font-semibold text-white hover:text-[#FAF8F2] transition-colors group"
            >
              <span>ABOUT DOCTOR</span>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Main Doctor Profile Layout - Full screen width matching Navbar & Footer */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Doctor Portrait Image (5 Cols) with 3D Depth Shadow */}
          <div className="lg:col-span-5 relative max-w-md mx-auto w-full">
            <div className="rounded-[24px] overflow-hidden bg-[#FAF8F2] border border-[#A5A786]/40 shadow-elevated aspect-[4/5] relative">
              <img
                src="/Doctor.png"
                alt="Dr. Preethi Subramanian"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Authentic Shield Emblem: Refined standalone shield badge overlapping corner */}
            <div className="absolute -bottom-3.5 -right-2.5 z-20">
              <div 
                aria-label="Certified Specialist Shield"
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#7B8052] border-4 border-[#FAF8F2] flex items-center justify-center text-[#FAF8F2] shadow-elevated transition-transform hover:scale-105 cursor-default"
                title="Certified Specialist · Orthodontist & Invisalign® Provider"
              >
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#FAF8F2]" />
              </div>
            </div>
          </div>

          {/* About Doctor Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[12px] uppercase tracking-[0.12em] font-bold text-[#7B8052] bg-[#FAF8F2] px-3.5 py-1.5 rounded-full inline-block border border-[#A5A786]/35 shadow-sm">
              SPECIALIST ORTHODONTIST
            </span>

            <h2 className="text-[32px] sm:text-[42px] font-serif font-bold text-[#29291F] tracking-tight leading-[1.1]">
              {clinicInfo.doctorName}
            </h2>

            <p className="text-[13px] sm:text-[14px] font-semibold uppercase tracking-[0.08em] text-[#7B8052]">
              Orthodontist | Invisalign Provider · Coimbatore
            </p>

            <p className="text-[16px] sm:text-[17px] text-[#29291F]/80 leading-[1.6] font-light max-w-xl">
              Dr. Preethi Subramanian brings clinical precision, advanced digital treatment planning, and compassionate dental care to children, teens, and adults in Coimbatore. Specialising in Invisalign clear aligners, corrective orthodontics, and smile aesthetics, she believes that every smile transformation should be as comfortable and rewarding as the final result.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-w-lg">
              <div className="p-4 rounded-[16px] bg-[#FAF8F2] border border-[#A5A786]/30 shadow-subtle">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#7B8052] block">Clinical Focus</span>
                <span className="text-[14px] font-bold text-[#29291F] mt-0.5 block">Clear Aligners &amp; Orthodontics</span>
              </div>
              <div className="p-4 rounded-[16px] bg-[#FAF8F2] border border-[#A5A786]/30 shadow-subtle">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#7B8052] block">Location</span>
                <span className="text-[14px] font-bold text-[#29291F] mt-0.5 block">Saibaba Colony, Coimbatore</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 sm:px-7 h-[48px] rounded-full bg-[#7B8052] text-white text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#686D42] transition-all shadow-elevated group"
              >
                <span>Book Consultation with Dr. Preethi</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 sm:px-7 h-[48px] rounded-full bg-[#FAF8F2] border border-[#A5A786]/50 text-[#29291F] text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-white transition-all shadow-subtle"
              >
                <span>Read Full Profile</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
