import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const camps = await prisma.camp.findMany();
      return res.json(camps);
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  } else if (req.method === "POST") {
    try {
      const price = parseInt(req.body.price);
      const camp = await prisma.camp.create({
        data: {
          ...req.body,
          price,
        },
      });
      return res.json(camp);
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  } else {
    res.status(405).json({ message: "Incorrect method, only POST and GET" });
  }
}
