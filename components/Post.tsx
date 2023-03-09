import Image from "next/image";
import NextLink from "next/link";
import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Link,
  Flex,
} from "@chakra-ui/react";

type Author = {
  name: string;
  email: string;
};

type Review = {
  id: string;
  rating: number;
  description: string;
  user: Author;
};

export type PostProps = {
  id: number;
  name: string;
  price: number;
  description: string;
  city: string;
  country: string;
  author: Author | null;
  reviews: Review[];
  image: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <Box
      maxW={"445px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
    >
      <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
        <Image src={post.image} alt={`camp ${post.name}`} layout={"fill"} />
      </Box>
      <Stack>
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            ${post.price} / day
          </Text>
          <Text fontWeight={400}>
            {post.city}, {post.country}
          </Text>
        </Flex>
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}
        >
          {post.name}
        </Heading>
        <Text noOfLines={1} color={"gray.500"}>
          {post.description}
        </Text>
      </Stack>
      <Stack
        mt={6}
        direction={"row"}
        spacing={4}
        align={"center"}
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            mr={4}
          />
          <Text fontWeight={600}>{post.author.name}</Text>
        </Flex>
        <NextLink href={`/camps/${post.id}`} passHref>
          <Link color="green">View More</Link>
        </NextLink>
      </Stack>
    </Box>
  );
};

export default Post;
