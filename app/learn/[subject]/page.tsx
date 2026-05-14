import Link from "next/link";
import { getSubjectFromFS } from "@/lib/content-registry";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles, BookOpen, Clock, Code2, Trophy } from "lucide-react";
import TopicExplorer from "@/components/TopicExplorer";

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectId } = await params;
  const subject = await getSubjectFromFS(subjectId);
  if (!subject) notFound();



  const lessonCount = subject.topics.reduce((a, t) => a + t.lessons.length, 0);

  return (
    <div className="relative min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

      <div className="relative z-10 section-container pt-20 pb-16">
        {/* Navigation */}
        <Link href="/curriculum" className="inline-flex items-center gap-3 text-[11px] font-black text-[var(--text-muted)] hover:text-indigo-500 transition-all mb-20 uppercase tracking-[0.4em] group">
          <div className="w-8 h-8 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-all">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          </div>
          Curriculum Overview
        </Link>

        {/* Course Header */}
        <header className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-16 mb-20">
            <div className="flex-shrink-0 relative group">
                <div className="w-28 h-28 rounded-[2rem] bg-[var(--bg-elevated)] border-2 border-[var(--border-subtle)] shadow-2xl flex items-center justify-center text-5xl transform -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 relative z-10 backdrop-blur-xl">
                  {subject.icon}
                </div>
               {/* Reflection/Glow */}
               <div className="absolute -inset-4 bg-indigo-500/10 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            <div className="flex-grow">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/5 border border-indigo-500/10 text-indigo-500 text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-sm backdrop-blur-sm">
                <Sparkles size={14} className="animate-pulse" />
                Advanced Engineering Track
              </div>
              
              <h1 className="display-heading text-4xl md:text-7xl mb-6 leading-[0.85] tracking-tighter">
                {subject.name}<span className="text-indigo-500">.</span>
              </h1>
              
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-medium max-w-2xl">
                {subject.description} Master each fundamental through our structured curriculum 
                designed for <span className="text-[var(--text-primary)] font-bold">deep technical mastery</span>.
              </p>
            </div>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-1 rounded-[3.5rem] bg-[var(--bg-elevated)]/30 border border-[var(--border-subtle)] backdrop-blur-2xl shadow-2xl overflow-hidden">
             <div className="flex flex-col gap-2 p-6 hover:bg-white/[0.02] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-1">
                  <Code2 size={18} />
                </div>
                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Complexity</span>
                <span className="text-xl font-black text-[var(--text-primary)] tracking-tight">Advanced</span>
             </div>
             
             <div className="flex flex-col gap-2 p-6 hover:bg-white/[0.02] transition-colors border-l border-[var(--border-subtle)]">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-1">
                  <BookOpen size={18} />
                </div>
                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Modules</span>
                <span className="text-xl font-black text-[var(--text-primary)] tracking-tight">{subject.topics.length} Units</span>
             </div>
             
             <div className="flex flex-col gap-2 p-6 hover:bg-white/[0.02] transition-colors border-l border-[var(--border-subtle)]">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-1">
                  <Sparkles size={18} />
                </div>
                <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">Labs</span>
                <span className="text-xl font-black text-[var(--text-primary)] tracking-tight">{lessonCount} Sessions</span>
             </div>
          </div>
        </header>

        {/* Topics Section */}
        <section className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-[var(--border-subtle)] pb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={20} className="text-amber-500" />
                <h2 className="display-heading text-5xl">Learning Path</h2>
              </div>
              <p className="text-[var(--text-secondary)] font-medium text-lg max-w-xl">
                A sequential journey through the core concepts. Complete each unit to unlock the next level.
              </p>
            </div>
            <div className="flex-shrink-0">
               <button className="px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                  Begin Journey
               </button>
            </div>
          </div>

          <TopicExplorer topics={subject.topics} subjectId={subjectId} />
        </section>
      </div>
    </div>
  );
}

