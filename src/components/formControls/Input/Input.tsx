import {
  ChangeEvent,
  ChangeEventHandler,
  ComponentPropsWithRef,
  forwardRef,
  ReactElement,
} from "react";
import "./Input.css";

export interface InputProps extends ComponentPropsWithRef<"input"> {
  id: string;
  className?: string;
  error?: boolean;
  errorMsg?: string;
  label?: string | ReactElement;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const {
    id,
    className,
    error = false,
    errorMsg = "This field is required",
    label,
    type = "text",
    onChange,
    ...otherProps
  } = props;

  function handleOnInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(e);
  }

  return (
    <div className={`rc-input-container ${className || ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className="rc-input"
        id={id}
        type={type}
        onChange={handleOnInputChange}
        ref={ref}
        aria-invalid={error}
        {...otherProps}
      />
      <p className="rc-input__error">{error && errorMsg}</p>
    </div>
  );
});

export default Input;
