# ✈️ AeroLookup — Next.js Flight Radar & Timezone Tracker

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)

A modern, high-performance flight lookup and aviation intelligence web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Leaflet**.

Search any flight number to get instant details on **departure & arrival times**, **exact time zones**, **airport terminals & gates**, **live flight status**, **interactive radar route maps**, and **dual-city jet lag analysis**.

---

## 🌟 Key Features

- 🔍 **Instant Flight Search**: Search by flight number (e.g. `AA100`, `UA240`, `DL456`, `BA178`, `AF022`, `EK202`, `SQ25`, `QF12`, `WN1492`), airline name, or airport IATA code.
- 🕒 **Comprehensive Timing & Time Zones**:
  - Scheduled and actual departure & arrival times.
  - Local timezone resolution with UTC offsets (e.g., `EDT (UTC-4)`, `BST (UTC+1)`, `JST (UTC+9)`).
  - Timezone difference calculator with day change indicators (+1 day) and jet lag recovery tips.
- 🗺️ **Interactive Radar Map**:
  - Great-Circle trajectory curves powered by Leaflet.
  - Live animated aircraft position marker along the flight corridor.
  - Origin & Destination airport pins with interactive popup metrics.
- 🧳 **Airport & Flight Details**:
  - Departure & arrival terminals, gates, and baggage claim carousels.
  - Real-time weather and temperature previews for both origin and destination cities.
  - Aircraft model (Boeing 777, Airbus A380, A350, 787 Dreamliner), callsign, and cruising altitude.
- ⚡ **Local History & Shareable Links**:
  - Saved recent searches stored in `localStorage` for 1-click re-checking.
  - Copy shareable itinerary links (`?flightNumber=AA100`) and plain text summaries for messages.
  - Print-ready flight itinerary mode.
- 🔌 **Extensible API Architecture**:
  - Ships with a zero-setup Mock API route at `/api/flights`.
  - Built-in provider switcher with architecture for **OpenSky Network (ADS-B)**, **AviationStack**, and **FlightAware AeroAPI**.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/flight-lookup-app.git
   cd flight-lookup-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📡 API Reference

### `GET /api/flights`

Returns a list of matching flights.

#### Query Parameters:
| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `flightNumber` | `string` | Flight number or code to filter | `AA100`, `UA240` |
| `query` / `q` | `string` | General search across flight, airport, or city | `London`, `JFK` |

#### Example Response:
```json
{
  "success": true,
  "count": 1,
  "query": "AA100",
  "flights": [
    {
      "id": "fl-aa100",
      "flightNumber": "AA100",
      "airline": { "name": "American Airlines", "code": "AA" },
      "status": "IN_FLIGHT",
      "statusText": "In Flight (Cruising at 38,000 ft)",
      "departure": {
        "location": {
          "airportCode": "JFK",
          "city": "New York",
          "timeZone": { "name": "America/New_York", "label": "EDT (UTC-4)" }
        },
        "time": { "formattedLocal": "6:35 PM EDT, Sep 25, 2026" }
      },
      "arrival": {
        "location": {
          "airportCode": "LHR",
          "city": "London",
          "timeZone": { "name": "Europe/London", "label": "BST (UTC+1)" }
        },
        "time": { "formattedLocal": "6:50 AM BST, Sep 26, 2026" }
      }
    }
  ]
}
```

---

## 📁 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── api/flights/route.ts      # Flight lookup API route
│   │   ├── globals.css               # Tailwind CSS v4 styling
│   │   ├── layout.tsx                # Root HTML layout & metadata
│   │   └── page.tsx                  # Main search page & dashboard
│   ├── components/
│   │   ├── ApiSettingsModal.tsx      # Aviation provider settings
│   │   ├── FlightCard.tsx            # Flight card & status widget
│   │   ├── FlightList.tsx            # Results container & skeletons
│   │   ├── FlightRouteMap.tsx        # Interactive Leaflet map
│   │   ├── FlightSearchForm.tsx      # Search bar & quick chips
│   │   ├── Navbar.tsx                # Header & navigation bar
│   │   ├── RecentSearches.tsx        # LocalStorage search history
│   │   ├── ShareFlightModal.tsx      # Share & print modal
│   │   └── TimezoneDifferenceCard.tsx# Live dual-clock & jet lag
│   └── data/
│       └── flights.ts                # TypeScript interfaces & dataset
├── public/                           # Static assets
├── package.json                      # Dependencies & scripts
└── README.md                         # Project documentation
```

---

## ☁️ Deployment

### Deploy to Vercel (Recommended)
The easiest way to deploy this app is using [Vercel](https://vercel.com/):

```bash
npx vercel
```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
