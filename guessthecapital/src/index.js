import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/header";
import EuropeanCapitalsGame from "./components/guessTheCity";
import EuropeanCities from "./constants/europeanCities";
import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import Highscore from "./components/highscore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <Header />
      <EuropeanCapitalsGame europeanCities={EuropeanCities} />
      <Highscore />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
