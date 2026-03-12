import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const result = await getAuthenticatedUserId(req);
    if ("error" in result) return result.error;

    const { userId } = result;

    // Return the user's progress
    const progress = await prisma.progress.findMany({
      where: { userId },
      include: {
        plate: {
          include: { state: true },
        },
      },
    });

    return NextResponse.json({ progress }, { status: 200 });
  } catch (err) {
    console.error("GET PROGRESS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
