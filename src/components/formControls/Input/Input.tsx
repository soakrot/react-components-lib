import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithRef,
  forwardRef,
  ReactElement,
} from "react";
import "./Input.css";

type LabelsType =
  | string
  | string[]
  | { text: string; position?: "before" | "after" }[];

export interface InputProps extends ComponentPropsWithRef<"input"> {
  id: string;
  isValid: boolean;
  className?: string;
  labels?: LabelsType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const {
    id,
    isValid,
    className,
    type = "text",
    labels,
    onChange,
    ...otherProps
  } = props;

  function handleOnInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e);
  }

  const labelsAfter: ReactElement[] = [];
  const labelsBefore: ReactElement[] = [];
  const labelsArr: ReactElement[] = [];

  if (Array.isArray(labels)) {
    labels.forEach((label, i) => {
      // If Labels is an array of strings
      if (typeof label === "string") {
        labelsArr[i] = (
          <label key={label} className="rc-input__label" htmlFor={id}>
            {label}
          </label>
        );
      }

      // If Labels is an array of objects
      if (typeof label === "object") {
        if (label.position === "after") {
          labelsAfter[i] = (
            <label key={label.text} className="rc-input__label" htmlFor={id}>
              {label.text}
            </label>
          );
        } else {
          labelsBefore[i] = (
            <label key={label.text} className="rc-input__label" htmlFor={id}>
              {label.text}
            </label>
          );
        }
      }
    });
  }

  return (
    <div className={`input-container ${className || ""}`}>
      {!Array.isArray(labels) && (
        <label className="rc-input__label" htmlFor={id}>
          {labels}
        </label>
      )}
      {labelsArr}
      {labelsBefore}
      <input
        className="rc-input"
        id={id}
        type={type}
        onChange={handleOnInputChange}
        ref={ref}
        aria-invalid={isValid}
        {...otherProps}
      />
      {labelsAfter}
      <span></span>
    </div>
  );
});

export default Input;
