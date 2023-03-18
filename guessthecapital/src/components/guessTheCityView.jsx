import { useState, useEffect } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import color from "../theme/colors";
import React from "react";
import QuestionCard from "./questionCard";
import ScoreDisplay from "./scoreDisplay";
import GameOverModal from "./gameOverModal";
import { useNavigate } from "react-router-dom";

const GuessTheCapitalView = ({ europeanCities }) => {
  const [currentCity, setCurrentCity] = useState({});
  const [remainingCities, setRemainingCities] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const shuffledCities = europeanCities.sort(() => 0.5 - Math.random());
    setCurrentCity(shuffledCities[0]);
    setRemainingCities(shuffledCities.slice(1));
  }, [europeanCities]);

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
    }, 1);
  };

  return (
    <Flex
      bg={color.background}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      direction="column"
    >
      {currentCity && (
        <>
          <QuestionCard
            currentCity={currentCity}
            options={options}
            selectedAnswer={selectedAnswer}
            correctAnswer={correctAnswer}
            handleAnswer={handleAnswer}
          />
          <ScoreDisplay
            score={score}
            remainingCountries={remainingCities.length}
            totalQuestions={europeanCities.length}
          />
          <GameOverModal
            isOpen={isOpen}
            onClose={onClose}
            score={score}
            totalQuestions={europeanCities.length}
          />
        </>
      )}
    </Flex>
  );
};

export default GuessTheCapitalView;
