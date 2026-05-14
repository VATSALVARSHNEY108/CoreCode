import { SimulationSkeleton } from "@/components/SimulationSkeleton";
import { ShimmerSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Top Bar Navigation Skeleton */}
      <div className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] px-6 py-2">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShimmerSkeleton className="w-4 h-4 rounded-full" />
            <div className="flex flex-col">
              <ShimmerSkeleton className="w-32 h-2 rounded-full mb-1" />
              <ShimmerSkeleton className="w-48 h-4 rounded-md" />
            </div>
          </div>
          <div className="flex gap-2">
            <ShimmerSkeleton className="w-10 h-10 rounded-lg" />
            <ShimmerSkeleton className="w-24 h-10 rounded-lg" />
          </div>
        </div>
      </div>

      <main className="flex-1 p-8">
        <SimulationSkeleton />
      </main>
    </div>
  );
}
