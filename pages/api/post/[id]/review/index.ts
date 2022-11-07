import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { getSession } from "next-auth/react";

// POST /api/[id]/review
// required fields: rating, description
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const { rating, description } = req.body;
    const { id } = req.query;
    const result = await prisma.review.create({
      data: {
        rating,
        description,
        post: {
          connect: {
            id: Number(id),
          },
        },
        user: {
          connect: {
            email: session?.user?.email,
          },
        },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
