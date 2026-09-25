"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { FlightSearchForm } from "@/components/FlightSearchForm";
import { FlightList } from "@/components/FlightList";
import { RecentSearches } from "@/components/RecentSearches";
import { Flight } from "@/data/flights";
import { Plane, Clock, Globe, MapPin, ShieldCheck, RefreshCw, Filter, Sparkles } from "lucide-react";

export default function HomePage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiProvider, setApiProvider] = useState<string>("mock");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aero_recent_searches");
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveRecentSearch = (query: string) => {
    if (!query || query.length < 2) return;
    const clean = query.trim().toUpperCase();
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item !== clean);
      const updated = [clean, ...filtered].slice(0, 6);
      try {
        localStorage.setItem("aero_recent_searches", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleRemoveRecentSearch = (itemToRemove: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item !== itemToRemove);
      try {
        localStorage.setItem("aero_recent_searches", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleClearAllRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("aero_recent_searches");
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFlights = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = query
        ? `/api/flights?flightNumber=${encodeURIComponent(query)}`
        : `/api/flights`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API error (${response.status})`);
      }

      const data = await response.json();
      setFlights(data.flights || []);
      setHasSearched(true);
      if (query) {
        saveRecentSearch(query);
      }
    } catch (err: any) {
      console.error("Failed to fetch flights:", err);
      setError("Unable to load flight data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load check for query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const initialFlight = params.get("flightNumber") || params.get("query") || "";
      if (initialFlight) {
        setSearchQuery(initialFlight);
        fetchFlights(initialFlight);
        return;
      }
    }
    fetchFlights("");
  }, [fetchFlights]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchFlights(query);
  };

  const handleReset = () => {
    setSearchQuery("");
    fetchFlights("");
  };

  // Filter flights by status
  const filteredFlights = flights.filter((flight) => {
    if (statusFilter === "ALL") return true;
    return flight.status === statusFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar apiProvider={apiProvider} onProviderChange={setApiProvider} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold shadow-sm">
            <Plane className="w-3.5 h-3.5 -rotate-45" />
            <span>Flight Radar & Time Zone Resolver</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Find Any Flight. <br />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Track Times, Locations & Time Zones.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Real-time departure & arrival schedules, timezone offsets, live radar maps, terminal/gate directories, and jet lag comparison.
          </p>

          {/* Value Props Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Start & End Times</p>
                <p className="text-[10px] text-slate-400">Scheduled & live</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <Globe className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Dual Timezones</p>
                <p className="text-[10px] text-slate-400">Live clocks & jet lag</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Locations & Gates</p>
                <p className="text-[10px] text-slate-400">Terminals & weather</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Interactive Map</p>
                <p className="text-[10px] text-slate-400">Great Circle radar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search Form Section */}
        <section className="pt-2">
          <FlightSearchForm
            onSearch={handleSearch}
            isLoading={isLoading}
            initialQuery={searchQuery}
          />

          {/* Recent Searches */}
          <RecentSearches
            searches={recentSearches}
            onSelect={handleSearch}
            onRemove={handleRemoveRecentSearch}
            onClear={handleClearAllRecentSearches}
          />
        </section>

        {/* Status Filter Tabs */}
        {flights.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-medium">Filter Status:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { label: "All Flights", value: "ALL" },
                { label: "In Flight", value: "IN_FLIGHT" },
                { label: "On Time", value: "ON_TIME" },
                { label: "Delayed", value: "DELAYED" },
                { label: "Landed", value: "LANDED" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    statusFilter === tab.value
                      ? "bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm"
                      : "bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-semibold underline hover:text-rose-200"
            >
              <RefreshCw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}

        {/* Search Results Displayed Under The Form Input */}
        <section className="pb-12">
          <FlightList
            flights={filteredFlights}
            isLoading={isLoading}
            searchQuery={searchQuery}
            hasSearched={hasSearched}
            onSelectSuggestion={handleSearch}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AeroLookup App. Open-source aviation intelligence.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>API: <code className="text-sky-400">/api/flights</code></span>
            <span>•</span>
            <span>Timezone Engine Active</span>
            <span>•</span>
            <span>Ready for GitHub</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
