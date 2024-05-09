import { FocusEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useClickOutside, useRovingFocus } from "../../hooks";
import "./Select.css";
import { randID } from "../../utils/utils";

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps {
  options: SelectOption[];
  value: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  onChange: (option: string) => void;
}

function Select(props: SelectProps) {
  const {
    className,
    disabled = false,
    label,
    options,
    required,
    value,
    onChange,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsWrapperRef = useRef<HTMLDivElement>(null);
  const optionsMenuRef = useRef<HTMLUListElement>(null);
  const optionsRef = useRef<HTMLLIElement[]>([]);
  /* Accessabilty related variables */
  const selectLabel = `select-label-${randID()}`;
  const selectMenuID = `select-options-${randID()}`;
  const optionsIDs = useRef<string[]>([]);
  // Add keyboard navigation support to select menu.
  const {
    currentFocus,
    setCurrentFocus,
    isKeyboardActive,
    setIsKeyboardActive,
  } = useRovingFocus(
    selectRef,
    optionsRef,
    handleEnterKeyPress,
    handleEscapeKeyPress
  );
  useClickOutside(selectRef, () => setIsOpen(false));

  /* On-click handlers */
  function handleOnSelectClick() {
    if (disabled) return;
    setIsOpen((prevState) => !prevState);
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

  /* useRovingFocus's handlers */
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

  function handleOnMenuTranstionEnd() {
    if (isOpen) return;
    let transitionOccurance = 0;
    transitionOccurance++;
    if (transitionOccurance < 2) {
      setIsKeyboardActive(false);
      optionsWrapperRef.current?.setAttribute("data-status", "closed");
    }
  }

  function pushOptionsRef(el: HTMLLIElement, index: number) {
    if (el) {
      optionsRef.current[index] = el;
    }
  }

  function getActiveOptionID() {
    if (!isOpen) return;
    return optionsIDs.current[currentFocus];
  }

  function focusSelect() {
    selectRef.current?.focus();
  }

  function blurSelect() {
    selectRef.current?.blur();
  }

  /* Handles Select menu visibility and navigation */
  useEffect(() => {
    const optionsWrapperStatus = optionsWrapperRef.current?.dataset.status;
    if (isOpen) {
      setCurrentFocus(-1);
      setIsKeyboardActive(true);
      optionsWrapperRef.current?.setAttribute("data-status", "open");
    } else {
      if (optionsWrapperStatus === "closed") return;
      optionsWrapperRef.current?.setAttribute("data-status", "closing");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    optionsIDs.current = optionsRef.current.map(() => `option-${randID()}`);
  }, []);

  return (
    <div className={`select-container ${className ? className : ""}`}>
      <label
        className="select-label"
        aria-label={label}
        id={selectLabel}
        onClick={() => focusSelect()}
        onMouseOver={() => focusSelect()}
        onMouseLeave={() => blurSelect()}
      >
        {label}
      </label>
      <div
        className="select"
        ref={selectRef}
        tabIndex={disabled ? -1 : 0}
        onClick={handleOnSelectClick}
        role="combobox"
        aria-controls={selectMenuID}
        aria-disabled={disabled}
        aria-expanded={isOpen}
        aria-labelledby={selectLabel}
        aria-required={required}
      >
        <span className="select__value">{value}</span>
        <div
          className={`options-wrapper ${isOpen ? "is-open" : ""}`}
          ref={optionsWrapperRef}
          onTransitionEnd={handleOnMenuTranstionEnd}
          data-status="closed"
        >
          <ul
            className="select__options"
            id={selectMenuID}
            ref={optionsMenuRef}
            role="listbox"
            aria-activedescendant={getActiveOptionID()}
          >
            {options.map((option, i) => (
              <li
                className="select__option"
                id={optionsIDs.current[i]}
                role="option"
                key={option.value}
                ref={(el: HTMLLIElement) => pushOptionsRef(el, i)}
                aria-selectsed={i === currentFocus}
                tabIndex={isKeyboardActive && currentFocus === i ? 0 : -1}
                onClick={handleOnOptionClick.bind(null, option.value)}
                onMouseOver={() => setCurrentFocus(i)}
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
