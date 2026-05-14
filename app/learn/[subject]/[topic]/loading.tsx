import { LessonListSkeleton } from "@/components/LessonListSkeleton";
import { ShimmerSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 section-container pt-32 pb-24">
        {/* Navigation Skeleton */}
        <div className="inline-flex items-center gap-2 mb-16">
          <ShimmerSkeleton className="w-4 h-4 rounded-full" />
          <ShimmerSkeleton className="w-48 h-4 rounded-md" />
        </div>

        {/* Topic Header Skeleton */}
        <header className="mb-20 space-y-8">
          <ShimmerSkeleton className="w-32 h-6 rounded-full" />
          <ShimmerSkeleton className="w-1/2 h-14 rounded-2xl" />
          <div className="space-y-3">
            <ShimmerSkeleton className="w-2/3 h-5 rounded-lg" />
            <ShimmerSkeleton className="w-1/2 h-5 rounded-lg" />
          </div>
        </header>

        {/* Lessons List Skeleton */}
        <div>
          <div className="flex items-center justify-between mb-10 border-b border-[var(--border-color)] pb-6">
            <ShimmerSkeleton className="w-32 h-10 rounded-xl" />
            <ShimmerSkeleton className="w-48 h-4 rounded-md" />
          </div>
          <LessonListSkeleton />
        </div>
      </div>
    </div>
  );
}
