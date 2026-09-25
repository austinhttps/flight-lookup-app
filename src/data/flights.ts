export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface LocationInfo {
  airportCode: string;
  airportName: string;
  city: string;
  country: string;
  terminal?: string;
  gate?: string;
  coordinates: LocationCoordinates;
  timeZone: {
    name: string;
    offset: string; // e.g. "UTC-4"
    offsetMinutes: number; // e.g. -240
    label: string; // e.g. "EDT (UTC-4)"
  };
  weather?: {
    tempC: number;
    tempF: number;
    condition: string;
    icon: string; // e.g. "sunny", "cloudy", "rain"
  };
}

export interface FlightTimeInfo {
  scheduled: string; // ISO String
  actualOrEstimated?: string; // ISO String
  formattedLocal: string; // e.g. "6:35 PM EDT, Sep 25, 2026"
  timeOnly: string; // e.g. "06:35 PM"
  dateOnly: string; // e.g. "Sep 25, 2026"
  epochMs: number;
}

export type FlightStatus = 'ON_TIME' | 'IN_FLIGHT' | 'DELAYED' | 'LANDED' | 'SCHEDULED' | 'CANCELLED';

export interface Flight {
  id: string;
  flightNumber: string; // e.g. "AA100"
  airline: {
    name: string;
    code: string; // e.g. "AA"
    callsign?: string;
  };
  status: FlightStatus;
  statusText: string;
  departure: {
    location: LocationInfo;
    time: FlightTimeInfo;
  };
  arrival: {
    location: LocationInfo;
    time: FlightTimeInfo;
  };
  duration: string; // e.g. "7h 15m"
  aircraft: {
    model: string; // e.g. "Boeing 777-300ER"
    registration?: string;
    cruisingAltitude?: string; // e.g. "38,000 ft"
    cruisingSpeed?: string; // e.g. "560 mph"
  };
  progressPercent?: number; // 0 to 100
  delayMinutes?: number;
  baggageClaim?: string;
  timeZoneDifference: {
    hoursDifference: number; // e.g. +5
    text: string; // e.g. "Destination is 5 hours ahead"
  };
}

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: "fl-aa100",
    flightNumber: "AA100",
    airline: {
      name: "American Airlines",
      code: "AA",
      callsign: "AMERICAN 100",
    },
    status: "IN_FLIGHT",
    statusText: "In Flight (Cruising at 38,000 ft)",
    departure: {
      location: {
        airportCode: "JFK",
        airportName: "John F. Kennedy International Airport",
        city: "New York",
        country: "United States",
        terminal: "Terminal 8",
        gate: "Gate 12",
        coordinates: { lat: 40.6413, lng: -73.7781 },
        timeZone: {
          name: "America/New_York",
          offset: "UTC-4",
          offsetMinutes: -240,
          label: "EDT (UTC-4)",
        },
        weather: {
          tempC: 21,
          tempF: 70,
          condition: "Partly Cloudy",
          icon: "cloudy",
        },
      },
      time: {
        scheduled: "2026-09-25T18:30:00-04:00",
        actualOrEstimated: "2026-09-25T18:35:00-04:00",
        formattedLocal: "6:35 PM EDT, Sep 25, 2026",
        timeOnly: "06:35 PM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790375700000,
      },
    },
    arrival: {
      location: {
        airportCode: "LHR",
        airportName: "Heathrow Airport",
        city: "London",
        country: "United Kingdom",
        terminal: "Terminal 3",
        gate: "Gate 24",
        coordinates: { lat: 51.4700, lng: -0.4543 },
        timeZone: {
          name: "Europe/London",
          offset: "UTC+1",
          offsetMinutes: 60,
          label: "BST (UTC+1)",
        },
        weather: {
          tempC: 15,
          tempF: 59,
          condition: "Light Rain",
          icon: "rain",
        },
      },
      time: {
        scheduled: "2026-09-26T06:45:00+01:00",
        actualOrEstimated: "2026-09-26T06:50:00+01:00",
        formattedLocal: "6:50 AM BST, Sep 26, 2026",
        timeOnly: "06:50 AM",
        dateOnly: "Sep 26, 2026",
        epochMs: 1790401800000,
      },
    },
    duration: "7h 15m",
    aircraft: {
      model: "Boeing 777-300ER",
      registration: "N728AN",
      cruisingAltitude: "38,000 ft",
      cruisingSpeed: "560 mph",
    },
    progressPercent: 62,
    baggageClaim: "Carousel 4",
    timeZoneDifference: {
      hoursDifference: 5,
      text: "Destination is 5 hours ahead of departure location",
    },
  },
  {
    id: "fl-ua240",
    flightNumber: "UA240",
    airline: {
      name: "United Airlines",
      code: "UA",
      callsign: "UNITED 240",
    },
    status: "ON_TIME",
    statusText: "On Time - Gate Open",
    departure: {
      location: {
        airportCode: "SFO",
        airportName: "San Francisco International Airport",
        city: "San Francisco",
        country: "United States",
        terminal: "International Terminal G",
        gate: "Gate G94",
        coordinates: { lat: 37.6213, lng: -122.3790 },
        timeZone: {
          name: "America/Los_Angeles",
          offset: "UTC-7",
          offsetMinutes: -420,
          label: "PDT (UTC-7)",
        },
        weather: {
          tempC: 18,
          tempF: 64,
          condition: "Sunny",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-25T11:15:00-07:00",
        actualOrEstimated: "2026-09-25T11:15:00-07:00",
        formattedLocal: "11:15 AM PDT, Sep 25, 2026",
        timeOnly: "11:15 AM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790356500000,
      },
    },
    arrival: {
      location: {
        airportCode: "HND",
        airportName: "Tokyo Haneda Airport",
        city: "Tokyo",
        country: "Japan",
        terminal: "Terminal 3",
        gate: "Gate 112",
        coordinates: { lat: 35.5494, lng: 139.7798 },
        timeZone: {
          name: "Asia/Tokyo",
          offset: "UTC+9",
          offsetMinutes: 540,
          label: "JST (UTC+9)",
        },
        weather: {
          tempC: 22,
          tempF: 72,
          condition: "Clear Sky",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-26T14:45:00+09:00",
        actualOrEstimated: "2026-09-26T14:45:00+09:00",
        formattedLocal: "2:45 PM JST, Sep 26, 2026",
        timeOnly: "02:45 PM",
        dateOnly: "Sep 26, 2026",
        epochMs: 1790397900000,
      },
    },
    duration: "11h 30m",
    aircraft: {
      model: "Boeing 787-9 Dreamliner",
      registration: "N29985",
      cruisingAltitude: "41,000 ft",
      cruisingSpeed: "570 mph",
    },
    progressPercent: 0,
    baggageClaim: "Carousel 7",
    timeZoneDifference: {
      hoursDifference: 16,
      text: "Destination is 16 hours ahead of departure location (+1 Calendar Day)",
    },
  },
  {
    id: "fl-dl456",
    flightNumber: "DL456",
    airline: {
      name: "Delta Air Lines",
      code: "DL",
      callsign: "DELTA 456",
    },
    status: "DELAYED",
    statusText: "Delayed (+35m due to ground traffic)",
    departure: {
      location: {
        airportCode: "ATL",
        airportName: "Hartsfield-Jackson Atlanta International Airport",
        city: "Atlanta",
        country: "United States",
        terminal: "Domestic Terminal South",
        gate: "Gate T4",
        coordinates: { lat: 33.6407, lng: -84.4277 },
        timeZone: {
          name: "America/New_York",
          offset: "UTC-4",
          offsetMinutes: -240,
          label: "EDT (UTC-4)",
        },
        weather: {
          tempC: 26,
          tempF: 78,
          condition: "Thunderstorms",
          icon: "rain",
        },
      },
      time: {
        scheduled: "2026-09-25T14:00:00-04:00",
        actualOrEstimated: "2026-09-25T14:35:00-04:00",
        formattedLocal: "2:35 PM EDT, Sep 25, 2026",
        timeOnly: "02:35 PM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790361300000,
      },
    },
    arrival: {
      location: {
        airportCode: "LAX",
        airportName: "Los Angeles International Airport",
        city: "Los Angeles",
        country: "United States",
        terminal: "Terminal 2",
        gate: "Gate 23B",
        coordinates: { lat: 33.9416, lng: -118.4085 },
        timeZone: {
          name: "America/Los_Angeles",
          offset: "UTC-7",
          offsetMinutes: -420,
          label: "PDT (UTC-7)",
        },
        weather: {
          tempC: 24,
          tempF: 75,
          condition: "Sunny",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-25T16:10:00-07:00",
        actualOrEstimated: "2026-09-25T16:45:00-07:00",
        formattedLocal: "4:45 PM PDT, Sep 25, 2026",
        timeOnly: "04:45 PM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790379900000,
      },
    },
    duration: "5h 10m",
    aircraft: {
      model: "Airbus A321neo",
      registration: "N512DN",
      cruisingAltitude: "36,000 ft",
      cruisingSpeed: "530 mph",
    },
    delayMinutes: 35,
    progressPercent: 20,
    baggageClaim: "Carousel 2",
    timeZoneDifference: {
      hoursDifference: -3,
      text: "Destination is 3 hours behind departure location",
    },
  },
  {
    id: "fl-ba178",
    flightNumber: "BA178",
    airline: {
      name: "British Airways",
      code: "BA",
      callsign: "SPEEDBIRD 178",
    },
    status: "LANDED",
    statusText: "Landed at 10:10 PM BST",
    departure: {
      location: {
        airportCode: "JFK",
        airportName: "John F. Kennedy International Airport",
        city: "New York",
        country: "United States",
        terminal: "Terminal 8",
        gate: "Gate 14",
        coordinates: { lat: 40.6413, lng: -73.7781 },
        timeZone: {
          name: "America/New_York",
          offset: "UTC-4",
          offsetMinutes: -240,
          label: "EDT (UTC-4)",
        },
        weather: {
          tempC: 20,
          tempF: 68,
          condition: "Clear",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-24T10:00:00-04:00",
        actualOrEstimated: "2026-09-24T10:05:00-04:00",
        formattedLocal: "10:05 AM EDT, Sep 24, 2026",
        timeOnly: "10:05 AM",
        dateOnly: "Sep 24, 2026",
        epochMs: 1790258700000,
      },
    },
    arrival: {
      location: {
        airportCode: "LHR",
        airportName: "Heathrow Airport",
        city: "London",
        country: "United Kingdom",
        terminal: "Terminal 5",
        gate: "Gate A10",
        coordinates: { lat: 51.4700, lng: -0.4543 },
        timeZone: {
          name: "Europe/London",
          offset: "UTC+1",
          offsetMinutes: 60,
          label: "BST (UTC+1)",
        },
        weather: {
          tempC: 14,
          tempF: 57,
          condition: "Overcast",
          icon: "cloudy",
        },
      },
      time: {
        scheduled: "2026-09-24T22:15:00+01:00",
        actualOrEstimated: "2026-09-24T22:10:00+01:00",
        formattedLocal: "10:10 PM BST, Sep 24, 2026",
        timeOnly: "10:10 PM",
        dateOnly: "Sep 24, 2026",
        epochMs: 1790302200000,
      },
    },
    duration: "7h 05m",
    aircraft: {
      model: "Airbus A350-1000",
      registration: "G-XWBA",
      cruisingAltitude: "39,000 ft",
      cruisingSpeed: "565 mph",
    },
    progressPercent: 100,
    baggageClaim: "Carousel 9",
    timeZoneDifference: {
      hoursDifference: 5,
      text: "Destination is 5 hours ahead of departure location",
    },
  },
  {
    id: "fl-af022",
    flightNumber: "AF022",
    airline: {
      name: "Air France",
      code: "AF",
      callsign: "AIRFRANCE 022",
    },
    status: "IN_FLIGHT",
    statusText: "In Flight (Mid-Atlantic En Route)",
    departure: {
      location: {
        airportCode: "CDG",
        airportName: "Charles de Gaulle Airport",
        city: "Paris",
        country: "France",
        terminal: "Terminal 2E",
        gate: "Gate K32",
        coordinates: { lat: 49.0097, lng: 2.5479 },
        timeZone: {
          name: "Europe/Paris",
          offset: "UTC+2",
          offsetMinutes: 120,
          label: "CEST (UTC+2)",
        },
        weather: {
          tempC: 17,
          tempF: 62,
          condition: "Sunny",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-25T13:30:00+02:00",
        actualOrEstimated: "2026-09-25T13:30:00+02:00",
        formattedLocal: "1:30 PM CEST, Sep 25, 2026",
        timeOnly: "01:30 PM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790345400000,
      },
    },
    arrival: {
      location: {
        airportCode: "JFK",
        airportName: "John F. Kennedy International Airport",
        city: "New York",
        country: "United States",
        terminal: "Terminal 1",
        gate: "Gate 4",
        coordinates: { lat: 40.6413, lng: -73.7781 },
        timeZone: {
          name: "America/New_York",
          offset: "UTC-4",
          offsetMinutes: -240,
          label: "EDT (UTC-4)",
        },
        weather: {
          tempC: 22,
          tempF: 71,
          condition: "Clear",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-25T15:50:00-04:00",
        actualOrEstimated: "2026-09-25T15:45:00-04:00",
        formattedLocal: "3:45 PM EDT, Sep 25, 2026",
        timeOnly: "03:45 PM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790375100000,
      },
    },
    duration: "8h 15m",
    aircraft: {
      model: "Boeing 777-200ER",
      registration: "F-GSPS",
      cruisingAltitude: "37,000 ft",
      cruisingSpeed: "555 mph",
    },
    progressPercent: 48,
    baggageClaim: "Carousel 3",
    timeZoneDifference: {
      hoursDifference: -6,
      text: "Destination is 6 hours behind departure location",
    },
  },
  {
    id: "fl-ek202",
    flightNumber: "EK202",
    airline: {
      name: "Emirates",
      code: "EK",
      callsign: "EMIRATES 202",
    },
    status: "SCHEDULED",
    statusText: "Scheduled - On Schedule",
    departure: {
      location: {
        airportCode: "JFK",
        airportName: "John F. Kennedy International Airport",
        city: "New York",
        country: "United States",
        terminal: "Terminal 4",
        gate: "Gate A6",
        coordinates: { lat: 40.6413, lng: -73.7781 },
        timeZone: {
          name: "America/New_York",
          offset: "UTC-4",
          offsetMinutes: -240,
          label: "EDT (UTC-4)",
        },
        weather: {
          tempC: 19,
          tempF: 66,
          condition: "Fair",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-25T23:00:00-04:00",
        actualOrEstimated: "2026-09-25T23:00:00-04:00",
        formattedLocal: "11:00 PM EDT, Sep 25, 2026",
        timeOnly: "11:00 PM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790391600000,
      },
    },
    arrival: {
      location: {
        airportCode: "DXB",
        airportName: "Dubai International Airport",
        city: "Dubai",
        country: "United Arab Emirates",
        terminal: "Terminal 3",
        gate: "Gate B14",
        coordinates: { lat: 25.2532, lng: 55.3657 },
        timeZone: {
          name: "Asia/Dubai",
          offset: "UTC+4",
          offsetMinutes: 240,
          label: "GST (UTC+4)",
        },
        weather: {
          tempC: 34,
          tempF: 93,
          condition: "Warm & Clear",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-26T19:45:00+04:00",
        actualOrEstimated: "2026-09-26T19:45:00+04:00",
        formattedLocal: "7:45 PM GST, Sep 26, 2026",
        timeOnly: "07:45 PM",
        dateOnly: "Sep 26, 2026",
        epochMs: 1790437500000,
      },
    },
    duration: "12h 45m",
    aircraft: {
      model: "Airbus A380-800",
      registration: "A6-EEO",
      cruisingAltitude: "40,000 ft",
      cruisingSpeed: "580 mph",
    },
    progressPercent: 0,
    baggageClaim: "Carousel 8",
    timeZoneDifference: {
      hoursDifference: 8,
      text: "Destination is 8 hours ahead of departure location",
    },
  },
  {
    id: "fl-sq25",
    flightNumber: "SQ25",
    airline: {
      name: "Singapore Airlines",
      code: "SQ",
      callsign: "SINGAPORE 25",
    },
    status: "ON_TIME",
    statusText: "On Time - Final Call",
    departure: {
      location: {
        airportCode: "FRA",
        airportName: "Frankfurt Airport",
        city: "Frankfurt",
        country: "Germany",
        terminal: "Terminal 1",
        gate: "Gate B22",
        coordinates: { lat: 50.0379, lng: 8.5622 },
        timeZone: {
          name: "Europe/Berlin",
          offset: "UTC+2",
          offsetMinutes: 120,
          label: "CEST (UTC+2)",
        },
        weather: {
          tempC: 16,
          tempF: 60,
          condition: "Cloudy",
          icon: "cloudy",
        },
      },
      time: {
        scheduled: "2026-09-25T12:00:00+02:00",
        actualOrEstimated: "2026-09-25T12:00:00+02:00",
        formattedLocal: "12:00 PM CEST, Sep 25, 2026",
        timeOnly: "12:00 PM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790340000000,
      },
    },
    arrival: {
      location: {
        airportCode: "SIN",
        airportName: "Singapore Changi Airport",
        city: "Singapore",
        country: "Singapore",
        terminal: "Terminal 3",
        gate: "Gate B7",
        coordinates: { lat: 1.3644, lng: 103.9915 },
        timeZone: {
          name: "Asia/Singapore",
          offset: "UTC+8",
          offsetMinutes: 480,
          label: "SGT (UTC+8)",
        },
        weather: {
          tempC: 29,
          tempF: 84,
          condition: "Tropical Shower",
          icon: "rain",
        },
      },
      time: {
        scheduled: "2026-09-26T06:50:00+08:00",
        actualOrEstimated: "2026-09-26T06:50:00+08:00",
        formattedLocal: "6:50 AM SGT, Sep 26, 2026",
        timeOnly: "06:50 AM",
        dateOnly: "Sep 26, 2026",
        epochMs: 1790386200000,
      },
    },
    duration: "12h 50m",
    aircraft: {
      model: "Airbus A380-800",
      registration: "9V-SKV",
      cruisingAltitude: "39,000 ft",
      cruisingSpeed: "575 mph",
    },
    progressPercent: 0,
    baggageClaim: "Belt 41",
    timeZoneDifference: {
      hoursDifference: 6,
      text: "Destination is 6 hours ahead of departure location",
    },
  },
  {
    id: "fl-qf12",
    flightNumber: "QF12",
    airline: {
      name: "Qantas",
      code: "QF",
      callsign: "QANTAS 12",
    },
    status: "IN_FLIGHT",
    statusText: "In Flight (Trans-Pacific Cruising)",
    departure: {
      location: {
        airportCode: "LAX",
        airportName: "Los Angeles International Airport",
        city: "Los Angeles",
        country: "United States",
        terminal: "Tom Bradley International Terminal",
        gate: "Gate 150",
        coordinates: { lat: 33.9416, lng: -118.4085 },
        timeZone: {
          name: "America/Los_Angeles",
          offset: "UTC-7",
          offsetMinutes: -420,
          label: "PDT (UTC-7)",
        },
        weather: {
          tempC: 22,
          tempF: 72,
          condition: "Sunny",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-24T22:30:00-07:00",
        actualOrEstimated: "2026-09-24T22:40:00-07:00",
        formattedLocal: "10:40 PM PDT, Sep 24, 2026",
        timeOnly: "10:40 PM",
        dateOnly: "Sep 24, 2026",
        epochMs: 1790304000000,
      },
    },
    arrival: {
      location: {
        airportCode: "SYD",
        airportName: "Sydney Kingsford Smith Airport",
        city: "Sydney",
        country: "Australia",
        terminal: "Terminal 1",
        gate: "Gate 8",
        coordinates: { lat: -33.9399, lng: 151.1753 },
        timeZone: {
          name: "Australia/Sydney",
          offset: "UTC+10",
          offsetMinutes: 600,
          label: "AEST (UTC+10)",
        },
        weather: {
          tempC: 19,
          tempF: 66,
          condition: "Clear",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-26T06:30:00+10:00",
        actualOrEstimated: "2026-09-26T06:40:00+10:00",
        formattedLocal: "6:40 AM AEST, Sep 26, 2026",
        timeOnly: "06:40 AM",
        dateOnly: "Sep 26, 2026",
        epochMs: 1790378400000,
      },
    },
    duration: "15h 00m",
    aircraft: {
      model: "Airbus A380-800",
      registration: "VH-OQA",
      cruisingAltitude: "41,000 ft",
      cruisingSpeed: "570 mph",
    },
    progressPercent: 78,
    baggageClaim: "Carousel 1",
    timeZoneDifference: {
      hoursDifference: 17,
      text: "Destination is 17 hours ahead of departure location (+1 Calendar Day)",
    },
  },
  {
    id: "fl-wn1492",
    flightNumber: "WN1492",
    airline: {
      name: "Southwest Airlines",
      code: "WN",
      callsign: "SOUTHWEST 1492",
    },
    status: "ON_TIME",
    statusText: "On Time",
    departure: {
      location: {
        airportCode: "MDW",
        airportName: "Chicago Midway International Airport",
        city: "Chicago",
        country: "United States",
        terminal: "Concourse A",
        gate: "Gate A4A",
        coordinates: { lat: 41.7868, lng: -87.7522 },
        timeZone: {
          name: "America/Chicago",
          offset: "UTC-5",
          offsetMinutes: -300,
          label: "CDT (UTC-5)",
        },
        weather: {
          tempC: 19,
          tempF: 66,
          condition: "Partly Cloudy",
          icon: "cloudy",
        },
      },
      time: {
        scheduled: "2026-09-25T09:10:00-05:00",
        actualOrEstimated: "2026-09-25T09:10:00-05:00",
        formattedLocal: "9:10 AM CDT, Sep 25, 2026",
        timeOnly: "09:10 AM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790345400000,
      },
    },
    arrival: {
      location: {
        airportCode: "MCO",
        airportName: "Orlando International Airport",
        city: "Orlando",
        country: "United States",
        terminal: "Terminal A",
        gate: "Gate 102",
        coordinates: { lat: 28.4312, lng: -81.3081 },
        timeZone: {
          name: "America/New_York",
          offset: "UTC-4",
          offsetMinutes: -240,
          label: "EDT (UTC-4)",
        },
        weather: {
          tempC: 28,
          tempF: 82,
          condition: "Sunny",
          icon: "sunny",
        },
      },
      time: {
        scheduled: "2026-09-25T12:45:00-04:00",
        actualOrEstimated: "2026-09-25T12:45:00-04:00",
        formattedLocal: "12:45 PM EDT, Sep 25, 2026",
        timeOnly: "12:45 PM",
        dateOnly: "Sep 25, 2026",
        epochMs: 1790354700000,
      },
    },
    duration: "2h 35m",
    aircraft: {
      model: "Boeing 737 MAX 8",
      registration: "N8714Q",
      cruisingAltitude: "35,000 ft",
      cruisingSpeed: "515 mph",
    },
    progressPercent: 0,
    baggageClaim: "Carousel 5",
    timeZoneDifference: {
      hoursDifference: 1,
      text: "Destination is 1 hour ahead of departure location",
    },
  }
];
