"use client";

import { useState } from "react";
import Link from "next/link";
import ChoroplethMapWrapper from "@/components/map/ChoroplethMapWrapper";
import { states as stateList } from "@/data/states";

export default function MapPage() {
  const [foundState, setFoundStates] = useState<{ [key: string]: boolean }>({});

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Choropleth Map</h1>
      <ChoroplethMapWrapper 
        foundState={foundState}
        onToggleFound={setFoundStates}
      />
    </main>
  );
}
