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
    <div
      className={`relative border rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition bg-white`}
    >
      {/* Card content (links to details page) */}
      <Link
        href={`/plates/${state.code}`}
        className="flex flex-col items-center"
      >
        <Image
          src={state.plates?.[0]?.image || state.image}
          alt={`${state.name} plate`}
          width={160}
          height={80}
          className="mb-3 rounded-md object-contain"
        />
        <h2 className="font-semibold text-lg text-center">{state.name}</h2>
      </Link>

      {/* Found toggle button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent link click
          e.preventDefault(); // stop navigation
          onToggle();
        }}
        className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium transition ${
          found
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {found ? "Found ✅" : "Mark Found"}
      </button>
    </div>
  );
}



// // components/plates/PlateCard.tsx
// "use client";

// import Image from "next/image";
// import Link from "next/link";

// type PlateState = {
//     code: string;
//     name: string;
//     image: string;
//     plates?: { image: string }[];
// };

// type PlateCardProps = {
//     state: PlateState;
//     found: boolean;
//     onToggle: () => void;
// };

// export default function PlateCard({ state, found, onToggle }: PlateCardProps) {
//   return (
//     <Link href={`/plates/${state.code}`}>
//       <div
//         className={`border rounded-xl p-4 flex flex-col items-center cursor-pointer shadow-sm hover:shadow-md transition ${
//           found ? "bg-green-100" : "bg-white"
//         }`}
//         onClick={(e) => {
//           // prevent link navigation if you’re toggling “found”
//           e.stopPropagation();
//           onToggle();
//         }}
//       >
//         <Image
//           src={state.plates?.[0]?.image || state.image}
//           alt={`${state.name} plate`}
//           width={160}
//           height={80}
//           className="mb-3 rounded-md object-contain"
//         />
//         <h2 className="font-semibold text-lg">{state.name}</h2>
//         <p className="text-sm text-gray-500">{found ? "Found ✅" : "Not found"}</p>
//       </div>
//     </Link>
//   );
// }
