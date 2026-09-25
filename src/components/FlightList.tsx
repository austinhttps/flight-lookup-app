import React from "react";
import { Flight } from "@/data/flights";
import { FlightCard } from "./FlightCard";
import { SearchX, CheckCircle, ArrowRight } from "lucide-react";

interface FlightListProps {
  flights: Flight[];
  isLoading: boolean;
  searchQuery: string;
  hasSearched: boolean;
  onSelectSuggestion?: (query: string) => void;
}

export function FlightList({
  flights,
  isLoading,
  searchQuery,
  hasSearched,
  onSelectSuggestion,
}: FlightListProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4 mt-8">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 animate-pulse">
          <div className="h-4 w-32 bg-slate-800 rounded"></div>
          <div className="h-4 w-20 bg-slate-800 rounded"></div>
        </div>
        {[1, 2].map((n) => (
          <div
            key={n}
            className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-6 animate-pulse"
          >
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-slate-800 rounded-xl" />
                <div className="space-y-2">
                  <div className="w-24 h-5 bg-slate-800 rounded" />
                  <div className="w-36 h-3 bg-slate-800 rounded" />
                </div>
              </div>
              <div className="w-28 h-6 bg-slate-800 rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-16 h-8 bg-slate-800 rounded" />
                <div className="w-32 h-4 bg-slate-800 rounded" />
                <div className="w-28 h-4 bg-slate-800 rounded" />
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-24 h-4 bg-slate-800 rounded" />
                <div className="w-full h-2 bg-slate-800 rounded-full" />
              </div>
              <div className="space-y-3">
                <div className="w-16 h-8 bg-slate-800 rounded ml-auto" />
                <div className="w-32 h-4 bg-slate-800 rounded ml-auto" />
                <div className="w-28 h-4 bg-slate-800 rounded ml-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (hasSearched && flights.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-10 p-8 rounded-2xl bg-slate-900/70 border border-slate-800 text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400">
          <SearchX className="w-7 h-7 text-rose-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">No Flights Found</h3>
          <p className="text-sm text-slate-400 mt-1">
            No flight matching <strong className="text-sky-400 font-mono">"{searchQuery}"</strong> was found in our mock radar system.
          </p>
        </div>
        <div className="pt-2 text-xs text-slate-400">
          <p className="mb-2">Try searching one of these active flight numbers:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["AA100", "UA240", "DL456", "BA178", "AF022", "EK202", "SQ25"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onSelectSuggestion && onSelectSuggestion(code)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-xs font-mono transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mt-8">
      {/* Search status & count */}
      <div className="flex items-center justify-between px-1 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{flights.length}</span>
          <span>{flights.length === 1 ? "Flight found" : "Flights found"}</span>
          {searchQuery && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
              Filter: "{searchQuery}"
            </span>
          )}
        </div>
        <span className="text-xs text-slate-500">Live Mock Data Feed</span>
      </div>

      {/* Flight Cards */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
}
