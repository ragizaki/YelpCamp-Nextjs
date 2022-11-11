import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@components/Layout";
import { PostProps } from "@components/Post";
import PostGrid from "@components/PostGrid";
import prisma from "@lib/prisma";
import { Box, Heading } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
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
