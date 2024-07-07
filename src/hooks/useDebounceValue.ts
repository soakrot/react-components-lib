import { useEffect, useState } from "react";

function useDebounceValue<T>(value: T, delay = 1000) {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounceValue;
