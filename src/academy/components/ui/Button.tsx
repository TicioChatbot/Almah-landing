import { Link } from "react-router-dom";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

const VARIANTS = {
  // CTA principal
  primary: "bg-brand-deep text-white hover:bg-[#04643f] hover:shadow-cta",
  // Botones de brochure
  slateViolet:
    "bg-slate-violet text-white hover:bg-[#59567f] hover:shadow-cta-soft",
  // El borde hace falta para que se distinga sobre blanco
  lavender:
    "border border-ink/40 bg-lavender text-ink hover:bg-[#cbc2f6] hover:shadow-cta-soft",
  // Envío del formulario de inscripción
  dark: "bg-ink text-white hover:bg-[#2a2a2a] hover:shadow-cta-soft",
  // Degradado navy a verde, se desplaza al hover
  gradient:
    "bg-gradient-to-r from-navy to-brand-deep bg-[length:200%_100%] bg-left text-white " +
    "transition-[background-position,transform,box-shadow] hover:bg-right hover:shadow-cta",
  // Secundario sin relleno, para acompañar al primary
  ghost:
    "border border-ink/50 bg-transparent text-ink hover:border-ink/80 hover:bg-ink/[0.03]",
} as const;

// min-h para que los textos largos puedan pasar a dos líneas en móvil
const SIZES = {
  sm: "min-h-12 px-6 py-2.5 text-sm",
  md: "min-h-13 px-8 py-3 text-base",
  lg: "min-h-14 px-9 py-3 text-lg",
} as const;

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;

type BaseProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  /** Flecha al final del texto */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type AsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

// Al hover sube 1px y un brillo (before:) cruza el botón por debajo del texto
const BASE =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden " +
  "rounded-pill text-center font-display leading-tight font-bold tracking-tight " +
  "transition-[transform,box-shadow,background-color,color,border-color] " +
  "duration-(--duration-base) ease-(--ease-out-quart) " +
  "hover:-translate-y-px active:translate-y-0 active:scale-[0.985] " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 " +
  "before:-skew-x-12 before:bg-white/14 before:opacity-0 " +
  "before:transition-[transform,opacity] before:duration-(--duration-slow) before:ease-(--ease-out-quart) " +
  "hover:before:translate-x-[400%] hover:before:opacity-100";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="size-[1.1em] shrink-0 transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-hover/btn:translate-x-1"
    >
      <path
        d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  withArrow = false,
  className,
  children,
  ...props
}: AsButton | AsLink) {
  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow ? (
        <span className="relative z-10 inline-flex">
          <ArrowIcon />
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, onClick, ...anchorProps } = props as AsLink;

    // Anclas internas (#inscripcion, #cursos, etc.): hacer scroll suave sin romper HashRouter
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          e.preventDefault();
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      };

      return (
        <a
          {...anchorProps}
          href={href}
          onClick={handleAnchorClick}
          className={classes}
        >
          {content}
        </a>
      );
    }

    const isExternal = /^https?:\/\//.test(href);
    // PDFs, mailto y tel van con <a> normal, no con Link
    const isPlain = isExternal || /^(mailto:|tel:)/.test(href) || /\.pdf$/i.test(href);

    // Ajustar base url para archivos estáticos locales (ej. /assets/brochures/*.pdf)
    const baseUrl = import.meta.env.BASE_URL || "/";
    const resolvedHref =
      isPlain && href.startsWith("/")
        ? `${baseUrl.replace(/\/$/, "")}${href}`
        : href;

    // noopener en los enlaces que abren otra pestaña
    const safeRel =
      target === "_blank" || isExternal ? cn("noopener noreferrer", rel) : rel;

    if (isPlain) {
      return (
        <a
          {...anchorProps}
          href={resolvedHref}
          target={target ?? (isExternal ? "_blank" : undefined)}
          rel={safeRel}
          onClick={onClick}
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...anchorProps} to={href} rel={safeRel} onClick={onClick} className={classes}>
        {content}
      </Link>
    );
  }

  const { type, ...buttonProps } = props as AsButton;
  return (
    <button {...buttonProps} type={type ?? "button"} className={classes}>
      {content}
    </button>
  );
}
