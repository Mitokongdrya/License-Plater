"use client";

import { useEffect } from "react";
import ChoroplethMapWrapper from "@/components/map/MapWrapper";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProgress } from "@/store/progressSlice";

export default function MapPage() {
  const { session } = useAuth();
  const dispatch = useAppDispatch();

  const foundStates = useAppSelector((s) => s.progress.foundStates);
  const loading = useAppSelector((s) => s.progress.loading);

  useEffect(() => {
    if (!session?.access_token) return;
    dispatch(fetchProgress(session.access_token));
  }, [session?.access_token, dispatch]);

  const foundCount = Object.values(foundStates).filter(Boolean).length;

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Progress Map</h1>
      <p className="text-gray-600">
        {session
          ? `${foundCount} / 50 states found`
          : "Sign in to see your progress on the map."}
      </p>
      {loading && <p className="text-gray-400">Loading your progress...</p>}
      <ChoroplethMapWrapper foundStates={foundStates} />
    </main>
  );
}
