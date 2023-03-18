// src/Highscore.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  List,
  ListItem,
  ListIcon,
  VStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import color from "../theme/colors";

const Highscore = () => {
  const [europeanHighscores, setEuropeanHighscores] = useState([]);
  const [asianHighscores, setAsianHighscores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/european/highscores")
      .then((response) => {
        setEuropeanHighscores(response.data);
      });

    axios.get("http://localhost:5000/api/asian/highscores").then((response) => {
      setAsianHighscores(response.data);
    });
  }, []);

  return (
    <Box bg={color.background}>
      <VStack spacing={6}>
        <Box>
          <Heading color={color.text} as="h2" size="lg" mb={4}>
            European Highscores
          </Heading>
          <List spacing={3}>
            {europeanHighscores.map((entry, index) => (
              <ListItem color={color.text} key={index}>
                <ListIcon as={StarIcon} color="yellow.500" />
                {entry.name} - {entry.score}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Heading color={color.text} as="h2" size="lg" mb={4}>
            Asian Highscores
          </Heading>
          <List spacing={3}>
            {asianHighscores.map((entry, index) => (
              <ListItem color={color.text} key={index}>
                <ListIcon as={StarIcon} color="yellow.500" />
                {entry.name} - {entry.score}
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Box>
  );
};

export default Highscore;
