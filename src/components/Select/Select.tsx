import { FocusEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useRoveFocus } from "../../hooks";
import classes from "./Select.module.css";

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps {
  className?: string;
  options: SelectOption[];
  value: string;
  disabled?: boolean;
  onChange: (option: string) => void;
}

function Select({
  className,
  options,
  value,
  disabled = false,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsWrapperRef = useRef<HTMLDivElement>(null);
  const optionsMenuRef = useRef<HTMLUListElement>(null);
  const optionsRef = useRef<HTMLLIElement[]>([]);
  const {
    currentFocus,
    setCurrentFocus,
    isKeyboardActive,
    setIsKeyboardActive,
  } = useRoveFocus(
    containerRef,
    optionsRef,
    handleEnterKeyPress,
    handleEscapeKeyPress
  );

  function handleEnterKeyPress() {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      onChange(options[currentFocus].value);
    }
  }

  function handleEscapeKeyPress() {
    setIsOpen(false);
  }

  function handleOnOptionClick(
    optionValue: string,
    e: MouseEvent<HTMLLIElement>
  ) {
    e.stopPropagation();
    if (optionValue !== value) {
      onChange(optionValue);
    }
    setIsOpen(false);
  }

  function handleOnTransitionEnd() {
    if (isOpen) return;
    let transitionOccurance = 0;
    transitionOccurance++;
    if (transitionOccurance < 2) {
      setIsKeyboardActive(false);
      optionsWrapperRef.current?.setAttribute("data-status", "closed");
    }
  }

  function handleOnBlur(e: FocusEvent) {
    if (e.relatedTarget?.parentElement !== optionsMenuRef.current) {
      setIsOpen(false);
    }
  }

  function pushOptionsRef(el: HTMLLIElement, index: number) {
    if (el) {
      optionsRef.current[index] = el;
    }
  }

  useEffect(() => {
    const optionsWrapperStatus = optionsWrapperRef.current?.dataset.status;
    if (isOpen) {
      setCurrentFocus(-1);
      optionsWrapperRef.current?.setAttribute("data-status", "open");
    } else {
      if (optionsWrapperStatus !== "closed") {
        optionsWrapperRef.current?.setAttribute("data-status", "closing");
      }
    }
  }, [isOpen]);

  return (
    <div
      className={`${classes["select-container"]} ${className ? className : ""}`}
      ref={containerRef}
      role="select"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onBlur={handleOnBlur}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className={classes["select__value"]}>{value}</span>
      <div
        className={`${classes["options-wrapper"]} ${isOpen ? "is-open" : ""}`}
        ref={optionsWrapperRef}
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
        onTransitionEnd={handleOnTransitionEnd}
        data-status="closed"
      >
        <ul className={classes["select__options"]} ref={optionsMenuRef}>
          {options.map((option, i) => (
            <li
              key={option.value}
              className={classes["select__option"]}
              onClick={handleOnOptionClick.bind(null, option.value)}
              onMouseOver={() => setCurrentFocus(i)}
              ref={(el: HTMLLIElement) => pushOptionsRef(el, i)}
              tabIndex={isKeyboardActive && currentFocus === i ? 0 : -1}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Select;
