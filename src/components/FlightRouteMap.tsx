"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flight } from "@/data/flights";
import { Plane, MapPin, Maximize2, Navigation, Layers } from "lucide-react";

interface FlightRouteMapProps {
  flight: Flight;
}

export function FlightRouteMap({ flight }: FlightRouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Dynamically load Leaflet on client side
    async function initMap() {
      if (!mapContainerRef.current) return;

      const L = (await import("leaflet")).default;
      // Load Leaflet CSS dynamically if not present
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

      const cartoKey = process.env.NEXT_PUBLIC_CARTO_API_KEY || "cb1_3xdf_1_00d1998430fda0681b849ecd";
      const tileUrl = cartoKey
        ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key=${cartoKey}`
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

      // Dark theme map tiles (CartoDB Dark Matter with authenticated API key)
      L.tileLayer(tileUrl, {
        maxZoom: 19,
        subdomains: "abcd",
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      }).addTo(map);

      // Custom Origin Marker Icon
      const originIcon = L.divIcon({
        className: "custom-dep-marker",
        html: `
          <div style="background:#0284c7;color:#fff;font-weight:bold;font-size:11px;padding:3px 7px;border-radius:8px;border:2px solid #38bdf8;box-shadow:0 0 10px rgba(56,189,248,0.5);display:flex;align-items:center;gap:4px;white-space:nowrap;">
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
          <div style="background:#7c3aed;color:#fff;font-weight:bold;font-size:11px;padding:3px 7px;border-radius:8px;border:2px solid #a855f7;box-shadow:0 0 10px rgba(168,85,247,0.5);display:flex;align-items:center;gap:4px;white-space:nowrap;">
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

      // Generate curved arc points (Great Circle interpolation simulation)
      const points: [number, number][] = [];
      const numPoints = 100;
      const progress = (flight.progressPercent || 50) / 100;

      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const lat = dep.lat + (arr.lat - dep.lat) * t;
        const lng = dep.lng + (arr.lng - dep.lng) * t;
        // Add curve altitude offset for visual Great Circle arc effect
        const arc = Math.sin(t * Math.PI) * (Math.abs(arr.lng - dep.lng) > 60 ? 10 : 3);
        points.push([lat + arc, lng]);
      }

      // Draw dashed trajectory
      const polyline = L.polyline(points, {
        color: "#38bdf8",
        weight: 3,
        dashArray: "6, 8",
        opacity: 0.85,
      }).addTo(map);

      // Add Aircraft Icon along the route
      const currentPointIndex = Math.min(
        Math.floor(numPoints * progress),
        numPoints
      );
      const currentPos = points[currentPointIndex] || [dep.lat, dep.lng];

      const planeIcon = L.divIcon({
        className: "custom-plane-marker",
        html: `
          <div style="background:#0ea5e9;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 15px #38bdf8;border:2px solid #fff;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(45deg);">
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/>
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const planeMarker = L.marker(currentPos, { icon: planeIcon }).addTo(map);
      planeMarker.bindPopup(`
        <div style="color:#0f172a;font-family:sans-serif;font-size:12px;">
          <strong>${flight.airline.name} ${flight.flightNumber}</strong><br/>
          <span>Status: ${flight.statusText}</span><br/>
          <span>Altitude: ${flight.aircraft.cruisingAltitude || "In flight"}</span><br/>
          <span>Speed: ${flight.aircraft.cruisingSpeed || "Cruise"}</span>
        </div>
      `);

      // Fit map bounds with padding
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
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 mt-4">
      {/* Map Control Bar */}
      <div className="absolute top-2 left-3 right-3 z-[400] flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[11px] text-slate-300 pointer-events-auto shadow-md">
          <Navigation className="w-3.5 h-3.5 text-sky-400" />
          <span>
            {flight.departure.location.airportCode} → {flight.arrival.location.airportCode}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-sky-400 font-mono font-medium">{flight.duration}</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[11px] text-slate-300 pointer-events-auto shadow-md">
          <Layers className="w-3 h-3 text-indigo-400" />
          <span>Interactive Radar Map</span>
        </div>
      </div>

      {/* Map Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-64 sm:h-72 z-0 transition-opacity duration-500"
        style={{ opacity: mapLoaded ? 1 : 0.4 }}
      />

      {/* Bottom overlay badge */}
      <div className="absolute bottom-2 left-3 z-[400] text-[10px] text-slate-400 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-800 pointer-events-none">
        Click markers for airport & flight details • Drag to pan
      </div>
    </div>
  );
}
