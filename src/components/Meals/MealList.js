import { useContext } from "react";
import MealContext from "../../context/MealContext";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Meal from "./Meal";
import classes from "./MealList.module.css";

const MealList = (props) => {
  const mealCtx = useContext(MealContext);

  let content = <p>Sorry no meals available</p>;
  if (mealCtx.dummyMeals.length > 0) {
    content = mealCtx.dummyMeals.map((meal) => (
      <Meal key={meal.id} meal={meal} />
    ));
  }
  return (
    <Card className={classes["meal-list"]}>
      {mealCtx.error && <p className="error-text">{mealCtx.error}</p>}
      {!mealCtx.isLoading && !mealCtx.error && <ul>{content}</ul>}
      {mealCtx.isLoading && !mealCtx.error && (
        <p className="loading-text">Loading... </p>
      )}
      <div className={classes["add-div"]}>
        <span>Add a New Meal</span>
        <Button usedFor="add-meal" onClick={mealCtx.showMealForm}>
          + Add a new meal
        </Button>
      </div>
    </Card>
  );
};

export default MealList;
