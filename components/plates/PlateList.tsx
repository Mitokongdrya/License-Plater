"use client";

import { useState } from "react";
import PlateCard from "./PlateCard";
import { states as allStates } from "@/data/states";

type PlateState = {
  code: string;
  name: string;
  image: string;
  plates?: { image: string }[];
};

type PlateListProps = {
  data?: PlateState[]; // optional — if not passed, show all states
};

export default function PlateList({ data }: PlateListProps) {
  const displayStates = data && data.length > 0 ? data : allStates;

  const [foundStates, setFoundStates] = useState<{ [key: string]: boolean }>({});

  const toggleFound = (code: string) => {
    setFoundStates((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {displayStates.map((state) => (
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


// "use client";

// import { useState } from "react";
// import PlateCard from "./PlateCard";
// import { states } from "@/data/states";

// export default function PlateList() {
//   const [foundStates, setFoundStates] = useState<{ [key: string]: boolean }>(
//     {}
//   );

//   const toggleFound = (code: string) => {
//     setFoundStates((prev) => ({
//       ...prev,
//       [code]: !prev[code],
//     }));
//   };

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//       {states.map((state) => (
//         <PlateCard
//           key={state.code}
//           state={state}
//           found={!!foundStates[state.code]}
//           onToggle={() => toggleFound(state.code)}
//         />
//       ))}
//     </div>
//   );
// }
