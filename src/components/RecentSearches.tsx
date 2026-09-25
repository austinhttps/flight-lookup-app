"use client";

import React from "react";
import { History, X, ArrowUpRight, Trash2 } from "lucide-react";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
}

export function RecentSearches({
  searches,
  onSelect,
  onRemove,
  onClear,
}: RecentSearchesProps) {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <History className="w-3.5 h-3.5 text-sky-400" />
          <span>Recent Flight Lookups</span>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
          title="Clear search history"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {searches.map((item) => (
          <div
            key={item}
            className="group flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 hover:border-sky-500/50 hover:bg-slate-800 transition-all text-xs"
          >
            <button
              onClick={() => onSelect(item)}
              className="font-mono font-medium text-slate-200 group-hover:text-sky-300 flex items-center gap-1 transition-colors"
            >
              <span>{item}</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-sky-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item);
              }}
              className="p-0.5 rounded hover:bg-slate-700 text-slate-500 hover:text-slate-300 transition-colors"
              title="Remove from history"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
