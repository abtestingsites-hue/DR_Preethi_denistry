"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogsData } from "@/data/blogsData";

export const HomeJournalSection: React.FC = () => {
  const articles = blogsData.slice(0, 3);

  return (
    <section id="journal" className="relative bg-[#F5F0E6]">
      
      {/* Top Olive Ribbon Banner matching all other sections */}
      <div className="bg-[#7B8052] text-white py-8 sm:py-10 px-4 sm:px-6 md:px-8 lg:px-10 border-y border-[#555B38]/30 relative z-10 shadow-sm">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.1em] font-semibold text-[#FAF8F2]/90 block">
              CLINICAL JOURNAL &amp; INSIGHTS
            </span>
            <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              DOCTOR&apos;S CLINICAL JOURNAL
            </h2>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2.5 px-6 h-[44px] rounded-full bg-[#FAF8F2] text-[#29291F] text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-white transition-all shadow-md group"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7B8052] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Articles Grid with 3D Depth Shadows & Full Width Alignment */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bg-[#FAF8F2] rounded-[18px] border border-[#A5A786]/40 overflow-hidden shadow-elevated hover:shadow-2xl hover:border-[#7B8052] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-[165px] sm:h-[180px] overflow-hidden bg-[#29291F] relative">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F2]/95 backdrop-blur-md text-[10.5px] uppercase font-bold tracking-wider text-[#7B8052] border border-[#A5A786]/30 shadow-md">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-[10.5px] text-[#29291F]/60 mb-1.5 font-medium">
                    <span>{article.readingTime}</span>
                    <span>·</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <h3 className="text-[16px] sm:text-[18px] font-serif font-bold text-[#29291F] group-hover:text-[#7B8052] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-[12px] text-[#29291F]/75 mt-1.5 line-clamp-2 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 pt-1.5 flex items-center justify-between border-t border-[#A5A786]/20 text-[11px] font-bold uppercase tracking-wider text-[#7B8052]">
                <span>Read Full Journal</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
