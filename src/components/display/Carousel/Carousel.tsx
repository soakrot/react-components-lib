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
  type?: "horizontal" | "vertical";
  Indicator?: ComponentType<IndicatorProps>;
  onIndictClick?: (index: number) => void;
}

function Carousel(props: CarouselProps) {
  const {
    autoPlay,
    className,
    items,
    type = "horizontal",
    Indicator,
    onIndictClick,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (slides.current[0]) {
      // toggleSlide(slides.current[0]);
      slides.current[0].classList.add("carousel-active");
      console.log(slides.current);
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
      moveToEnd(currentSlide, nextSlide);
    }
    if (nextIndex > currentIndex) {
      moveToStart(currentSlide, nextSlide);
    }
    setCurrentIndex(nextIndex);
  }

  function toggleSlide(slide: Element) {
    slide.classList.toggle("carousel-active");
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

  function pushToSlidesRef(index: number, el: HTMLLIElement) {
    slides.current[index] = el;
  }

  function handleOnIndicatorClick(index: number) {
    goToSlide(index);
    onIndictClick && onIndictClick(index);
  }

  return (
    <div className={`carousel carousel--${type} ${className ? className : ""}`}>
      <ul className="carousel__content">
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

function getAnimationDuration(el: Element) {
  return parseFloat(
    window
      .getComputedStyle(el)
      .getPropertyValue("transition-duration")
      .replace("s", "")
  );
}

export default Carousel;
