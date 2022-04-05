import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Head from "./components/Header/Head";
import Cart from "./components/Cart/Cart";
import Intro from "./components/Header/Intro";
import MealList from "./components/Meals/MealList";
import NewMeal from "./components/Meals/NewMeal";

import { useContext } from "react";
import MealContext from "./context/MealContext";
import OrderDetails from "./components/Order/OrderDetails";

function App() {
  const mealCtx = useContext(MealContext);

  let content = (
    <>
      <Intro /> <MealList />
    </>
  );
  if (mealCtx.mealFormDisplay) content = <NewMeal />;
  else if (mealCtx.orderFormDisplay) content = <OrderDetails />;
  return (
    <React.Fragment>
      {mealCtx.viewCart &&
        ReactDOM.createPortal(<Cart />, document.getElementById("cart-root"))}
      <Head enableCart={mealCtx.cartControl} />
      {content}
    </React.Fragment>
  );
}

export default App;
