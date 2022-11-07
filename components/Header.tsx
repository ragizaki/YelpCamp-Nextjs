import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { logger } from "@lib/logger";
import { Button, HStack, Text } from "@chakra-ui/react";
import Search from "./Search";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  logger.debug(session);

  let left = (
    <>
      <Text fontSize="2xl" as="b">
        Yelp Camp
      </Text>
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Camps
        </a>
      </Link>
    </>
  );

  let right = null;

  if (!session) {
    right = (
      <HStack>
        <Button onClick={() => signIn()}>Log in</Button>
      </HStack>
    );
  }

  if (session) {
    right = (
      <HStack>
        <p>{session.user.name}</p>
        <Link href="/create" passHref>
          <Button>
            <a>New post</a>
          </Button>
        </Link>
        <Button
          onClick={() => {
            logger.debug("callbackUrl: ", router.basePath);
            signOut();
          }}
        >
          Log out
        </Button>
      </HStack>
    );
  }

  return (
    <nav>
      <HStack
        p={5}
        justify="space-between"
        borderBottom="1px solid"
        shadow="md"
      >
        <HStack spacing={3}>
          {left}
          {session && (
            <Link href="/profile">
              <a>My Posts</a>
            </Link>
          )}
          <Search />
        </HStack>
        {right}
      </HStack>
    </nav>
  );
};

export default Header;
