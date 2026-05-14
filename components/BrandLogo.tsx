"use client";
import { Sparkles } from "lucide-react";

export default function BrandLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} bg-indigo-600 rounded-xl flex items-center justify-center overflow-hidden relative border border-white/20 shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600" />
      
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Central Symbol */}
      <div className="relative z-10 flex items-center justify-center">
        <Sparkles size={20} className="text-white animate-pulse" />
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
