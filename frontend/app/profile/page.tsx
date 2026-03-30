import { Header } from "@/components/layout/Header";
import { ProfileHero } from "@/components/profile/ProfileHero";
import { StatsGrid } from "@/components/profile/StatsGrid";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import profileData from "@/mock-data/profile.json";
import { Suspense } from "react";

export default function ProfilePage() {
  const { profile, posts } = profileData;

  // Format the mock posts for the ProfileTabs component
  const formattedPosts = posts.map(post => ({
    ...post,
    createdAt: post.createdAt ? formatDistanceToNow(new Date(post.createdAt)) : "vài ngày trước"
  }));

  return (
    <main className="min-h-screen bg-[#f7f9fb] flex flex-col items-center">
      {/* Header */}
      <Header />

      {/* Hero Section with Skeleton Fallback */}
      <Suspense fallback={<ProfileSkeleton />}>
        <div className="w-full max-w-[1440px]">
          <ProfileHero 
            {...profile}
            joinDate="tháng 3, 2023" // Specific from Figma
          />

          {/* Bento Stats Section */}
          <StatsGrid 
            healthScore={profile.healthScore}
            badges={profile.badges}
          />

          {/* Tabs Feed Section */}
          <ProfileTabs posts={formattedPosts} />
        </div>
      </Suspense>
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
