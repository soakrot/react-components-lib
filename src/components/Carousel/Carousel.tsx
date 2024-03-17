import { ReactNode, useEffect, useRef, useState } from "react";
import classes from "./Carousel.module.css";

interface CarouselProps {
  items: ReactNode[];
  className?: string;
}

function Carousel({ className, items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    slides.current[0].dataset.status = "active";
  }, []);

  function goToIndex(index: number) {
    const prevIndex = currentIndex;
    const nextIndex = index;
    const currentSlide = slides.current[prevIndex];
    const nextSlide = slides.current[nextIndex];
    let transitionCounter = 1;
    if (prevIndex === nextIndex) {
      return;
    }
    if (nextIndex < prevIndex) {
      currentSlide.dataset.status = "end";
      nextSlide.dataset.status = "before-start";
    }
    if (nextIndex > prevIndex) {
      currentSlide.dataset.status = "start";
      nextSlide.dataset.status = "before-end";
    }
    currentSlide.addEventListener("transitionend", () => {
      if (transitionCounter === 1) {
        currentSlide.dataset.status = "inactive";
        transitionCounter++;
      }
    });
    setTimeout(() => {
      nextSlide.dataset.status = "active";
    }, 1);
    setCurrentIndex(nextIndex);
  }

  function pushToSlidesRef(index: number, el: HTMLLIElement) {
    slides.current[index] = el;
  }

  function goToPrevious() {
    // setCurrentIndex((prevIndex) =>
    //   prevIndex === 0 ? items.length - 1 : prevIndex - 1
    // );
  }

  function goToNext() {
    // setCurrentIndex((prevIndex) =>
    //   prevIndex === items.length - 1 ? 0 : prevIndex + 1
    // );
  }

  return (
    <div className={`${classes.carousel} ${className ? className : ""}`}>
      <ul className={classes.carouselContent}>
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
        {items.map((_, i) => (
          <button
            key={i}
            className={currentIndex === i ? classes.active : ""}
            onClick={() => goToIndex(i)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
