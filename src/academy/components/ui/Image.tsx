import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type AcademyImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  preload?: boolean;
};

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  preload,
  className,
  style,
  ...rest
}: AcademyImageProps) {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const resolvedSrc = src.startsWith("/")
    ? `${baseUrl.replace(/\/$/, "")}${src}`
    : src;

  return (
    <img
      {...rest}
      src={resolvedSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={preload ? "eager" : "lazy"}
      decoding="async"
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
      style={style}
    />
  );
}
