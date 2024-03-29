import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <Box>
    <Header />
    <Box px={10} py={8} minH="89vh">
      {props.children}
    </Box>
  </Box>
);

export default Layout;
