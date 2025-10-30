"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-purple-900 text-white shadow-md">
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
