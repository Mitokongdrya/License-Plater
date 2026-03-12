"use client";

import { useState, useEffect, useCallback } from "react";
import PlateCard from "./PlateCard";
import { states as allStates } from "@/data/states";
import { useAuth } from "@/context/AuthContext";

type PlateState = {
  code: string;
  name: string;
  image: string;
  plates?: { image: string }[];
};

type PlateListProps = {
  data?: PlateState[];
};

export default function PlateList({ data }: PlateListProps) {
  const displayStates = data && data.length > 0 ? data : allStates;
  const { session } = useAuth();

  const [foundStates, setFoundStates] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  // Fetch user's progress from the database on mount / login
  useEffect(() => {
    if (!session?.access_token) return;

    const fetchProgress = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/progress/get", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (!res.ok) return;

        const { progress } = await res.json();
        const found: { [key: string]: boolean } = {};
        for (const p of progress) {
          // Mark the state as found if the user has found the "Standard" plate
          if (p.plate?.state?.code) {
            found[p.plate.state.code] = true;
          }
        }
        setFoundStates(found);
      } catch (err) {
        console.error("Failed to fetch progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [session?.access_token]);

  const toggleFound = useCallback(
    async (code: string) => {
      const wasFound = !!foundStates[code];

      // Optimistic update
      setFoundStates((prev) => ({ ...prev, [code]: !wasFound }));

      if (!session?.access_token) return; // not logged in — local only

      try {
        // Look up the "Standard" plate DB id for this state
        const lookupRes = await fetch(
          `/api/plates/lookup?stateCode=${code}&plateName=Standard`
        );
        if (!lookupRes.ok) return;
        const { plateId } = await lookupRes.json();

        if (wasFound) {
          // Remove progress
          await fetch("/api/progress/delete", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ plateId }),
          });
        } else {
          // Add progress
          await fetch("/api/progress/set", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ plateId }),
          });
        }
      } catch (err) {
        // Revert on error
        console.error("Failed to update progress:", err);
        setFoundStates((prev) => ({ ...prev, [code]: wasFound }));
      }
    },
    [foundStates, session?.access_token]
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {loading && (
        <p className="col-span-full text-center text-gray-400">
          Loading your progress...
        </p>
      )}
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
}// export default function PlateList() {
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
