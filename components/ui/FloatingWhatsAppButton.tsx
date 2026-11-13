import React from "react";
import { MessageSquare } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const FloatingWhatsAppButton: React.FC = () => {
  const defaultWhatsAppUrl = `https://wa.me/${clinicInfo.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Preethi's Dentistry,\n\nI would like to enquire about a dental consultation.\n\nPlease let me know the availability.\n\nThank you."
  )}`;

  return (
    <a
      href={defaultWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dr. Preethi's Dentistry on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-[#FAF8F2] border border-[#A5A786]/40 text-[#29291F] shadow-float hover:shadow-elevated transition-all duration-300 hover:scale-105 group"
    >
      <div className="w-9 h-9 rounded-full bg-[#7B8052] flex items-center justify-center text-[#FAF8F2] shrink-0 shadow-sm group-hover:bg-[#555B38] transition-colors">
        <MessageSquare className="w-4 h-4 fill-current" />
      </div>
      <div className="hidden sm:block text-left pr-1">
        <p className="text-[10px] uppercase font-bold text-[#7B8052] tracking-wider leading-none">
          Quick Contact
        </p>
        <p className="text-xs font-semibold text-[#29291F] mt-0.5 leading-none">
          WhatsApp Reception
        </p>
      </div>
    </a>
  );
};
