"use client";

import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./ChoroplethMap"), {
  ssr: false,
  loading: () => <p>Loading map…</p>
});

export default function ChoroplethMapWrapper() {
  return <DynamicMap />;
}
