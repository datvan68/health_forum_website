"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PostCard } from "@/components/shared/PostCard";
import { PlusCircle } from "lucide-react";

interface Post {
  id: number;
  title: string;
  snippet: string;
  category: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
}

interface ProfileTabsProps {
  posts: Post[];
}

export function ProfileTabs({ posts }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("Bài viết của tôi");

  const tabs = ["Bài viết của tôi", "Kiến thức đã lưu", "Cài đặt"];

  return (
    <section className="bg-[#f2f4f6] rounded-xl overflow-hidden w-full max-w-[1228px] mx-auto mb-16 shadow-sm border border-[rgba(194,198,212,0.2)]">
      {/* Tab Navigation */}
      <div className="flex border-b border-[rgba(194,198,212,0.2)] px-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative py-6 px-8 text-sm font-medium transition-colors ${
              activeTab === tab ? "text-[#003f87] font-bold" : "text-[#424752] hover:bg-[#f2f4f6]/50"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003f87]" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8 pb-12">
        <AnimatePresence mode="wait">
          {activeTab === "Bài viết của tôi" && (
            <motion.div
              key="myposts"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {posts.map((post, i) => (
                <PostCard key={post.id} {...post} idx={i} />
              ))}
              
              {/* Add New Post Placeholder */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="border-2 border-dashed border-[#c2c6d4]/30 rounded-xl h-[253.5px] p-6 flex flex-col items-center justify-center gap-3 transition-colors hover:bg-white/50"
              >
                <div className="size-10 bg-[#c2c6d4]/10 rounded-full flex items-center justify-center">
                  <PlusCircle size={24} className="text-[#c2c6d4]" />
                </div>
                <span className="text-sm font-semibold text-[#727784] font-['Inter',sans-serif]">
                  Bắt đầu thảo luận mới
                </span>
              </motion.button>
            </motion.div>
          )}

          {activeTab !== "Bài viết của tôi" && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex items-center justify-center text-muted-foreground italic text-sm"
            >
              Chưa có nội dung để hiển thị...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
