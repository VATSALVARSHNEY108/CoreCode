"use client";
import Link from "next/link";
import { ArrowRight, ChevronRight, Code, Brain, Cpu, ArrowUpRight, Layers, Sparkles, Zap, BookOpen } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Magnetic from "@/components/Magnetic";
import { useScroll, useSpring as useSpringScroll } from "framer-motion";
import { useTheme } from "next-themes";

/* ─── Animation Variants ─────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ─── Typewriter ─────────────────────────────────────────── */
function Typewriter({ words, isLight }: { words: string[]; isLight: boolean }) {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (chars < word.length) setChars(c => c + 1);
        else setTimeout(() => setDeleting(true), 2000);
      } else {
        if (chars > 0) setChars(c => c - 1);
        else { setDeleting(false); setIndex(i => (i + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [chars, deleting, index, words]);

  return (
    <span className="inline-flex items-center">
      <span className={`text-transparent bg-clip-text ${isLight ? 'bg-gradient-to-r from-indigo-600 to-cyan-600' : 'bg-gradient-to-r from-indigo-400 to-cyan-400'}`}>
        {words[index].slice(0, chars)}
      </span>
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ duration: 0.8, repeat: Infinity }} 
        className={`w-[2px] h-[1em] ml-1 ${isLight ? "bg-indigo-600" : "bg-indigo-400"}`}
      />
    </span>
  );
}

const features = [
  { icon: <Zap size={18} />, label: "Real-time Simulations" },
  { icon: <BookOpen size={18} />, label: "Guided Learning Paths" },
  { icon: <Layers size={18} />, label: "Interactive Sandboxes" },
  { icon: <Sparkles size={18} />, label: "AI-Powered Insights" },
];

const subjects = [
  { id: "dsa", name: "Data Structures", description: "Master algorithms through visualized logic and real-time complexity analysis.", icon: <Code size={24} />, chapters: 13 },
  { id: "artificial-intelligence", name: "Intelligence", description: "Explore neural networks and machine learning with interactive node visualizations.", icon: <Brain size={24} />, chapters: 16 },
  { id: "ece", name: "Systems", description: "Deep dive into signals, circuits and hardware with dynamic circuit simulations.", icon: <Cpu size={24} />, chapters: 22 },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scale = useSpringScroll(useTransform(scrollYProgress, [0, 0.1], [1, 0.98]), { stiffness: 200, damping: 25 });
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = mounted && resolvedTheme === "light";

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen selection:bg-indigo-500/30 overflow-x-hidden home-container">
      {/* ── HERO SECTION ───────────────────────────────────── */}
      <motion.section
        style={{ scale, opacity }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center z-10 px-6"
      >
        <div className="hero-glow" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-12">
            <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              Next-Gen Learning Engine V2.0
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={itemVariants} className="home-title mb-8">
            CoreCode
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--text-primary)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Mastering <Typewriter words={["Algorithms", "Neural Nets", "Systems", "Complexity"]} isLight={isLight} />
            </h2>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium opacity-80">
              The ultimate high-fidelity laboratory for engineers. Master complex concepts through immersive interactivity.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 mt-14">
            <Magnetic>
              <Link href="/curriculum" className="btn-primary group !px-14 !py-7 !text-xl">
                Start Learning
                <ArrowRight size={22} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/playground" className="btn-secondary !px-14 !py-7 !text-xl">
                Playground
              </Link>
            </Magnetic>
          </motion.div>

          {/* Feature Pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-24">
            {features.map((f, i) => (
              <div 
                key={i}
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-black dark:text-white text-[10px] font-black uppercase tracking-widest transition-all hover:border-indigo-500/40 hover:-translate-y-1 shadow-premium"
              >
                <span className="text-indigo-600 dark:text-indigo-400">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── STATS SECTION ─────────────────────────────────── */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="stat-card"
          >
            <div className="text-7xl font-black mb-4 text-[var(--text-primary)]" style={{ fontFamily: "'Outfit', sans-serif" }}>120+</div>
            <div className="section-label !mb-0">Interactive Modules</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="stat-card"
          >
            <div className="text-7xl font-black mb-4 text-[var(--text-primary)]" style={{ fontFamily: "'Outfit', sans-serif" }}>60FPS</div>
            <div className="section-label !mb-0">Smooth Visualizations</div>
          </motion.div>
        </div>
      </section>

      {/* ── DISCIPLINES SECTION ────────────────────────────── */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
            <span className="section-label">Laboratory Access</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[var(--text-primary)] mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>Core Disciplines</h2>
            <div className="w-24 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {subjects.map((subject, i) => (
              <Link key={subject.id} href={`/learn/${subject.id}`} className="discipline-card group">
                <div className="absolute top-10 right-10 text-xs font-black opacity-10 tabular-nums">0{i + 1}</div>
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-500 mb-10">
                  {subject.icon}
                </div>
                <h3 className="text-3xl font-black tracking-tight text-[var(--text-primary)] mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{subject.name}</h3>
                <p className="text-[var(--text-secondary)] font-medium leading-relaxed mb-12 opacity-80">{subject.description}</p>
                <div className="mt-auto pt-8 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-[11px] font-black text-indigo-500 uppercase tracking-widest">{subject.chapters} Chapters</span>
                  <div className="w-10 h-10 rounded-full bg-indigo-500/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────── */}
      <section className="relative z-10 py-48 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-10" style={{ fontFamily: "'Outfit', sans-serif" }}> Ready to start your journey? </h2>
          <Magnetic>
            <Link href="/curriculum" className="btn-primary inline-flex !px-16 !py-8 !text-2xl">
              Get Started Now
            </Link>
          </Magnetic>
        </motion.div>
      </section>
    </div>
  );
}
