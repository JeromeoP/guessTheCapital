import { Text, Heading } from "@chakra-ui/react";
import color from "../theme/colors";
import React from "react";

const ScoreDisplay = ({ score, remainingCountries, totalQuestions }) => (
  <>
    <Heading as="h4" size="md" color={color.text} mt={2}>
      Score: {score} / {totalQuestions - remainingCountries - 1}
    </Heading>
    <Heading as="h4" size="md" color={color.text} mt={2}>
      Remaining countries: {remainingCountries}
    </Heading>
  </>
);

export default ScoreDisplay;
