"use client";

import React from "react";
import { CheckCircle2, Heart, Share2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ResearchContentProps {
  title: string;
  category: string;
  lastUpdated: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: {
    summary: string;
    methodology: {
      title: string;
      points: string[];
      conclusion: string;
    };
  };
  stats: {
    likes: number;
    views: string;
    saves: string;
  };
}

export function ResearchContent({
  title,
  category,
  lastUpdated,
  featuredImage,
  author,
  content,
  stats,
}: ResearchContentProps) {
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-[#80f98b] text-[#007327] border-none px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            {category}
          </Badge>
          <span className="text-[#727784] text-sm font-medium">{lastUpdated}</span>
        </div>

        <h1 className="text-[48px] font-extrabold text-[#191c1e] leading-[1.1] tracking-tight">
          {title}
        </h1>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#eceef0]">
            <img 
              src={author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=003f87&color=fff&bold=true`} 
              alt={author.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[#003f87] font-bold text-sm tracking-tight">{author.name}</span>
            <span className="text-[#727784] text-[10px] font-bold uppercase tracking-widest">{author.role}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="w-full h-[480px] rounded-2xl overflow-hidden shadow-lg border border-[rgba(30,58,138,0.05)]">
        <img src={featuredImage} alt="featured research" className="w-full h-full object-cover" />
      </div>

      {/* Content Body */}
      <div className="flex flex-col gap-12">
        {/* Summary */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-[#003f87] rounded-full" />
            <h2 className="text-2xl font-extrabold text-[#191c1e]">Tóm tắt nghiên cứu</h2>
          </div>
          <p className="text-[#424752] text-lg leading-relaxed font-medium">
            {content.summary}
          </p>
        </div>

        {/* Methodology Box */}
        <div className="bg-[#f0f9f9] rounded-2xl p-10 border border-[#80f98b]/20 flex flex-col gap-8">
          <h3 className="text-2xl font-bold text-[#194d4d]">
            {content.methodology.title}
          </h3>
          <div className="flex flex-col gap-6">
            {content.methodology.points.map((point, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="shrink-0 mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-[#80f98b] text-[#007327] shadow-sm">
                  <CheckCircle2 size={16} fill="white" />
                </div>
                <p className="text-[#194d4d] text-lg font-medium leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-[#191c1e]">Kết luận</h2>
          <p className="text-[#424752] text-lg leading-relaxed font-medium">
            {content.methodology.conclusion}
          </p>
        </div>

        {/* Interaction Bar */}
        <div className="pt-10 border-t border-[#eceef0] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#eceef0] text-[#191c1e] font-bold hover:bg-[#eceef0] transition-all group">
              <Heart size={20} className="text-[#ff4d4d] group-hover:scale-110 transition-transform" />
              Thích
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#eceef0] text-[#191c1e] font-bold hover:bg-[#eceef0] transition-all group">
              <Share2 size={20} className="text-[#0052cc] group-hover:scale-110 transition-transform" />
              Chia sẻ
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#eceef0] text-[#191c1e] font-bold hover:bg-[#eceef0] transition-all group">
              <Bookmark size={20} className="text-[#003f87] group-hover:scale-110 transition-transform" />
              Lưu bài viết
            </button>
          </div>

          <div className="flex items-center gap-4 text-[#727784] text-sm font-semibold">
            <span>{stats.likes.toLocaleString()} lượt xem</span>
            <div className="w-1 h-1 rounded-full bg-[#727784]" />
            <span>{stats.saves} lượt lưu</span>
          </div>
        </div>
      </div>
    </div>
  );
}
