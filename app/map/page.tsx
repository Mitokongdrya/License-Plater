import ChoroplethMapWrapper from "@/components/map/ChoroplethMapWrapper";

export default function MapPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Choropleth Map</h1>
      <ChoroplethMapWrapper />
    </main>
  );
}
