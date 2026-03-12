import { PrismaClient } from "@prisma/client";
import { states } from "../data/states.js"; // ← IMPORTS YOUR DATA

type StateData = {
  code: string;
  name: string;
  image: string;
  plates: { id: number; name: string; image: string }[];
};

const prisma = new PrismaClient();

async function main() {
  // 1. Insert states
  await prisma.state.createMany({
    data: (states as StateData[]).map((state) => ({
      code: state.code,
      name: state.name,
      image: state.image,
    })),
  });

  // Fetch inserted states to get their numeric IDs
  const dbStates = await prisma.state.findMany({
    where: { code: { in: (states as StateData[]).map((s) => s.code) } },
    select: { id: true, code: true },
  });
  const stateIdByCode = new Map<string, number>();
  dbStates.forEach((s: { id: number; code: string }) => stateIdByCode.set(s.code, s.id));

  // 2. Insert plates
  const allPlates = (states as StateData[]).flatMap((state) =>
    state.plates.map((plate) => ({
      name: plate.name,
      image: plate.image,
      stateId: stateIdByCode.get(state.code)!,
    }))
  );

  await prisma.plate.createMany({
    data: allPlates,
  });
}

main()
  .then(() => {
    console.log("Seed completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
