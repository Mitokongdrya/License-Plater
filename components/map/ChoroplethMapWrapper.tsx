"use client";

import dynamic from "next/dynamic";

export default function ChoroplethMapWrapper(props: any) {
  const DynamicMap = dynamic(() => import("./ChoroplethMap"), {
    ssr: false,
    loading: () => <p>Loading map…</p>
  });

  return <DynamicMap {...props} />;
};