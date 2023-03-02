import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = Number(req.query.id);

  if (req.method === "DELETE") {
    handleDELETE(postId, req, res);
  } else if (req.method === "GET") {
    handleGET(postId, req, res);
  } else {
    res
      .status(500)
      .send({ message: `HTTP ${req.method} method not supported` });
  }
}

async function handleDELETE(
  postId: number,
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}

async function handleGET(
  postId: number,
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          description: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.json(post);
}
