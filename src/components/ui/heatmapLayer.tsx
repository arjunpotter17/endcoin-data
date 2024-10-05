"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";

// HeatmapLayer Component
type HeatmapLayerProps = {
  data: [number, number, number][]; // Array of [latitude, longitude, intensity]
};

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || !map) return;

    const heatLayer = L.heatLayer(data, {
      radius: 40,
      blur: -5,
      maxZoom: 17,
      gradient: {
        0.4: "red",
        0.65: "red",
        0.9: "red",
        1: "red",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

// Main MapComponent
const MapComponent = ({data}:{data:any}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [heatmapData, setHeatmapData] = useState<[number, number, number][]>([]);

  useEffect(() => {
    if(data){
      const heatmapPoints = data.map(
        (item: any) => [item.Latitude, item.Longitude, 1] as [number, number, number]
      );
      setHeatmapData(heatmapPoints);
    }
  }, [data]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution="&copy; <a href='https://carto.com/attributions'>CARTO</a>"
          />
          <HeatmapLayer data={heatmapData} />
        </MapContainer>
      )}
    </>
  );
};

export default MapComponent;
