import { ReactNode } from "react";
import { IndicatorProps } from "./Carousel";
import classes from "./CustomIndicator.module.css";

interface CustomIndicatorProps extends IndicatorProps {
  children?: ReactNode;
}

function CustomIndicator(props: CustomIndicatorProps) {
  return (
    <button
      className={`${props.className} ${classes.customIndicator}`}
      onClick={props.onClick}
    >
      {props.index + 1}
    </button>
  );
}
export default CustomIndicator;
