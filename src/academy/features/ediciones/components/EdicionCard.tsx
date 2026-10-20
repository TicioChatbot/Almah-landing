import Image from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { Edicion } from "../types";
import { esDato } from "../utils";

// Tarjeta de una edición anterior
export function EdicionCard({ edicion }: { edicion: Edicion }) {
  const necesitaPlaca = edicion.aliado.necesitaFondo === "oscuro";

  const detalles = [
    { etiqueta: "Cupos", valor: edicion.detalles.cupos },
    { etiqueta: "Duración", valor: edicion.detalles.duracion },
    { etiqueta: "Inversión", valor: edicion.detalles.precio },
  ].filter((d) => esDato(d.valor));

  return (
    <Card bordered={false} className="h-full rounded-card">
      <div className="flex flex-1 flex-col gap-5 p-7">
        {/* Reserva 3 líneas para que las tarjetas queden alineadas */}
        <h3 className="min-h-[3lh] text-center font-display text-xl leading-snug font-bold text-balance text-navy">
          {edicion.titulo}
        </h3>

        <div className="flex flex-col items-center gap-2">
          <p className="font-display text-[11px] font-bold tracking-[0.14em] text-slate-violet uppercase">
            En alianza con
          </p>
          {/* Misma altura con o sin placa para alinear las tarjetas.
              TODO: pedir el logo de Bermúdez & Ulloa en versión oscura */}
          <div
            className={cn(
              "flex h-16 items-center justify-center",
              necesitaPlaca && "w-fit min-w-[8.5rem] rounded-xl bg-ink px-4",
            )}
          >
            <Image
              src={edicion.aliado.logo.src}
              alt={edicion.aliado.logo.alt}
              width={edicion.aliado.logo.width}
              height={edicion.aliado.logo.height}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        {detalles.length ? (
          <dl className="flex flex-wrap justify-center gap-2">
            {detalles.map((d) => (
              <div
                key={d.etiqueta}
                className="flex items-baseline gap-1.5 rounded-pill bg-lavender-mist px-3 py-1.5 text-sm"
              >
                <dt className="font-semibold text-ink/70">{d.etiqueta}</dt>
                <dd className="font-bold text-ink">{d.valor}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="flex flex-col gap-2">
          <h4 className="font-display text-[11px] font-bold tracking-[0.14em] text-slate-violet uppercase">
            Herramientas
          </h4>
          <ul className="flex flex-wrap gap-1.5">
            {edicion.techStack.map((herramienta) => (
              <li
                key={herramienta}
                className="rounded-pill border border-ink/12 px-2.5 py-1 text-xs font-semibold text-ink"
              >
                {herramienta}
              </li>
            ))}
          </ul>
        </div>

        {/* Sin brochure no se muestra el botón */}
        {edicion.brochureUrl ? (
          <Button
            href={edicion.brochureUrl}
            variant="slateViolet"
            size="sm"
            fullWidth
            withArrow
            className="mt-auto"
          >
            Brochure del curso
            <span className="sr-only">
              {" "}
              de {edicion.titulo} (se abre en una pestaña nueva)
            </span>
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

