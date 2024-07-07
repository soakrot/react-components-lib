import { useEffect, useRef } from "react";

function useThrottle<T>(cb: (...args: T[]) => void, limit = 1000) {
  const lastExecTime = useRef(Date.now());
  const timer = useRef<NodeJS.Timeout>();
  function throttledFn(...args: []) {
    const now = Date.now();
    if (now - lastExecTime.current >= limit) {
      cb(...args);
      lastExecTime.current = now;
    } else {
      timer.current = setTimeout(() => {
        cb(...args);
        lastExecTime.current = now;
      }, limit);
    }
  }

  useEffect(() => clearTimeout(timer.current), [limit]);

  return throttledFn;
}

export default useThrottle;
