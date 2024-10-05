"use client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
// import { reverseGeocode } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import dynamic from "next/dynamic";
import { fetcher, getData } from "@/lib/utils";

const HeatmapLayer = dynamic(() => import("@/components/ui/heatmapLayer"), {
  ssr: false,
});

// Main DemoPage component
export default function DemoPage() {
  //state to set data
  const [data, setData] = useState(null);

  //fetch data from API (database)
  const { data: entries, error } = useSWR("/api/get-entries", fetcher);

  //update data with location field
  useEffect(() => {
    if (entries && entries?.length > 0) {
      const updatedEntries = entries.map((item: any) => ({
        ...item,
        Location: `${item.Latitude}, ${item.Longitude}`,
      }));
      setData(updatedEntries);
    }
  }, [entries]);

  return data ? (
    <div className="w-full flex flex-col gap-y-8">
      <div className="container mx-auto py-10 w-full px-4 lg:px-10 flex flex-col gap-y-5">
        <p className="font-semibold">Current User data</p>
        <DataTable columns={columns} data={data} />
      </div>
      <div className="container mx-auto py-10 w-full flex flex-col gap-y-5 px-4 lg:px-10">
        <p className="font-semibold">Existing nodes</p>
        <HeatmapLayer data={data} />
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center gap-y-8">
      Loading data...
    </div>
  );
}
