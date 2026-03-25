"use client";

import { useEffect, useCallback } from "react";
import PlateCard from "./PlateCard"; // Importing PlateCard
import { states as allStates } from "@/data/states";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { fetchProgress, togglePlateProgress } from "@/store/progressSlice";

type PlateState = {
  code: string;
  name: string;
  image: string;
  plates: { id: number; name: string; image: string }[];
};

type PlateListProps = {
  data?: PlateState[];
};

export default function PlateList({ data }: PlateListProps) {
  const displayStates = data && data.length > 0 ? data : allStates;
  const dispatch = useAppDispatch();
  const foundPlates = useAppSelector((s) => s.progress.foundPlates);
  const loading = useAppSelector((s) => s.progress.loading);
  const { session } = useAuth();

  // Handler to toggle a plate by id
  // Use composite key for each plate: `${state.code}-${plate.id}`
  const handleTogglePlate = (plateId: string) => {
    if (!session?.access_token) return;
    const wasFound = !!foundPlates[plateId];
    dispatch(togglePlateProgress({ plateId, wasFound, accessToken: session.access_token }));
  };

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
          foundPlates={foundPlates}
          onTogglePlate={handleTogglePlate}
        />
      ))}
    </div>
  );
}


