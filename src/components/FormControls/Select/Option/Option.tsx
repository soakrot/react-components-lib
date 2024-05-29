import { AriaAttributes, MouseEvent, ReactNode, forwardRef } from "react";
import "./Option.css";

interface OptionProps extends AriaAttributes {
  id: string;
  value: string;
  tabIndex: 0 | -1;
  children?: ReactNode;
  onOptionClick?: (optVal: string, e: MouseEvent<HTMLLIElement>) => void;
  onOptionHover: () => void;
}

type Ref = HTMLLIElement;
const Option = forwardRef<Ref, OptionProps>(function (props, ref) {
  const {
    id,
    value,
    tabIndex,
    onOptionClick,
    onOptionHover,
    children,
    ...otherProps
  } = props;

  function handleOnOptionClick(
    optionValue: string,
    e: MouseEvent<HTMLLIElement>
  ) {
    onOptionClick && onOptionClick(optionValue, e);
  }

  return (
    <li
      className="select__option"
      id={id}
      role="option"
      ref={ref}
      aria-selected={otherProps["aria-selected"]}
      tabIndex={tabIndex}
      onClick={handleOnOptionClick.bind(null, value)}
      onMouseOver={onOptionHover}
      {...otherProps}
    >
      {children}
    </li>
  );
});

export default Option;
