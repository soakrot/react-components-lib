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
  zoomLvl: number;
  onThumbClick?: MouseEventHandler;
}

function ProductGallery(props: ProductGalleryProps) {
  const { productImgs, className, onThumbClick } = props;
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isZoomed, setIsZoom] = useState(false);
  const productGalleryRef = useRef<HTMLDivElement>(null);
  const heroImgContainerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const zoomPreviewRef = useRef<HTMLDivElement>(null);

  function handleOnThumbClick(i: number, e: MouseEvent<HTMLLIElement>) {
    onThumbClick && onThumbClick(e);
    setCurrentImgIndex(i);
  }

  function handleOnMouseMove(e: MouseEvent<HTMLImageElement>) {
    e.preventDefault();
    if (!heroImgRef.current || !zoomPreviewRef.current) return;
    let x, y;
    const pos = getCursorPosition(e);
    const img = heroImgRef.current;
    // lens size
    const lensOffset = { width: 200, height: 200 };
    // Lens position
    x = pos.x - lensOffset.width / 2;
    y = pos.y - lensOffset.height / 2;
    // Calculate the ratio between zoom preview and the lens
    const cx = zoomPreviewRef.current?.offsetWidth / lensOffset.width;
    const cy = zoomPreviewRef.current?.offsetHeight / lensOffset.height;
    // Prevent the lens from being positioned outside the image
    if (x > img.width - lensOffset.width) {
      x = img.width - lensOffset.width;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lensOffset.height) {
      y = img.height - lensOffset.height;
    }
    if (y < 0) {
      y = 0;
    }
    zoomPreviewRef.current?.style.setProperty(
      "background-image",
      `url('${img.src}')`
    );
    zoomPreviewRef.current.style.setProperty(
      "background-size",
      `${img.width * cx}px ${img.height * cy}px`
    );
    zoomPreviewRef.current?.style.setProperty(
      "background-position",
      `-${x * cx}px -${y * cy}px`
    );
  }

  function getCursorPosition(e: MouseEvent) {
    if (!heroImgContainerRef.current) return { x: 0, y: 0 };
    let y = 0,
      x = 0;
    x = e.pageX - heroImgContainerRef.current?.getBoundingClientRect().left;
    y = e.pageY - heroImgContainerRef.current?.getBoundingClientRect().top;
    x = x - window.scrollX;
    y = y - window.scrollY;
    return {
      y,
      x,
    };
  }

  return (
    <div
      className={`product-gallery ${className || ""}`}
      ref={productGalleryRef}
    >
      {isZoomed && (
        <div className="product-gallery__zoom" ref={zoomPreviewRef}></div>
      )}
      <div
        className="product-gallery__hero"
        ref={heroImgContainerRef}
        onMouseMove={handleOnMouseMove}
        onMouseOver={() => setIsZoom(true)}
        onMouseLeave={() => setIsZoom(false)}
      >
        <Image
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
