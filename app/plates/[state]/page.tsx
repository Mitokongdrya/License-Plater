// import PlateList from "@/components/plates/PlateList";

// export default function PlatesPage() {
//   return (
//     <main className="p-6">
//       <h1 className="text-4xl font-bold mb-6 text-center">
//         License Plate Index
//       </h1>
//       <p className="text-center text-gray-600 mb-10">
//         Check off each state as you spot their license plates!
//       </p>
//       <PlateList />
//     </main>
//   );
// }

//________________________________________________________________________________
// // app/plates/[state]/page.tsx

"use client";

import { use } from "react";
import Link from "next/link";
import { states } from "@/data/states";



import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { togglePlateProgress } from "@/store/progressSlice";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

type StatePageProps = {
  params: Promise<{ state: string }>;
};

export default function StatePage({ params }: StatePageProps) {
  const { state: stateParam } = use(params);
  const state = states.find((s) => s.code === stateParam.toUpperCase());
  const dispatch = useAppDispatch();
  const foundPlates = useAppSelector((s) => s.progress.foundPlates);
  const { session } = useAuth();

  if (!state) return <p>State not found</p>;

  // Use composite key for each plate: `${state.code}-${plate.id}`
  const getPlateKey = (plateId: number) => `${state.code}-${plateId}`;
  const foundCount = state.plates.filter((p) => foundPlates[getPlateKey(p.id)]).length;
  const allFound = foundCount === state.plates.length && state.plates.length > 0;
  const someFound = foundCount > 0 && !allFound;

  return (
    <main className="p-6">
      {/* Back button */}
      <Link href="/plates">
        <button className="mb-4 px-4 py-2 card text-gray-800 hover:bg-gray-300 rounded-md font-medium">
          ← Back to Grid
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-4">{state.name} Plates</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {state.plates.map((plate) => {
          const plateKey = getPlateKey(plate.id);
          return (
            <div
              key={plateKey}
              className="border rounded-xl p-4 flex flex-col items-center card shadow-sm hover:shadow-md transition relative"
            >
              <Image
                src={plate.image}
                alt={plate.name}
                width={110}
                height={55}
                className="mb-2 object-contain"
              />
              <input
                type="checkbox"
                checked={!!foundPlates[plateKey]}
                onChange={() => {
                  if (!session?.access_token) return;
                  const wasFound = !!foundPlates[plateKey];
                  dispatch(togglePlateProgress({ plateId: plateKey, wasFound, accessToken: session.access_token }));
                }}
                className="absolute top-2 right-2 w-5 h-5 accent-orange-400 border-white bg-white/80 rounded shadow"
                title={foundPlates[plateKey] ? "Uncheck as found" : "Check as found"}
              />
              <p className="font-medium text-gray-900 text-center mt-2">{plate.name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

//_______________________________________________________________________________

// "use client";

// import Link from "next/link";
// import { states } from "@/data/states";

// export default function StatePage({ params }: { params: { state: string } }) {
//   const state = states.find((s) => s.code === params.state.toUpperCase());

//   if (!state) return <p>State not found</p>;

//   return (
//     <main className="p-6">
//       {/* Back button */}
//       <Link href="/plates">
//         <button className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md font-medium">
//           ← Back to Grid
//         </button>
//       </Link>

//       <h1 className="text-3xl font-bold mb-4">{state.name} Plates</h1>

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//         {state.plates.map((plate) => (
//           <div
//             key={plate.id}
//             className="border rounded-xl p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition"
//           >
//             <img
//               src={plate.image}
//               alt={plate.name}
//               className="mb-2 object-contain"
//             />
//             <p className="font-medium text-gray-900 text-center">
//               {plate.name}
//             </p>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

