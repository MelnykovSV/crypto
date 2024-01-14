"use client";
import Image from "next/image";
import placeholderImage from "./../assets/image_placeholder.svg";
import { useState } from "react";

interface IImageComponentProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder?: string;
}

export default function ImageComponent({
  src,
  alt,
  width,
  height,
  placeholder,
  ...props
}: IImageComponentProps) {
  const [imageSrc, setImageSrc] = useState(src);
  return (
    <Image
      src={imageSrc.startsWith("https://") ? imageSrc : placeholderImage}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImageSrc(placeholderImage)}
      blurDataURL={placeholderImage}
      {...props}
    />
  );
}
