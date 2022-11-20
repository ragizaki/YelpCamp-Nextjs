import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";

// DELETE /api/post/:id/review/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { reviewId, postId } = req.query;

  const session = await getSession({ req });

  if (req.method === "DELETE") {
    if (session) {
      const review = await prisma.review.delete({
        where: { id: String(reviewId) },
      });
      res.json(review);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
