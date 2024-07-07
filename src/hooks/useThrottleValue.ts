import { useEffect, useRef, useState } from "react";

function useThrottleValue<T>(value: T, limit = 1000) {
  const [throttledValue, setThrottledValue] = useState(value);
  const currentTime = Date.now();
  const lastExecTime = useRef(currentTime);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentTime - lastExecTime.current >= limit) {
      setThrottledValue(value);
      lastExecTime.current = currentTime;
    } else {
      timer = setTimeout(() => {
        setThrottledValue(value);
        lastExecTime.current = currentTime;
      }, limit);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [currentTime, value, limit]);

  return throttledValue;
}

export default useThrottleValue;
