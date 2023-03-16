import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import color from "../theme/colors";
import React from "react";
import axios from "axios";

const EuropeanCapitalsGame = ({ europeanCities }) => {
  const [currentCity, setCurrentCity] = useState({});
  const [remainingCities, setRemainingCities] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const shuffledCities = europeanCities.sort(() => 0.5 - Math.random());
    setCurrentCity(shuffledCities[0]);
    setRemainingCities(shuffledCities.slice(1));
  }, [europeanCities]);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (currentCity.capital) {
      const correctOption = currentCity.capital;
      const incorrectOptions = europeanCities
        .filter((city) => city.capital !== correctOption)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map((city) => city.capital);
      setOptions(
        [...incorrectOptions, correctOption].sort(() => 0.5 - Math.random())
      );
      setCorrectAnswer(correctOption);
      setSelectedAnswer(null);
    }
  }, [currentCity, europeanCities]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentCity.capital;

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(
        `Wrong! The capital of ${currentCity.country} is ${currentCity.capital}.`
      );
    }
    setTimeout(() => {
      if (remainingCities.length > 0) {
        const nextCity = remainingCities.pop();
        setCurrentCity(nextCity);
        setRemainingCities(remainingCities);
        setFeedback("");
      } else {
        onOpen();
      }
    }, 2);
  };

  return (
    <Box bg={color.background}>
      {currentCity && (
        <>
          <FormControl>
            <FormLabel color={color.text} mb={2}>
              What is the capital of {currentCity.country}?
            </FormLabel>

            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
              {options.map((option, index) => (
                <Button
                  key={index}
                  bg={
                    selectedAnswer === option && option !== correctAnswer
                      ? "red.500"
                      : option === correctAnswer && selectedAnswer
                      ? color.accent
                      : color.primary
                  }
                  color={color.text}
                  variant="solid"
                  onClick={() => !selectedAnswer && handleAnswer(option)}
                  isDisabled={!!selectedAnswer}
                >
                  {option}
                </Button>
              ))}
            </Grid>
          </FormControl>

          <Text color={color.text} mt={2}>
            {feedback}
          </Text>
          <Text color={color.text} mt={4}>
            Score: {score}
          </Text>
          <Text color={color.text} mt={2}>
            Remaining countries: {remainingCities.length}
          </Text>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Game Over</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={4}>
                  Your score is {score}/{europeanCities.length}.
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
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    if (playerName) {
                      axios
                        .post("http://localhost:5000/api/highscores", {
                          name: playerName,
                          score: score,
                        })
                        .then(() => {
                          // You can handle a successful post request here if needed
                          // go to highscore component.
                        })
                        .catch((error) => {
                          console.error(
                            "Error while posting highscore:",
                            error
                          );
                        });
                    }
                    onClose();
                  }}
                >
                  Submit
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default EuropeanCapitalsGame;
