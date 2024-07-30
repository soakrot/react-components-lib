import React, {
  ComponentPropsWithRef,
  MouseEventHandler,
  ReactNode,
} from "react";
import "./Button.css";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  className?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, ButtonProps>(function (props, ref) {
  const {
    className,
    children,
    variant = "primary",
    onClick,
    ...otherProps
  } = props;
  return (
    <button
      {...otherProps}
      className={`btn btn-${variant} ${className ? className : ""}`}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default Button;
