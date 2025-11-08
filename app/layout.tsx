import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import Navbar from "../components/layout/Navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "License Plater",
  description: "Spot all 50 US license plates",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};