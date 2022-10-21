import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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
    res.status(405).json({ message: "Only POST method is allowed." });
  }
}
