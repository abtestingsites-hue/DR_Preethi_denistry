import React from "react";
import Link from "next/link";
import { MessageSquare, CalendarCheck } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const FloatingActionButtons: React.FC = () => {
  const defaultWhatsAppUrl = `https://wa.me/${clinicInfo.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Preethi's Dentistry,\n\nI would like to enquire about a dental consultation.\n\nPlease let me know the availability.\n\nThank you."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* 1. Request Consultation Floating Button */}
      <Link
        href="/booking"
        aria-label="Request Dental Consultation"
        className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-full bg-[#7B8052] border border-white/20 text-[#FAF8F2] shadow-elevated hover:bg-[#555B38] transition-all duration-300 hover:scale-105 group"
      >
        <div className="w-9 h-9 rounded-full bg-[#FAF8F2] flex items-center justify-center text-[#7B8052] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
          <CalendarCheck className="w-4 h-4 text-[#7B8052]" />
        </div>
        <div className="hidden sm:block text-left pr-1">
          <p className="text-[10px] uppercase font-bold text-[#FAF8F2]/80 tracking-wider leading-none">
            Appointments
          </p>
          <p className="text-xs font-semibold text-[#FAF8F2] mt-0.5 leading-none">
            Request Consultation
          </p>
        </div>
      </Link>

      {/* 2. WhatsApp Reception Floating Button */}
      <a
        href={defaultWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Dr. Preethi's Dentistry on WhatsApp"
        className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-full bg-[#FAF8F2] border border-[#A5A786]/50 text-[#29291F] shadow-elevated hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
      >
        <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform">
          <MessageSquare className="w-4 h-4 fill-current text-white" />
        </div>
        <div className="hidden sm:block text-left pr-1">
          <p className="text-[10px] uppercase font-bold text-[#25D366] tracking-wider leading-none">
            Quick Contact
          </p>
          <p className="text-xs font-semibold text-[#29291F] mt-0.5 leading-none">
            WhatsApp Reception
          </p>
        </div>
      </a>

    </div>
  );
};
