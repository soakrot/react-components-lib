import { ReactNode } from "react";
import "./Container.css";
interface ContainerProps {
  children?: ReactNode;
  className?: string;
  width?: "sm" | "md" | "lg" | "xl";
}

function Container(props: ContainerProps) {
  const { children, className, width } = props;
  return (
    <div
      className={`${width ? `container-${width}` : "container"} ${className || ""}`}
    >
      {children}
    </div>
  );
}

export default Container;
