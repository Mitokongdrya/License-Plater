// // components/layout/Navbar.tsx
// "use client";
// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="flex gap-4 p-4 bg-gray-100 shadow">
//       <Link href="/">Home</Link>
//       <Link href="/map">Map</Link>
//       <Link href="/plates">Plates</Link>
//     </nav>
//   );
// }


"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-md">
      <h1 className="text-xl font-bold tracking-wide">Plate Finder</h1>

      <div className="flex gap-6">
        <Link
          href="/"
          className="hover:text-blue-200 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/plates"
          className="hover:text-blue-200 transition-colors duration-200"
        >
          Plate Index
        </Link>
        <Link
          href="/map"
          className="hover:text-blue-200 transition-colors duration-200"
        >
          Map
        </Link>
      </div>
    </nav>
  );
}
