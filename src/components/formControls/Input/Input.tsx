import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithRef,
  forwardRef,
} from "react";
import "./Input.css";

export interface InputProps extends ComponentPropsWithRef<"input"> {
  id: string;
  isValid: boolean;
  className?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const {
    id,
    isValid,
    className,
    type = "text",
    label,
    onChange,
    ...otherProps
  } = props;

  function handleOnInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e);
  }

  return (
    <div className={`input-container ${className || ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        className="rc-input"
        id={id}
        type={type}
        onChange={handleOnInputChange}
        ref={ref}
        aria-invalid={isValid}
        {...otherProps}
      />
      <span></span>
    </div>
  );
});

export default Input;
