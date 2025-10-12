// components/layout/Navbar.tsx
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 shadow">
      <Link href="/">Home</Link>
      <Link href="/map">Map</Link>
      <Link href="/plates">Plates</Link>
    </nav>
  );
}
