import classes from "./Input.module.css";
const useInput = (props) => {
  return (
    <div className={props.classes}>
      <label htmlFor={props.id} className={classes["inp-label"]}>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        min={props.type === "number" ? 1 : ""}
        max={props.type === "number" ? 10 : ""}
        className={props.className}
      />
      {props.error}
    </div>
  );
};
export default useInput;
