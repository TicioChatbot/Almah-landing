import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Contenedor centrado de 1240px
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}

// compact para las secciones más bajas
type Spacing = "normal" | "compact";

const SPACING: Record<Spacing, string> = {
  normal: "py-20 sm:py-24",
  compact: "py-16",
};

// Si className trae su propio py-* no se aplica el de SPACING. twMerge solo
// reemplaza clases con el mismo breakpoint, así que py-16 no quitaba sm:py-24.
const RELLENO_VERTICAL_PROPIO = /(?:^|\s)(?:[a-z0-9-]+:)*py-/;

type SectionProps = {
  id?: string;
  /** Fondo oscuro (cambia el color del foco) */
  onDark?: boolean;
  spacing?: Spacing;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  onDark,
  spacing = "normal",
  className,
  children,
}: SectionProps) {
  const rellenoDelLlamador = RELLENO_VERTICAL_PROPIO.test(className ?? "");

  return (
    <section
      id={id}
      // scroll-mt deja margen al saltar con anclas
      className={cn(
        "relative scroll-mt-8",
        !rellenoDelLlamador && SPACING[spacing],
        onDark && "on-dark",
        className,
      )}
    >
      {children}
    </section>
  );
}

// Título de sección con entradilla opcional
export function SectionHeading({
  title,
  lead,
  align = "center",
  tone = "dark",
  as: Tag = "h2",
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Tag
        className={cn(
          "font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[3.5rem] lg:leading-[1.08]",
          tone === "dark" ? "text-navy" : "text-white",
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p
          className={cn(
            "max-w-[65ch] text-lg text-pretty sm:text-xl",
            tone === "dark" ? "text-ink/80" : "text-white/90",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
