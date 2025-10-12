// // components/plates/PlateCard.tsx
// import Image from "next/image";

// export default function PlateCard({ state, found, onToggle }) {
//   return (
//     <div
//       className={`border rounded-xl p-4 flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md transition ${
//         found ? "bg-green-100" : "bg-white"
//       }`}
//       onClick={onToggle}
//     >
//       <Image
//         src={state.image}
//         alt={`${state.name} plate`}
//         width={160}
//         height={80}
//         className="mb-3 rounded-md object-contain"
//       />
//       <h2 className="font-semibold text-lg">{state.name}</h2>
//       <p className="text-sm text-gray-500">{found ? "Found ✅" : "Not found"}</p>
//     </div>
//   );
// }


// components/plates/PlateCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type PlateState = {
    code: string;
    name: string;
    image: string;
    plates?: { image: string }[];
};

type PlateCardProps = {
    state: PlateState;
    found: boolean;
    onToggle: () => void;
};

export default function PlateCard({ state, found, onToggle }: PlateCardProps) {
  return (
    <Link href={`/plates/${state.code}`}>
      <div
        className={`border rounded-xl p-4 flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md transition ${
          found ? "bg-green-100" : "bg-white"
        }`}
        onClick={(e) => {
          // prevent link navigation if you’re toggling “found”
          e.stopPropagation();
          onToggle();
        }}
      >
        <Image
          src={state.plates?.[0]?.image || state.image}
          alt={`${state.name} plate`}
          width={160}
          height={80}
          className="mb-3 rounded-md object-contain"
        />
        <h2 className="font-semibold text-lg">{state.name}</h2>
        <p className="text-sm text-gray-500">{found ? "Found ✅" : "Not found"}</p>
      </div>
    </Link>
  );
}
