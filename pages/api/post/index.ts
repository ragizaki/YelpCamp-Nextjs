import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    handlePOST(req, res);
  } else if (req.method === "GET") {
    handleGET(req, res);
  } else {
    res
      .status(500)
      .send({ message: `HTTP ${req.method} method is not supported` });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  const { name, desc, price, city, country, photo } = req.body;

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
        image: photo,
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json(posts);
}
