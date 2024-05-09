import { RefObject, useEffect } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!e.target) return;
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export default useClickOutside;
