"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Play, Volume2, VolumeX, Instagram, ArrowRight } from "lucide-react";
import { clinicInfo } from "@/data/clinicInfo";

interface ReelItem {
  id: string;
  videoUrl: string;
  title: string;
  thumbnail: string;
  category: string;
}

export const InstagramReelsSection: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  const reels: ReelItem[] = [
    {
      id: "reel-1",
      videoUrl: "/videos/teeth-scan.mp4",
      title: "Invisalign 3D Digital Scan vs Traditional Impressions",
      thumbnail: "/treatments/invisalign.jpg",
      category: "Invisalign",
    },
    {
      id: "reel-2",
      videoUrl: "/videos/teeth-hero.mp4",
      title: "Creating Confident Smiles with Modern Orthodontics",
      thumbnail: "/treatments/orthodontics.jpg",
      category: "Smile Care",
    },
    {
      id: "reel-3",
      videoUrl: "/videos/Teeth.mp4",
      title: "Inside our Saibaba Colony Sterilisation Bay",
      thumbnail: "/Clinic2.png",
      category: "Clinic Tour",
    },
    {
      id: "reel-4",
      videoUrl: "/videos/teeth-scan.mp4",
      title: "How Clear Aligners Gently Shift Misaligned Teeth",
      thumbnail: "/treatments/dental-implants.jpg",
      category: "Education",
    },
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    videoRefs.current.forEach((v) => {
      if (v) v.muted = nextMute;
    });
  };

  return (
    <section id="reels" className="relative bg-[#F5F0E6]">
      
      {/* Top Olive Ribbon Banner seamlessly incorporating Instagram ID & followers */}
      <div className="bg-[#7B8052] text-white py-10 px-6 sm:px-12 border-y border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-wider font-bold text-[#FAF8F2]/90">
              <span className="bg-[#555B38] px-3 py-1 rounded-full border border-white/20">
                CLINICAL VIDEO LIBRARY
              </span>
              <span>·</span>
              <a
                href={clinicInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1.5 text-white"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@dr_preethi_subramanian</span>
              </a>
              <span className="hidden sm:inline">·</span>
              <span className="text-white/90">4.9K+ Followers</span>
              <span className="hidden sm:inline">·</span>
              <span className="text-[#FAF8F2]/80">50K+ Monthly Reach · Coimbatore</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              WATCH OUR CLINICAL INSIGHTS
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              href="/clinical-insights"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#FAF8F2] text-[#29291F] text-xs uppercase tracking-wider font-bold hover:bg-white transition-all shadow-md group"
            >
              <span>Explore All Videos</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>

      {/* Autoplaying Reels Feeds Grid with in-video bottom audio toggle */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#29291F] border border-[#A5A786]/40 shadow-card group"
            >
              {/* Autoplay Video Loop */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={reel.videoUrl}
                poster={reel.thumbnail}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Top Reel Header Overlay */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-[#FAF8F2]/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#7B8052] border border-[#A5A786]/30">
                  {reel.category}
                </span>

                <span className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                  <Play className="w-3.5 h-3.5 fill-white" />
                </span>
              </div>

              {/* Bottom In-Video Control Overlay: Caption + Direct In-Video Sound Toggle */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white z-10 space-y-2">
                <p className="text-xs font-semibold leading-snug line-clamp-2 text-[#FAF8F2]">
                  {reel.title}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[10px]">
                  {/* In-Video Sound Toggle Button */}
                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 hover:bg-[#7B8052] backdrop-blur-md transition-colors text-white font-semibold"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-white/90" />
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-green-300" />
                        <span>Mute</span>
                      </>
                    )}
                  </button>

                  <a
                    href={clinicInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-1 font-bold text-[#A5A786]"
                  >
                    <span>View Reel</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
