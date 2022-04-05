import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "../Order/OrderDetails.module.css";
import { useContext, useEffect } from "react";
import MealContext from "../../context/MealContext";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";

const nameValidation = (val) => val.trim().length > 0 && val.trim().length > 3;
const contactValidation = (val) => val.trim().length === 10;
const addressValidation = (val) => val.trim().length > 10;

const OrderDetails = () => {
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
    enteredContact,
    isContactValid,
    contactHasError,
    contactChangeHandler,
    contactBlurHandler,
    resetContact,
  ] = useInput(contactValidation);

  const [
    enteredAddress,
    isAddressValid,
    addressHasError,
    addressChangeHandler,
    addressBlurHandler,
    resetAddress,
  ] = useInput(addressValidation);

  const formIsValid = isNameValid && isContactValid && isAddressValid;

  const [isLoading, error, postReqForOrders] = useHttp();
  const mealCtx = useContext(MealContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (formIsValid) {
      const newData = {
        name: enteredName,
        contact: +enteredContact,
        address: enteredAddress,
        meals: mealCtx.cartList,
      };
      const request = {
        url: "https://react-meals-de9d8-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      };
      postReqForOrders(request, () => {
        mealCtx.showOrderForm();
        mealCtx.emptyLists();
      });
      resetName();
      resetContact();
      resetAddress();
    }
  };

  const nameErrorText = nameHasError && (
    <p className={classes["error-text"]}>Please enter a valid name</p>
  );
  const contactErrorText = contactHasError && (
    <p className={classes["error-text"]}>Please enter a valid description</p>
  );
  const addressErrorText = addressHasError && (
    <p className={classes["error-text"]}>Please enter a valid price</p>
  );

  const nameClasses = nameHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : `${classes["form-control"]} `;
  const contactClasses = contactHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : `${classes["form-control"]} `;
  const addressClasses = addressHasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : `${classes["form-control"]} `;

  return (
    <Card className={classes["meal-form"]}>
      {error && <p className="error-text">error</p>}
      {!error && (
        <>
          <h2 className={classes["order-heading"]}>Checkout</h2>
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
              type="tel"
              label="Contact"
              id="contact"
              value={enteredContact}
              onChange={contactChangeHandler}
              onBlur={contactBlurHandler}
              error={contactErrorText}
              classes={contactClasses}
            ></Input>
            <div className={addressClasses}>
              <label htmlFor="desc">Address</label>
              <textarea
                id="address"
                value={enteredAddress}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                rows="4"
              ></textarea>
              {addressErrorText}
            </div>
            <div className={classes["form-control-btn"]}>
              <Button
                type="submit"
                usedFor="cart-btn-close"
                onClick={mealCtx.showOrderForm}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                usedFor="cart-btn-order"
                disabled={!formIsValid}
              >
                {isLoading && !error && "Ordering..."}
                {!isLoading && !error && "Order"}
              </Button>
            </div>
          </form>
        </>
      )}
    </Card>
  );
};

export default OrderDetails;
