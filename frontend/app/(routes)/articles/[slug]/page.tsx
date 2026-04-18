"use client";

import { ResearchSidebar } from "@/components/articles/ResearchSidebar";
import { ResearchContent } from "@/components/articles/ResearchContent";
import { CommentSection } from "@/components/articles/CommentSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/articles/${slug}`);
        if (!response.ok) {
          throw new Error("Không thể tải chi tiết bài viết");
        }
        const data = await response.json();
        setArticle(data.article);
        setComments(data.comments || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleDetail();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f7f9fb] pt-24 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-[#727784]">
          <Loader2 size={40} className="animate-spin text-[#003f87] opacity-60" />
          <p className="font-medium text-lg">Đang tải dữ liệu bài viết...</p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-[#f7f9fb] pt-24 pb-20 flex items-center justify-center">
        <div className="bg-[#ffebeb] p-8 rounded-2xl border border-dashed border-[#ff4d4d] text-center max-w-md">
          <p className="text-[#cc0000] font-bold text-lg mb-2">Đã có lỗi xảy ra</p>
          <p className="text-[#cc0000] font-medium">{error || "Không tìm thấy bài viết"}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f9fb] pt-24 pb-20">
      <div className="container mx-auto px-6 lg:px-20 max-w-[1440px] flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Bài viết", href: "/articles" },
            { label: article.title },
          ]} 
          className="mb-4" 
        />

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column - Main Content Area */}
          <div className="flex-grow min-w-0">
            <ResearchContent 
              title={article.title}
              category={article.category}
              lastUpdated={article.lastUpdated}
              featuredImage={article.featuredImage}
              author={article.author}
              content={article.content}
              stats={{
                likes: article.stats.likes,
                views: article.views,
                saves: article.saves
              }}
            />

            {/* Discussion Section */}
            <CommentSection 
              comments={comments}
              totalComments={article.stats.comments}
              articleSlug={slug}
              onCommentPosted={() => {
                // Re-fetch article data to get latest comments and counts
                const fetchArticleDetail = async () => {
                  try {
                    const response = await fetch(`http://localhost:5000/api/articles/${slug}`);
                    if (response.ok) {
                      const data = await response.json();
                      setArticle(data.article);
                      setComments(data.comments || []);
                    }
                  } catch (err) {
                    console.error("Failed to refresh comments:", err);
                  }
                };
                fetchArticleDetail();
              }}
            />
          </div>

          {/* Right Column - Sidebar */}
          <aside className="w-full lg:w-[360px] shrink-0 sticky top-36">
            <ResearchSidebar 
              author={article.author}
              relatedTopics={article.relatedTopics}
              relatedArticles={article.relatedArticles}
            />
          </aside>

        </div>
      </div>
    </main>
  );
}
