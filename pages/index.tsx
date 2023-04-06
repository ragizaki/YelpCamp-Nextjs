import React from "react";
import { GetServerSideProps } from "next";
import { PostProps } from "@components/Post";
import PostGrid from "@components/PostGrid";
import { Box, Heading } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post`);
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
    <>
      <Heading mb={5}>All Campsites</Heading>
      <PostGrid posts={posts} />
    </>
  );
};

export default Camps;
