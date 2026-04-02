"use client";

import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PostCardProps {
  title: string;
  snippet: string;
  category: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  commentIconUrl?: string;
  likeIconUrl?: string;
  idx?: number;
}

export function PostCard({
  title,
  snippet,
  category,
  createdAt,
  commentCount,
  likeCount,
  commentIconUrl,
  likeIconUrl,
  idx = 0,
}: PostCardProps) {
  const getCategoryStyles = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "nghiên cứu":
        return "bg-[#80f98b]/30 text-[#007327]";
      case "dinh dưỡng":
        return "bg-[#983c00]/10 text-[#191c1e]";
      case "trường thọ":
        return "bg-[#0056b3]/10 text-[#003f87]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
      className="bg-white p-6 rounded-xl border border-[rgba(194,198,212,0.1)] shadow-sm hover:shadow-md transition-all flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-4">
        <Badge className={`${getCategoryStyles(category)} border-none text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm`}>
          {category}
        </Badge>
        <span className="text-[10px] font-medium text-[#727784]">{createdAt}</span>
      </div>

      <h4 className="text-xl font-bold text-[#191c1e] font-['Manrope',sans-serif] leading-tight mb-3 line-clamp-2">
        {title}
      </h4>

      <p className="text-sm text-[#424752] leading-relaxed mb-6 line-clamp-3">
        {snippet}
      </p>

      <div className="mt-auto pt-4 border-t border-[rgba(194,198,212,0.1)] flex gap-6 items-center">
        <div className="flex items-center gap-1.5 text-[#424752] text-xs font-semibold">
          {commentIconUrl ? (
            <Image src={commentIconUrl} alt="Comments" width={13.333} height={13.333} />
          ) : (
            <MessageSquare size={14} className="text-[#424752]" />
          )}
          <span>{commentCount} Bình luận</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#424752] text-xs font-semibold">
          {likeIconUrl ? (
            <Image src={likeIconUrl} alt="Likes" width={14} height={13.333} />
          ) : (
            <ThumbsUp size={14} className="text-[#424752]" />
          )}
          <span>{likeCount} Lượt thích</span>
        </div>
      </div>
    </motion.div>
  );
}
