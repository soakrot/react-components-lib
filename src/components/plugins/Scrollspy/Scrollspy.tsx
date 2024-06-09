import { ReactNode, RefObject, useEffect, useRef } from "react";
import "./Scrollspy.css";

export type obsOptions = {
  rootMargin?: string;
  threshold?: number;
};

interface ScrollspyProps {
  activeClass: string;
  observeTarget: RefObject<Element> | RefObject<Element[]>;
  obsOptions?: obsOptions;
  children?: ReactNode;
}

function Scrollspy({
  activeClass,
  observeTarget,
  obsOptions = {},
  children,
}: ScrollspyProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(highlightElementInView);
      },
      { root: boxRef.current, ...obsOptions }
    );

    if (Array.isArray(observeTarget.current)) {
      observeTarget.current.forEach((t) => obs.observe(t));
    } else {
      obs.observe(observeTarget.current!);
    }
  }, []);

  function highlightElementInView(entry: IntersectionObserverEntry) {
    const entryID = entry.target.id;
    const match = document.querySelector(`[data-scrollspy-target=${entryID}]`);
    if (entry.isIntersecting) {
      match?.classList.add(`${activeClass ?? "active"}`);
    } else {
      match?.classList.remove(`${activeClass ?? "active"}`);
    }
  }

  return <div ref={boxRef}>{children}</div>;
}

export default Scrollspy;
