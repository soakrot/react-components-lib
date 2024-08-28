import { ChangeEventHandler, ReactElement } from "react";
import "./Switch.css";

interface SwitchProps {
  id: string;
  className?: string;
  checked?: boolean;
  label?: string | ReactElement;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Switch(props: SwitchProps) {
  const { className = "", checked, id, label, onChange } = props;
  return (
    <label className={`rc-switch ${className}`} htmlFor={id}>
      <span className="switch-bg">
        <input id={id} type="checkbox" checked={checked} onChange={onChange} />
        <span className="switch-thumb"></span>
      </span>
      {label}
    </label>
  );
}

export default Switch;
