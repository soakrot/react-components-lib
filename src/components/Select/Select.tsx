import { MouseEvent, useEffect, useRef, useState } from "react";
import { useOpenMenu, useRoveFocus } from "../../hooks";
import "./Select.css";

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
  // Set the visibility of select-options
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsWrapperRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLLIElement[]>([]);
  const {
    currentFocus,
    setCurrentFocus,
    isKeyboardActive,
    setIsKeyboardActive,
  } = useRoveFocus({
    container: containerRef.current as HTMLElement,
    items: optionsRef?.current,
    onEnterPress: handleEnterKeyPress,
    onEscapePress: handleEscapeKeyPress,
  });

  console.log(optionsRef.current);

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

  useEffect(() => {
    if (isOpen) {
      setCurrentFocus(-1);
      setIsVisible(true);
    } else {
      const transitionDuration =
        getTransitionTime(optionsWrapperRef.current as Element) * 1000;
      setIsKeyboardActive(false);
      setTimeout(() => setIsVisible(false), transitionDuration);
    }
  }, [isOpen]);

  return (
    <div
      className={`select-container ${className ? className : ""}`}
      ref={containerRef}
      role="select"
      tabIndex={0}
      aria-disabled={disabled}
      // onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="select__value">{value}</span>
      <div
        className={`options-wrapper ${isOpen ? "is-open" : ""}`}
        ref={optionsWrapperRef}
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
      >
        {isVisible && (
          <ul className="select__options">
            {options.map((option, i) => (
              <li
                key={option.value}
                className={`select__option`}
                onClick={handleOnOptionClick.bind(null, option.value)}
                onMouseOver={() => setCurrentFocus(i)}
                ref={(el) => {
                  if (el) {
                    optionsRef.current[i] = el;
                  }
                }}
                tabIndex={isKeyboardActive && currentFocus === i ? 0 : -1}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function getTransitionTime(element: Element) {
  return +window
    .getComputedStyle(element)
    .getPropertyValue("transition-duration")
    .replace("s", "");
}

export default Select;
