import { GetServerSideProps } from "next";
import Router from "next/router";
import { PostProps } from "@components/Post";
import { useSession } from "next-auth/react";
import { Button, Text, Box, Stack, Avatar, Flex, Grid } from "@chakra-ui/react";
import ReviewForm from "@components/ReviewForm";
import StarRating from "react-star-rating-component";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = Number(params?.id);
  const res = await fetch(`http://localhost:3000/api/post/${postId}`);
  const post = await res.json();

  return {
    props: { post },
  };
};

async function deletePost(id: number): Promise<void> {
  const res = await fetch(`http://localhost:3000/api/post/${id}`, {
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
    await fetch(`http://localhost:3000/api/post/${postId}/review/${reviewId}`, {
      method: "DELETE",
    });
    await Router.reload();
  };

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gap={8}
    >
      <Box>
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
        <ReviewForm />
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
    </Grid>
  );
};

export default Post;
