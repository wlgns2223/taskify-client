"use client";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { useWindowSize } from "usehooks-ts";

interface ImageGridItemProps {
  src: StaticImageData;
  alt: string;
  className?: string;
}

const MINIMUM_WIDTH = 640;
const MAXIMUM_WIDTH = 1024;

const ImageGridItem: React.FC<ImageGridItemProps> = ({
  src,
  alt,
  className,
}) => {
  const { width } = useWindowSize();
  const classes = twMerge(
    clsx(
      "p-4 sm:p-8",

      className
    )
  );

  const objectStyles = useMemo(() => {
    return {
      objectFit:
        width >= MINIMUM_WIDTH && width <= MAXIMUM_WIDTH ? "cover" : "contain",
      objectPosition:
        width >= MINIMUM_WIDTH && width <= MAXIMUM_WIDTH ? "top" : undefined,
    };
  }, [width]);

  return (
    <Image src={src} alt={alt} fill className={classes} {...objectStyles} />
  );
};
export default ImageGridItem;
