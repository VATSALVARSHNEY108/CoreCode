"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  ChevronLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import SimulationSkeleton from "./SimulationSkeleton";

interface LessonLoaderProps {
  subjectId: string;
  topicId: string;
  lessonId: string;
  lessonName: string;
  subjectName: string;
  topicName: string;
  prevLesson: { id: string; name: string } | null;
  nextLesson: { id: string; name: string } | null;
}

export default function LessonLoader({
  subjectId,
  topicId,
  lessonId,
  lessonName,
  subjectName,
  topicName,
  prevLesson,
  nextLesson,
}: LessonLoaderProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setComponent(null);

    import(`@/content/${subjectId}/${topicId}/${lessonId}`)
      .then((mod) => {
        const Comp = mod.default;
        if (!Comp) {
          setError("Lesson component has no default export.");
        } else {
          setComponent(() => Comp);
        }
      })
      .catch((err) => {
        console.error("Lesson import error:", err);
        setError(`Could not load lesson "${lessonId}".`);
      })
      .finally(() => setLoading(false));
  }, [subjectId, topicId, lessonId]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      {/* Top Bar Navigation - High Density */}
      <div className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] px-6 py-2">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] shrink-0">
              <Home size={14} />
            </Link>
            <ChevronRight size={12} className="text-[var(--text-muted)] shrink-0" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                {subjectName} <ChevronRight size={10} className="opacity-50" /> {topicName}
              </div>
              <h1 className="text-sm font-black text-[var(--text-primary)] tracking-tight truncate">
                {lessonName}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {prevLesson && (
              <Link 
                href={`/learn/${subjectId}/${topicId}/${prevLesson.id}`}
                className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-indigo-500/50 text-[var(--text-muted)] hover:text-indigo-500 transition-all"
                title={`Previous: ${prevLesson.name}`}
              >
                <ChevronLeft size={16} />
              </Link>
            )}
            {nextLesson && (
              <Link 
                href={`/learn/${subjectId}/${topicId}/${nextLesson.id}`}
                className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 hover:shadow-lg transition-all"
              >
                Next <ChevronRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area - Full Page Edge-to-Edge */}
      <main className="flex-1 w-full relative">
        {loading && (
          <div className="p-8">
             <SimulationSkeleton />
          </div>
        )}

        {error && (
          <div className="p-24 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Lesson Load Failed</h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-md">{error}</p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-indigo-500 text-white rounded-xl font-bold hover:shadow-lg transition-all">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && Component && (
          <div className="w-full h-full border-b border-[var(--border-subtle)]">
            <Suspense fallback={<SimulationSkeleton />}>
              <Component />
            </Suspense>
          </div>
        )}
      </main>
    </div>
  );
}
