"use client";

import React, { useState } from "react";
import { Search, X, Sparkles, PlaneTakeoff } from "lucide-react";

interface FlightSearchFormProps {
  onSearch: (flightNumber: string) => void;
  isLoading: boolean;
  initialQuery?: string;
}

const POPULAR_FLIGHTS = [
  { code: "AA100", label: "AA 100", route: "JFK → LHR" },
  { code: "UA240", label: "UA 240", route: "SFO → HND" },
  { code: "DL456", label: "DL 456", route: "ATL → LAX" },
  { code: "BA178", label: "BA 178", route: "JFK → LHR" },
  { code: "AF022", label: "AF 022", route: "CDG → JFK" },
  { code: "EK202", label: "EK 202", route: "JFK → DXB" },
  { code: "SQ25", label: "SQ 25", route: "FRA → SIN" },
  { code: "WN1492", label: "WN 1492", route: "MDW → MCO" },
];

export function FlightSearchForm({ onSearch, isLoading, initialQuery = "" }: FlightSearchFormProps) {
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  const handleChipClick = (flightCode: string) => {
    setInputValue(flightCode);
    onSearch(flightCode);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center">
          <div className="absolute left-4.5 pointer-events-none text-slate-400 group-focus-within:text-sky-400 transition-colors">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter flight number (e.g. AA100, UA240, DL456, or JFK)..."
            className="w-full pl-12 pr-28 sm:pr-36 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 shadow-xl shadow-black/40 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-base sm:text-lg transition-all"
            disabled={isLoading}
          />

          <div className="absolute right-3 flex items-center gap-1.5">
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-sm shadow-md shadow-sky-600/30 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <PlaneTakeoff className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick search tags */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <div className="flex items-center gap-1 text-slate-400 font-medium mr-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Lookup:</span>
        </div>
        {POPULAR_FLIGHTS.map((f) => (
          <button
            key={f.code}
            type="button"
            onClick={() => handleChipClick(f.code)}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 ${
              inputValue.toUpperCase().trim() === f.code
                ? "bg-sky-500/20 border-sky-500/50 text-sky-300 font-medium"
                : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700 hover:text-white"
            }`}
          >
            <span className="font-semibold">{f.label}</span>
            <span className="text-[10px] text-slate-400">({f.route})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
