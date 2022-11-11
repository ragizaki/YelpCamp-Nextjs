import { Grid, GridItem } from "@chakra-ui/react";
import Post, { PostProps } from "@components/Post";

interface PostGridProps {
  posts: PostProps[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {posts.map((post) => (
        <GridItem key={post.id} w="full" shadow="lg">
          <Post post={post} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default PostGrid;
