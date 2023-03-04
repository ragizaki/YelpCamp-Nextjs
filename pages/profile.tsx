import React from "react";
import { GetServerSideProps } from "next";
import Layout from "@components/Layout";
import { PostProps } from "@components/Post";
import PostGrid from "@components/PostGrid";
import { getSession } from "next-auth/react";
import prisma from "@lib/prisma";
import { Text } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  const posts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { posts },
  };
};

interface Props {
  posts: PostProps[];
}

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <>
      <Text>My Posts</Text>
      {posts && <PostGrid posts={posts} />}
    </>
  );
};

export default Posts;
