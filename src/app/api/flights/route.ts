import { NextRequest, NextResponse } from "next/server";
import { MOCK_FLIGHTS, Flight } from "@/data/flights";
import { resolveRealFlight } from "@/lib/aviation";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQuery = searchParams.get("flightNumber") || searchParams.get("query") || searchParams.get("q") || "";
  const query = rawQuery.trim().toUpperCase();

  let results: Flight[] = [];

  if (query) {
    const normalizedQuery = query.replace(/[\s-]+/g, "");

    // 1. Search existing cached/featured flights
    const matchingStatic = MOCK_FLIGHTS.filter((flight) => {
      const normalizedFlightNumber = flight.flightNumber.toUpperCase().replace(/[\s-]+/g, "");
      const airlineCode = flight.airline.code.toUpperCase();
      const airlineName = flight.airline.name.toUpperCase();
      const originCode = flight.departure.location.airportCode.toUpperCase();
      const originCity = flight.departure.location.city.toUpperCase();
      const destCode = flight.arrival.location.airportCode.toUpperCase();
      const destCity = flight.arrival.location.city.toUpperCase();

      return (
        normalizedFlightNumber.includes(normalizedQuery) ||
        flight.flightNumber.toUpperCase().includes(query) ||
        airlineCode === query ||
        airlineName.includes(query) ||
        originCode === query ||
        destCode === query ||
        originCity.includes(query) ||
        destCity.includes(query)
      );
    });

    results = [...matchingStatic];

    // 2. If it's a specific flight number pattern and no exact match exists, resolve it live
    if (results.length === 0 || !results.some(r => r.flightNumber.replace(/[\s-]+/g, "") === normalizedQuery)) {
      try {
        const liveFlight = await resolveRealFlight(query);
        if (liveFlight) {
          results.unshift(liveFlight);
        }
      } catch (e) {
        console.error("Failed to resolve live flight:", e);
      }
    }
  } else {
    results = MOCK_FLIGHTS;
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    query: rawQuery,
    flights: results,
  });
}
