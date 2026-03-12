"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store/store";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <Navbar />
        <main className="p-6">{children}</main>
      </AuthProvider>
    </ReduxProvider>
  );
}
