import Image from "@/components/ui/Image";
import { cn } from "@/lib/cn";
import type { Aliado } from "@/types/content";
import { EDICIONES } from "../data";

// Aliados de las ediciones, sin repetir y en el mismo orden
export const ALIADOS: Aliado[] = EDICIONES.reduce<Aliado[]>((lista, edicion) => {
  if (!lista.some((a) => a.logo.src === edicion.aliado.logo.src)) {
    lista.push(edicion.aliado);
  }
  return lista;
}, []);

// Tira de logos: en gris en reposo y a color al pasar el cursor
export function LogosAliados({
  tono = "claro",
  className,
}: {
  /** Fondo sobre el que va la tira */
  tono?: "claro" | "oscuro";
  className?: string;
}) {
  return (
    <ul
      aria-label="Organizaciones con las que hemos dictado cursos"
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-8 gap-y-4",
        className,
      )}
    >
      {ALIADOS.map((aliado) => (
        <li
          key={aliado.logo.src}
          className={cn(
            "flex h-12 items-center transition-[filter,opacity] duration-(--duration-base) ease-(--ease-out-quart)",
            tono === "claro"
              ? "opacity-70 grayscale hover:opacity-100 hover:grayscale-0"
              : "opacity-80 hover:opacity-100",
            aliado.necesitaFondo === "oscuro" &&
              tono === "claro" &&
              "rounded-lg bg-ink px-3",
          )}
        >
          <Image
            src={aliado.logo.src}
            alt={aliado.logo.alt}
            width={aliado.logo.width}
            height={aliado.logo.height}
            className="h-8 w-auto object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

