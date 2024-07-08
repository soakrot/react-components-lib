import { TouchEvent } from "react";

type anonFn<T = HTMLElement> = (e?: TouchEvent<T>) => void;
function useTouchSwipe<T = HTMLElement>(onLeft: anonFn<T>, onRight: anonFn<T>) {
  let vx = 0;
  // Pointer position on vector x
  let px = 0;
  // Time in milliseconds since touch event start
  let ms = 0;
  // Velocity of the swipe
  // let v = 0;
  let dir = 0;
  let minGestureTime: NodeJS.Timeout;
  let isGestureOver = false;

  function onTouchStartHandler(e: TouchEvent<T>) {
    px = e.changedTouches[0].clientX;
    minGestureTime = setInterval(() => ms++);
  }

  function onTouchEndHandler(e: TouchEvent<T>) {
    e.preventDefault();
    vx = e.changedTouches[0].clientX;
    // v = Math.abs(px - vx) / ms;
    dir = vx / px;
    isGestureOver = true;
    clearInterval(minGestureTime);
    if (ms > 200 && !isGestureOver) return;
    if (dir < 1) {
      onRight(e);
    } else if (dir > 1) {
      onLeft(e);
    }
    ms = 0;
    px = 0;
  }

  return {
    onTouchStart: onTouchStartHandler,
    onTouchEnd: onTouchEndHandler,
  };
}

export default useTouchSwipe;
