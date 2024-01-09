import { MouseEvent, useEffect, useRef, useState } from "react";
import "./Select.css";

export type SelectOption = {
  label: string;
  value: string;
};

interface SelectProps {
  className?: string;
  options: SelectOption[];
  value: string;
  onChange: (option: string) => void;
}

function Select({ className, options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Set the visibility of select-options
  const [isVisible, setIsVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

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
      setHighlightedIndex(0);
      setIsVisible(true);
    } else {
      const transitionDuration =
        getTransitionTime(optionsRef.current as Element) * 1000;

      setTimeout(() => setIsVisible(false), transitionDuration);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyNav(e: KeyboardEvent) {
      if (e.target != containerRef.current) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) {
            onChange(options[highlightedIndex].value);
          }
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newIndex =
            e.key === "ArrowDown" ? highlightedIndex + 1 : highlightedIndex - 1;
          if (newIndex >= 0 && newIndex < options.length) {
            setHighlightedIndex(newIndex);
          }
          break;
        case "Escape":
          setIsOpen(false);
      }
    }
    containerRef.current?.addEventListener("keydown", handleKeyNav);

    return () => {
      containerRef.current?.removeEventListener("keydown", handleKeyNav);
    };
  }, [isOpen, highlightedIndex]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`select-container ${className ? className : ""}`}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="select__value">{value}</span>
      <div
        className={`options-wrapper ${isOpen ? "is-open" : ""}`}
        ref={optionsRef}
      >
        {isVisible && (
          <ul className="select__options">
            {options.map((option, i) => (
              <li
                key={option.value}
                className={`select__option ${
                  i === highlightedIndex ? "highlighted" : ""
                }`}
                onClick={handleOnOptionClick.bind(null, option.value)}
                onMouseOver={() => setHighlightedIndex(i)}
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

// TODO create useActiveSelect hook

function useActiveSelect() {}

function getTransitionTime(element: Element) {
  return +window
    .getComputedStyle(element)
    .getPropertyValue("transition-duration")
    .replace("s", "");
}

export default Select;
