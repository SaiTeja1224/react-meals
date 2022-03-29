import classes from "./Card.module.css";

const Card = (props) => {
  const classStyle = `${classes.card} ${props.className && props.className}`;
  return <div className={classStyle}>{props.children}</div>;
};

export default Card;
