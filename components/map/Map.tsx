"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import statesData from "../../data/us-states.json";
import { states as stateList } from "../../data/states";
import { useMemo, useCallback } from "react";

type ChoroplethMapProps = {
  foundStates: { [code: string]: boolean };
};

// Build a lookup from state name → state code (e.g. "Alabama" → "AL")
// The GeoJSON only has names, but our progress data uses codes.
const nameToCode: { [name: string]: string } = {};
for (const s of stateList) {
  nameToCode[s.name] = s.code;
}

export default function ChoroplethMap({ foundStates }: ChoroplethMapProps) {
  // Create a stable key that changes whenever foundStates changes,
  // so Leaflet re-renders the GeoJSON layer with fresh styles.
  const mapKey = useMemo(
    () => Object.keys(foundStates).filter((k) => foundStates[k]).join(","),
    [foundStates]
  );

  const style = useCallback(
    (feature: any) => {
      const name = feature.properties.name;
      const code = nameToCode[name];
      const isFound = code ? !!foundStates[code] : false;

      return {
        fillColor: isFound ? "#4CAF50" : "#ddd",
        weight: 1,
        color: "#555",
        fillOpacity: isFound ? 0.8 : 0.4,
      };
    },
    [foundStates]
  );

  const onEachFeature = useCallback((feature: any, layer: any) => {
    const name = feature.properties.name;
    const code = nameToCode[name];
    const label = code ? `${name} (${code})` : name;
    layer.bindPopup(label);
  }, []);

  return (
    <MapContainer
      center={[37.8, -96]}
      zoom={4}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        key={mapKey}
        data={statesData as any}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
}
