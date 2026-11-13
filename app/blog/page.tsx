import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { blogsData } from "@/data/blogsData";
import { AppointmentCtaBanner } from "@/components/sections/AdditionalSections";

export const metadata = {
  title: "Dental Blog & Smile Education | Dr. Preethi's Dentistry",
  description: "Educational articles on orthodontic care, clear aligners, oral hygiene techniques, and smile wellness written by Dr. Preethi Subramanian.",
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 bg-[#F8F8F5]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#5C7651] font-semibold">
            Educational Resources
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#171717] mt-3 tracking-tight">
            The Dental & <span className="font-normal text-[#5C7651]">Smile Blog</span>
          </h1>
          <p className="text-[#858585] text-lg mt-4 leading-relaxed font-normal">
            Doctor-authored clinical insights, practical oral hygiene guides, and the latest in modern clear aligner orthodontics.
          </p>
        </div>

        {/* Featured First Post */}
        {blogsData.length > 0 && (
          <div className="mb-16 p-8 sm:p-12 rounded-[32px] bg-white border border-[#EAEAEA] shadow-subtle hover:shadow-card transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 rounded-[24px] overflow-hidden aspect-[16/10] bg-[#F8F8F5]">
                <img
                  src={blogsData[0].featuredImage}
                  alt={blogsData[0].title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-[#858585]">
                  <span className="px-3 py-1 rounded-full bg-[#E8EFE5] text-[#5C7651] font-semibold uppercase tracking-wider text-[11px]">
                    {blogsData[0].category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blogsData[0].readingTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-medium text-[#171717] tracking-tight">
                  {blogsData[0].title}
                </h2>

                <p className="text-sm sm:text-base text-[#858585] leading-relaxed">
                  {blogsData[0].excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-[#EAEAEA]">
                  <span className="text-xs text-[#171717] font-medium">
                    By {blogsData[0].author}
                  </span>
                  <Link
                    href={`/blog/${blogsData[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C7651] hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.slice(1).map((post) => (
            <div
              key={post.id}
              className="rounded-[26px] bg-white border border-[#EAEAEA] overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#F8F8F5]">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#858585]">
                    <span className="text-[11px] font-semibold text-[#5C7651] uppercase">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="text-lg font-medium text-[#171717] leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#858585] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#EAEAEA] mt-4 flex items-center justify-between">
                <span className="text-xs text-[#858585]">{post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#5C7651] hover:underline"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-20">
        <AppointmentCtaBanner />
      </div>
    </div>
  );
}

