import classes from "./Button.module.css";

const Button = (props) => {
  let classStyle = "";
  if (props.usedFor === "show-cart") classStyle = classes["show-cart"];
  if (props.usedFor === "add-amount") classStyle = classes["add-amount"];
  if (props.usedFor === "change-amount") classStyle = classes["change-amount"];
  if (props.usedFor === "cart-btn-order")
    classStyle = classes["cart-btn-order"];
  if (props.usedFor === "cart-btn-close")
    classStyle = classes["cart-btn-close"];
  return (
    <button
      type={props.type ? "submit" : "button"}
      className={`${classes.button} ${classStyle}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
