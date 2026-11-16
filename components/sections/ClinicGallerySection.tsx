"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryImagesData } from "@/data/galleryImagesData";

interface ClinicGallerySectionProps {
  isPage?: boolean;
}

export const ClinicGallerySection: React.FC<ClinicGallerySectionProps> = ({ isPage = false }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const images = isPage ? galleryImagesData : galleryImagesData.slice(0, 6);

  return (
    <section id="clinic-gallery" className="relative bg-white">
      
      {/* Top Olive Ribbon Banner with clean, plain blended architectural styling */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#465239]/40 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="max-w-2xl space-y-2 text-center md:text-left">
            <h2 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#F2F5ED]">
              OUR CLINICAL ENVIRONMENT · INSIDE DR. PREETHI&apos;S DENTISTRY
            </h2>
            <p className="text-[15px] sm:text-[16px] text-white/95 font-light leading-[1.5]">
              Experience a modern, serene orthodontic practice featuring advanced Class-B sterilisation, digital 3D intraoral diagnostics, and tranquil treatment suites.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-6">
            <div className="hidden lg:block w-[1px] h-12 bg-white/30" />
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.08em] font-semibold text-white hover:text-[#F2F5ED] transition-colors group"
            >
              <span>EXPLORE GALLERY</span>
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Gallery Grid - Full screen width matching Navbar & Footer with 3D Depth Shadows */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {images.map((item, index) => {
            const isHovered = hoveredId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveLightboxIndex(index)}
                className="group relative overflow-hidden rounded-[18px] bg-white border border-[#E5E8E1] h-[210px] sm:h-[225px] md:h-[240px] cursor-pointer shadow-elevated hover:shadow-2xl hover:border-[#7B8052] transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] uppercase font-bold tracking-wider text-[#7B8052] border border-[#E5E8E1] shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Resting title */}
                <div className={`absolute bottom-3.5 left-4 right-4 z-10 transition-all duration-300 ${
                  isHovered ? "opacity-0 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
                }`}>
                  <h4 className="text-[17px] sm:text-[19px] font-serif font-bold text-white drop-shadow-md">
                    {item.title}
                  </h4>
                </div>

                {/* Hover Reveal Overlay */}
                <div
                  className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-end text-white transition-all duration-300 ${
                    isHovered
                      ? "bg-[#465239]/92 opacity-100 backdrop-blur-[2px]"
                      : "bg-transparent opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#8FA36C] mb-1">
                    Clinic Environment
                  </span>
                  <h4 className="text-[19px] sm:text-[21px] font-serif font-bold tracking-tight text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[13px] text-white/90 mt-1.5 line-clamp-2 leading-[1.5] font-light">
                    {item.description}
                  </p>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#7B8052] bg-white px-3.5 py-1 rounded-full inline-block mt-3 w-fit shadow-md">
                    Click to view full photo
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 text-white hover:text-[#7B8052] p-2"
            aria-label="Close modal"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() =>
              setActiveLightboxIndex((prev) =>
                prev! > 0 ? prev! - 1 : images.length - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={images[activeLightboxIndex].imageUrl}
              alt={images[activeLightboxIndex].title}
              className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center mt-4 text-white">
              <h4 className="text-xl font-serif font-bold">{images[activeLightboxIndex].title}</h4>
              <p className="text-sm text-white/80 mt-1 max-w-lg">{images[activeLightboxIndex].description}</p>
            </div>
          </div>

          <button
            onClick={() =>
              setActiveLightboxIndex((prev) =>
                prev! < images.length - 1 ? prev! + 1 : 0
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
};
