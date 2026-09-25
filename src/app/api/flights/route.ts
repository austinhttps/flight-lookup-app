import { NextRequest, NextResponse } from "next/server";
import { MOCK_FLIGHTS, Flight } from "@/data/flights";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawQuery = searchParams.get("flightNumber") || searchParams.get("query") || searchParams.get("q") || "";
  const query = rawQuery.trim().toUpperCase();

  // Small delay to simulate real API lookup
  await new Promise((resolve) => setTimeout(resolve, 250));

  let results: Flight[] = MOCK_FLIGHTS;

  if (query) {
    // Strip spaces/dashes (e.g. "AA 100" -> "AA100")
    const normalizedQuery = query.replace(/[\s-]+/g, "");

    results = MOCK_FLIGHTS.filter((flight) => {
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
        airlineCode.includes(query) ||
        airlineName.includes(query) ||
        originCode.includes(query) ||
        destCode.includes(query) ||
        originCity.includes(query) ||
        destCity.includes(query)
      );
    });
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    query: rawQuery,
    flights: results,
  });
}
