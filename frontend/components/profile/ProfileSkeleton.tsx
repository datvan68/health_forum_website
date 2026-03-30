export function ProfileSkeleton() {
  return (
    <div className="w-full max-w-[1440px] animate-pulse">
      {/* Cover Skeleton */}
      <div className="h-[256px] w-full bg-slate-200 rounded-b-xl mb-16" />
      
      {/* Hero Info Skeleton */}
      <div className="px-8 -mt-16 relative flex flex-col md:flex-row gap-6 items-end mb-12">
        <div className="size-40 bg-slate-200 rounded-xl" />
        <div className="flex-1 space-y-4">
          <div className="h-10 w-48 bg-slate-200 rounded" />
          <div className="h-4 w-64 bg-slate-200 rounded" />
          <div className="h-4 w-32 bg-slate-200 rounded" />
        </div>
        <div className="h-11 w-32 bg-slate-200 rounded" />
      </div>

      {/* Bento Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 mb-12">
        <div className="h-44 bg-slate-100 rounded-xl" />
        <div className="col-span-3 h-44 bg-slate-100 rounded-xl" />
      </div>

      {/* Tabs Skeleton */}
      <div className="h-64 mx-8 bg-slate-100 rounded-xl" />
    </div>
  );
}
