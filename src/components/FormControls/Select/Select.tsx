import { MouseEvent, useEffect, useRef, useState } from "react";
import { useClickOutside, useRovingFocus } from "../../../hooks";
import "./Select.css";
import { randID } from "../../../utils/utils";
import { OptionList } from "./OptionList";

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
  // const optionsMenuRef = useRef<HTMLUListElement>(null);
  const optionsRef = useRef<HTMLLIElement[]>([]);
  /* Accessabilty related variables */
  const selectLabel = `select-label-${randID()}`;
  const selectMenuID = `select-options-${randID()}`;
  // Add keyboard navigation support to select menu.
  const { currentFocus, setCurrentFocus, setIsKeyboardActive } = useRovingFocus(
    selectRef,
    optionsRef,
    handleEnterKeyPress,
    handleEscapeKeyPress
  );

  /* On-click handlers */
  useClickOutside(selectRef, () => setIsOpen(false));

  function handleOnSelectClick() {
    if (disabled) return;
    setIsOpen((prevState) => !prevState);
  }

  function handleOnOptionClick(
    optionValue: string,
    e: MouseEvent<HTMLLIElement>
  ) {
    e.stopPropagation();
    onChange(optionValue);
    setIsOpen(false);
  }

  function handleOnOptionHover(i: number) {
    setCurrentFocus(i);
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

  return (
    <div className={`select-container ${className ? className : ""}`}>
      <label
        className="select-label"
        aria-label={label}
        id={selectLabel}
        onClick={() => !disabled && focusSelect()}
        onMouseOver={() => !disabled && focusSelect()}
        onMouseLeave={() => !disabled && blurSelect()}
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
          <OptionList
            currentFocus={currentFocus}
            isSelectOpen={isOpen}
            options={options}
            optionsRef={optionsRef}
            onOptionClick={handleOnOptionClick}
            onOptionHover={handleOnOptionHover}
          />
        </div>
      </div>
    </div>
  );
}

export default Select;
