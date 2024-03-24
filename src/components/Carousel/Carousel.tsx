import {
  ComponentType,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./Carousel.module.css";

export type IndicatorProps = {
  index: number;
  onClick: MouseEventHandler;
  className: string;
};

interface CarouselProps {
  items: JSX.Element[];
  className?: string;
  Indicator?: ComponentType<IndicatorProps>;
}

function Carousel({ className, items, Indicator }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useRef<HTMLLIElement[]>([]);
  let transitionCounter = 1;

  useEffect(() => {
    if (slides.current[0]) {
      slides.current[0].dataset.status = "active";
    }
  }, []);

  function handleOnSlideTransitionEnd() {
    if (transitionCounter === 1) {
      slides.current.forEach((slide, i) => {
        if (i === currentIndex) return;
        slide.dataset.status = "inactive";
      });
      transitionCounter++;
    }
  }

  function handleOnButtonsClick(index: number) {
    goToIndex(index);
  }

  function goToIndex(index: number) {
    const nextIndex = index;
    const currentSlide = slides.current[currentIndex];
    const nextSlide = slides.current[nextIndex];
    if (currentIndex === nextIndex) {
      return;
    }
    if (nextIndex < currentIndex) {
      currentSlide.dataset.status = "end";
      nextSlide.dataset.status = "before-start";
    }
    if (nextIndex > currentIndex) {
      currentSlide.dataset.status = "start";
      nextSlide.dataset.status = "before-end";
    }
    setTimeout(() => {
      nextSlide.dataset.status = "active";
    }, 1);
    setCurrentIndex(nextIndex);
  }

  function pushToSlidesRef(index: number, el: HTMLLIElement) {
    slides.current[index] = el;
  }

  return (
    <div className={`${classes.carousel} ${className ? className : ""}`}>
      <ul
        className={classes.carouselContent}
        onTransitionEnd={handleOnSlideTransitionEnd}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className={classes.carouselItem}
            ref={pushToSlidesRef.bind(null, i)}
            data-status="inactive"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className={classes.carouselIndicators}>
        {Indicator &&
          items.map((_, i) => (
            <Indicator
              key={i}
              index={i}
              className={`${classes.carouselIndicator} ${
                currentIndex === i ? "active" : ""
              }`}
              onClick={() => handleOnButtonsClick(i)}
            />
          ))}
        {!Indicator &&
          items.map((_, i) => (
            <button
              key={i}
              className={`${classes.carouselIndicator} ${
                currentIndex === i ? "active" : ""
              }`}
              onClick={() => handleOnButtonsClick(i)}
            ></button>
          ))}
      </div>
    </div>
  );
}

export default Carousel;
