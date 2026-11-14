"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export const GlobalNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls past hero (approx 350px), header should transition to warm cream with dark text
      if (window.scrollY > 300) {
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
    { name: "Home", href: "/" },
    { name: "Needle-Free", href: "/#needle-free" },
    { name: "Treatments", href: "/#treatments" },
    { name: "GoClear", href: "/#goclear" },
    { name: "Clinical Insights", href: "/#reels" },
    { name: "Meet Doctor", href: "/#doctor" },
    { name: "Contact", href: "/contact" },
  ];

  const isHomePage = pathname === "/";
  // Light navbar (dark text) when not on home page OR when scrolled down the homepage
  const useDarkTheme = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 lg:px-12 ${
        useDarkTheme
          ? "bg-[#F5F0E6]/95 backdrop-blur-md border-b border-[#A5A786]/30 shadow-md py-3.5"
          : "bg-gradient-to-b from-[#29291F]/70 via-[#29291F]/30 to-transparent pt-5 pb-3"
      }`}
    >
      <div className="w-full max-w-[1450px] mx-auto flex items-center justify-between">
        
        {/* Left: Official Dr. Preethi's Dentistry & Invisalign Provider Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/clinic-logo-dark.png"
            alt="Dr. Preethi's Dentistry - Invisalign Provider"
            className={`h-9 sm:h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
              useDarkTheme
                ? "filter brightness-100 opacity-100"
                : "filter brightness-0 invert opacity-95 drop-shadow-md"
            }`}
          />
        </Link>

        {/* Center: Desktop Navbar as Free Floating links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-wider font-semibold transition-all duration-200 py-1 hover-line ${
                  useDarkTheme
                    ? isActive
                      ? "text-[#7B8052] font-bold"
                      : "text-[#29291F] hover:text-[#7B8052]"
                    : isActive
                      ? "text-white font-bold"
                      : "text-white/85 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Book Visit CTA Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#7B8052] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#555B38] transition-all shadow-md group border border-white/20"
          >
            <span>Book Visit</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </header>
  );
};
