"use client";

import { useEffect, useCallback } from "react";
import PlateCard from "./PlateCard";
import { states as allStates } from "@/data/states";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProgress, toggleProgress } from "@/store/progressSlice";

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
  const dispatch = useAppDispatch();

  const foundStates = useAppSelector((s) => s.progress.foundStates);
  const loading = useAppSelector((s) => s.progress.loading);

  // Fetch user's progress from the database on mount / login
  useEffect(() => {
    if (!session?.access_token) return;
    dispatch(fetchProgress(session.access_token));
  }, [session?.access_token, dispatch]);

  const toggleFound = useCallback(
    (code: string) => {
      if (!session?.access_token) return;
      dispatch(
        toggleProgress({
          code,
          wasFound: !!foundStates[code],
          accessToken: session.access_token,
        })
      );
    },
    [session?.access_token, dispatch, foundStates]
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
}
