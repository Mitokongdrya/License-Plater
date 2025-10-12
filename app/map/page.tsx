"use client";

// import ChoroplethMap from "../../components/map/ChoroplethMap";
import Link from "next/link";

export default function MapPage() {
  return (
    <main>
      <h1>Choropleth Map</h1>
      {/* <ChoroplethMap /> */}
      <Link href="/">← Back Home</Link>
    </main>
  );
}


// app/map/page.tsx
// import dynamic from "next/dynamic";
// import Link from "next/link";

// // Dynamically import the map component (client-side only)
// const ChoroplethMap = dynamic(
//   () => import("../../components/map/ChoroplethMap"),
//   {
//     ssr: false, // ✅ disables server-side rendering
//     loading: () => <p>Loading map...</p>, // optional fallback
//   }
// );

// export default function MapPage() {
//   return (
//     <main className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Choropleth Map</h1>
//       <ChoroplethMap />
//       <Link href="/">← Back Home</Link>
//     </main>
//   );
// }
