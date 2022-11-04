import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// POST /api/post
// Required fields in body: name, desc, price, city, country
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, desc, price, city, country } = req.body;

  const session = await getSession({ req });
  if (session) {
    const result = await prisma.post.create({
      data: {
        name,
        description: desc,
        city,
        country,
        price: parseInt(price),
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
