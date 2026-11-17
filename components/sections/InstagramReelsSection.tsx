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
  // Only one video can be unmuted at a time (null means all muted)
  const [unmutedReelId, setUnmutedReelId] = useState<string | null>(null);

  const reels: ReelItem[] = [
    {
      id: "reel-1",
      videoUrl: "/videos/video_2026-11-17_11-10-18.mp4",
      title: "Invisalign® Clear Aligners Staging & Patient Care",
      thumbnail: "/Doctor.png",
      category: "Invisalign",
    },
    {
      id: "reel-2",
      videoUrl: "/videos/video_2026-11-17_11-09-54.mp4",
      title: "Creating Confident Smiles with Precision Orthodontics",
      thumbnail: "/treatments/orthodontics.jpg",
      category: "Smile Care",
    },
    {
      id: "reel-3",
      videoUrl: "/videos/video_2026-11-17_11-10-04.mp4",
      title: "Inside Dr. Preethi's Dentistry Clinic Experience",
      thumbnail: "/Clinic.png",
      category: "Clinic Tour",
    },
    {
      id: "reel-4",
      videoUrl: "/videos/video_2026-11-17_11-10-11.mp4",
      title: "Gentle Aesthetic Dental Care & Digital Diagnostics",
      thumbnail: "/Clinic2.png",
      category: "Specialist Care",
    },
  ];

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Helper to unmute exactly one video and mute all others
  const unmuteSingleVideo = (reelId: string) => {
    setUnmutedReelId(reelId);
    Object.entries(videoRefs.current).forEach(([id, videoEl]) => {
      if (videoEl) {
        if (id === reelId) {
          videoEl.muted = false;
          // In case browser autoplay policy required play on user interaction
          videoEl.play().catch(() => {});
        } else {
          videoEl.muted = true;
        }
      }
    });
  };

  // Helper to mute all videos
  const muteAllVideos = () => {
    setUnmutedReelId(null);
    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl) {
        videoEl.muted = true;
      }
    });
  };

  // Toggle mute button click: if clicking active unmuted video, mute it; otherwise unmute only this video
  const toggleMute = (reelId: string) => {
    if (unmutedReelId === reelId) {
      muteAllVideos();
    } else {
      unmuteSingleVideo(reelId);
    }
  };

  // Hover handlers: automatically unmute the hovered video, and mute when cursor leaves
  const handleMouseEnter = (reelId: string) => {
    unmuteSingleVideo(reelId);
  };

  const handleMouseLeave = (reelId: string) => {
    if (unmutedReelId === reelId) {
      muteAllVideos();
    }
  };

  return (
    <section id="reels" className="relative bg-white">
      
      {/* Top Olive Ribbon Banner seamlessly incorporating Instagram ID & followers */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#465239]/40 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#F2F5ED]/90">
              <span className="bg-[#465239] px-3 py-1 rounded-full border border-white/20">
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
              <span className="text-[#F2F5ED]/80">50K+ Monthly Reach · Coimbatore</span>
            </div>

            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-white">
              WATCH OUR CLINICAL INSIGHTS
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              href="/clinical-insights"
              className="inline-flex items-center gap-2.5 px-6 h-[44px] rounded-full bg-white text-black text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#F2F5ED] transition-all shadow-md group border border-[#E5E8E1]"
            >
              <span>Explore All Videos</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>

      {/* Autoplaying Reels Feeds Grid: Full Screen Edge-to-Edge width with 3D Depth Shadows */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {reels.map((reel) => {
            const isThisUnmuted = unmutedReelId === reel.id;
            return (
              <div
                key={reel.id}
                onMouseEnter={() => handleMouseEnter(reel.id)}
                onMouseLeave={() => handleMouseLeave(reel.id)}
                className="relative aspect-[9/16] rounded-[18px] overflow-hidden bg-black border border-[#E5E8E1] shadow-elevated hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                {/* Autoplay Video Loop */}
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={reel.videoUrl}
                  poster={reel.thumbnail}
                  autoPlay
                  loop
                  muted={!isThisUnmuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Top Reel Header Overlay */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#7B8052] border border-[#E5E8E1] shadow-md">
                    {reel.category}
                  </span>

                  <span className={`w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center text-white transition-colors ${
                    isThisUnmuted ? "bg-[#7B8052]" : "bg-black/45"
                  }`}>
                    {isThisUnmuted ? (
                      <Volume2 className="w-3.5 h-3.5 fill-white text-white" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-white" />
                    )}
                  </span>
                </div>

                {/* Bottom In-Video Control Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white z-10 space-y-2">
                  <h4 className="text-[14px] font-serif font-bold text-white leading-snug drop-shadow-md">
                    {reel.title}
                  </h4>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-white/80 border-t border-white/20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute(reel.id);
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-[11px] font-medium"
                      aria-label={`Toggle mute for ${reel.title}`}
                    >
                      {isThisUnmuted ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#8FA36C]" />
                          <span className="text-white font-semibold">Playing Audio</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Hover to Listen</span>
                        </>
                      )}
                    </button>

                    <a
                      href={clinicInfo.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline flex items-center gap-1 text-[11px] font-medium text-white hover:text-[#8FA36C]"
                    >
                      <span>View Reel</span>
                      <ArrowRight className="w-3 h-3 text-[#8FA36C]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
