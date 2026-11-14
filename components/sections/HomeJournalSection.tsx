"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogsData } from "@/data/blogsData";

export const HomeJournalSection: React.FC = () => {
  const articles = blogsData.slice(0, 3);

  return (
    <section id="journal" className="py-16 md:py-20 bg-[#F5F0E6] border-t border-[#A5A786]/30">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10">
        
        {/* Header Styled in Centered Banner Style */}
        <div className="bg-[#7B8052] text-[#FAF8F2] py-8 px-6 sm:px-12 rounded-3xl border border-[#555B38]/30 shadow-sm flex flex-col items-center justify-center text-center gap-4 mb-12">
          <div className="space-y-1 max-w-3xl">
            <span className="text-[11px] uppercase tracking-widest text-[#FAF8F2]/75 font-bold block">
              CLINICAL JOURNAL & INSIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wide text-[#FAF8F2]">
              DOCTOR'S CLINICAL JOURNAL
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-[#FAF8F2]/85 font-medium">
              EVIDENCE-BASED PERSPECTIVES ON ORTHODONTIC ALIGNMENT & DENTAL WELLNESS
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 px-6 py-2.5 rounded-full bg-[#FAF8F2] text-[#29291F] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-md flex items-center gap-2 mt-1"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-4 h-4 text-[#7B8052]" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bg-[#FAF8F2] rounded-2xl border border-[#A5A786]/40 overflow-hidden shadow-subtle hover:shadow-card hover:border-[#7B8052] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#29291F] relative">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-[#FAF8F2]/95 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-[#7B8052]">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] text-[#29291F]/60 mb-2 font-medium">
                    <span>{article.readingTime}</span>
                    <span>·</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#29291F] group-hover:text-[#7B8052] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#29291F]/75 mt-2 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#A5A786]/20 text-xs font-bold uppercase tracking-wider text-[#7B8052]">
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
