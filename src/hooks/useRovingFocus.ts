import { useState, useEffect, RefObject } from "react";

function useRovingFocus<T extends HTMLElement>(
  container: RefObject<HTMLElement | T>,
  items: RefObject<HTMLElement[] | T[]>,
  onEnter?: () => void,
  onEscape?: () => void
) {
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);

  useEffect(() => {
    if (items.current) {
      items.current[currentFocus] && items.current[currentFocus].focus();
    }

    const c = container.current;
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.code) {
        case "Enter":
          setIsKeyboardActive(true);
          onEnter && onEnter();
          break;
        case "ArrowUp":
          e.preventDefault();
          setCurrentFocus((focus) =>
            focus === 0 ? items.current!.length - 1 : focus - 1
          );
          break;
        case "ArrowDown":
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
    c?.addEventListener("keydown", handleKeyDown);

    return () => {
      c?.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentFocus]);

  return {
    currentFocus,
    isKeyboardActive,
    setCurrentFocus,
    setIsKeyboardActive,
  };
}

export default useRovingFocus;
