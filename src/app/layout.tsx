import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flight Radar & Lookup | Real-Time Flight Status",
  description: "Look up flight details, departure & arrival times, time zones, airports, and live flight status.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
