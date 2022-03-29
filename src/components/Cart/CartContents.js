import { useContext, useEffect } from "react";
import MealContext from "../../context/MealContext";
import Button from "../UI/Button/Button";
import classes from "./CartContents.module.css";

const CartContents = (props) => {
  const mealCtx = useContext(MealContext);
  const increaseAmount = () => {
    const newAmount = props.meal.amount + 1;
    const newContent = { ...props.meal, amount: newAmount };
    mealCtx.updateCartList(newContent, true);
  };
  const decreaseAmount = () => {
    const newAmount = props.meal.amount - 1;
    if (newAmount === 0)
      mealCtx.updateMealsAmount({ ...props.meal }, newAmount);
    const newContent = { ...props.meal, amount: newAmount };
    mealCtx.updateCartList(newContent, true);
  };

  useEffect(() => {
    mealCtx.updateMealsAmount({ ...props.meal }, props.meal.amount);
  }, [mealCtx.cartList, props.meal]);
  return (
    <>
      <li className={classes["cart-content-li"]}>
        <div className={classes["cart-content-info"]}>
          <h3>{props.meal.title}</h3>
          <div>
            <p>${props.meal.price.toFixed(2)}</p>
            <span>x{props.meal.amount}</span>
          </div>
        </div>
        <div className={classes["cart-content-btn"]}>
          <Button onClick={decreaseAmount} usedFor="change-amount">
            -
          </Button>
          <Button
            onClick={increaseAmount}
            usedFor="change-amount"
            disabled={props.meal.amount > 9}
          >
            +
          </Button>
        </div>
      </li>
    </>
  );
};

export default CartContents;
