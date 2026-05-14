"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface CodeTrackerProps {
  code: string[];
  activeLine: number;
  theme?: string;
}

export function CodeTracker({ code, activeLine, theme = "dark" }: CodeTrackerProps) {
  return (
    <div className="panel-container h-full flex flex-col" data-theme={theme}>
      <div className="panel-header shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-indigo-400" />
          <span>Logic Tracker</span>
        </div>
        <span className="drag-handle text-[10px] opacity-50">⠿</span>
      </div>
      <div className="panel-content flex-1 overflow-y-auto font-mono bg-[#020617] p-4 custom-scrollbar">
        {code.map((line, i) => (
          <div 
            key={i} 
            className={`flex items-start py-0.5 relative group transition-colors duration-200 ${
              activeLine === i ? 'bg-indigo-500/20 -mx-4 px-4' : ''
            }`}
          >
            <span className={`w-6 shrink-0 text-[9px] select-none text-right pr-2 ${
              activeLine === i ? 'text-indigo-400 font-bold' : 'text-slate-600'
            }`}>
              {i + 1}
            </span>
            <span className={`text-[10px] whitespace-pre leading-relaxed ${
              activeLine === i ? 'text-indigo-50 font-bold' : 'text-slate-500 group-hover:text-slate-400'
            }`}>
              {line}
            </span>
            {activeLine === i && (
              <motion.div 
                layoutId="tracerBar" 
                className="absolute left-0 w-0.5 h-4 bg-indigo-500 rounded-r-full mt-0.5"
                initial={false}
              />
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}
