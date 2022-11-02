import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { Text, Heading, Box } from "@chakra-ui/react";

export type PostProps = {
  id: number;
  name: string;
  price: number;
  description: string;
  author: {
    name: string;
    email: string;
  } | null;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author
    ? post.author.name
    : "Unknown author";
  return (
    <Box
      p={5}
      border="1px solid"
      borderColor="gray.500"
      borderRadius="md"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <Heading size="md">{post.name}</Heading>
      <Text fontSize="sm">By {authorName}</Text>
      <ReactMarkdown children={post.description} />
      <Text fontSize="sm">{post.price}</Text>
    </Box>
  );
};

export default Post;
