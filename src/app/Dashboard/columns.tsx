"use client";

import { ColumnDef } from "@tanstack/react-table";
import CopyToClipboard from "react-copy-to-clipboard";
import Image from "next/image";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  Wallet_address: string;
  SST_value: string;
  Device_id: string;
  Time: string;
  End_balance: number;
  Gaia_balance: number;
  Location: String;
  Latitude: number;
  Longitude: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "Wallet_address",
    header: "User Pubkey",
    cell: ({ row }) => {
      const key = row.getValue("Wallet_address") as string;
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
    accessorKey: "Device_id",
    header: "Device ID",
  },
  {
    accessorKey: "End_balance",
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
      const gaia = row.getValue("End_balance") as string;

      return (
        <div className="font-medium flex gap-x-3 items-center justify-start">
          {gaia} <span className="text-gray-300">END</span>
        </div>
      );
    },
  },
  {
    accessorKey: "Gaia_balance",
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
      const gaia = row.getValue("Gaia_balance") as string;

      return (
        <div className="font-medium flex gap-x-3 items-center justify-start">
          {gaia} <span className="text-gray-300">GAIA</span>
        </div>
      );
    },
  },

  {
    accessorKey: "Time",
    // header: "Recorded At",
    header: () => {
      return (
        <div className="flex gap-x-2 items-center">Recorded Time (GMT)</div>
      );
    },
    cell: ({ row }) => {
      const time = row.getValue("Time") as string;

      return <div className="font-medium">{time}</div>;
    },
  },
  {
    accessorKey: "Location",
    header: () => {
      return <div className="flex gap-x-2 items-center">Device Location</div>;
    },
    cell: ({ row }) => {
      const latitude = row.getValue("Location") as String;
      const longitude = row.getValue("Location") as String;
      const location = `${latitude.split(',')[0]}, ${longitude.split(',')[1]}`;

      return <div className="font-medium">{location}</div>;
    },
  },
  {
    accessorKey: "SST_value",
    header: () => {
      return (
        <div className="flex justify-end items-center text-right">
          Value Recorded
        </div>
      );
    },
    cell: ({ row }) => {
      const temp = row.getValue("SST_value") as string;
      return <div className="text-right font-medium">{temp}°C</div>;
    },
  },
];
