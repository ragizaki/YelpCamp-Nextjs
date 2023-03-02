import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@components/Layout";
import { PostProps } from "@components/Post";
import PostGrid from "@components/PostGrid";
import { Box, Heading } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/post");
  const posts = await res.json();
  return {
    props: { posts },
  };
};

type Props = {
  posts: PostProps[];
};

const Camps: React.FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <Box className="page" pt={5}>
        <Heading mb={5}>All Campsites</Heading>
        <PostGrid posts={posts} />
      </Box>
    </Layout>
  );
};

export default Camps;
