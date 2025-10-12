import Link from "next/link";
import "@/app/global.css";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Plate Finder</h1>
      <p className="mt-2 text-gray-600">Track and explore license plates by state!</p>
    </main>
  );
}


// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen flex flex-col">
//         <Navbar />  {/* 👈 appears at top of every page */}
//         <main className="flex-1 p-6">{children}</main>
//         <footer className="p-4 text-center text-sm text-gray-500">
//           © {new Date().getFullYear()} My App
//         </footer>
//       </body>
//     </html>
//   );
// }