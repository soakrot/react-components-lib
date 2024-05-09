import React, { MouseEventHandler, ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, ButtonProps>(function (props, ref) {
  const { className, children, onClick } = props;
  return (
    <button
      className={`btn ${className ? className : ""}`}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default Button;
