import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const stateCode = searchParams.get("stateCode");
    const plateName = searchParams.get("plateName");

    if (!stateCode || !plateName) {
      return NextResponse.json(
        { error: "stateCode and plateName are required" },
        { status: 400 }
      );
    }

    const plate = await prisma.plate.findFirst({
      where: {
        name: plateName,
        state: { code: stateCode },
      },
    });

    if (!plate) {
      return NextResponse.json({ error: "Plate not found" }, { status: 404 });
    }

    return NextResponse.json({ plateId: plate.id }, { status: 200 });
  } catch (err) {
    console.error("PLATE LOOKUP ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
