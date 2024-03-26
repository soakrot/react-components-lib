import { FocusEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useRoveFocus } from "../../hooks";
import "./Select.css";
import { randID } from "../../utils/utils";

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

  function handleOnSelectClick() {
    if (disabled) return;
    setIsOpen((prevState) => !prevState);
  }

  function handleEnterKeyPress() {
    if (disabled) return;
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

  function handleOnOptionsMenuTransitionEnd() {
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
    <div>
      <span id={selectLabel}>{label}</span>
      <div
        className={`select-container ${className ? className : ""}`}
        ref={containerRef}
        tabIndex={disabled ? -1 : 0}
        // onBlur={handleOnBlur}
        onClick={handleOnSelectClick}
        role="combobox"
        aria-labelledby={selectLabel}
        aria-disabled={disabled}
        aria-controls={selectOptionsID}
      >
        <span className="select__value">{value}</span>
        <div
          className={`options-wrapper ${isOpen ? "is-open" : ""}`}
          ref={optionsWrapperRef}
          onTransitionEnd={handleOnOptionsMenuTransitionEnd}
          data-status="closed"
        >
          <ul
            id={selectOptionsID}
            className="select__options"
            ref={optionsMenuRef}
            aria-expanded={isOpen}
            aria-hidden={!isOpen}
            aria-activedescendant={activeOptionID.current}
            role="listbox"
          >
            {options.map((option, i) => (
              <li
                aria-selected={i === currentFocus}
                role="option"
                key={option.value}
                id={`option-${randID()}`}
                className="select__option"
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
    </div>
  );
}

export default Select;
