import {
  ComponentType,
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
  onIndictClick?: (index: number) => void;
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
  const transitionTimeout = 200;
  let transitionEnd = true;

  useEffect(() => {
    if (slides.current[0]) {
      // slides.current[0].dataset.status = "active";
      slides.current[0].classList.remove("carousel-inactive");
      slides.current[0].classList.add("carousel-active");
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
    if (transitionEnd) {
      slides.current.forEach((slide, i) => {
        if (i === currentIndex) return;
        slide.classList.remove("carousel-active");
        slide.classList.add("carousel-inactive");
      });
      transitionEnd = false;
    }
  }

  function handleOnButtonsClick(index: number) {
    goToIndex(index);
    onIndictClick && onIndictClick(index);
  }

  function moveToStart(currentSlide: Element, nextSlide: Element) {
    currentSlide.classList.add("carousel-end");
    nextSlide.classList.add("carousel-before-start");
    setTimeout(() => {
      currentSlide.classList.remove("carousel-end");
      nextSlide.classList.remove("carousel-before-start");
    }, transitionTimeout);
  }

  function moveToEnd(currentSlide: Element, nextSlide: Element) {
    currentSlide.classList.add("carousel-start");
    nextSlide.classList.add("carousel-before-end");
    setTimeout(() => {
      currentSlide.classList.remove("carousel-start");
      nextSlide.classList.remove("carousel-before-end");
    }, transitionTimeout);
  }

  function goToIndex(index: number) {
    const nextIndex = index;
    const currentSlide = slides.current[currentIndex];
    const nextSlide = slides.current[nextIndex];
    if (currentIndex === nextIndex) {
      return;
    }
    if (nextIndex < currentIndex) {
      moveToStart(currentSlide, nextSlide);
    }
    if (nextIndex > currentIndex) {
      moveToEnd(currentSlide, nextSlide);
    }
    setTimeout(() => {
      nextSlide.classList.remove("carousel-inactive");
      nextSlide.classList.add("carousel-active");
    }, 2);
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
            className="carousel-item carousel-inactive"
            ref={pushToSlidesRef.bind(null, i)}
            // data-status="inactive"
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
