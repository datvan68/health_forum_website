"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const ARTICLE_CATEGORIES = [
  "Tất cả bài viết",
  "Trao đổi chất",
  "Y học chính xác",
  "Trường thọ",
];

interface ArticlesSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts: Record<string, number>;
}

const trendingTags = [
  "#Glucose", "#Microbiome", "#CGM", "#SleepQuality"
];

export function ArticlesSidebar({ 
  selectedCategory, 
  onCategoryChange,
  categoryCounts 
}: ArticlesSidebarProps) {
  return (
    <div className="w-full flex flex-col gap-10">
      {/* Popular Categories */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[12px] font-bold text-[#424752] uppercase tracking-[0.1em] mb-2 px-1">
          Danh mục phổ biến
        </h3>
        <div className="flex flex-col gap-1">
          {ARTICLE_CATEGORIES.map((cat, i) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={i}
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all group hover:bg-white hover:shadow-sm",
                  isActive ? "bg-white shadow-sm ring-1 ring-[#003f87]/5" : "text-[#191c1e]"
                )}
              >
                <span className={cn(
                  "text-[15px] font-semibold",
                  isActive ? "text-[#003f87]" : "text-[#191c1e] group-hover:text-[#003f87]"
                )}>
                  {cat}
                </span>
                <span className={cn(
                  "text-[12px] font-bold px-2 py-0.5 rounded-md",
                  isActive ? "bg-[#003f87] text-white" : "text-[#727784] bg-[#eceef0]"
                )}>
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trending Topics */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[12px] font-bold text-[#424752] uppercase tracking-[0.1em] mb-2 px-1">
          Chủ đề thịnh hành
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag, i) => (
            <Badge 
              key={i} 
              variant="secondary"
              className="bg-[#f2f4f6] text-[#424752] hover:bg-[#003f87] hover:text-white transition-colors cursor-pointer border-none px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Contribution CTA Box */}
      <div className="bg-[#0052cc] rounded-2xl p-8 flex flex-col gap-6 text-white overflow-hidden relative group">
        <div className="relative z-10 flex flex-col gap-4">
          <h3 className="text-xl font-bold leading-tight">
            Đóng góp nghiên cứu
          </h3>
          <p className="text-sm text-white/80 leading-relaxed font-medium">
            Chia sẻ những hiểu biết lâm sàng của bạn với cộng đồng chuyên gia y tế của chúng tôi.
          </p>
          <Button 
            className="w-full bg-white text-[#0052cc] hover:bg-white/90 font-bold rounded-xl mt-2 h-12 shadow-md"
          >
            Gửi bản thảo
          </Button>
        </div>
        
        {/* Subtle decorative element */}
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
      </div>
    </div>
  );
}
