import classes from "./Head.module.css";
import Button from "../UI/Button/Button";
import { useContext } from "react";
import MealContext from "../../context/MealContext";

const Head = (props) => {
  const mealCtx = useContext(MealContext);
  const clickCartButtonHandler = () => {
    props.enableCart(true);
  };
  const totalAmount = () => {
    let totalAmt = 0;
    for (let o of mealCtx.cartList) totalAmt += o.amount;
    return totalAmt;
  };
  return (
    <div className={classes["head-content"]}>
      <h2 className={classes["head-h2"]}>ReactMeals</h2>
      <Button onClick={clickCartButtonHandler} usedFor="show-cart">
        Your Cart <span>{totalAmount()}</span>
      </Button>
    </div>
  );
};

export default Head;
