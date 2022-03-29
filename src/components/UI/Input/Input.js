import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes["input1"]}>
      <label htmlFor={props.id} className={classes["inp-label"]}>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
        min={props.type === "number" ? 0 : ""}
        max={props.type === "number" ? 10 : ""}
        className={props.className && props.className}
      />
    </div>
  );
};

export default Input;
