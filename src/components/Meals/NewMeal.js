import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import { useContext, useEffect } from "react";
import MealContext from "../../context/MealContext";
import classes from "./NewMeal.module.css";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";

const nameValidation = (val) => val.trim().length > 0 && val.trim().length > 3;
const descValidation = (val) => val.trim().length > 0 && val.trim().length > 5;
const priceValidation = (val) => val > 0;

const NewMeal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [
    enteredName,
    isNameValid,
    nameHasError,
    nameChangeHandler,
    nameBlurHandler,
    resetName,
  ] = useInput(nameValidation);

  const [
    enteredDesc,
    isDescValid,
    descHasError,
    descChangeHandler,
    descBlurHandler,
    resetDesc,
  ] = useInput(descValidation);

  const [
    enteredPrice,
    isPriceValid,
    priceHasError,
    priceChangeHandler,
    priceBlurHandler,
    resetPrice,
  ] = useInput(priceValidation);

  const formIsValid = isNameValid && isPriceValid && isDescValid;

  const [isLoading, error, postReqForMeals] = useHttp();
  const mealCtx = useContext(MealContext);

  const addMealToList = (meal, data) => {
    const id = data.name;
    mealCtx.updateMeals({ id, amount: 1, ...meal });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      const newData = {
        title: enteredName,
        description: enteredDesc,
        price: +enteredPrice,
        amount: 1,
      };
      const request = {
        url: "https://react-meals-de9d8-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      };
      postReqForMeals(request, addMealToList.bind(null, newData));

      mealCtx.showMealForm();
      resetDesc();
      resetName();
      resetPrice();
    }
  };

  const nameErrorText = nameHasError && (
    <p className={classes["error-text"]}>Please enter a valid name</p>
  );
  const descErrorText = descHasError && (
    <p className={classes["error-text"]}>Please enter a valid description</p>
  );
  const priceErrorText = priceHasError && (
    <p className={classes["error-text"]}>Please enter a valid price</p>
  );

  const nameClasses = nameHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : `${classes["form-control"]} `;
  const priceClasses = priceHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : `${classes["form-control"]} `;
  const descClasses = descHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : `${classes["form-control"]} `;

  return (
    <Card className={classes["meal-form"]}>
      {error && <p className="error-text">error</p>}
      {!error && (
        <>
          <h2 className={classes["new-meal-heading"]}>New Meal</h2>
          <form onSubmit={submitHandler}>
            <Input
              type="text"
              label="Name"
              id="name"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              error={nameErrorText}
              classes={nameClasses}
            ></Input>
            <Input
              type="number"
              label="Price"
              id="price"
              value={enteredPrice}
              onChange={priceChangeHandler}
              onBlur={priceBlurHandler}
              error={priceErrorText}
              classes={priceClasses}
            ></Input>
            <div className={descClasses}>
              <label htmlFor="desc">Description</label>
              <textarea
                type="text"
                id="desc"
                value={enteredDesc}
                onChange={descChangeHandler}
                onBlur={descBlurHandler}
                rows="4"
              ></textarea>
              {descErrorText}
            </div>
            <div className={classes["form-control-btn"]}>
              <Button
                type="submit"
                usedFor="cart-btn-close"
                onClick={mealCtx.showMealForm}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                usedFor="cart-btn-order"
                disabled={!formIsValid}
              >
                {isLoading && !error && "Adding..."}
                {!isLoading && !error && "Add"}
              </Button>
            </div>
          </form>
        </>
      )}
    </Card>
  );
};

export default NewMeal;
