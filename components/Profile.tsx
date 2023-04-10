import {
  Menu,
  MenuButton,
  Avatar,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { signOut } from "next-auth/react";

interface Props {
  name: string;
}

export default function ProfileDropdown({ name }: Props) {
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
}
