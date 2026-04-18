"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface RelatedArticle {
  id: string;
  label: string;
  title: string;
  author: string;
  readTime: string;
  slug: string;
}

interface ResearchSidebarProps {
  author: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  } | null;
  relatedTopics: string[];
  relatedArticles: RelatedArticle[];
}

export function ResearchSidebar({ author, relatedTopics, relatedArticles }: ResearchSidebarProps) {
  const displayName = author?.name || "Tác giả ẩn danh";
  const displayRole = author?.role || "Thành viên Aegis Health";
  const displayBio = author?.bio || "Một tác giả uy tín đầy nhiệt huyết, sẵn sàng chia sẻ kiến thức y khoa tới cộng đồng.";
  const avatarUrl = author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=003f87&color=fff&bold=true`;

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Author Info Card */}
      <div className="bg-white rounded-2xl p-8 border border-[rgba(30,58,138,0.05)] shadow-sm flex flex-col items-center text-center gap-6">
        <h3 className="text-[12px] font-bold text-[#424752] uppercase tracking-[0.1em] self-start">
          Thông tin tác giả
        </h3>
        
        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#f7f9fb] shadow-md relative">
          {/* Using standard img but with fallback support */}
          <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover absolute top-0 left-0" />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-extrabold text-[#003f87] tracking-tight">{displayName}</h4>
          <span className="text-[#424752] text-xs font-semibold uppercase tracking-wider">{displayRole}</span>
          <p className="text-sm text-[#424752] leading-relaxed font-medium px-2 mt-1">
            {displayBio}
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button className="w-full bg-[#0052cc] hover:bg-[#003f87] text-white font-bold h-12 rounded-xl transition-all">
            Theo dõi tác giả
          </Button>
          <button className="text-[13px] font-bold text-[#424752] hover:text-[#003f87] transition-colors flex items-center justify-center gap-1 group">
            Xem hồ sơ đầy đủ
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Related Topics */}
      <div className="flex flex-col gap-6">
        <h3 className="text-[12px] font-bold text-[#424752] uppercase tracking-[0.1em] px-1">
          Chủ đề liên quan
        </h3>
        <div className="flex flex-wrap gap-2">
          {relatedTopics.map((topic, i) => (
            <Badge 
              key={topic} 
              variant="secondary"
              className="bg-white text-[#424752] hover:bg-[#003f87] hover:text-white transition-all cursor-pointer border border-[#eceef0] px-3 py-2 rounded-lg text-xs font-bold shadow-sm"
              onClick={() => {}}
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {/* Related Articles */}
      <div className="flex flex-col gap-8">
        <h3 className="text-[12px] font-bold text-[#424752] uppercase tracking-[0.1em] px-1">
          Bài viết liên quan
        </h3>
        <div className="flex flex-col gap-8">
          {relatedArticles.map((art) => (
            <Link 
              key={art.id} 
              href={`/articles/${art.slug}`}
              className="flex flex-col gap-2 group cursor-pointer"
            >
              <span className="text-[10px] font-extrabold text-[#007327] uppercase tracking-widest px-1">
                {art.label}
              </span>
              <h5 className="text-[15px] font-extrabold text-[#191c1e] group-hover:text-[#003f87] transition-colors leading-snug">
                {art.title}
              </h5>
              <div className="flex items-center gap-2 text-[12px] font-medium text-[#727784]">
                <span>{art.author}</span>
                <div className="w-1 h-1 rounded-full bg-[#c2c6d4]" />
                <span>{art.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
