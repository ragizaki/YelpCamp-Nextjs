import { GetServerSideProps } from "next";
import Router from "next/router";
import Image from "next/image";
import { PostProps } from "@components/Post";
import { useSession } from "next-auth/react";
import { Button, Text, Box, Stack, Avatar, Flex, Grid } from "@chakra-ui/react";
import ReviewForm from "@components/ReviewForm";
import StarRating from "react-star-rating-component";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = Number(params?.id);
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${postId}`);
  const post = await res.json();

  return {
    props: { post },
  };
};

async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${id}`, {
    method: "DELETE",
  });
  await res.json();
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
    await fetch(
      `${process.env.NEXTAUTH_URL}/api/post/${postId}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );
    await Router.reload();
  };

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gap={8}
    >
      <Box>
        <Text fontSize="3xl">{post.name}</Text>
        <Stack direction="row" spacing={2}>
          <Text>
            Located in {post.city}, {post.country}
          </Text>
          <Text>|</Text>
          <Text>
            <strong>${post.price} CAD </strong>night
          </Text>
        </Stack>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            borderRadius: "1rem",
            marginTop: "0.5rem",
          }}
        >
          <Image src={post.image} layout="fill" objectFit="cover" />
        </div>
        <Text mt={1}>By {post?.author?.name || "Unknown author"}</Text>
        <Text fontSize="xl">{post.description}</Text>
        {userHasValidSession && postBelongsToUser && (
          <Button onClick={() => deletePost(post.id)} colorScheme="red" mt={1}>
            Delete
          </Button>
        )}
        {!postBelongsToUser && <ReviewForm />}
      </Box>
      <Stack spacing={3} mt={3}>
        <Text fontSize="2xl" fontWeight={500}>
          Reviews
        </Text>
        {!post.reviews.length && (
          <Text>There are no reviews for this campsite yet. Be the first!</Text>
        )}
        {post.reviews.map(({ id, rating, description, user }) => (
          <Box border="1px solid grey" borderRadius="lg" p={3} key={id}>
            <Flex alignItems="center" justifyContent="space-between" mb={2}>
              <Box>
                <Avatar mr={2} size="sm" />
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
    </Grid>
  );
};

export default Post;
