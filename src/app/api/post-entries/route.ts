import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function POST(req: Request) {
  try {
    // const body = await req.json();
    // console.log('entered here', body);
    // Destructure the fields with default values
    // const {
    //   Wallet_address = "default_wallet_address",
    //   Device_id = "default_device_id",
    //   SST_value = 0.0,
    //   Latitude = 0.0,
    //   Longitude = 0.0,
    //   End_balance = 0.0,
    //   Gaia_balance = 0.0,
    //   Time = new Date().toISOString(), // Default to current date/time in ISO format
    // } = body;


    // Create a new record in the database
    const newRecord = await db.records.create({
      data: {
        Wallet_address:"default_wallet_address",
        Device_id:"default_device_id",
        SST_value: 0.0,
        Latitude: 0.0,
        Longitude: 0.0,
        End_balance: 0.0,
        Gaia_balance: 0.0,
        Claimed: false, // Claimed will default to false
        Time: new Date().toISOString(), // Ensure the Time is parsed correctly to Date
      },
    });

    // Return a success response
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create record", details: error.message },
      { status: 500 }
    );
  }
}
