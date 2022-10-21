import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({ message: "Only POST method allowed" });
  }
  const campData = JSON.parse(req.body);

  const camp = await prisma.camp.create({
    data: campData,
  });

  res.json(camp);
}
