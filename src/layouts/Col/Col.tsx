import { ReactNode } from "react";
import "./Col.css";

interface ColProps {
  children?: ReactNode;
  className?: string;
}

function Col(props: ColProps) {
  const { children, className } = props;
  return <div className={`col ${className || ""}`}>{children}</div>;
}

export default Col;
