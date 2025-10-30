// "use client";

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
      className={`relative border rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-colors duration-200
      card ${found ? "card-found" : ""}`}
    >
      {/* Card content */}
      <Link
        href={`/plates/${state.code}`}
        className="flex items-center justify-center w-full flex-1"
      >
        <Image
          src={state.image}
          alt={`${state.name} outline`}
          width={160}
          height={80}
          className="object-contain mx-auto block"
        />
      </Link>

      <h2
        className={`font-semibold text-lg text-center transition-colors duration-200 mt-auto w-full
          ${found ? "text-white" : "text-gray-800"}`}
      >
        {state.name}
      </h2>

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