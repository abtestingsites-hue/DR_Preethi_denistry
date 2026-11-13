import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { blogsData } from "@/data/blogsData";
import { AppointmentCtaBanner } from "@/components/sections/AdditionalSections";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="pt-32 pb-20 bg-[#F8F8F5]">
      <div className="max-w-[900px] mx-auto px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#858585] hover:text-[#171717] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Meta */}
        <div className="space-y-4 mb-8">
          <span className="px-3 py-1 rounded-full bg-[#E8EFE5] text-[#5C7651] font-semibold uppercase tracking-wider text-xs">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#171717] tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-[#858585] pt-2 border-b border-[#EAEAEA] pb-6">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#5C7651]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[28px] overflow-hidden aspect-[16/9] bg-white border border-[#EAEAEA] shadow-subtle mb-10">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content */}
        <div className="space-y-6 text-[#171717] text-base sm:text-lg leading-relaxed font-normal bg-white p-8 sm:p-12 rounded-[32px] border border-[#EAEAEA] shadow-subtle">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-[#171717]/85">
              {paragraph}
            </p>
          ))}
        </div>

      </div>

      <div className="mt-20">
        <AppointmentCtaBanner />
      </div>
    </article>
  );
}

