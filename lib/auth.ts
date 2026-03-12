import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { prisma } from "@/lib/prisma";

/**
 * Helper: extract and validate the Supabase user from an Authorization header.
 * Returns the Supabase user ID or a NextResponse error.
 */
export async function getAuthenticatedUserId(
  req: Request
): Promise<{ userId: string } | { error: NextResponse }> {
  const accessToken = req.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  if (!accessToken) {
    return {
      error: NextResponse.json(
        { error: "Missing access token" },
        { status: 401 }
      ),
    };
  }

  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(accessToken);

  if (error || !user) {
    return {
      error: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
    };
  }

  // Ensure user exists in Prisma (fallback if webhook didn't fire)
  await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: { id: user.id },
  });

  return { userId: user.id };
}
