import { useState, useEffect, RefObject, KeyboardEvent } from "react";

function useRovingFocus<T extends HTMLElement>(
  items: RefObject<HTMLElement[]>,
  onEnter?: () => void,
  onEscape?: () => void
) {
  const [currentFocus, setCurrentFocus] = useState(0);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    if (items.current) {
      items.current[currentFocus] && items.current[currentFocus].focus();
    }
  }, [currentFocus]);

  function handleOnKeybrPress(e: KeyboardEvent<T>) {
    switch (e.code) {
      case "Home":
        setCurrentFocus(0);
        break;
      case "End":
        setCurrentFocus(items.current!.length - 1);
        break;
      case "Enter":
        setIsKeyboardActive(true);
        onEnter && onEnter();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        setCurrentFocus((focus) =>
          focus === 0 ? items.current!.length - 1 : focus - 1
        );
        break;
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        setCurrentFocus((focus) =>
          focus === items.current!.length - 1 ? 0 : focus + 1
        );
        break;
      case "Escape":
        setIsKeyboardActive(false);
        onEscape && onEscape();
    }
  }

  return {
    currentFocus,
    isKeyboardActive,
    setCurrentFocus,
    setIsKeyboardActive,
    handleOnKeybrPress,
  };
}

export default useRovingFocus;
