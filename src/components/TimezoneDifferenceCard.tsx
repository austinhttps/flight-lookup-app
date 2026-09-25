"use client";

import React, { useState, useEffect } from "react";
import { Flight } from "@/data/flights";
import { Clock, Globe, Sun, Moon, Sparkles, Compass, AlertCircle } from "lucide-react";

interface TimezoneDifferenceCardProps {
  flight: Flight;
}

export function TimezoneDifferenceCard({ flight }: TimezoneDifferenceCardProps) {
  const [currentUtc, setCurrentUtc] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentUtc(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dep = flight.departure.location;
  const arr = flight.arrival.location;
  const hoursDiff = flight.timeZoneDifference.hoursDifference;

  // Format current local time in each timezone
  const formatCityTime = (timeZoneName: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: timeZoneName,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(currentUtc);
    } catch {
      return "N/A";
    }
  };

  const isNightInZone = (timeZoneName: string) => {
    try {
      const hour = parseInt(
        new Intl.DateTimeFormat("en-US", {
          timeZone: timeZoneName,
          hour: "numeric",
          hour12: false,
        }).format(currentUtc),
        10
      );
      return hour < 6 || hour >= 19;
    } catch {
      return false;
    }
  };

  const getJetLagAdvice = (diff: number) => {
    const abs = Math.abs(diff);
    if (abs === 0) {
      return "No timezone change! No jet lag expected on this route.";
    }
    if (abs <= 3) {
      return "Mild time difference. Stay hydrated and stick to your regular sleep schedule.";
    }
    if (diff > 3) {
      return "Traveling East (+time): Seek morning light at your destination and adjust sleep 1 hour earlier.";
    }
    return "Traveling West (-time): Stay awake until local evening time and seek afternoon sunlight.";
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
          <Globe className="w-4 h-4 text-sky-400" />
          <span>Live Dual-Timezone Comparison</span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-medium">
          {hoursDiff > 0 ? `+${hoursDiff}h Difference` : hoursDiff < 0 ? `${hoursDiff}h Difference` : "Same Time Zone"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Origin Live Clock */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-sky-400">Origin ({dep.airportCode})</span>
            <span className="flex items-center gap-1 text-[10px]">
              {isNightInZone(dep.timeZone.name) ? (
                <>
                  <Moon className="w-3 h-3 text-indigo-400" /> Night
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3 text-amber-400" /> Day
                </>
              )}
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {formatCityTime(dep.timeZone.name)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>{dep.city}</span>
            <span className="font-mono text-slate-500">{dep.timeZone.label}</span>
          </div>
        </div>

        {/* Destination Live Clock */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-purple-400">Destination ({arr.airportCode})</span>
            <span className="flex items-center gap-1 text-[10px]">
              {isNightInZone(arr.timeZone.name) ? (
                <>
                  <Moon className="w-3 h-3 text-indigo-400" /> Night
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3 text-amber-400" /> Day
                </>
              )}
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {formatCityTime(arr.timeZone.name)}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>{arr.city}</span>
            <span className="font-mono text-slate-500">{arr.timeZone.label}</span>
          </div>
        </div>
      </div>

      {/* Jet lag & flight timing advice */}
      <div className="text-[11px] text-slate-300 flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Jet Lag & Travel Tip: </strong>
          <span>{getJetLagAdvice(hoursDiff)}</span>
        </div>
      </div>
    </div>
  );
}
