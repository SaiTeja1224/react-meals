import Card from "../UI/Card/Card";
import classes from "./Intro.module.css";

const Intro = () => {
  return (
    <Card className={classes.intro}>
      <h2 className={classes["intro-h2"]}>Delicious Food, Delivered To You</h2>
      <p className={classes["intro-p1"]}>
        Choose your favourite meal from our broad selection of available meals
        and enjoy and delicious lunch or dinner at home.
      </p>
      <p className={classes["intro-p2"]}>
        All our meals are cooked with high-quality ingredients, just in time and
        of course by experienced chefs.
      </p>
    </Card>
  );
};

export default Intro;
