// "use client";

import Image from "next/image";
import Link from "next/link";

type PlateState = {
  code: string;
  name: string;
  image: string;
  plates: { id: number; name: string; image: string }[];
};

type PlateCardProps = {
  state: PlateState;
  foundPlates: { [plateId: string]: boolean };
  onTogglePlate: (plateId: string) => void;
};

export default function PlateCard({ state, foundPlates, onTogglePlate }: PlateCardProps) {
  // Use composite key for each plate: `${state.code}-${plate.id}`
  const getPlateKey = (plateId: number) => `${state.code}-${plateId}`;
  const foundCount = state.plates.filter((p) => foundPlates[getPlateKey(p.id)]).length;
  const allFound = foundCount === state.plates.length && state.plates.length > 0;
  const someFound = foundCount > 0 && !allFound;

  let bgClass = "bg-white";
  if (allFound) bgClass = "bg-green-200";
  else if (someFound) bgClass = "bg-yellow-100";

  return (
    <div className={`relative border rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-colors duration-200 card w-full ${bgClass}`}>
      <Link
        href={`/plates/${state.code}`}
        className="flex items-center justify-center w-full flex-1 mb-2"
      >
        <Image
          src={state.image}
          alt={`${state.name} outline`}
          width={160}
          height={80}
          className="object-contain mx-auto block"
        />
      </Link>

      <h2 className="font-semibold text-lg text-center mt-2 w-full text-gray-800">
        {state.name}
      </h2>

      {/* Plate images with checkboxes */}
      <div className="flex flex-wrap justify-center gap-2 mt-3 w-full">
        {state.plates.map((plate) => {
          const plateKey = getPlateKey(plate.id);
          return (
            <div key={plateKey} className="flex flex-col items-center w-28">
              <div className="relative">
                <Image
                  src={plate.image}
                  alt={plate.name}
                  width={110}
                  height={55}
                  className={`object-contain rounded border ${foundPlates[plateKey] ? "ring-2 ring-orange-400" : ""}`}
                />
                <input
                  type="checkbox"
                  checked={!!foundPlates[plateKey]}
                  onChange={(e) => {
                    e.stopPropagation();
                    onTogglePlate(plateKey);
                  }}
                  className="absolute top-1 right-1 w-5 h-5 accent-orange-400 border-white bg-white/80 rounded shadow"
                  title={foundPlates[plateKey] ? "Uncheck as found" : "Check as found"}
                />
              </div>
              <span className="text-xs text-center mt-1 text-gray-700 line-clamp-2 max-w-[110px]">{plate.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}