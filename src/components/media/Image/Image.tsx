import {
  ComponentPropsWithRef,
  forwardRef,
  SyntheticEvent,
  useState,
} from "react";
import classes from "./Image.module.css";

export type ImgDimensions = { width: number; height: number };

interface ImageProps extends ComponentPropsWithRef<"img"> {
  alt: string;
  className?: string;
  src: string;
  height?: number;
  width?: number;
  role?: "presentation" | "none";
  loading?: "lazy" | "eager";
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
}
type Ref = HTMLImageElement;
const Image = forwardRef<Ref, ImageProps>((props, ref) => {
  const {
    alt,
    src,
    className,
    loading = "lazy",
    role = "img",
    width,
    height,
    onLoad,
    ...otherProps
  } = props;
  const [imgDimensions, setImgDimensions] = useState<ImgDimensions>({
    width: 0,
    height: 0,
  });

  function handleOnImgLoad(e: SyntheticEvent<HTMLImageElement>) {
    onLoad && onLoad(e);
    const img = e.currentTarget;
    setImgDimensions({ width: img.naturalWidth, height: img.naturalHeight });
  }

  return (
    <img
      // required
      alt={alt}
      src={src}
      // optional
      className={`${classes.img} ${className || ""}`}
      role={role}
      loading={loading}
      width={width ?? imgDimensions.width}
      height={height ?? imgDimensions.height}
      onLoad={handleOnImgLoad}
      // private
      decoding="async"
      ref={ref}
      {...otherProps}
    />
  );
});

export default Image;
