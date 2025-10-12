import Link from "next/link";
import "@/app/global.css";
import Navbar from "../components/layout/Navbar";

// export default function HomePage() {
//   return (
//     <main>
//       <h1>Home</h1>
//       <ul>
//         <li><Link href="/map">Go to Map</Link></li>
//         <li><Link href="/plates">Go to Plates</Link></li>
//         <li><Link href="/about">About</Link></li>
//       </ul>
//     </main>
//   );
// }


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />  {/* 👈 appears at top of every page */}
        <main className="flex-1 p-6">{children}</main>
        <footer className="p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} My App
        </footer>
      </body>
    </html>
  );
}

// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-center h-screen bg-slate-100">
//       <h1 className="text-5xl font-bold text-blue-600">Tailwind is working!</h1>
//     </main>
//   );
// }
