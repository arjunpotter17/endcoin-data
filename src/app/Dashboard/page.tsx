"use client";
import { data } from "@/constants/constants";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { reverseGeocode } from "@/lib/utils";
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet.heat';

// Function to fetch and update data with reverse geocoded locations
async function getData(): Promise<Payment[]> {
  const dataRaw = data;

  // Use Promise.all to ensure all async tasks are completed
  const updatedData = await Promise.all(
    dataRaw.map(async (item) => {
      const [latitude, longitude] = item.location.split(",");
      // const location = await reverseGeocode(Number(latitude), Number(longitude));
      return {
        ...item,
        latitude: Number(latitude),  // Add latitude and longitude to item
        longitude: Number(longitude),
        location: null
        // `${location.city}, ${location.country}`,
      };
    })
  );
  return updatedData;
}

// Type definition for the heatmap data
type HeatmapLayerProps = {
  data: [number, number, number][];  // Array of [latitude, longitude, intensity]
};

// Component to add heatmap layer to the map
const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || !map || typeof window === 'undefined') return;

    // Add heatmap layer to the map
    const heatLayer = (window as any).L.heatLayer(data, 
      {
        radius: 40,      
        blur: -5,        
        maxZoom: 17,     
        gradient: {
          0.4: 'red',  
          0.65: 'red',        
          0.9: 'red',     
          1: 'red'         
        },    
      }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);  // Clean up on unmount
    };
  }, [data, map]);

  return null;
};

// Main DemoPage component
export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState<[number, number, number][]>([]);

  useEffect(() => {
    async function fetchData() {
      const updatedData = await getData();
      console.log(updatedData);
      setData(updatedData);

      // Convert updatedData to heatmap format: [latitude, longitude, intensity]
      const heatmapPoints = updatedData.map(item => [
        item.latitude,
        item.longitude,
        1 // Default intensity for each point
      ] as [number, number, number]);
      
      setHeatmapData(heatmapPoints);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-8">
      <div className="container mx-auto py-10 w-full px-4 lg:px-10 flex flex-col gap-y-5">
        <p className="font-semibold">Current User data</p>
        <DataTable columns={columns} data={data} />
      </div>
      <div className="container mx-auto py-10 w-full flex flex-col gap-y-5 px-4 lg:px-10">
        <p className="font-semibold">Existing nodes</p>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" // Gray map without labels
            attribution="&copy; <a href='https://carto.com/attributions'>CARTO</a>"
          />
          <HeatmapLayer data={heatmapData} />
        </MapContainer>
      </div>
    </div>
  );
}
