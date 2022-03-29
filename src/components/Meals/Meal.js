import AddToCart from "./AddToCart";
import classes from "./Meal.module.css";

const Meal = (props) => {
  return (
    <li className={classes["meal-li"]}>
      <div className={classes["meal-data"]}>
        <h3>{props.meal.title}</h3>
        <p className={classes["meal-desc"]}>{props.meal.description}</p>
        <p className={classes["meal-price"]}>${props.meal.price.toFixed(2)}</p>
      </div>
      <AddToCart meal={props.meal} />
    </li>
  );
};

export default Meal;
