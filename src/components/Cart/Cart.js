import classes from "./Cart.module.css";
import { useContext } from "react";
import MealContext from "../../context/MealContext";
import CartContents from "./CartContents";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const Cart = (props) => {
  const mealCtx = useContext(MealContext);
  let content = <p>Cart Empty... Order Something</p>;
  let total = 0;

  if (mealCtx.cartList.length > 0) {
    content = mealCtx.cartList.map((meal) => {
      total += meal.amount * meal.price.toFixed(2);
      return <CartContents meal={meal} key={meal.id} />;
    });
  }
  let totalContent = total > 0 && (
    <div className={classes["cart-total"]}>
      <h3 className={classes["total-label"]}>Total Amount</h3>
      <h3 className={classes["cart-total"]}>${total.toFixed(2)}</h3>
    </div>
  );

  const cartDropHandler = (e) => {
    e.stopPropagation();
    if (
      e.target.textContent === "Close" ||
      e.target.classList[0] === "Cart_backdrop__SxAMZ" ||
      e.target.textContent === "Order"
    )
      mealCtx.cartControl();
  };

  return (
    <div onClick={cartDropHandler} className={classes.backdrop}>
      <Card className={classes["cart-content"]}>
        <div className={classes["cart-head"]}>
          <h3>Cart</h3>
        </div>
        <ul className={classes["cart-data"]}>{content}</ul>
        {totalContent}
        <div>
          <Button onClick={cartDropHandler} usedFor="cart-btn-close">
            Close
          </Button>
          <Button
            usedFor="cart-btn-order"
            disabled={!total}
            onClick={() => {
              alert("Ordering....");
            }}
          >
            Order
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
