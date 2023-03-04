import { GetServerSideProps } from "next";
import { PostProps } from "@components/Post";
import PostGrid from "@components/PostGrid";
import { Heading } from "@chakra-ui/react";

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
    <>
      <Heading mb={5}>Search Results for {term}</Heading>
      <PostGrid posts={posts} />
    </>
  );
};

export default SearchedCamps;
