"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clearProgress } from "@/store/progressSlice";

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await signOut();
    dispatch(clearProgress());
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 navbar text-white shadow-md">
      <Link href="/" className="text-xl font-bold tracking-wide hover:text-blue-200 transition-colors duration-200">
        License Plater
      </Link>

      <div className="flex items-center gap-6">
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
          href="/finder"
          className="hover:text-blue-200 transition-colors duration-200"
        >
          Finder
        </Link>
        <Link
          href="/map"
          className="hover:text-blue-200 transition-colors duration-200"
        >
          Map
        </Link>

        {/* Auth button */}
        {!loading && (
          <>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 hidden sm:inline">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-3 py-1 text-sm rounded-md bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
