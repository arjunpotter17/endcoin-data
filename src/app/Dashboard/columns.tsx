"use client";

import { ColumnDef } from "@tanstack/react-table";
import CopyToClipboard from "react-copy-to-clipboard";
import Image from "next/image";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  key: string;
  sst: string;
  deviceId: string;
  timeStamp: string;
  endBalance: number;
  gaiaBalance: number;
  latitude: number;
  longitude: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "key",
    header: "User Pubkey",
    cell: ({ row }) => {
      const key = row.getValue("key") as string;
      return (
        <CopyToClipboard
          text={key}
          onCopy={() => toast.success("Copied to Clipboard")}
        >
          <p className="hover:underline cursor-pointer">{key}</p>
        </CopyToClipboard>
      );
    },
  },
  {
    accessorKey: "deviceId",
    header: "Device ID",
  },
  {
    accessorKey: "endBalance",
    header: () => {
      return (
        <div className="font-medium flex gap-x-2 items-center justify-start">
          Endcoin Balance
          <span className="w-5 h-5 rounded-[50%] overflow-hidden">
            <Image
              src={
                "https://arweave.net/K-3ZVae8bb_iMFLTZKuO_7CMNLtOc-bmMafhhn_PeF0"
              }
              alt="Endcoin"
              width={20}
              height={20}
            />
          </span>
        </div>
      );
    },
    cell: ({ row }) => {
      const gaia = row.getValue("endBalance") as string;

      return (
        <div className="font-medium flex gap-x-3 items-center justify-start">
          {gaia} <span className="text-gray-300">END</span>
        </div>
      );
    },
  },
  {
    accessorKey: "gaiaBalance",
    header: () => {
      return (
        <div className="font-medium flex gap-x-2 items-center justify-start">
          Gaiacoin Balance
          <span className="w-5 h-5 rounded-[50%] overflow-hidden">
            <Image
              src={
                "https://arweave.net/aFr3D_1_O4F2cDpE9r_OGP5o6D2OyZgDzlLmBEdUYos"
              }
              alt="Gaiacoin"
              width={20}
              height={20}
            />
          </span>
        </div>
      );
    },
    cell: ({ row }) => {
      const gaia = row.getValue("gaiaBalance") as string;

      return (
        <div className="font-medium flex gap-x-3 items-center justify-start">
          {gaia} <span className="text-gray-300">GAIA</span>
        </div>
      );
    },
  },

  {
    accessorKey: "timeStamp",
    // header: "Recorded At",
    header: () => {
      return (
        <div className="flex gap-x-2 items-center">Recorded Time (GMT)</div>
      );
    },
    cell: ({ row }) => {
      const time = row.getValue("timeStamp") as string;

      return <div className="font-medium">{time}</div>;
    },
  },
  {
    accessorKey: "location",
    header: () => {
      return <div className="flex gap-x-2 items-center">Device Location</div>;
    },
  },
  {
    accessorKey: "sst",
    header: () => {
      return (
        <div className="flex justify-end items-center text-right">
          Value Recorded
        </div>
      );
    },
    cell: ({ row }) => {
      const temp = row.getValue("sst") as string;
      return <div className="text-right font-medium">{temp}°C</div>;
    },
  },
];
