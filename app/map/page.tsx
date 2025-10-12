"use client";

import ChoroplethMap from "../../components/map/ChoroplethMap";
import Link from "next/link";

export default function MapPage() {
  return (
    <main>
      <h1>Choropleth Map</h1>
      <ChoroplethMap />
      <Link href="/">← Back Home</Link>
    </main>
  );
}
