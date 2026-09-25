"use client";

import React, { useState } from "react";
import { Flight } from "@/data/flights";
import { Copy, Check, Share2, X, Printer, CalendarPlus } from "lucide-react";

interface ShareFlightModalProps {
  flight: Flight;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareFlightModal({ flight, isOpen, onClose }: ShareFlightModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const origin = flight.departure.location;
  const dest = flight.arrival.location;

  const shareableUrl = typeof window !== "undefined"
    ? `${window.location.origin}?flightNumber=${encodeURIComponent(flight.flightNumber)}`
    : "";

  const flightSummaryText = `✈️ Flight ${flight.flightNumber} (${flight.airline.name})
🛫 Departure: ${origin.airportCode} (${origin.city}) at ${flight.departure.time.timeOnly} (${origin.timeZone.label}) on ${flight.departure.time.dateOnly}
🛬 Arrival: ${dest.airportCode} (${dest.city}) at ${flight.arrival.time.timeOnly} (${dest.timeZone.label}) on ${flight.arrival.time.dateOnly}
⏱️ Duration: ${flight.duration} | Status: ${flight.statusText}
🧳 Baggage: ${flight.baggageClaim || "Check airport screens"}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(flightSummaryText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-5 text-slate-200 relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">Share Flight Itinerary</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Flight summary card */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between items-center font-bold text-sm text-white">
            <span>{flight.flightNumber} • {flight.airline.name}</span>
            <span className="text-sky-400 font-normal">{flight.duration}</span>
          </div>
          <div className="text-slate-300">
            <strong>{origin.airportCode}</strong> ({origin.city}) → <strong>{dest.airportCode}</strong> ({dest.city})
          </div>
          <div className="text-slate-400">
            Departure: <span className="text-white">{flight.departure.time.formattedLocal}</span>
          </div>
          <div className="text-slate-400">
            Arrival: <span className="text-white">{flight.arrival.time.formattedLocal}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareableUrl}
              className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-300 font-mono focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? "Copied" : "Copy Link"}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopySummary}
              className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedText ? "Summary Copied!" : "Copy Text Summary"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
