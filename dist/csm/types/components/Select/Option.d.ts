import React, { MouseEvent, ReactNode } from "react";
import "./Option.module.css";
interface OptionProps {
    children?: ReactNode;
    value: string;
    onOptionClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
declare const Option: React.ForwardRefExoticComponent<OptionProps & React.RefAttributes<HTMLButtonElement>>;
export default Option;
