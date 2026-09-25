"use client";

import React, { useState } from "react";
import { Sliders, CheckCircle2, Shield, Radio, Key, Zap, X, RefreshCw } from "lucide-react";

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiProvider: string;
  onProviderChange: (provider: string) => void;
}

export function ApiSettingsModal({
  isOpen,
  onClose,
  apiProvider,
  onProviderChange,
}: ApiSettingsModalProps) {
  const [customKey, setCustomKey] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-5 text-slate-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">Flight API Provider Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Choose between our instant high-fidelity Mock Radar Feed or connect your external Live Aviation data provider.
        </p>

        {/* Provider choices */}
        <div className="space-y-3">
          {/* Mock Provider */}
          <div
            onClick={() => onProviderChange("mock")}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              apiProvider === "mock"
                ? "bg-sky-500/10 border-sky-500/50 text-white"
                : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-full ${apiProvider === "mock" ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-500"}`}>
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-white">Mock Aviation Feed (Default)</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready • 0ms Key Needed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Provides rich, zero-rate-limit flight details for major global airlines with full timezone data, realistic route coordinates, and live status.
              </p>
            </div>
          </div>

          {/* OpenSky Network Provider */}
          <div
            onClick={() => onProviderChange("opensky")}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              apiProvider === "opensky"
                ? "bg-sky-500/10 border-sky-500/50 text-white"
                : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-full ${apiProvider === "opensky" ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-500"}`}>
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-white">OpenSky Network (Community Feed)</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  ADS-B Live
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Fetches live transponder coordinates from community ADS-B receivers.
              </p>
            </div>
          </div>

          {/* AviationStack / AeroAPI Provider */}
          <div
            onClick={() => onProviderChange("aviationstack")}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              apiProvider === "aviationstack"
                ? "bg-sky-500/10 border-sky-500/50 text-white"
                : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-full ${apiProvider === "aviationstack" ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-500"}`}>
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-white">AviationStack / AeroAPI (Custom Key)</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Connect your commercial AviationStack or FlightAware API key for commercial flight telemetry.
              </p>
            </div>
          </div>
        </div>

        {apiProvider === "aviationstack" && (
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Aviation API Access Key</span>
            </label>
            <input
              type="password"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="Paste your API key (optional for preview)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-sky-600/30"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            <span>{isSaved ? "Saved" : "Apply Provider"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
