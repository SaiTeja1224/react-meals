import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MealContextProvider } from "./context/MealContext";

ReactDOM.render(
  <MealContextProvider>
    <App />
  </MealContextProvider>,
  document.getElementById("root")
);
