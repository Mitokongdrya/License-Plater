"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearProgress } from "@/store/progressSlice";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/plates", label: "Plate Index" },
  { href: "/finder", label: "Finder" },
  { href: "/map", label: "Map" },
];

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    dispatch(clearProgress());
    setMenuOpen(false);
    router.push("/");
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="navbar text-white shadow-md">
      {/* Top bar — always visible */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:text-orange-300 transition-colors duration-200"
        >
          License Plater
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${
                  isActive(href)
                    ? "bg-white/15 text-orange-300"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
            >
              {label}
            </Link>
          ))}

          {/* Auth (desktop) */}
          {!loading && (
            <div className="ml-4 flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-white/50 hidden lg:inline">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-200 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="px-4 py-1.5 text-sm font-medium rounded-md bg-orange-500 hover:bg-orange-400 active:bg-orange-600 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white rounded transition-all duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-4 py-3 gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200
                ${
                  isActive(href)
                    ? "bg-white/15 text-orange-300"
                    : "text-white/80 hover:bg-white/10 hover:text-white active:bg-white/20"
                }`}
            >
              {label}
            </Link>
          ))}

          {/* Auth (mobile) */}
          {!loading && (
            <div className="mt-2 pt-2 border-t border-white/10">
              {user ? (
                <div className="flex flex-col gap-2 px-4 py-2">
                  <span className="text-sm text-white/50">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20 active:bg-white/30 transition-all duration-200 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="block mx-4 my-2 px-4 py-2 text-sm font-medium text-center rounded-md bg-orange-500 hover:bg-orange-400 active:bg-orange-600 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
