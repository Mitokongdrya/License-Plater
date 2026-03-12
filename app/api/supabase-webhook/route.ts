import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Supabase Auth event payload
  const { event, user } = body;

  if (event !== "user_created") {
    return NextResponse.json({ message: "Ignoring event" });
  }

  const supabaseUserId = user.id;

  await prisma.user.upsert({
    where: { id: supabaseUserId },
    update: {},
    create: { id: supabaseUserId },
  });

  return NextResponse.json({ message: "User created in Prisma" });
}
