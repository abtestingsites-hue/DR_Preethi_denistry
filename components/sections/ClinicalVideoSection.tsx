"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, X, Clock, Calendar, ArrowRight } from "lucide-react";
import { clinicalVideosData, ClinicalVideo } from "@/data/clinicalVideosData";

interface VideoGalleryProps {
  isPage?: boolean;
}

export const ClinicalVideoSection: React.FC<VideoGalleryProps> = ({ isPage = false }) => {
  const [selectedVideo, setSelectedVideo] = useState<ClinicalVideo | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Invisalign & Clear Aligners",
    "Oral Hygiene",
    "Smile Care",
    "Treatment Education",
    "Dental Awareness",
    "Clinic Updates",
  ];

  const filteredVideos =
    activeCategory === "All"
      ? clinicalVideosData
      : clinicalVideosData.filter((v) => v.category === activeCategory);

  const displayedVideos = isPage ? filteredVideos : clinicalVideosData.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-[#F5F0E6] relative overflow-hidden" id="clinical-insights">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#7C8052] font-bold bg-[#FAF7F0] px-3.5 py-1.5 rounded-full inline-block border border-[#DCD4C4]">
              Independent Video Library
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-[#292820] mt-3 tracking-tight">
              Clinical Insights &{" "}
              <span className="italic text-[#7C8052] font-medium">
                Smile Education
              </span>
            </h2>
            <p className="text-[#6B6858] text-base md:text-lg mt-4 leading-relaxed font-normal">
              Explore dental care guidance, treatment insights and educational videos from Dr. Preethi's Dentistry.
            </p>
          </div>

          {!isPage && (
            <Link
              href="/clinical-insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C8052] hover:text-[#64683E] transition-colors group"
            >
              <span>Explore All Videos ({clinicalVideosData.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Category Filters */}
        {isPage && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#7C8052] text-white shadow-sm"
                    : "bg-[#FAF7F0] text-[#6B6858] hover:text-[#292820] border border-[#DCD4C4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer rounded-[28px] bg-[#FAF7F0] border border-[#DCD4C4] overflow-hidden shadow-subtle hover:shadow-card hover:border-[#7C8052]/50 transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#292820]/5">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[#292820]/80 backdrop-blur-sm text-[11px] font-medium text-white flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-[#7C8052]" />
                  <span>{video.duration}</span>
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#292820]/25 group-hover:bg-[#292820]/40 transition-colors">
                  <div className="w-13 h-13 rounded-full bg-[#FAF7F0]/90 backdrop-blur-md border border-white flex items-center justify-center text-[#7C8052] shadow-float transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 fill-[#7C8052] translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Meta & Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#7C8052] bg-[#F5F0E6] px-2.5 py-0.5 rounded-full inline-block border border-[#DCD4C4]">
                    {video.category}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#292820] mt-2.5 line-clamp-2 leading-snug group-hover:text-[#7C8052] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-[#6B6858] mt-2 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DCD4C4] flex items-center justify-between text-[11px] text-[#6B6858]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#7C8052]" />
                    {new Date(video.publishedAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-semibold text-[#7C8052] group-hover:underline">Watch Video</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player (Native HTML5 Video) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#292820]/85 backdrop-blur-md animate-fade-in">
          <div
            className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-[32px] overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 flex items-center justify-between border-b border-[#DCD4C4] bg-[#F5F0E6]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7C8052]">
                  {selectedVideo.category}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#292820] mt-0.5">
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video player"
                className="w-10 h-10 rounded-full bg-white hover:bg-[#DCD4C4] flex items-center justify-center text-[#292820] shadow-subtle transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Native HTML5 Video Element */}
            <div className="relative aspect-video bg-black">
              <video
                src={selectedVideo.videoUrl}
                poster={selectedVideo.thumbnailUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML5 video streaming.
              </video>
            </div>

            {/* Video Description */}
            <div className="p-6 bg-[#FAF7F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#DCD4C4]">
              <p className="text-sm text-[#6B6858] max-w-xl">
                {selectedVideo.description}
              </p>
              <Link
                href="/booking"
                onClick={() => setSelectedVideo(null)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7C8052] text-white text-xs font-semibold hover:bg-[#64683E] transition-colors whitespace-nowrap shadow-sm"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
