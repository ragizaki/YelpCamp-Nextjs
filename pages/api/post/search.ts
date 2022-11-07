import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.q && typeof req.query.q === "string") {
    const posts = await prisma.post.findMany({
      where: {
        name: {
          contains: req.query.q,
        },
      },
      include: {
        author: true,
      },
    });
    res.status(200).json(posts);
  } else {
    res.json([]);
  }
}
