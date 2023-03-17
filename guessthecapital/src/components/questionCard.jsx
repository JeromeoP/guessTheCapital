import { FormControl, Heading, Grid, Button, Flex } from "@chakra-ui/react";
import color from "../theme/colors";
import React from "react";

const QuestionCard = ({
  currentCity,
  options,
  selectedAnswer,
  correctAnswer,
  handleAnswer,
}) => (
  <Flex
    bg={color.secondary}
    w="50%"
    justifyContent="center"
    flexDirection="column"
    p="2rem"
  >
    <FormControl>
      <Flex mb="2rem" justifyContent="center">
        <Heading color={color.text} mb={2}>
          What is the capital of {currentCity.country}?
        </Heading>
      </Flex>
      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
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
  </Flex>
);

export default QuestionCard;
