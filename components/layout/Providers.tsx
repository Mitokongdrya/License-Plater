"use client";

import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <main className="p-6">{children}</main>
    </AuthProvider>
  );
}
