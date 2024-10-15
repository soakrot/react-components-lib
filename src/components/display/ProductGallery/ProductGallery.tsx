import {
  MouseEvent,
  MouseEventHandler,
  RefObject,
  useRef,
  useState,
} from "react";
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
  zoom?: 1 | 2 | 3 | 4;
  onThumbClick?: MouseEventHandler;
}

function ProductGallery(props: ProductGalleryProps) {
  const { productImgs, className, zoom = 1, onThumbClick } = props;
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isZoomed, setIsZoom] = useState(false);
  const productGalleryRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const zoomPreviewRef = useRef<HTMLDivElement>(null);

  function handleOnThumbClick(i: number, e: MouseEvent<HTMLLIElement>) {
    onThumbClick && onThumbClick(e);
    setCurrentImgIndex(i);
  }

  function handleOnMouseMove(e: MouseEvent<HTMLImageElement>) {
    e.preventDefault();
    const cursorPos = getCursorPosition(e, heroImgRef);
    moveLens(heroImgRef, zoomPreviewRef, zoom, cursorPos);
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

function moveLens(
  img: RefObject<HTMLImageElement>,
  previewRef: RefObject<HTMLDivElement | HTMLElement>,
  zoom: number,
  cursorPos: { x: number; y: number }
) {
  const heroImg = img.current;
  if (!heroImg) return;
  const zoomLvl = 400 - 100 * (zoom - 1 || 1);
  const lensOffset = {
    cx: 0,
    cy: 0,
    width: zoomLvl,
    height: zoomLvl,
  };
  lensOffset.cx = cursorPos.x - lensOffset.width / 2;
  lensOffset.cy = cursorPos.y - lensOffset.height / 2;

  const lensDeltaX = heroImg.width - lensOffset.width;
  const lensDeltaY = heroImg.height - lensOffset.height;

  const isLensTopEdgeOutboundImg = lensOffset.cy < 0;
  const isLensBottomEdgeOutboundImg = lensOffset.cy > lensDeltaY;
  const isLensLeftEdgeOutboundImg = lensOffset.cx < 0;
  const isLensRightEdgeOutboundImg = lensOffset.cx > lensDeltaX;

  if (isLensRightEdgeOutboundImg) {
    lensOffset.cx = lensDeltaX;
  }
  if (isLensLeftEdgeOutboundImg) {
    lensOffset.cx = 0;
  }
  if (isLensBottomEdgeOutboundImg) {
    lensOffset.cy = lensDeltaY;
  }
  if (isLensTopEdgeOutboundImg) {
    lensOffset.cy = 0;
  }
  movePreviewImg(heroImg, previewRef, lensOffset);
}

function movePreviewImg(
  img: HTMLImageElement,
  previewRef: RefObject<HTMLDivElement | HTMLElement>,
  lensOffset: { cx: number; cy: number; width: number; height: number }
) {
  const zoomPreview = previewRef.current;
  if (!zoomPreview) return;
  const lensToPreviewRatioX = zoomPreview?.offsetWidth / lensOffset.width;
  const lensToPreviewRatioY = zoomPreview?.offsetHeight / lensOffset.height;
  const previewImg = img;
  const previewImgWidth = previewImg.width * lensToPreviewRatioX;
  const previewImgHeight = previewImg.height * lensToPreviewRatioY;
  const previewImgPosX = -1 * (lensOffset.cx * lensToPreviewRatioX);
  const previewImgPosY = -1 * (lensOffset.cy * lensToPreviewRatioY);

  const zoomPreviewStyles = {
    "background-image": `url('${previewImg.src}')`,
    "background-size": `${previewImgWidth}px ${previewImgHeight}px`,
    "background-position": `${previewImgPosX}px ${previewImgPosY}px`,
    top: `${window.scrollY + 20}px`,
  };

  for (const [prop, val] of Object.entries(zoomPreviewStyles)) {
    zoomPreview.style.setProperty(prop, val);
  }
}

function getCursorPosition(e: MouseEvent, img: RefObject<HTMLImageElement>) {
  const heroImg = img.current;
  if (!heroImg) return { x: 0, y: 0 };
  let y = 0,
    x = 0;
  x = e.pageX - heroImg?.getBoundingClientRect().left;
  y = e.pageY - heroImg?.getBoundingClientRect().top;
  x = x - window.scrollX;
  y = y - window.scrollY;
  return {
    y,
    x,
  };
}
export default ProductGallery;
