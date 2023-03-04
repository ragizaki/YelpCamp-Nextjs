import { Grid, GridItem } from "@chakra-ui/react";
import Post, { PostProps } from "@components/Post";

interface PostGridProps {
  posts: PostProps[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
        "2xl": "repeat(4, 1fr)",
      }}
      gap={6}
    >
      {posts.map((post) => (
        <GridItem key={post.id} w="full" shadow="lg">
          <Post post={post} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default PostGrid;
