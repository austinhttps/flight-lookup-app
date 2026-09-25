"use client";

import React, { useState } from "react";
import { Flight } from "@/data/flights";
import { FlightRouteMap } from "./FlightRouteMap";
import { TimezoneDifferenceCard } from "./TimezoneDifferenceCard";
import { ShareFlightModal } from "./ShareFlightModal";
import {
  Clock,
  Globe,
  MapPin,
  Plane,
  Luggage,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Share2,
  Map,
  CloudSun,
  Activity,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const [showMap, setShowMap] = useState(false);
  const [showTimezoneAnalysis, setShowTimezoneAnalysis] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const getStatusBadge = (status: Flight["status"], text: string) => {
    switch (status) {
      case "IN_FLIGHT":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            {text}
          </span>
        );
      case "ON_TIME":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {text}
          </span>
        );
      case "DELAYED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertCircle className="w-3.5 h-3.5" />
            {text}
          </span>
        );
      case "LANDED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {text}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300 border border-slate-600">
            {text}
          </span>
        );
    }
  };

  return (
    <>
      <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/30 transition-all group overflow-hidden relative">
        {/* Top ambient highlight gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Header with Airline, Flight Number, Callsign & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-sky-400 text-lg shadow-inner">
              {flight.airline.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {flight.flightNumber}
                </h3>
                <span className="text-xs text-slate-400 font-normal">
                  • {flight.airline.name}
                </span>
                {flight.airline.callsign && (
                  <span className="hidden sm:inline text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    CS: {flight.airline.callsign}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{flight.aircraft.model}</span>
                {flight.aircraft.registration && (
                  <span className="text-slate-500">({flight.aircraft.registration})</span>
                )}
                {flight.aircraft.cruisingAltitude && (
                  <span className="hidden md:inline text-slate-500">• Alt: {flight.aircraft.cruisingAltitude}</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {getStatusBadge(flight.status, flight.statusText)}
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              title="Share or print flight details"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Flight Route & Timings Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 items-center">
          {/* START LOCATION & START TIME */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  Departure (Origin)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                  {flight.departure.location.airportCode}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {flight.departure.time.timeOnly}
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-end gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {flight.departure.time.dateOnly}
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-300">
              <div className="font-semibold text-slate-200 text-sm">
                {flight.departure.location.city}, {flight.departure.location.country}
              </div>
              <div className="text-slate-400 truncate">
                {flight.departure.location.airportName}
              </div>
              {(flight.departure.location.terminal || flight.departure.location.gate) && (
                <div className="flex items-center gap-2 pt-1 text-slate-300">
                  {flight.departure.location.terminal && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                      {flight.departure.location.terminal}
                    </span>
                  )}
                  {flight.departure.location.gate && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                      {flight.departure.location.gate}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Timezone badge & Weather */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-sky-300 font-mono">
                <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{flight.departure.location.timeZone.label}</span>
              </div>
              {flight.departure.location.weather && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
                  <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{flight.departure.location.weather.tempF}°F ({flight.departure.location.weather.condition})</span>
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE FLIGHT VISUALIZATION & DURATION */}
          <div className="md:col-span-4 flex flex-col items-center justify-center px-3 py-4 bg-slate-950/50 rounded-xl border border-slate-800/60">
            <div className="text-xs text-slate-300 font-semibold flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Duration: {flight.duration}</span>
            </div>

            {/* Graphical Route Bar */}
            <div className="w-full relative py-2.5 flex items-center">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${flight.progressPercent ?? 50}%` }}
                />
              </div>
              {/* Plane Icon */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
                style={{ left: `${Math.min(Math.max(flight.progressPercent ?? 50, 8), 92)}%` }}
              >
                <div className="p-1.5 rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/50 animate-pulse">
                  <Plane className="w-3.5 h-3.5 rotate-90" />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
              <span>{flight.departure.location.airportCode}</span>
              <span className="text-[10px] text-slate-500">Direct Route</span>
              <span>{flight.arrival.location.airportCode}</span>
            </div>

            {flight.delayMinutes && flight.delayMinutes > 0 ? (
              <div className="mt-2 text-[11px] text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                +{flight.delayMinutes}m delay
              </div>
            ) : null}
          </div>

          {/* END LOCATION & END TIME */}
          <div className="md:col-span-4 space-y-3 text-left md:text-right">
            <div className="flex items-start justify-between md:flex-row-reverse">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  Arrival (Destination)
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                  {flight.arrival.location.airportCode}
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                  {flight.arrival.time.timeOnly}
                </div>
                <div className="text-xs text-slate-400 flex items-center md:justify-end gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {flight.arrival.time.dateOnly}
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-300">
              <div className="font-semibold text-slate-200 text-sm">
                {flight.arrival.location.city}, {flight.arrival.location.country}
              </div>
              <div className="text-slate-400 truncate">
                {flight.arrival.location.airportName}
              </div>
              {(flight.arrival.location.terminal || flight.arrival.location.gate) && (
                <div className="flex items-center gap-2 pt-1 text-slate-300 md:justify-end">
                  {flight.arrival.location.terminal && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                      {flight.arrival.location.terminal}
                    </span>
                  )}
                  {flight.arrival.location.gate && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                      {flight.arrival.location.gate}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Timezone badge & Weather */}
            <div className="pt-1 flex flex-wrap items-center gap-2 md:justify-end">
              {flight.arrival.location.weather && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
                  <CloudSun className="w-3.5 h-3.5 text-purple-400" />
                  <span>{flight.arrival.location.weather.tempF}°F ({flight.arrival.location.weather.condition})</span>
                </div>
              )}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-purple-300 font-mono">
                <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{flight.arrival.location.timeZone.label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Expanders: Map & Timezones */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowMap(!showMap)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                showMap
                  ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border-slate-700 hover:text-white"
              }`}
            >
              <Map className="w-3.5 h-3.5 text-sky-400" />
              <span>{showMap ? "Hide Radar Map" : "View Radar Map"}</span>
              {showMap ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <button
              onClick={() => setShowTimezoneAnalysis(!showTimezoneAnalysis)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                showTimezoneAnalysis
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border-slate-700 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>{showTimezoneAnalysis ? "Hide Timezones" : "Timezone & Jet Lag"}</span>
              {showTimezoneAnalysis ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {flight.baggageClaim && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
              <Luggage className="w-3.5 h-3.5 text-amber-400" />
              <span>Baggage: <strong className="text-white">{flight.baggageClaim}</strong></span>
            </div>
          )}
        </div>

        {/* Collapsible Interactive Leaflet Map */}
        {showMap && <FlightRouteMap flight={flight} />}

        {/* Collapsible Live Dual-Clock / Timezone Analysis */}
        {showTimezoneAnalysis && <TimezoneDifferenceCard flight={flight} />}
      </div>

      {/* Share Modal */}
      <ShareFlightModal
        flight={flight}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </>
  );
}
