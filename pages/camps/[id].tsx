import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { Button, Text, Box, Stack, Avatar, Flex } from "@chakra-ui/react";
import ReviewForm from "../../components/ReviewForm";
import StarRating from "react-star-rating-component";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
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
  return {
    props: { post },
  };
};

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post.author?.email;

  const handleReviewDelete = async (postId: number, reviewId: string) => {
    const res = await fetch(
      `http://localhost:3000/api/post/${postId}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );
    await Router.reload();
  };

  return (
    <Layout>
      <div>
        <h2>{post.name}</h2>
        <p>
          Located in {post.city}, {post.country}
        </p>
        <p>Price per night: ${post.price}</p>
        <p>By {post?.author?.name || "Unknown author"}</p>
        <Text>{post.description}</Text>
        {userHasValidSession && postBelongsToUser && (
          <Button onClick={() => deletePost(post.id)} colorScheme="red">
            Delete
          </Button>
        )}
      </div>
      {session && <ReviewForm />}
      <Stack spacing={3} mt={3}>
        <Text fontSize="2xl" fontWeight={500}>
          Reviews
        </Text>
        {post.reviews.map(({ id, rating, description, user }) => (
          <Box border="1px solid grey" borderRadius="lg" p={3} key={id}>
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
              <Box>
                <Avatar mr={2} size="sm" alt={`rating of ${rating}`} />
                {user?.name}
              </Box>
              {user?.name === session?.user?.name && (
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleReviewDelete(post.id, id)}
                >
                  Delete
                </Button>
              )}
            </Flex>
            <StarRating name="rating" value={rating} editing={false} />
            <Text>"{description}"</Text>
          </Box>
        ))}
      </Stack>
    </Layout>
  );
};

export default Post;
