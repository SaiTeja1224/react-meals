import { useContext } from "react";
import MealContext from "../../context/MealContext";
import Card from "../UI/Card/Card";
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
      <ul>{content}</ul>
    </Card>
  );
};

export default MealList;
