import { TopicListSkeleton } from "@/components/TopicListSkeleton";
import { ShimmerSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 section-container pt-32 pb-24">
        {/* Navigation Skeleton */}
        <div className="inline-flex items-center gap-2 mb-16">
          <ShimmerSkeleton className="w-4 h-4 rounded-full" />
          <ShimmerSkeleton className="w-32 h-4 rounded-md" />
        </div>

        {/* Course Header Skeleton */}
        <header className="mb-20 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <ShimmerSkeleton className="w-20 h-20 rounded-[1.5rem]" />
            <div className="space-y-4">
              <ShimmerSkeleton className="w-32 h-6 rounded-full" />
              <ShimmerSkeleton className="w-64 h-12 rounded-2xl" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ShimmerSkeleton className="w-full h-24 rounded-2xl" />
            <div className="flex gap-10">
              <div className="space-y-2">
                <ShimmerSkeleton className="w-20 h-4 rounded-md" />
                <ShimmerSkeleton className="w-24 h-8 rounded-lg" />
              </div>
              <div className="space-y-2">
                <ShimmerSkeleton className="w-20 h-4 rounded-md" />
                <ShimmerSkeleton className="w-24 h-8 rounded-lg" />
              </div>
            </div>
          </div>
        </header>

        {/* Topics Section Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-10 border-b border-[var(--border-color)] pb-6">
            <ShimmerSkeleton className="w-32 h-10 rounded-xl" />
            <ShimmerSkeleton className="w-48 h-4 rounded-md" />
          </div>
          <TopicListSkeleton />
        </div>
      </div>
    </div>
  );
}
