import { useContext } from "react";
import MealContext from "../../context/MealContext";
import Input from "../UI/Input/Input";
import classes from "./AddToCart.module.css";
import Button from "../UI/Button/Button";

const AddToCart = (props) => {
  const mealCtx = useContext(MealContext);

  const submitToCartHandler = (e) => {
    e.preventDefault();
    const newOrder = { ...props.meal };
    mealCtx.updateCartList(newOrder);
  };

  const inputChangeHandler = (e) => {
    mealCtx.updateMealsAmount(props.meal, +e.target.value);
  };

  return (
    <form onSubmit={submitToCartHandler} className={classes["meal-form"]}>
      <Input
        type="number"
        label="Amount"
        id={props.meal.id}
        value={props.meal.amount}
        onChange={inputChangeHandler}
        className={classes["meal-input"]}
      />
      <Button type="submit" usedFor="add-amount">
        + Add
      </Button>
    </form>
  );
};

export default AddToCart;
