import { MouseEvent, MouseEventHandler, useRef, useState } from "react";
import "./ProductGallery.css";
import { Image } from "../../media";

export type ProductImg = {
  hero: string;
  thumbnail: string;
  alt: string;
};
interface ProductGalleryProps {
  productImgs: ProductImg[];
  className?: string;
  onThumbClick?: MouseEventHandler;
}

function ProductGallery(props: ProductGalleryProps) {
  const { productImgs, className, onThumbClick } = props;
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isZoom, setIsZoom] = useState(false);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroImgContainerRef = useRef<HTMLDivElement>(null);
  // const lensRef = useRef<HTMLDivElement>(null);

  function handleOnThumbClick(i: number, e: MouseEvent<HTMLLIElement>) {
    onThumbClick && onThumbClick(e);
    setCurrentImgIndex(i);
  }

  function handleOnMouseMove(e: MouseEvent<HTMLImageElement>) {
    if (!heroImgRef.current) return;
    const pos = getCursorPosition(e);
    const y = pos.y - heroImgRef.current?.offsetHeight / 2;
    const x = pos.x - heroImgRef.current?.offsetWidth / 2;
    heroImgRef.current?.style.setProperty("left", `${x}px`);
    heroImgRef.current?.style.setProperty("top", `${y}px`);
  }

  function getCursorPosition(e: MouseEvent) {
    if (!heroImgContainerRef.current) return { x: 0, y: 0 };
    const y =
      e.pageY - heroImgContainerRef.current?.getBoundingClientRect().top;
    const x =
      e.pageX - heroImgContainerRef.current?.getBoundingClientRect().left;
    return {
      y,
      x,
    };
  }

  return (
    <div className={`product-gallery ${className || ""}`}>
      <div
        className="product-gallery__hero"
        ref={heroImgContainerRef}
        onMouseMove={handleOnMouseMove}
        onMouseOver={() => setIsZoom(true)}
        onMouseLeave={() => setIsZoom(false)}
      >
        <Image
          className={isZoom ? "zoom" : ""}
          src={productImgs[currentImgIndex].hero}
          alt={productImgs[currentImgIndex].alt}
          ref={heroImgRef}
        />
      </div>
      <ul className="product-gallery__thumbs">
        {productImgs.map((img, i) => (
          <li
            key={i}
            className={`${currentImgIndex === i ? "active" : ""}`}
            onClick={handleOnThumbClick.bind(null, i)}
          >
            <Image src={img.thumbnail} alt={img.alt} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductGallery;
