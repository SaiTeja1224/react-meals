import { useState } from "react";

const useInput = (validationFunc) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [wasTouched, setWasTouched] = useState(false);

  const isValid = validationFunc(enteredValue);
  const inputHasError = wasTouched && !isValid;

  const inputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const inputBlurHandler = () => {
    setWasTouched(true);
  };

  const reset = () => {
    setWasTouched(false);
    setEnteredValue("");
  };

  return [
    enteredValue,
    isValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  ];
};

export default useInput;
