import { GetServerSideProps } from "next";
import Post, { PostProps } from "@components/Post";
import Layout from "@components/Layout";
import { Text, Grid, GridItem } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { q } = context.query;
  const term = typeof q === "string" ? q : q[0];

  const res = await fetch(`http://localhost:3000/api/post/search?q=${term}`);
  const posts = await res.json();

  return {
    props: {
      posts,
      term,
    },
  };
};

interface Props {
  posts: PostProps[];
  term: string;
}

const SearchedCamps: React.FC<Props> = ({ posts, term }) => {
  return (
    <Layout>
      <Text fontSize="3xl" mb={2}>
        Search Results for <strong>{term}</strong>
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {posts?.map((camp) => (
          <GridItem key={camp.id} w="full" shadow="lg">
            <Post post={camp} />
          </GridItem>
        ))}
      </Grid>
    </Layout>
  );
};

export default SearchedCamps;
