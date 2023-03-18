import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const GameOverModal = ({ isOpen, onClose, score, totalQuestions }) => {
  const [playerName, setPlayerName] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  const onAsian = location.pathname === "/asiancities";

  const submitHighscore = () => {
    if (playerName) {
      axios
        .post(
          `http://localhost:5000/api/${
            !onAsian ? "european/highscores" : "asian/highscores"
          }`,
          {
            name: playerName,
            score: score,
          }
        )
        .then(() => {
          navigate("/highscore");
        })
        .catch((error) => {
          console.error("Error while posting highscore:", error);
        });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Game Over</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            Your score is {score}/{totalQuestions}.
          </Text>
          <FormControl>
            <FormLabel>Enter your name:</FormLabel>
            <Input
              placeholder="Your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={submitHighscore}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameOverModal;
