import { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import color from "../theme/colors";
import React from "react";

const EuropeanCapitalsGame = ({ europeanCities }) => {
  const [currentCity, setCurrentCity] = useState({});
  const [remainingCities, setRemainingCities] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    // Shuffle the cities to make sure we don't repeat any
    const shuffledCities = europeanCities.sort(() => 0.5 - Math.random());

    // Set the initial state with the first city
    setCurrentCity(shuffledCities[0]);

    // Save the remaining cities for later rounds
    setRemainingCities(shuffledCities.slice(1));
  }, [europeanCities]);

  const handleAnswer = () => {
    const isCorrect =
      userAnswer.toLowerCase() === currentCity.capital.toLowerCase();

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(
        `Wrong! The capital of ${currentCity.country} is ${currentCity?.capital}.`
      );
    }

    // Move on to the next city
    if (remainingCities.length > 0) {
      const nextCity = remainingCities.pop();
      setCurrentCity(nextCity);
      setRemainingCities(remainingCities);
      setUserAnswer("");
      inputRef.current.focus();
    } else {
      // Game over!
      alert(`Game over! Your score is ${score}/${europeanCities.length}`);
      setScore(0);
      setRemainingCities([]);
    }
  };

  return (
    <Box bg={color.background}>
      {currentCity && (
        <>
          <FormControl>
            <GridItem colSpan={2}>
              <FormLabel color={color.text} mb={2}>
                What is the capital of {currentCity.country}?
              </FormLabel>
            </GridItem>

            <Input
              width="100%"
              mb={2}
              placeholder="Type your answer here"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              ref={inputRef}
              autoComplete="off"
            />

            <Button
              bg={color.primary}
              color={color.text}
              variant="solid"
              disabled={!userAnswer}
              onClick={handleAnswer}
            >
              Submit
            </Button>
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
        </>
      )}
    </Box>
  );
};

export default EuropeanCapitalsGame;
