"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flight } from "@/data/flights";
import { Plane, MapPin, Navigation, Layers, Satellite, Moon, Globe2 } from "lucide-react";

interface FlightRouteMapProps {
  flight: Flight;
}

type MapTheme = "dark" | "satellite" | "navigation";

const MAP_THEMES = {
  dark: {
    name: "Dark Radar",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    subdomains: [] as string[],
    maxZoom: 16,
    attribution: "&copy; Esri, HERE, Garmin, &copy; OpenStreetMap",
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    subdomains: [] as string[],
    maxZoom: 18,
    attribution: "&copy; Esri, Maxar, Earthstar Geographics",
  },
  navigation: {
    name: "Aero Light",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    subdomains: [] as string[],
    maxZoom: 16,
    attribution: "&copy; Esri, DeLorme, NAVTEQ",
  },
};

export function FlightRouteMap({ flight }: FlightRouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const [currentTheme, setCurrentTheme] = useState<MapTheme>("dark");
  const [mapLoaded, setMapLoaded] = useState(false);

  // Switch tile theme on the fly
  const handleThemeChange = (theme: MapTheme) => {
    setCurrentTheme(theme);
    if (mapInstanceRef.current && (window as any).L) {
      const L = (window as any).L;
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }
      const config = MAP_THEMES[theme];
      const newLayer = L.tileLayer(config.url, {
        maxZoom: config.maxZoom,
        attribution: config.attribution,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = newLayer;
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;

      const L = (await import("leaflet")).default;
      (window as any).L = L;

      // Ensure Leaflet CSS
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const dep = flight.departure.location.coordinates;
      const arr = flight.arrival.location.coordinates;

      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
      });
      mapInstanceRef.current = map;

      // Clean, watermark-free high-precision Aviation Dark Canvas
      const initialTheme = MAP_THEMES[currentTheme];
      const tileLayer = L.tileLayer(initialTheme.url, {
        maxZoom: initialTheme.maxZoom,
        attribution: initialTheme.attribution,
      }).addTo(map);
      tileLayerRef.current = tileLayer;

      // Custom Origin Marker Icon
      const originIcon = L.divIcon({
        className: "custom-dep-marker",
        html: `
          <div style="background:#0284c7;color:#fff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:8px;border:2px solid #38bdf8;box-shadow:0 0 12px rgba(56,189,248,0.6);display:flex;align-items:center;gap:4px;white-space:nowrap;">
            <span>🛫 ${flight.departure.location.airportCode}</span>
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12],
      });

      // Custom Destination Marker Icon
      const destIcon = L.divIcon({
        className: "custom-arr-marker",
        html: `
          <div style="background:#7c3aed;color:#fff;font-weight:bold;font-size:11px;padding:3px 8px;border-radius:8px;border:2px solid #a855f7;box-shadow:0 0 12px rgba(168,85,247,0.6);display:flex;align-items:center;gap:4px;white-space:nowrap;">
            <span>🛬 ${flight.arrival.location.airportCode}</span>
          </div>
        `,
        iconSize: [60, 24],
        iconAnchor: [30, 12],
      });

      const depMarker = L.marker([dep.lat, dep.lng], { icon: originIcon }).addTo(map);
      depMarker.bindPopup(`
        <div style="color:#0f172a;font-family:sans-serif;font-size:12px;">
          <strong>${flight.departure.location.airportCode} - ${flight.departure.location.city}</strong><br/>
          <span>${flight.departure.location.airportName}</span><br/>
          <span>Departure: ${flight.departure.time.timeOnly} (${flight.departure.location.timeZone.label})</span>
        </div>
      `);

      const arrMarker = L.marker([arr.lat, arr.lng], { icon: destIcon }).addTo(map);
      arrMarker.bindPopup(`
        <div style="color:#0f172a;font-family:sans-serif;font-size:12px;">
          <strong>${flight.arrival.location.airportCode} - ${flight.arrival.location.city}</strong><br/>
          <span>${flight.arrival.location.airportName}</span><br/>
          <span>Arrival: ${flight.arrival.time.timeOnly} (${flight.arrival.location.timeZone.label})</span>
        </div>
      `);

      // Generate curved Great Circle flight trajectory
      const points: [number, number][] = [];
      const numPoints = 100;
      const progress = (flight.progressPercent || 50) / 100;

      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const lat = dep.lat + (arr.lat - dep.lat) * t;
        const lng = dep.lng + (arr.lng - dep.lng) * t;
        const arc = Math.sin(t * Math.PI) * (Math.abs(arr.lng - dep.lng) > 60 ? 10 : 3);
        points.push([lat + arc, lng]);
      }

      // Draw dashed trajectory glow line
      L.polyline(points, {
        color: "#38bdf8",
        weight: 3.5,
        dashArray: "6, 8",
        opacity: 0.9,
      }).addTo(map);

      // Add Aircraft Marker along route
      const currentPointIndex = Math.min(
        Math.floor(numPoints * progress),
        numPoints
      );
      const currentPos = points[currentPointIndex] || [dep.lat, dep.lng];

      const planeIcon = L.divIcon({
        className: "custom-plane-marker",
        html: `
          <div style="background:#0ea5e9;color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 16px #38bdf8;border:2px solid #fff;">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(45deg);">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/>
            </svg>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const planeMarker = L.marker(currentPos, { icon: planeIcon }).addTo(map);
      planeMarker.bindPopup(`
        <div style="color:#0f172a;font-family:sans-serif;font-size:12px;">
          <strong>${flight.airline.name} ${flight.flightNumber}</strong><br/>
          <span>Status: ${flight.statusText}</span><br/>
          <span>Altitude: ${flight.aircraft.cruisingAltitude || "Cruising"}</span><br/>
          <span>Speed: ${flight.aircraft.cruisingSpeed || "Cruise"}</span>
        </div>
      `);

      // Fit map bounds
      const bounds = L.latLngBounds([
        [dep.lat, dep.lng],
        [arr.lat, arr.lng],
        currentPos,
      ]);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 6 });

      if (isMounted) setMapLoaded(true);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [flight]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 mt-4 shadow-2xl">
      {/* Map Header Controls */}
      <div className="absolute top-2.5 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs text-slate-200 pointer-events-auto shadow-lg">
          <Navigation className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold">
            {flight.departure.location.airportCode} → {flight.arrival.location.airportCode}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-sky-400 font-mono font-bold">{flight.duration}</span>
        </div>

        {/* Map Style Switcher (Dark Radar, Satellite, Light) */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 pointer-events-auto shadow-lg text-[11px]">
          <button
            type="button"
            onClick={() => handleThemeChange("dark")}
            className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
              currentTheme === "dark"
                ? "bg-sky-500 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Moon className="w-3 h-3" />
            <span>Dark Radar</span>
          </button>
          <button
            type="button"
            onClick={() => handleThemeChange("satellite")}
            className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
              currentTheme === "satellite"
                ? "bg-sky-500 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Satellite className="w-3 h-3" />
            <span>Satellite</span>
          </button>
          <button
            type="button"
            onClick={() => handleThemeChange("navigation")}
            className={`px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
              currentTheme === "navigation"
                ? "bg-sky-500 text-white font-semibold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Globe2 className="w-3 h-3" />
            <span>Aero Light</span>
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-72 sm:h-80 z-0 transition-opacity duration-500 bg-slate-950"
        style={{ opacity: mapLoaded ? 1 : 0.4 }}
      />

      {/* Bottom overlay info */}
      <div className="absolute bottom-2.5 left-3 z-[400] text-[10px] text-slate-300 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/80 pointer-events-none shadow">
        Interactive Flight Radar • Click pins for details
      </div>
    </div>
  );
}
