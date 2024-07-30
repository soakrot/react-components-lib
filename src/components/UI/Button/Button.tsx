import React, {
  ComponentPropsWithRef,
  MouseEventHandler,
  ReactNode,
} from "react";
import "./Button.css";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  className?: string;
  children?: ReactNode;
  varient?: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, ButtonProps>(function (props, ref) {
  const {
    className,
    children,
    varient = "primary",
    onClick,
    ...otherProps
  } = props;
  return (
    <button
      {...otherProps}
      className={`btn ${className ? className : ""} btn-${varient}`}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default Button;
