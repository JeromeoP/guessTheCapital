import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/header";
import GuessTheCapitalView from "./components/guessTheCityView";
import EuropeanCities from "./constants/europeanCities";
import AsianCities from "./constants/asianCities";

import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import Highscore from "./components/highscore";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<GuessTheCapitalView europeanCities={EuropeanCities} />}
          />
          <Route
            path="/asianCities"
            element={<GuessTheCapitalView europeanCities={AsianCities} />}
          />
          <Route path="/highscore" element={<Highscore />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
