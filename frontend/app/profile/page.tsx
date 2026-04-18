"use client";

import { Header } from "@/components/layout/Header";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { StatsGrid } from "@/components/profile/StatsGrid";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import profileData from "@/mock-data/profile.json";
import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          router.push("/auth/login");
          return;
        }

        const user = JSON.parse(storedUser);
        const userId = user.id || user.Id;

        if (!userId) {
          router.push("/auth/login");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error("Không thể tải thông tin hồ sơ");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f9fb] flex flex-col items-center pt-24">
        <Header />
        <div className="w-full max-w-[1440px] px-8 mt-6">
          <Breadcrumbs items={[{ label: "Hồ sơ cá nhân" }]} className="mb-4" />
          <ProfileSkeleton />
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-[#f7f9fb] flex flex-col items-center pt-24">
        <Header />
        <div className="w-full max-w-[1440px] px-8 mt-6 text-center py-20 flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-red-600">Đã có lỗi xảy ra</h2>
          <p className="text-slate-600 mt-2 max-w-md mx-auto">{error || "Vui lòng đăng nhập lại để xem hồ sơ"}</p>
          <button 
            onClick={() => router.push("/auth/login")}
            className="mt-6 px-6 py-2 bg-[#003f87] text-white rounded-lg font-semibold"
          >
            Đăng nhập lại
          </button>
        </div>
      </main>
    );
  }

  // Format the mock posts for the ProfileTabs component
  const formattedPosts = profileData.posts.map(post => ({
    ...post,
    createdAt: post.createdAt ? formatDistanceToNow(new Date(post.createdAt)) : "vài ngày trước"
  }));

  return (
    <main className="min-h-screen bg-[#f7f9fb] flex flex-col items-center pt-24">
      {/* Header */}
      <Header />

      <div className="w-full max-w-[1440px] px-8 mt-6">
        <Breadcrumbs items={[{ label: "Hồ sơ cá nhân" }]} className="mb-4" />
      </div>

      {/* Profile Sections */}
      <div className="w-full max-w-[1440px] px-8">
        <ProfileHero 
          fullName={profile.fullName || "Người dùng"}
          title={profile.title || "Thành viên"}
          specialty={profile.specialty || "Chuyên gia y tế"}
          avatarUrl={profile.avatarUrl || ""}
          coverImageUrl={profile.coverImageUrl || ""}
          bio={profile.bio || "Người dùng chưa cập nhật tiểu sử."}
          location={profile.location || "Việt Nam"}
          isVerified={profile.isVerified || false}
          joinDate="tháng 3, 2023" 
        />

        {/* Bento Stats Section */}
        <StatsGrid 
          healthScore={profile.healthScore}
          badges={profile.badges || []}
        />

        {/* Tabs Feed Section */}
        <ProfileTabs posts={formattedPosts} userId={profile.id} />
      </div>
    </main>
  );
}

// Simple helper to match "2 ngày trước", "1 tuần trước" from Figma
function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) return "1 ngày trước";
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays >= 7 && diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  return date.toLocaleDateString("vi-VN", { month: "short", year: "numeric" });
}
