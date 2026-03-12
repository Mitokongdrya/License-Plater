import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const result = await getAuthenticatedUserId(req);
    if ("error" in result) return result.error;

    const { userId } = result;
    const { plateId } = await req.json();

    if (!plateId || typeof plateId !== "number") {
      return NextResponse.json(
        { error: "plateId (number) is required" },
        { status: 400 }
      );
    }

    // Verify the plate exists
    const plate = await prisma.plate.findUnique({ where: { id: plateId } });
    if (!plate) {
      return NextResponse.json({ error: "Plate not found" }, { status: 404 });
    }

    // Create progress (upsert to avoid duplicates)
    const progress = await prisma.progress.upsert({
      where: {
        userId_plateId: { userId, plateId },
      },
      update: {},
      create: { userId, plateId },
      include: { plate: true },
    });

    return NextResponse.json({ progress }, { status: 201 });
  } catch (err) {
    console.error("SET PROGRESS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
