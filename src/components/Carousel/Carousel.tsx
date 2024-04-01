import {
  ComponentType,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Carousel.css";

export type IndicatorProps = {
  className: string;
  index: number;
  onClick: MouseEventHandler;
};

interface CarouselProps {
  autoPlay?: {
    isEnabled?: boolean;
    delay?: number;
  };
  className?: string;
  items: JSX.Element[];
  Indicator?: ComponentType<IndicatorProps>;
  onIndictClick?: (index?: number, e?: MouseEvent) => void;
}

function Carousel({
  autoPlay = { isEnabled: false, delay: 3000 },
  className,
  items,
  Indicator,
  onIndictClick,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useRef<HTMLLIElement[]>([]);
  let transitionCounter = 1;

  useEffect(() => {
    if (slides.current[0]) {
      slides.current[0].dataset.status = "active";
    }
  }, []);

  if (autoPlay.isEnabled) {
    setInterval(() => {
      if (currentIndex + 1 > items.length - 1) {
        goToIndex(0);
      } else {
        goToIndex(currentIndex + 1);
      }
    }, autoPlay.delay);
  }

  function handleOnSlideTransitionEnd() {
    if (transitionCounter === 1) {
      slides.current.forEach((slide, i) => {
        if (i === currentIndex) return;
        slide.dataset.status = "inactive";
      });
      transitionCounter++;
    }
  }

  function handleOnButtonsClick(index: number, e: MouseEvent) {
    goToIndex(index);
    onIndictClick && onIndictClick(index, e);
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
    <div className={`carousel ${className ? className : ""}`}>
      <ul
        className="carousel-content"
        onTransitionEnd={handleOnSlideTransitionEnd}
      >
        {items.map((item, i) => (
          <li
            key={i}
            className="carousel-item"
            ref={pushToSlidesRef.bind(null, i)}
            data-status="inactive"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="carousel-indicators">
        {Indicator &&
          items.map((_, i) => (
            <Indicator
              key={i}
              index={i}
              className={`carousel-indicator ${
                currentIndex === i ? "active" : ""
              }`}
              onClick={handleOnButtonsClick.bind(null, i)}
            />
          ))}
        {!Indicator &&
          items.map((_, i) => (
            <button
              key={i}
              className={`carousel-indicator ${
                currentIndex === i ? "active" : ""
              }`}
              onClick={handleOnButtonsClick.bind(null, i)}
            ></button>
          ))}
      </div>
    </div>
  );
}

export default Carousel;
