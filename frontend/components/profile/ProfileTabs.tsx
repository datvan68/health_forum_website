"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PostCard } from "@/components/shared/PostCard";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Post {
  id: string | number;
  title: string;
  snippet: string;
  category: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  commentIconUrl?: string | null;
  likeIconUrl?: string | null;
}

interface ProfileTabsProps {
  posts: Post[];
  userId?: number;
}

export function ProfileTabs({ posts: initialPosts, userId }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState("Bài viết của tôi");
  const [articles, setArticles] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = (slug: string | number) => {
    router.push(`/articles/edit/${slug}`);
  };

  const handleDelete = async (slug: string | number) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/Articles/slug/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Không thể xóa bài viết");

      setArticles(prev => prev.filter(art => art.id !== slug));
      toast.success("Đã xóa bài viết thành công!");
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error(err.message || "Lỗi khi xóa bài viết");
    }
  };

  useEffect(() => {
    const fetchMyArticles = async () => {
      if (!userId || activeTab !== "Bài viết của tôi") return;
      
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/Articles?authorId=${userId}`);
        if (!response.ok) throw new Error("Không thể tải bài viết của bạn");
        
        const data = await response.json();
        const formattedArticles = data.map((art: any) => ({
          id: art.id,
          title: art.title,
          snippet: art.snippet,
          category: art.category,
          createdAt: art.date,
          commentCount: art.stats.comments,
          likeCount: art.stats.likes
        }));
        setArticles(formattedArticles);
      } catch (err: any) {
        console.error("Error fetching my articles:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyArticles();
  }, [userId, activeTab]);

  const displayPosts = articles.length > 0 ? articles : initialPosts;

  const tabs = ["Bài viết của tôi", "Kiến thức đã lưu", "Cài đặt"];

  return (
    <section className="bg-[#f2f4f6] rounded-[8px] overflow-hidden w-full max-w-[1228px] mx-auto mb-16 border border-[rgba(194,198,212,0.2)]">
      {/* Tab Navigation */}
      <div className="flex border-b border-[rgba(194,198,212,0.2)] px-[32px]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative py-[22px] px-[32px] text-[14px] font-medium transition-colors ${
              activeTab === tab ? "text-[#003f87] font-semibold" : "text-[#424752] hover:bg-[#f2f4f6]/50"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#003f87] border-b-2 border-solid border-[#003f87]" 
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
              className="grid grid-cols-1 md:grid-cols-2 gap-[24px]"
            >
              {isLoading ? (
                <div className="col-span-full h-40 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="size-8 border-2 border-slate-200 border-t-[#003f87] animate-spin rounded-full" />
                    <span className="text-sm font-medium text-[#727784]">Đang tải bài viết...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="col-span-full h-40 flex items-center justify-center bg-red-50 rounded-lg border border-dashed border-red-200">
                  <span className="text-sm font-medium text-red-600">{error}</span>
                </div>
              ) : (
                <>
                  {displayPosts.map((post, i) => (
                    <Link key={post.id} href={`/articles/${post.id}`} className="block">
                      <PostCard 
                        {...post} 
                        idx={i} 
                        onEdit={() => handleEdit(post.id)}
                        onDelete={() => handleDelete(post.id)}
                      />
                    </Link>
                  ))}
                </>
              )}
              
              {/* Add New Post Placeholder */}
              <Link href="/articles/create" className="block">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="border-2 border-dashed border-[rgba(194,198,212,0.3)] rounded-[8px] h-[253.5px] p-[26px] flex flex-col items-center justify-center gap-[8px] transition-colors hover:bg-white/50 cursor-pointer"
                >
                  <div className="size-[25px] flex items-center justify-center">
                    <PlusCircle size={25} className="text-[#c2c6d4]" />
                  </div>
                  <span className="text-[14px] font-semibold text-[#727784] font-['Inter',sans-serif] text-center">
                    Thêm bài viết mới
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          )}

          {activeTab !== "Bài viết của tôi" && ( activeTab === "Cài đặt" ? (
            <motion.div
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex flex-col items-center justify-center gap-4 bg-white rounded-lg border border-slate-100"
            >
              <div className="size-12 rounded-full bg-slate-50 flex items-center justify-center">
                 <div className="size-6 border-2 border-slate-200 border-t-[#003f87] animate-spin rounded-full" />
              </div>
              <p className="text-[#424752] font-medium">Đang tải cấu hình...</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-64 flex items-center justify-center text-[#727784] italic text-sm"
            >
              Chưa có nội dung để hiển thị...
            </motion.div>
          )) }
        </AnimatePresence>
      </div>
    </section>
  );
}
