import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";

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
        <Heading mb={5}>All Campsites</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {props.camps.map((camp) => (
            <GridItem key={camp.id} w="full" shadow="lg">
              <Post post={camp} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Camps;
