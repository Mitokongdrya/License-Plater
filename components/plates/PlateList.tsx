"use client"; // because we’ll have interactivity (state toggles)

import { useState } from "react";
import PlateCard from "./PlateCard";
import { states } from "@/data/states";

export default function PlateList() {
  const [foundStates, setFoundStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleFound = (code: string) => {
    setFoundStates((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {states.map((state) => (
        <PlateCard
          key={state.code}
          state={state}
          found={!!foundStates[state.code]}
          onToggle={() => toggleFound(state.code)}
        />
      ))}
    </div>
  );
}
