"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";

export const GlobalNavbar: React.FC = () => {
  const pathname = usePathname();
  const { openBookingModal } = useBookingModal();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Threshold: Hero section height (~80vh to 100vh)
      const heroThreshold = window.innerHeight * 0.75;
      if (window.scrollY > heroThreshold) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "TREATMENTS", href: "/#treatments" },
    { name: "INVISALIGN®", href: "/treatments/invisalign-clear-aligners" },
    { name: "CLINICAL GALLERY", href: "/#clinic-gallery" },
    { name: "MEET OUR DOCTOR", href: "/#doctor" },
    { name: "TESTIMONIALS", href: "/#testimonials" },
  ];

  // If on homepage and in hero section, hide logo and Book Visit button
  const showLogoAndBookVisit = !isHomePage || isScrolledPastHero;
  const useDarkTheme = !isHomePage || isScrolledPastHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkTheme
          ? "bg-[#F5F0E6]/95 backdrop-blur-md border-b border-[#A5A786]/30 shadow-sm h-[84px] md:h-[88px] flex items-center"
          : "bg-transparent h-[84px] md:h-[88px] flex items-center"
      }`}
    >
      {/* Edge-aligned full width container with left corner logo */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between">
        
        {/* Left: Clinic Logo - Hidden on Hero section of homepage, fades in smoothly when scrolled past */}
        <div className={`flex items-center gap-5 xl:gap-8 shrink-0 transition-opacity duration-300 ${
          showLogoAndBookVisit ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}>
          <Link href="/" className="flex items-center group">
            <img
              src="/clinic-logo-dark.png"
              alt="Dr. Preethi's Dentistry - Invisalign Provider"
              className={`w-[180px] sm:w-[200px] lg:w-[220px] xl:w-[230px] h-auto object-contain transition-all duration-300 ${
                useDarkTheme
                  ? "filter brightness-100 opacity-100"
                  : "filter brightness-0 invert opacity-95 drop-shadow-sm"
              }`}
            />
          </Link>
          {/* Subtle vertical divider line */}
          <div className="hidden lg:block w-[1px] h-7 bg-white/20" />
        </div>

        {/* Center: Desktop Navigation - 13px font, 0.08em tracking, 28-32px gap */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = link.name === "HOME" ? isHomePage : pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[13px] tracking-[0.08em] uppercase font-medium transition-colors duration-200 py-1 hover-line ${
                  useDarkTheme
                    ? isActive
                      ? "text-[#7B8052] font-semibold"
                      : "text-[#29291F] hover:text-[#7B8052]"
                    : isActive
                      ? "text-white font-semibold"
                      : "text-white/85 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#9EA657] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Book Visit CTA - Opens Booking Modal, Hidden on Hero section of homepage, fades in when scrolled past */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openBookingModal()}
            className={`hidden sm:inline-flex items-center justify-center gap-2 px-6 sm:px-7 h-[46px] md:h-[48px] rounded-full bg-[#7B8052] text-white text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#686D42] transition-all shadow-card hover:shadow-elevated active:scale-98 border border-white/15 cursor-pointer ${
              showLogoAndBookVisit
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <span>Book Visit</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden p-2.5 rounded-full transition-colors ${
              useDarkTheme
                ? "text-[#29291F] hover:bg-[#E0DACB]/40"
                : "text-white hover:bg-white/10"
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F5F0E6] border-b border-[#A5A786]/30 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[15px] font-medium tracking-[0.06em] text-[#29291F] hover:text-[#7B8052] py-1.5 border-b border-[#A5A786]/15"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="flex items-center justify-center gap-2 w-full h-[48px] rounded-full bg-[#7B8052] text-white text-[14px] uppercase tracking-[0.08em] font-semibold cursor-pointer"
            >
              <span>Book Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
