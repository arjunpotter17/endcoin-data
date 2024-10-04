"use client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
// import { reverseGeocode } from "@/lib/utils";
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { getData } from "@/lib/utils";

const HeatmapLayer = dynamic(() => import("@/components/ui/heatmapLayer"), {
  ssr: false,
});

// Main DemoPage component
export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const updatedData = await getData();
      setData(updatedData);
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
        <HeatmapLayer/>
      </div>
    </div>
  );
}
