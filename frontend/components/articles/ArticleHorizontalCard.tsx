"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, MessageSquare, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ArticleHorizontalCardProps {
  title: string;
  snippet: string;
  category: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
  stats: {
    views: string;
    comments: number;
  };
  featuredImage: string;
  slug: string;
  idx?: number;
}

const categoryStyles: Record<string, string> = {
  "trao đổi chất": "bg-[#80f98b] text-[#007327]",
  "y học chính xác": "bg-[#80f98b] text-[#007327]",
  "trường thọ": "bg-[#80f98b] text-[#007327]",
  "nghiên cứu": "bg-[#80f98b] text-[#007327]",
};

export function ArticleHorizontalCard({
  title,
  snippet,
  category,
  date,
  author,
  stats,
  featuredImage,
  slug,
  idx = 0
}: ArticleHorizontalCardProps) {
  
  const getCategoryStyle = (cat: string) => {
    return categoryStyles[cat.toLowerCase()] || "bg-[#eceef0] text-[#424752]";
  };

  return (
    <Link href={`/articles/${slug}`} className="block w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[rgba(30,58,138,0.05)] flex flex-col md:flex-row h-auto md:h-[280px] group"
    >
      {/* Left: Image Container */}
      <div className="w-full md:w-[320px] shrink-0 h-[200px] md:h-full relative overflow-hidden">
        <img 
          src={featuredImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Right: Content Container */}
      <div className="flex-grow p-6 md:p-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className={cn("border-none px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", getCategoryStyle(category))}>
              {category}
            </Badge>
            <span className="text-[12px] font-medium text-[#727784] font-mono uppercase">{date}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-[#191c1e] group-hover:text-[#003f87] transition-colors line-clamp-2 leading-tight">
            {title}
          </h2>
          <p className="text-[#424752] text-[15px] leading-relaxed line-clamp-2 font-medium">
            {snippet}
          </p>
        </div>

        {/* Footer info stashed at the bottom */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#eceef0]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-[#eceef0]">
              <img 
                src={author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=003f87&color=fff&bold=true`} 
                alt={author.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-sm font-bold text-[#003f87]">
              {author.name}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#727784] text-xs font-semibold">
              <Eye size={16} />
              <span>{stats.views}</span>
            </div>
            <div className="flex items-center gap-2 text-[#727784] text-xs font-semibold">
              <MessageSquare size={16} />
              <span>{stats.comments}</span>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}
