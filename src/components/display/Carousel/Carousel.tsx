import {
  ComponentType,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Carousel.css";
import icons from "/assets/icons-sprite.svg";
import { useTouchSwipe } from "../../../hooks";

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
  direction?: "horizontal" | "vertical";
  type?: "controls" | "indicator" | "both";
  animationType?: "slide" | "fade";
  Indicator?: ComponentType<IndicatorProps>;
  onIndictClick?: (i: number) => void;
  onControlsClick?: (i: number) => void;
  onSwipe?: (i: number) => void;
}

function Carousel(props: CarouselProps) {
  const {
    autoPlay,
    animationType = "slide",
    className,
    items,
    direction = "horizontal",
    type = "controls",
    Indicator,
    onIndictClick,
    onControlsClick,
    onSwipe,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (slides.current[0]) {
      slides.current[0].classList.add("carousel-active");
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
  // useTouchSwipe(currentIndex, slidesContainerRef, items.length, onTouchSwipeHandler);
  const bindToCarouselContent = useTouchSwipe(
    onTouchSwipeLeftHandler,
    onTouchSwipeRightHandler
  );

  function handleOnIndicatorClick(i: number) {
    goToSlide(i);
    onIndictClick && onIndictClick(i);
  }

  function handleOnNextClick() {
    goToSlide(currentIndex >= slides.current.length - 1 ? 0 : currentIndex + 1);
    onControlsClick && onControlsClick(currentIndex);
  }

  function handleOnPrevClick() {
    goToSlide(
      currentIndex === 0 ? slides.current.length - 1 : currentIndex - 1
    );
    onControlsClick && onControlsClick(currentIndex);
  }

  function onTouchSwipeLeftHandler() {
    onTouchSwipeHandler(currentIndex === 0 ? 0 : currentIndex - 1);
  }

  function onTouchSwipeRightHandler() {
    const lastSlideIndex = items.length - 1;
    onTouchSwipeHandler(
      currentIndex >= lastSlideIndex ? lastSlideIndex : currentIndex + 1
    );
  }

  function onTouchSwipeHandler(i: number) {
    goToSlide(i);
    onSwipe && onSwipe(i);
  }

  function goToSlide(i: number) {
    const nextIndex = i;
    const currentSlide = slides.current[currentIndex];
    const nextSlide = slides.current[nextIndex];
    if (currentIndex === nextIndex) {
      return;
    }
    if (nextIndex < currentIndex) {
      moveToEnd(currentSlide, nextSlide);
    }
    if (nextIndex > currentIndex) {
      moveToStart(currentSlide, nextSlide);
    }
    setCurrentIndex(nextIndex);
  }

  function moveToEnd(currentSlide: Element, nextSlide: Element) {
    currentSlide.classList.add("carousel-end");
    nextSlide.classList.add("carousel-start");
    toggleSlide(nextSlide);
    setTimeout(() => {
      nextSlide.classList.remove("carousel-start");
    }, 1);
    setTimeout(
      () => {
        toggleSlide(currentSlide);
        currentSlide.classList.remove("carousel-end");
      },
      getAnimationDuration(currentSlide) * 1000
    );
  }

  function moveToStart(currentSlide: Element, nextSlide: Element) {
    currentSlide.classList.add("carousel-start");
    nextSlide.classList.add("carousel-end");
    toggleSlide(nextSlide);
    setTimeout(() => {
      nextSlide.classList.remove("carousel-end");
    }, 1);
    setTimeout(
      () => {
        currentSlide.classList.remove("carousel-start");
        toggleSlide(currentSlide);
      },
      getAnimationDuration(currentSlide) * 1000
    );
  }

  function toggleSlide(slide: Element) {
    slide.classList.toggle("carousel-active");
  }

  function pushToSlidesRef(i: number, el: HTMLLIElement) {
    slides.current[i] = el;
  }

  const controls = (
    <>
      <button
        aria-label="previous"
        className="carousel__control-prev"
        onClick={handleOnPrevClick}
      >
        <svg>
          <use href={`${icons}#icon-chevron-thin-down`}></use>
        </svg>
      </button>
      <button
        aria-label="next"
        className="carousel__control-next"
        onClick={handleOnNextClick}
      >
        <svg>
          <use href={`${icons}#icon-chevron-thin-down`}></use>
        </svg>
      </button>
    </>
  );

  const indicators = (
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
  );

  return (
    <div
      className={`carousel carousel--${direction} ${className ? className : ""} ${animationType}`}
    >
      <ul className="carousel__content" {...bindToCarouselContent}>
        {items.map((item, i) => (
          <li
            key={i}
            className="carousel__item"
            ref={pushToSlidesRef.bind(null, i)}
          >
            {item}
          </li>
        ))}
      </ul>
      {type === "controls" && controls}
      {type === "indicator" && indicators}
      {type === "both" && (
        <>
          {controls}
          {indicators}
        </>
      )}
    </div>
  );
}

function getAnimationDuration(el: Element) {
  return parseFloat(
    window
      .getComputedStyle(el)
      .getPropertyValue("transition-duration")
      .replace("s", "")
  );
}

export default Carousel;
