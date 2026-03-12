import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth";

export async function DELETE(req: Request) {
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

    // Delete the progress record if it exists
    await prisma.progress.deleteMany({
      where: { userId, plateId },
    });

    return NextResponse.json({ message: "Progress removed" }, { status: 200 });
  } catch (err) {
    console.error("DELETE PROGRESS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
