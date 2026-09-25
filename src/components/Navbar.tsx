"use client";

import React, { useState } from "react";
import { Plane, Compass, Sliders, ExternalLink, Radio } from "lucide-react";
import { ApiSettingsModal } from "./ApiSettingsModal";

interface NavbarProps {
  apiProvider: string;
  onProviderChange: (provider: string) => void;
}

export function Navbar({ apiProvider, onProviderChange }: NavbarProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 ring-1 ring-white/20">
              <Plane className="h-5 w-5 text-white -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  AeroLookup
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  v1.0 Live
                </span>
              </div>
              <p className="text-xs text-slate-400">Next.js Flight Tracker & Timezone Resolver</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-400">
            {/* Provider Switcher / Status Button */}
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 transition-colors"
              title="Configure API Provider"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-[11px] capitalize">
                {apiProvider === "mock" ? "Mock Feed" : apiProvider}
              </span>
              <Sliders className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      <ApiSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiProvider={apiProvider}
        onProviderChange={onProviderChange}
      />
    </>
  );
}
