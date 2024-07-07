import { ChangeEvent, useState } from "react";

type ValidateInputFn = (input: string) => boolean;

function useInput<T extends HTMLInputElement>(
  ValidateInputFn: ValidateInputFn
) {
  const [inputValue, setInputValue] = useState("");
  const [wasInputTouched, setWasInputTouched] = useState(false);
  const isEnteredValueValid = ValidateInputFn(inputValue);
  const hasError = !isEnteredValueValid && wasInputTouched;

  function handleChangeInput(e: ChangeEvent<T>) {
    setInputValue(e.target.value);
  }

  function handleBlurInput() {
    setWasInputTouched(true);
  }

  function resetInput() {
    setInputValue("");
    setWasInputTouched(false);
  }

  return {
    value: inputValue,
    isEnteredValueValid,
    hasError,
    handleChangeInput,
    handleBlurInput,
    resetInput,
  };
}

export default useInput;
