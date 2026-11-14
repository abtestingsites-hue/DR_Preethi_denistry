"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

export const GlobalNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition to warm cream backdrop when scrolled down
      if (window.scrollY > 250) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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

  const isHomePage = pathname === "/";
  const useDarkTheme = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useDarkTheme
          ? "bg-[#F5F0E6]/95 backdrop-blur-md border-b border-[#A5A786]/30 shadow-sm py-3"
          : "bg-gradient-to-b from-[#29291F]/85 via-[#29291F]/40 to-transparent py-4 sm:py-5"
      }`}
    >
      {/* 5-6% Horizontal Margins across viewports (px-5 sm:px-8 lg:px-[5.5vw]) */}
      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-[5.5vw] flex items-center justify-between">
        
        {/* Left: Clinic Logo + Vertical Divider matching reference image */}
        <div className="flex items-center gap-6 xl:gap-8 shrink-0">
          <Link href="/" className="flex items-center group">
            <img
              src="/clinic-logo-dark.png"
              alt="Dr. Preethi's Dentistry - Invisalign Provider"
              className={`w-[170px] sm:w-[195px] lg:w-[220px] h-auto object-contain transition-all duration-300 ${
                useDarkTheme
                  ? "filter brightness-100 opacity-100"
                  : "filter brightness-0 invert opacity-95 drop-shadow-sm"
              }`}
            />
          </Link>
          {/* Subtle vertical divider line from reference */}
          <div className="hidden lg:block w-[1px] h-8 bg-white/20" />
        </div>

        {/* Center: Desktop Navigation - matches reference active underline and styling */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = link.name === "HOME" ? isHomePage : pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[12px] xl:text-[13px] tracking-[0.1em] uppercase font-medium transition-colors duration-200 py-1 ${
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

        {/* Right: Book Visit CTA (Height 48-50px) & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/booking"
            className="hidden sm:inline-flex items-center justify-center gap-2 px-6 h-[48px] rounded-full bg-[#7B8052] text-white text-[14px] uppercase tracking-[0.08em] font-semibold hover:bg-[#555B38] transition-all shadow-card hover:shadow-elevated active:scale-98 border border-white/15"
          >
            <span>Book Visit</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

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
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full h-[48px] rounded-full bg-[#7B8052] text-white text-[14px] uppercase tracking-[0.08em] font-semibold"
            >
              <span>Book Visit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
