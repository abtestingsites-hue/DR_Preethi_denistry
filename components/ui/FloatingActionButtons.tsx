"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

export const FloatingActionButtons: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // If not on homepage, always visible
      if (!isHomePage) {
        setIsVisible(true);
        return;
      }

      // On homepage, hide while in Hero section, reveal when scrolled to other sections
      const heroThreshold = window.innerHeight * 0.75;
      if (window.scrollY > heroThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const defaultWhatsAppUrl = `https://wa.me/${clinicInfo.whatsappNumber}?text=${encodeURIComponent(
    "Hello Dr. Preethi's Dentistry,\n\nI would like to enquire about a dental consultation.\n\nPlease let me know the availability.\n\nThank you."
  )}`;

  return (
    <aside 
      aria-label="Quick Actions" 
      className={`fixed bottom-7 right-7 z-40 flex flex-col items-end gap-3.5 select-none transition-all duration-300 ${
        isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      
      {/* 1. Request Consultation Floating Button - Pure Architectural Icon Button */}
      <Link
        href="/booking"
        aria-label="Request Dental Consultation"
        title="Request Consultation"
        className="pointer-events-auto flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#7B8052] border-2 border-[#FAF8F2] text-[#FAF8F2] shadow-elevated hover:bg-[#555B38] transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        <CalendarCheck className="w-5 h-5 text-[#FAF8F2] group-hover:scale-105 transition-transform" />
      </Link>

      {/* 2. Official WhatsApp Logo Floating Button - Pure Icon Button with Authentic Official SVG */}
      <a
        href={defaultWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Dr. Preethi's Dentistry on WhatsApp"
        title="Chat on WhatsApp"
        className="pointer-events-auto flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] border-2 border-[#FAF8F2] text-white shadow-elevated hover:bg-[#20BD5A] transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          className="text-white drop-shadow-sm group-hover:scale-105 transition-transform"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.69 12.05 3.69C14.25 3.69 16.32 4.55 17.87 6.11C19.42 7.66 20.28 9.73 20.28 11.93C20.27 16.47 16.59 20.15 12.05 20.15ZM16.57 14.39C16.32 14.27 15.1 13.67 14.87 13.58C14.65 13.5 14.49 13.46 14.32 13.71C14.16 13.96 13.69 14.51 13.55 14.68C13.41 14.85 13.27 14.87 13.02 14.74C12.77 14.62 11.97 14.35 11.02 13.51C10.28 12.85 9.78 12.04 9.64 11.79C9.5 11.54 9.62 11.41 9.75 11.28C9.86 11.17 10 10.98 10.12 10.84C10.24 10.7 10.28 10.6 10.36 10.43C10.44 10.26 10.4 10.12 10.34 9.99C10.28 9.87 9.79 8.66 9.58 8.16C9.38 7.67 9.18 7.74 9.02 7.73C8.87 7.72 8.71 7.72 8.54 7.72C8.38 7.72 8.11 7.78 7.89 8.02C7.66 8.27 7.03 8.86 7.03 10.06C7.03 11.26 7.9 12.42 8.02 12.58C8.15 12.75 9.74 15.2 12.18 16.25C12.76 16.5 13.21 16.65 13.57 16.76C14.15 16.95 14.68 16.92 15.1 16.86C15.57 16.79 16.54 16.27 16.74 15.7C16.94 15.13 16.94 14.64 16.88 14.54C16.82 14.44 16.7 14.38 16.45 14.26L16.57 14.39Z"/>
        </svg>
      </a>

    </aside>
  );
};
