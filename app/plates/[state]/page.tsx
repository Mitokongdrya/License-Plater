"use client";

import Link from "next/link";
import { states } from "@/data/states";

export default function StatePage({ params }: { params: { state: string } }) {
  const state = states.find((s) => s.code === params.state.toUpperCase());

  if (!state) return <p>State not found</p>;

  return (
    <main className="p-6">
      {/* Back button */}
      <Link href="/plates">
        <button className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md font-medium">
          ← Back to Grid
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-4">{state.name} Plates</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {state.plates.map((plate) => (
          <div
            key={plate.id}
            className="border rounded-xl p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              src={plate.image}
              alt={plate.name}
              className="mb-2 object-contain"
            />
            <p className="font-medium text-gray-900 text-center">
              {plate.name}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}



// // app/plates/[state]/page.tsx
// import { states } from "@/data/states";
// import Image from "next/image";

// interface StatePageProps {
//   params: Promise<{ state: string }>;
// }

// export default async function StatePage({ params }: StatePageProps) {
//   const resolvedParams = await params;
//   const state = states.find(
//     (s) => s.code === resolvedParams.state.toUpperCase()
//   );

//   if (!state) {
//     return <p>State not found</p>;
//   }

//   return (
//     <main className="p-6">
//       <h1 className="text-3xl font-bold mb-4">{state.name} Plates</h1>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//         {state.plates.map((plate) => (
//           <div
//             key={plate.id}
//             className="border rounded-xl p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition"
//           >
//             <Image
//               src={plate.image}
//               alt={`${state.name} ${plate.name}`}
//               width={200}
//               height={100}
//               className="mb-2 object-contain"
//             />
//             <p className="font-medium">{plate.name}</p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
