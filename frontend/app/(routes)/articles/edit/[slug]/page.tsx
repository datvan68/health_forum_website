"use client";

import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ArticleEditor } from "@/components/articles/ArticleEditor";
import { CreationSidebar } from "@/components/articles/CreationSidebar";
import { TagInput } from "@/components/articles/TagInput";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Dinh dưỡng");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        const response = await fetch(`http://localhost:5000/api/Articles/${slug}`);
        if (!response.ok) throw new Error("Không thể tải thông tin bài viết.");
        
        const data = await response.json();
        setTitle(data.title || "");
        setContent(data.contentSummary || "");
        setCategory(data.category || "Dinh dưỡng");
        
        try {
          const parsedTags = typeof data.relatedTopicsJson === "string" 
            ? JSON.parse(data.relatedTopicsJson) 
            : data.relatedTopicsJson || [];
          setTags(parsedTags);
        } catch (e) {
          setTags([]);
        }
      } catch (err: any) {
        toast.error(err.message || "Lỗi khi tải bài viết");
        router.push("/profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug, router]);

  const handleUpdate = async () => {
    if (!title || !content) {
      toast.error("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Bạn cần đăng nhập để thực hiện.");
      router.push("/auth/login");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id || user.Id;

    setIsSubmitting(true);
    
    const payload = {
      slug: slug, // Keep the same slug
      title: title,
      category: category,
      snippet: content.substring(0, 150) + "...", 
      authorId: userId,
      contentSummary: content,
      methodologyPointsJson: "[]",
      relatedTopicsJson: JSON.stringify(tags),
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(`http://localhost:5000/api/articles/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Không thể cập nhật bài viết.");
      }

      toast.success("Cập nhật bài viết thành công!");
      router.push(`/profile`);
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi khi cập nhật.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]">
        <Loader2 className="w-10 h-10 animate-spin text-[#003f87]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9fb] pt-28 pb-32">
      <div className="container mx-auto px-6 lg:px-24">
        
        <Breadcrumbs 
          items={[
            { label: "Hồ sơ", href: "/profile" },
            { label: "Chỉnh sửa bài viết" },
          ]} 
          className="mb-10"
        />

        <div className="flex flex-col xl:flex-row gap-12 items-start max-w-[1400px] mx-auto">
          
          <div className="flex-1 flex flex-col gap-12 w-full max-w-[1000px]">
            <ArticleEditor 
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />

            <TagInput 
              category={category}
              setCategory={setCategory}
              tags={tags}
              setTags={setTags}
            />

            <div className="flex items-center justify-end gap-6 pt-8">
              <button
                onClick={() => router.back()}
                className="px-8 py-3.5 text-[#424752] font-bold font-manrope hover:bg-white rounded-xl transition-all"
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="px-10 py-3.5 bg-gradient-to-br from-[#003f87] to-[#0056b3] text-white font-bold font-manrope rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 flex items-center justify-center min-w-[160px]"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lưu thay đổi"}
              </button>
            </div>
          </div>

          <div className="w-full xl:w-[380px] shrink-0 xl:sticky xl:top-36">
            <CreationSidebar />
          </div>

        </div>
      </div>
    </main>
  );
}
