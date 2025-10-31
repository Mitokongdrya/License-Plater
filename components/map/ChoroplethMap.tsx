"use client"; 

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback } from "react";
import statesData from "../../data/us-states.json";

// Color scale function
function getColor(d: number) {
  return d > 1000 ? "#800026" :
         d > 500  ? "#BD0026" :
         d > 200  ? "#E31A1C" :
         d > 100  ? "#FC4E2A" :
         d > 50   ? "#FD8D3C" :
         d > 20   ? "#FEB24C" :
         d > 10   ? "#FED976" :
                    "#FFEDA0";
}

// Style function for GeoJSON
function style(feature: any) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7
  };
}

export default function ChoroplethMap() {
  const onEachFeature = useCallback((feature: any, layer: any) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(
        `<strong>${feature.properties.name}</strong><br/>Density: ${feature.properties.density}`
      );
    }
  }, []);

  return (
    <MapContainer
        center={[37.8, -96] as [number, number]} // USA center
      zoom={4}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={statesData as any} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
  );
}
