import { Flex, Heading, Link, Box } from "@chakra-ui/react";
import React from "react";
import color from "../theme/colors";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@chakra-ui/icons";

function Header() {
  const location = useLocation();
  const onHighscore = location.pathname === "/highscore";

  return (
    <Flex align="center" justify="space-between" bg={color.secondary} p="4">
      <Heading as="h1" color={color.text} size="lg">
        Guess the Capital
      </Heading>
      <Link
        as={RouterLink}
        to={onHighscore ? "/" : "/highscore"}
        color={color.text}
      >
        <Box display="flex" alignItems="center">
          {onHighscore && <ArrowLeftIcon mr="2" />}
          {onHighscore ? "Back to the Game" : "Highscore"}
        </Box>
      </Link>
    </Flex>
  );
}

export default Header;
