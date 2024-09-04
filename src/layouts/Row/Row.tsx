import { ReactNode } from "react";
import "./Row.css";

interface RowProps {
  children?: ReactNode;
  className?: string;
}

function Row(props: RowProps) {
  const { children, className } = props;
  return <div className={`row ${className || ""}`}>{children}</div>;
}

export default Row;
