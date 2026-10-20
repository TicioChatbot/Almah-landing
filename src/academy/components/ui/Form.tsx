"use client";

import {
  createContext,
  useContext,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

// Field genera los ids y los pasa por contexto para enlazar label, control y error

type FieldContextValue = {
  controlId: string;
  errorId: string;
  hintId: string;
  hasError: boolean;
  describedBy: string | undefined;
};

const FieldContext = createContext<FieldContextValue | null>(null);

function useField() {
  const ctx = useContext(FieldContext);
  if (!ctx) {
    throw new Error("Los controles de formulario deben ir dentro de <Field>.");
  }
  return ctx;
}

// Fondo sobre el que va el campo (define el color de etiquetas y errores)
type Tone = "sobre-oscuro" | "sobre-claro";

const TONE_LABEL: Record<Tone, string> = {
  "sobre-oscuro": "text-white",
  "sobre-claro": "text-ink",
};

const TONE_HINT: Record<Tone, string> = {
  "sobre-oscuro": "text-white/70",
  "sobre-claro": "text-ink/70",
};

const TONE_ERROR: Record<Tone, string> = {
  "sobre-oscuro": "text-white",
  "sobre-claro": "text-red-700",
};

export function Field({
  label,
  hint,
  error,
  required,
  tone = "sobre-oscuro",
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  const id = useId();
  const controlId = `${id}-control`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <FieldContext.Provider
      value={{ controlId, errorId, hintId, hasError: Boolean(error), describedBy }}
    >
      <div className={cn("flex flex-col gap-2", className)}>
        <label
          htmlFor={controlId}
          className={cn("font-display font-bold", TONE_LABEL[tone])}
        >
          {label}
          {required ? (
            <>
              <span aria-hidden="true" className="ml-1">
                *
              </span>
              <span className="sr-only"> (obligatorio)</span>
            </>
          ) : null}
        </label>

        {hint ? (
          <p id={hintId} className={cn("text-sm", TONE_HINT[tone])}>
            {hint}
          </p>
        ) : null}

        {children}

        {error ? (
          <p
            id={errorId}
            role="alert"
            className={cn("text-sm font-bold", TONE_ERROR[tone])}
          >
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}

// Estilos comunes de input, textarea y select. Placeholder al 60 % y borde
// oscuro para que tengan contraste en todos los fondos donde se usan.
const CONTROL_BASE =
  "w-full rounded-xl border bg-white px-4 font-display text-ink " +
  "placeholder:text-ink/60 " +
  "transition-[border-color,box-shadow] duration-(--duration-fast) ease-(--ease-out-quart) " +
  "hover:shadow-[0_0_0_4px_rgb(10_4_59_/_0.06)] " +
  "focus:shadow-[0_0_0_4px_rgb(10_4_59_/_0.1)]";

const BORDE_REPOSO = "border-ink";
const BORDE_ERROR = "border-red-600 border-2";

export function Input({
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "id">) {
  const { controlId, hasError, describedBy } = useField();
  return (
    <input
      {...props}
      id={controlId}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy}
      className={cn(
        CONTROL_BASE,
        "h-16",
        hasError ? BORDE_ERROR : BORDE_REPOSO,
        className,
      )}
    />
  );
}

export function Textarea({
  className,
  rows = 6,
  ...props
}: Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">) {
  const { controlId, hasError, describedBy } = useField();
  return (
    <textarea
      {...props}
      id={controlId}
      rows={rows}
      aria-invalid={hasError || undefined}
      aria-describedby={describedBy}
      className={cn(
        CONTROL_BASE,
        "resize-y py-4",
        hasError ? BORDE_ERROR : BORDE_REPOSO,
        className,
      )}
    />
  );
}

export function Select({
  className,
  options,
  placeholder,
  ...props
}: Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "children"> & {
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
}) {
  const { controlId, hasError, describedBy } = useField();
  return (
    <div className="relative">
      <select
        {...props}
        id={controlId}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
        className={cn(
          CONTROL_BASE,
          "h-16 appearance-none pr-12",
          hasError ? BORDE_ERROR : BORDE_REPOSO,
          className,
        )}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Flecha del select */}
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-ink"
      >
        <path
          d="m5 7.5 5 5 5-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
