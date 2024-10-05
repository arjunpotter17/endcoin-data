import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const db = new PrismaClient();

export async function GET() {
  try {
    const entries = await db.records.findMany();

    if (!entries || entries.length === 0) {
      return NextResponse.json(
        { message: "No records found" },
        { status: 204 }
      );
    }

    return NextResponse.json(entries, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}
