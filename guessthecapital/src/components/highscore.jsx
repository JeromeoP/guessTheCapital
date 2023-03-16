// src/Highscore.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, List, ListItem, ListIcon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import color from "../theme/colors";

const Highscore = () => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/highscores").then((response) => {
      setHighscores(response.data);
    });
  }, []);

  return (
    <Box bg={color.background}>
      <Heading color={color.text} as="h2" size="lg" mb={4}>
        Highscores
      </Heading>
      <List spacing={3}>
        {highscores.map((entry, index) => (
          <ListItem color={color.text} key={index}>
            <ListIcon as={StarIcon} color="yellow.500" />
            {entry.name} - {entry.score}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Highscore;
