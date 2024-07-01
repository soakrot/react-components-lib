import { TouchEvent } from "react";

type anonFn = () => void;
function useTouchSwipe<T extends HTMLElement>(onLeft: anonFn, onRight: anonFn) {
  function onTouchEndHandler(e: TouchEvent<T>) {
    e.preventDefault();
    const container = e.currentTarget;
    const containerCX = (container?.offsetWidth ?? 0) / 2;
    const touchX = e.changedTouches[0].clientX;
    //If last touch position of x is less than slider's x center swipe right.
    if (touchX < containerCX) {
      onRight && onRight();
    }
    //If last touch position of x is more than slider's x center swipe left.
    if (touchX > containerCX) {
      onLeft && onLeft();
    }
  }

  return {
    onTouchEnd: onTouchEndHandler,
  };
}

export default useTouchSwipe;
