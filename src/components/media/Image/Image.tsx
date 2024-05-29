import { AriaAttributes, SyntheticEvent, useState } from "react";
import classes from "./Image.module.css";

export type ImgDimensions = { width: number; height: number };

interface ImageProps extends AriaAttributes {
  alt: string;
  className?: string;
  src: string;
  height?: number;
  width?: number;
  role?: "presentation" | "none";
  loading?: "lazy" | "eager";
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
}

function Image(props: ImageProps) {
  const {
    alt,
    src,
    className,
    loading = "lazy",
    role = "none",
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
    const img = e.currentTarget;
    setImgDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    onLoad && onLoad(e);
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
      {...otherProps}
    />
  );
}

export default Image;
