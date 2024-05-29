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
    auto: boolean;
    delay?: number;
    direction?: "forward" | "backward";
  };
  className?: string;
  items: JSX.Element[];
  Indicator?: ComponentType<IndicatorProps>;
  onIndictClick?: (index: number) => void;
}

function Carousel({
  autoPlay,
  className,
  items,
  Indicator,
  onIndictClick,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useRef<HTMLLIElement[]>([]);
  const transitionTimeout = 200;

  useEffect(() => {
    if (slides.current[0]) {
      showSlide(slides.current[0]);
    }
  }, []);

  // Auto-play carousel
  useEffect(() => {
    let intervalID: NodeJS.Timeout;
    if (autoPlay?.auto) {
      intervalID = autoPlayCarousel();
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [currentIndex]);

  function autoPlayCarousel() {
    const intervalID = setInterval(
      () => {
        switch (autoPlay?.direction ?? "forward") {
          case "forward":
            if (currentIndex + 1 > items.length - 1) {
              goToSlide(0);
            } else {
              goToSlide(currentIndex + 1);
            }
            break;
          case "backward":
            if (currentIndex - 1 < 0) {
              goToSlide(items.length - 1);
            } else {
              goToSlide(currentIndex - 1);
            }
            break;
        }
      },
      (autoPlay?.delay ?? 3) * 1000
    );
    return intervalID;
  }
  //

  function goToSlide(index: number) {
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
    setCurrentIndex(nextIndex);
  }

  function showSlide(slide: Element) {
    slide.classList.remove("carousel-inactive");
    slide.classList.add("carousel-active");
  }

  function hideSlide(slide: Element) {
    slide.classList.remove("carousel-active");
    slide.classList.add("carousel-inactive");
  }

  function moveToStart(currentSlide: Element, nextSlide: Element) {
    currentSlide.classList.add("carousel-end");
    showSlide(nextSlide);
    nextSlide.classList.add("carousel-before-start");
    setTimeout(() => {
      currentSlide.classList.remove("carousel-end");
      hideSlide(currentSlide);
      nextSlide.classList.remove("carousel-before-start");
    }, transitionTimeout);
  }

  function moveToEnd(currentSlide: Element, nextSlide: Element) {
    currentSlide.classList.add("carousel-start");
    nextSlide.classList.add("carousel-before-end");
    showSlide(nextSlide);
    setTimeout(() => {
      currentSlide.classList.remove("carousel-start");
      hideSlide(currentSlide);
      nextSlide.classList.remove("carousel-before-end");
    }, transitionTimeout);
  }

  function pushToSlidesRef(index: number, el: HTMLLIElement) {
    slides.current[index] = el;
  }

  function handleOnIndicatorClick(index: number) {
    goToSlide(index);
    onIndictClick && onIndictClick(index);
  }

  return (
    <div className={`carousel ${className ? className : ""}`}>
      <ul className="carousel__content">
        {items.map((item, i) => (
          <li
            key={i}
            className="carousel__item carousel-inactive"
            ref={pushToSlidesRef.bind(null, i)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="carousel__indicators">
        {Indicator &&
          items.map((_, i) => (
            <Indicator
              key={i}
              index={i}
              className={`carousel__indicator ${
                currentIndex === i ? "active" : ""
              }`}
              onClick={handleOnIndicatorClick.bind(null, i)}
            />
          ))}
        {!Indicator &&
          items.map((_, i) => (
            <button
              aria-label="slide-indicator-button"
              key={i}
              className={`carousel__indicator ${
                currentIndex === i ? "active" : ""
              }`}
              onClick={handleOnIndicatorClick.bind(null, i)}
            ></button>
          ))}
      </div>
    </div>
  );
}

export default Carousel;
