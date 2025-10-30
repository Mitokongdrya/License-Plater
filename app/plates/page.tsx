// import PlateList from "@/components/plates/PlateList";
// import SearchBar from "@/components/search/SearchBar";


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


// app/plates/page.tsx
"use client";

import { useState, useMemo } from "react";
import PlateList from "@/components/plates/PlateList";
import SearchBar from "@/components/search/SearchBar";
import { states } from "@/data/states";

export default function PlatesPage() {
  const [searchTerm, setSearchTerm] = useState("");

const filteredStates = useMemo(() => {
    if (!searchTerm) return states;
    return states.filter((state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        License Plate Index
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Check off each state as you spot their license plates!
      </p>

      <SearchBar
        data={states}
        onSelect={(state) => setSearchTerm(state.name)}
        onSearchChange={setSearchTerm}
      />

      <PlateList data={filteredStates} />
    </main>
  );
}
