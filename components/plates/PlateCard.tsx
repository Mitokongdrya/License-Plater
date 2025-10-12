// "use client";

import Image from "next/image";
import Link from "next/link";

type PlateState = {
  code: string;
  name: string;
  image: string; // state outline
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
      className={`relative border rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-colors duration-200
        ${found ? "bg-green-500" : "bg-white"}`}
    >
      {/* Card content */}
      <Link href={`/plates/${state.code}`} className="flex flex-col items-center w-full">
        <Image
          src={state.image}
          alt={`${state.name} outline`}
          width={160}
          height={80}
          className="mb-3 object-contain"
        />
        <h2
          className={`font-semibold text-lg text-center transition-colors duration-200
            ${found ? "text-white" : "text-gray-800"}`}
        >
          {state.name}
        </h2>
      </Link>

      {/* Checkbox in bottom-right */}
      <div className="absolute bottom-3 right-3 flex items-center">
        <input
          type="checkbox"
          checked={found}
          onChange={(e) => {
            e.stopPropagation(); // prevent navigating
            onToggle();
          }}
          className="w-5 h-5 accent-white border-white"
        />
      </div>
    </div>
  );
}


// "use client";

// import Image from "next/image";
// import Link from "next/link";

// type PlateState = {
//   code: string;
//   name: string;
//   image: string; // state outline
//   plates?: { image: string }[];
// };

// type PlateCardProps = {
//   state: PlateState;
//   found: boolean;
//   onToggle: () => void;
// };

// export default function PlateCard({ state, found, onToggle }: PlateCardProps) {
//   return (
//     <div
//       className={`relative border rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition bg-white`}
//     >
//       {/* Card content: only state outline for preview */}
//       <Link
//         href={`/plates/${state.code}`}
//         className="flex flex-col items-center"
//       >
//         <Image
//           src={state.image} // ✅ always show the outline in the grid
//           alt={`${state.name} outline`}
//           width={160}
//           height={80}
//           className="mb-3 rounded-md object-contain"
//         />
//         <h2 className="font-semibold text-lg text-center">{state.name}</h2>
//       </Link>

//       {/* Found toggle button */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation(); // prevent link click
//           e.preventDefault(); // stop navigation
//           onToggle();
//         }}
//         className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium transition ${
//           found
//             ? "bg-green-500 text-white hover:bg-green-600"
//             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//         }`}
//       >
//         {found ? "Found ✅" : "Mark Found"}
//       </button>
//     </div>
//   );
// }
