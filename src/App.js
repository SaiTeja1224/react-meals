import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Head from "./components/Header/Head";
import Cart from "./components/Cart/Cart";
import Intro from "./components/Header/Intro";
import MealList from "./components/Meals/MealList";
import { useContext } from "react";
import MealContext from "./context/MealContext";

function App() {
  const mealCtx = useContext(MealContext);
  return (
    <React.Fragment>
      {mealCtx.viewCart &&
        ReactDOM.createPortal(<Cart />, document.getElementById("cart-root"))}
      <Head enableCart={mealCtx.cartControl} />
      <Intro />
      <MealList />
    </React.Fragment>
  );
}

export default App;
