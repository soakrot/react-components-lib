import { useState, useEffect } from "react";

type UseRoveFocus<T> = {
  container: HTMLElement | T;
  items: HTMLElement[];
  onEnterPress?: () => void;
  onEscapePress?: () => void;
};

function useRoveFocus<T extends HTMLElement>({
  container,
  items,
  onEnterPress,
  onEscapePress,
}: UseRoveFocus<T>) {
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [, forceUpdate] = useState(false);

  useEffect(() => forceUpdate(true), []);

  useEffect(() => {
    items[currentFocus] && items[currentFocus].focus();
    console.log(currentFocus);

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.code) {
        case "Enter":
          setIsKeyboardActive(true);
          onEnterPress && onEnterPress();
          break;
        case "ArrowUp":
          e.preventDefault();
          setCurrentFocus((focus) =>
            focus === 0 ? items.length - 1 : focus - 1
          );
          break;
        case "ArrowDown":
          e.preventDefault();
          setCurrentFocus((focus) =>
            focus === items.length - 1 ? 0 : focus + 1
          );
          break;
        case "Escape":
          setIsKeyboardActive(false);
          onEscapePress && onEscapePress();
      }
    }
    container?.addEventListener("keydown", handleKeyDown);

    return () => {
      container?.removeEventListener("keydown", handleKeyDown);
    };
  }, [container, currentFocus, items]);

  return {
    currentFocus,
    isKeyboardActive,
    setCurrentFocus,
    setIsKeyboardActive,
  };
}

export default useRoveFocus;
