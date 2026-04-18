"use client";

import { useState, useEffect, useMemo } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Pagination } from "@/components/shared/Pagination";
import { ArticlesSidebar, ARTICLE_CATEGORIES } from "@/components/articles/ArticlesSidebar";
import { ArticleHorizontalCard } from "@/components/articles/ArticleHorizontalCard";
import { ChevronDown, Loader2 } from "lucide-react";

export default function ArticlesListingPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState("Tất cả bài viết");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/articles");
        if (!response.ok) {
          throw new Error("Không thể tải bài viết từ máy chủ");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Calculate dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "Tất cả bài viết": articles.length,
    };
    
    // Initialize other categories with 0
    ARTICLE_CATEGORIES.forEach(cat => {
      if (cat !== "Tất cả bài viết") counts[cat] = 0;
    });

    // Count occurrences in actual data
    articles.forEach(article => {
      if (counts[article.category] !== undefined) {
        counts[article.category]++;
      }
    });

    return counts;
  }, [articles]);

  // Filter articles based on selection
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "Tất cả bài viết") {
      return articles;
    }
    return articles.filter(article => article.category === selectedCategory);
  }, [selectedCategory, articles]);

  return (
    <main className="min-h-screen bg-[#f7f9fb] pt-24 pb-20">
      <div className="container mx-auto px-6 lg:px-20 max-w-[1440px]">
        
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Bài viết"},
          ]} 
          className="mb-8" 
        />

        {/* Page Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h1 className="text-[48px] font-extrabold text-[#003f87] leading-tight tracking-tight">
              Bài viết nghiên cứu
            </h1>
            <p className="text-[#424752] text-lg font-medium leading-relaxed">
              Khám phá các phân tích lâm sàng mới nhất và các cuộc thảo luận chuyên sâu từ đội ngũ chuyên gia của Clinical Atelier.
            </p>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-[rgba(30,58,138,0.05)] cursor-pointer group hover:border-[#003f87]/20 transition-all">
            <span className="text-[#424752] text-sm font-medium">Sắp xếp theo:</span>
            <span className="text-[#003f87] text-sm font-bold flex items-center gap-2">
              Mới nhất
              <ChevronDown size={16} className="text-[#727784] group-hover:text-[#003f87] transition-colors" />
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0 sticky top-36 hidden lg:block">
            <ArticlesSidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categoryCounts={categoryCounts}
            />
          </aside>

          {/* Main List Area */}
          <div className="flex-grow min-w-0 flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-[#727784] gap-4 bg-white rounded-2xl border border-[rgba(30,58,138,0.05)] shadow-sm">
                  <Loader2 size={32} className="animate-spin text-[#003f87] opacity-60" />
                  <p className="font-medium">Đang tải bài viết...</p>
                </div>
              ) : error ? (
                <div className="py-20 text-center bg-[#ffebeb] rounded-2xl border border-dashed border-[#ff4d4d]">
                  <p className="text-[#cc0000] font-medium">{error}</p>
                </div>
              ) : filteredArticles.length > 0 ? (
                filteredArticles.map((article, idx) => (
                  <ArticleHorizontalCard 
                    key={article.id}
                    title={article.title}
                    snippet={article.snippet}
                    category={article.category}
                    date={article.date}
                    author={article.author}
                    stats={article.stats}
                    featuredImage={article.featuredImage}
                    slug={article.slug}
                    idx={idx}
                  />
                ))
              ) : (
                <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-[#c2c6d4]">
                  <p className="text-[#727784] font-medium">Không có bài viết nào trong danh mục này.</p>
                </div>
              )}
            </div>

            {/* Pagination Area */}
            <div className="mt-12 flex justify-center lg:justify-end">
              <Pagination 
                currentPage={1}
                totalPages={Math.ceil(filteredArticles.length / 10) || 1}
                onPageChange={() => {}}
              />
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div className="w-full lg:hidden pt-8 border-t border-[#eceef0]">
            <ArticlesSidebar 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categoryCounts={categoryCounts}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
