import { ReactNode, RefObject, useEffect, useRef } from "react";

type obsOptions = {
  rootMargin?: string;
  threshold?: number;
};

interface ScrollspyProps {
  activeClass: string;
  target: RefObject<Element>;
  observeTarget: RefObject<Element> | RefObject<Element[]>;
  obsOptions?: obsOptions;
  children?: ReactNode;
}

function Scrollspy({
  activeClass,
  target,
  observeTarget,
  obsOptions = {},
  children,
}: ScrollspyProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          const match = findMatchingTargetElement(
            target.current!,
            entry.target.id
          );
          if (entry.isIntersecting) {
            match?.classList.add(`${activeClass ? activeClass : "active"}`);
          } else {
            match?.classList.remove(`${activeClass ? activeClass : "active"}`);
          }
        });
      },
      { root: boxRef.current, ...obsOptions }
    );

    if (Array.isArray(observeTarget.current)) {
      observeTarget.current.forEach((t) => obs.observe(t));
    } else {
      obs.observe(observeTarget.current!);
    }
  }, [target.current]);

  return <div ref={boxRef}>{children}</div>;
}

function findMatchingTargetElement(targetElement: Element, id: string) {
  if (!targetElement) return;
  if (!targetElement.hasAttribute("data-scrollspy-target")) {
    for (let i = 0; i < targetElement.childNodes.length; i++) {
      if (!targetElement.hasChildNodes()) break;
      const result: Element = findMatchingTargetElement(
        targetElement.childNodes[i] as Element,
        id
      )!;
      if (result) {
        return result;
      }
    }
  }
  const attr = targetElement.getAttribute("data-scrollspy-target");
  if (id === attr) {
    return targetElement;
  }
}

export default Scrollspy;
