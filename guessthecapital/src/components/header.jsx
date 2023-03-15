import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import color from "../theme/colors";

function Header() {
  return (
    <Flex align="center" justify="space-between" bg={color.secondary} p="4">
      <Heading as="h1" color={color.text} size="lg">
        Guess the Capital
      </Heading>
    </Flex>
  );
}

export default Header;
