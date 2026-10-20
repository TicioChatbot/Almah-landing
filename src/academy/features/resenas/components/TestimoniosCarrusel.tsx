"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/cn";
import type { Resena } from "../types";

/** Milisegundos entre avances automáticos. */
const INTERVALO_MS = 7000;

function FlechaIcon({ direccion }: { direccion: "izquierda" | "derecha" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn("size-5", direccion === "izquierda" && "rotate-180")}
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

/*
 * Carrusel con scroll-snap. El JS agrega botones, indicadores, flechas del
 * teclado y avance automático. El avance se pausa con hover, foco, pestaña
 * oculta o prefers-reduced-motion.
 */
export function TestimoniosCarrusel({ resenas }: { resenas: Resena[] }) {
  const pistaRef = useRef<HTMLUListElement>(null);
  const [activa, setActiva] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [reducirMovimiento, setReducirMovimiento] = useState(true);

  const total = resenas.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => setReducirMovimiento(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, []);

  // Al pasar del final vuelve al inicio
  const irA = useCallback(
    (indice: number) => {
      const pista = pistaRef.current;
      if (!pista) return;
      const destino = ((indice % total) + total) % total;
      const tarjeta = pista.children[destino] as HTMLElement | undefined;
      if (!tarjeta) return;
      // Se actualiza antes de que termine el scroll suave
      setActiva(destino);
      pista.scrollTo({
        left: tarjeta.offsetLeft - pista.offsetLeft,
        behavior: reducirMovimiento ? "auto" : "smooth",
      });
    },
    [total, reducirMovimiento],
  );

  // Calcula la tarjeta activa según el scroll (también con swipe)
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;
    let frame = 0;
    const alDesplazar = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const tarjetas = Array.from(pista.children) as HTMLElement[];
        const posicion = pista.scrollLeft;
        let masCercana = 0;
        let distancia = Number.POSITIVE_INFINITY;
        tarjetas.forEach((tarjeta, i) => {
          const d = Math.abs(tarjeta.offsetLeft - pista.offsetLeft - posicion);
          if (d < distancia) {
            distancia = d;
            masCercana = i;
          }
        });
        setActiva(masCercana);
      });
    };
    pista.addEventListener("scroll", alDesplazar, { passive: true });
    return () => {
      pista.removeEventListener("scroll", alDesplazar);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Avance automático
  useEffect(() => {
    if (pausado || oculta || reducirMovimiento || total < 2) return;
    const id = window.setInterval(() => irA(activa + 1), INTERVALO_MS);
    return () => window.clearInterval(id);
  }, [activa, pausado, oculta, reducirMovimiento, total, irA]);

  // Pausa si la pestaña no está visible
  useEffect(() => {
    const alCambiar = () => setOculta(document.hidden);
    document.addEventListener("visibilitychange", alCambiar);
    return () => document.removeEventListener("visibilitychange", alCambiar);
  }, []);

  const alTeclear = (evento: KeyboardEvent<HTMLElement>) => {
    if (evento.key === "ArrowRight") {
      evento.preventDefault();
      irA(activa + 1);
    } else if (evento.key === "ArrowLeft") {
      evento.preventDefault();
      irA(activa - 1);
    }
  };

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Testimonios de participantes"
      className="flex w-full flex-col gap-8"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPausado(false);
        }
      }}
      onKeyDown={alTeclear}
    >
      {/* En móvil llega al borde para que asome la siguiente tarjeta.
          El padding vertical evita que se corte la sombra del hover. */}
      <ul
        ref={pistaRef}
        className="-mx-6 -mb-8 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pt-3 pb-12 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {resenas.map((resena, indice) => (
          <li
            key={resena.id}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`Reseña ${indice + 1} de ${total}`}
            className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <figure
              className={cn(
                "hairline-gradient relative flex h-full flex-col gap-5 rounded-3xl bg-lavender-mist p-7 shadow-card sm:p-8",
                "transition-[transform,box-shadow] duration-(--duration-slow) ease-(--ease-out-quart) after:opacity-0 after:transition-opacity after:duration-(--duration-slow)",
                "hover:-translate-y-1.5 hover:shadow-card-hover hover:after:opacity-100",
              )}
            >
              <span
                aria-hidden="true"
                className="text-gradient-brand font-display text-6xl leading-none font-bold select-none"
              >
                “
              </span>
              <blockquote className="flex-1 text-lg leading-relaxed text-pretty text-ink sm:text-xl">
                {resena.cita}
              </blockquote>
              <span aria-hidden="true" className="h-0.5 w-10 rounded-full bg-brand-gradient" />
            </figure>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-6">
        <p aria-live="polite" className="text-sm font-semibold text-ink/70">
          {activa + 1} / {total}
        </p>

        {/* Indicadores, el activo es más ancho */}
        <div className="flex items-center gap-2" aria-hidden="true">
          {resenas.map((resena, indice) => (
            <button
              key={resena.id}
              type="button"
              tabIndex={-1}
              onClick={() => irA(indice)}
              className={cn(
                "h-2 rounded-full transition-[width,background-color] duration-(--duration-base) ease-(--ease-out-quart)",
                indice === activa
                  ? "w-8 bg-brand-deep"
                  : "w-2 bg-ink/25 hover:bg-ink/45",
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => irA(activa - 1)}
            aria-label="Reseña anterior"
            className="flex size-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-card transition-[transform,box-shadow,background-color,border-color] duration-(--duration-base) ease-(--ease-out-quart) hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-card-hover active:translate-y-0"
          >
            <FlechaIcon direccion="izquierda" />
          </button>
          <button
            type="button"
            onClick={() => irA(activa + 1)}
            aria-label="Reseña siguiente"
            className="flex size-11 items-center justify-center rounded-full bg-brand-deep text-white shadow-cta transition-[transform,box-shadow,background-color] duration-(--duration-base) ease-(--ease-out-quart) hover:-translate-y-0.5 hover:bg-[#04643f] active:translate-y-0"
          >
            <FlechaIcon direccion="derecha" />
          </button>
        </div>
      </div>
    </section>
  );
}
