import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  /** article por defecto */
  as?: ElementType;
  /** Se eleva al pasar el cursor */
  lift?: boolean;
  /** Borde de 1px (las tarjetas de ediciones no lo usan) */
  bordered?: boolean;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

// Al hover o con foco dentro sube, crece la sombra y aparece el borde en degradado
export function Card({
  as: Tag = "article",
  lift = true,
  bordered = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      {...props}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card",
        bordered && "border border-ink/8",
        lift &&
          "hairline-gradient after:opacity-0 after:transition-opacity after:duration-(--duration-slow) " +
            "transition-[transform,box-shadow,border-color] duration-(--duration-slow) ease-(--ease-out-quart) " +
            "hover:-translate-y-1.5 hover:shadow-card-hover hover:after:opacity-100 " +
            "focus-within:-translate-y-1.5 focus-within:shadow-card-hover focus-within:after:opacity-100",
        lift && bordered && "hover:border-transparent focus-within:border-transparent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
