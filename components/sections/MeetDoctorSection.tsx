import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const MeetDoctorSection: React.FC = () => {
  return (
    <section id="doctor" className="relative bg-[#F5F0E6]">
      
      {/* Top Olive Ribbon Banner matching CARE DESIGNED AROUND YOUR SMILE style */}
      <div className="bg-[#7B8052] text-white py-12 px-6 sm:px-12 torn-edge-top torn-edge-bottom relative z-10 shadow-md">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-3xl space-y-2">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#FAF8F2]">
              CLINICAL LEADERSHIP · MEET OUR DOCTOR
            </h2>
            <p className="text-sm sm:text-base text-white/95 font-light leading-relaxed">
              Dr. Preethi Subramanian — Specialist Orthodontist & certified Invisalign Provider dedicated to gentle, predictable, and aesthetic smile transformations in Coimbatore.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-6">
            <div className="hidden lg:block w-[1px] h-12 bg-white/30" />
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-wider font-bold text-white hover:text-[#FAF8F2] transition-colors group"
            >
              <span>ABOUT DOCTOR</span>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Main Doctor Profile Layout */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Doctor Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden bg-[#FAF8F2] border border-[#A5A786]/50 shadow-card aspect-[4/5] relative">
              <img
                src="/Doctor.png"
                alt="Dr. Preethi Subramanian"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stamp Badge */}
            <div className="absolute -bottom-6 -right-4 bg-[#FAF8F2] border border-[#A5A786]/50 p-5 rounded-2xl shadow-card max-w-[260px]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#7B8052]" />
                <span className="text-xs uppercase tracking-wider font-bold text-[#7B8052]">
                  Orthodontist
                </span>
              </div>
              <p className="text-sm font-serif font-bold text-[#29291F] mt-1">
                Invisalign® Provider
              </p>
              <p className="text-[11px] text-[#29291F]/70 mt-0.5">
                Saibaba Colony, Coimbatore
              </p>
            </div>
          </div>

          {/* About Doctor Details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-wider font-bold text-[#7B8052] bg-[#FAF8F2] px-3.5 py-1.5 rounded-full inline-block border border-[#A5A786]/40">
              SPECIALIST ORTHODONTIST
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#29291F] tracking-tight">
              {clinicInfo.doctorName}
            </h2>

            <p className="text-sm font-semibold uppercase tracking-wider text-[#7B8052]">
              Orthodontist | Invisalign Provider · Coimbatore
            </p>

            <p className="text-base text-[#29291F]/80 leading-relaxed font-light">
              Dr. Preethi Subramanian brings clinical precision, advanced digital treatment planning, and compassionate dental care to children, teens, and adults in Coimbatore. Specialising in Invisalign clear aligners, corrective orthodontics, and smile aesthetics, she believes that every smile transformation should be as comfortable and rewarding as the final result.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#A5A786]/30">
                <span className="text-xs uppercase tracking-wider font-bold text-[#7B8052] block">Clinical Focus</span>
                <span className="text-sm font-bold text-[#29291F]">Clear Aligners & Orthodontics</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#A5A786]/30">
                <span className="text-xs uppercase tracking-wider font-bold text-[#7B8052] block">Location</span>
                <span className="text-sm font-bold text-[#29291F]">Saibaba Colony, Coimbatore</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7B8052] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#555B38] transition-all shadow-md group"
              >
                <span>Book Consultation with Dr. Preethi</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FAF8F2] border border-[#A5A786]/50 text-[#29291F] text-xs uppercase tracking-wider font-bold hover:bg-white transition-all shadow-sm"
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
