import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  useDisclosure,
  Text,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Search from "./Search";

interface ProfileProps {
  name: string;
}

const ProfileDropdown: React.FC<ProfileProps> = ({ name }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
        />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar
            size={"2xl"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
          />
        </Center>
        <br />
        <Center>
          <p>{name}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>
          <NextLink href="/profile">
            <Link _hover={{ textDecor: "none" }} w="100%">
              My Posts
            </Link>
          </NextLink>
        </MenuItem>
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box borderBottom={1} borderStyle="solid" borderColor="gray.300">
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={10}
      >
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Text fontWeight={500} fontSize="lg" mr={3}>
            Yelp Camp
          </Text>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <NextLink href="/" passHref>
              <Link
                mr={3}
                color="gray.600"
                _hover={{ color: "black" }}
                _focus={{ textDecor: "none" }}
              >
                Camps
              </Link>
            </NextLink>
            <Search />
          </HStack>
        </HStack>
        {session ? (
          <HStack spacing={3}>
            <NextLink href="/create" passHref>
              <Link
                mr={3}
                color="gray.600"
                _hover={{ color: "black" }}
                _focus={{ textDecor: "none" }}
              >
                Add Camp
              </Link>
            </NextLink>
            <ProfileDropdown name={session.user?.name} />
          </HStack>
        ) : (
          <Button
            bg={"green.400"}
            _hover={{ bg: "green.300" }}
            onClick={() => signIn()}
            color={"white"}
          >
            Sign In
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
