import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { Box, Heading, VStack } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async () => {
  const camps = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { camps },
  };
};

type Props = {
  camps: PostProps[];
};

const Camps: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Box className="page" pt={5}>
        <Heading>All Campsites</Heading>
        <VStack mt={5} spacing={5}>
          {props.camps.map((camp) => (
            <Box key={camp.id} w="full" shadow="lg">
              <Post post={camp} />
            </Box>
          ))}
        </VStack>
      </Box>
    </Layout>
  );
};

export default Camps;
