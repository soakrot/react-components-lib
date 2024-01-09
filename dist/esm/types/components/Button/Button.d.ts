import React, { MouseEventHandler, ReactNode } from "react";
import "./Button.module.css";
interface ButtonProps {
    className?: string;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default Button;
