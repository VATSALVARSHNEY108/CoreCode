import Link from "next/link";
import { getSubjectFromFS, getTopicFromFS } from "@/lib/content-registry";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles, BookOpen, Clock, Code2, GraduationCap } from "lucide-react";
import LessonList from "@/components/LessonList";

export default async function TopicPage({ params }: { params: Promise<{ subject: string; topic: string }> }) {
  const { subject: subjectId, topic: topicId } = await params;
  const subject = await getSubjectFromFS(subjectId);
  const topic = await getTopicFromFS(subjectId, topicId);
  if (!subject || !topic) notFound();



  return (
    <div className="relative min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] -z-10" />

      <div className="relative z-10 section-container pt-32 pb-24">
        {/* Navigation */}
        <Link href={`/learn/${subjectId}`} className="inline-flex items-center gap-3 text-[11px] font-black text-[var(--text-muted)] hover:text-indigo-500 transition-all mb-20 uppercase tracking-[0.4em] group">
          <div className="w-8 h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-all">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          </div>
          Return to {subject.name}
        </Link>

        {/* Topic Header */}
        <header className="mb-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-indigo-500 text-[10px] font-black tracking-[0.3em] uppercase mb-8 shadow-sm backdrop-blur-sm">
                <GraduationCap size={14} className="animate-pulse" />
                Specialized Module
              </div>
              
              <h1 className="display-heading text-6xl md:text-8xl mb-8 leading-[0.9] tracking-tighter">
                {topic.name}<span className="text-indigo-500">.</span>
              </h1>
              
              <p className="text-2xl text-[var(--text-secondary)] leading-relaxed font-medium">
                {topic.lessons.length} engineering laboratories curated for deep conceptual mastery.
              </p>
            </div>

            <div className="hidden xl:flex items-center gap-8 p-8 rounded-[2.5rem] bg-[var(--bg-elevated)]/30 border border-[var(--border-subtle)] backdrop-blur-xl">
               <div className="flex flex-col items-center gap-2 px-6">
                 <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Type</span>
                 <div className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
                    <Code2 size={18} className="text-emerald-500" />
                    Interactive
                 </div>
               </div>
            </div>
          </div>
        </header>

        {/* Lessons Section */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-[var(--border-subtle)] pb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                <BookOpen size={20} />
              </div>
              <h2 className="display-heading text-4xl">Laboratory Units</h2>
            </div>
            <span className="hidden md:block text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
              Master one concept at a time
            </span>
          </div>

          <LessonList lessons={topic.lessons} subjectId={subjectId} topicId={topicId} />
        </section>
      </div>
    </div>
  );
}


