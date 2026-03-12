"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p>Loading map…</p>,
});

type ChoroplethMapWrapperProps = {
  foundStates: { [code: string]: boolean };
};

export default function ChoroplethMapWrapper({ foundStates }: ChoroplethMapWrapperProps) {
  return <DynamicMap foundStates={foundStates} />;
}