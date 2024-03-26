import { ReactNode } from "react";
import { IndicatorProps } from "./Carousel";
import "./CustomIndicator.css";

interface CustomIndicatorProps extends IndicatorProps {
  children?: ReactNode;
}

function CustomIndicator(props: CustomIndicatorProps) {
  return (
    <button
      className={`${props.className} custom-indicator`}
      onClick={props.onClick}
    >
      {props.index + 1}
    </button>
  );
}
export default CustomIndicator;
