import Image from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SITE } from "@/config/site";
import { cn } from "@/lib/cn";
import type { Curso } from "../types";

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-2xl bg-lavender-mist px-4 py-3">
      <dt className="font-display text-[11px] font-bold tracking-[0.14em] text-slate-violet uppercase">
        {etiqueta}
      </dt>
      <dd className="text-sm leading-snug font-semibold text-ink">{valor}</dd>
    </div>
  );
}

function Rotulo({ children }: { children: string }) {
  return (
    <h4 className="font-display text-sm font-bold tracking-[0.12em] text-slate-violet uppercase">
      {children}
    </h4>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className}>
      <path
        d="m5 7.5 5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Ficha de un próximo curso. Los bloques sin datos no se muestran.
export function CursoCard({ curso }: { curso: Curso }) {
  const pendiente = curso.estado === "contenido-pendiente";
  const modulos = curso.modulos ?? [];
  const logros = curso.logros ?? [];

  return (
    <Card className="h-full w-full">
      <div className="relative aspect-[420/180] w-full overflow-hidden">
        <Image
          src={curso.banner.src}
          alt={curso.banner.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover"
        />
        {/* Degradado para que resalte el logo del aliado */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent"
        />
        {curso.aliado ? (
          <div
            className={cn(
              "absolute bottom-4 left-5 flex h-16 items-center rounded-xl px-3.5 shadow-card",
              curso.aliado.necesitaFondo === "oscuro" ? "bg-ink" : "bg-white",
            )}
          >
            <Image
              src={curso.aliado.logo.src}
              alt={curso.aliado.logo.alt}
              width={curso.aliado.logo.width}
              height={curso.aliado.logo.height}
              className="h-12 w-auto object-contain"
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-6 p-7 sm:p-8">
        <header className="flex flex-col gap-3">
          {curso.nivel ? (
            <p className="inline-flex w-fit items-center rounded-pill bg-brand-deep px-3 py-1 font-display text-xs font-bold tracking-[0.12em] text-white uppercase">
              Nivel {curso.nivel}
            </p>
          ) : null}
          <h3 className="font-display text-2xl leading-tight font-bold text-balance text-navy">
            {curso.titulo}
          </h3>
          {curso.aliado ? (
            <p className="text-sm text-ink/70">
              En alianza con{" "}
              <span className="font-semibold text-ink">
                {curso.aliado.nombre}
              </span>
            </p>
          ) : null}
        </header>

        {pendiente ? (
          <p className="text-ink/70">
            Estamos afinando el programa de este curso. Déjanos tus datos y
            serás de los primeros en conocer las fechas y el temario.
          </p>
        ) : null}

        {curso.datos?.length ? (
          /* Si hay un número impar, el último ocupa las dos columnas */
          <dl className="grid gap-3 sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
            {curso.datos.map((dato) => (
              <Dato key={dato.etiqueta} {...dato} />
            ))}
          </dl>
        ) : null}

        {curso.dirigidoA ? (
          <section className="flex flex-col gap-1.5">
            <Rotulo>Dirigido a</Rotulo>
            <p className="text-pretty text-ink/85">{curso.dirigidoA}</p>
          </section>
        ) : null}

        {modulos.length ? (
          /* Programa plegable con <details> */
          <details className="group/prog rounded-2xl border border-ink/10 transition-colors duration-(--duration-base) open:border-ink/20 open:bg-lavender-mist/60">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display font-bold text-navy select-none [&::-webkit-details-marker]:hidden">
              <span>
                Programa
                <span className="ml-2 font-body text-sm font-semibold text-ink/70">
                  {modulos.length} módulos
                </span>
              </span>
              <ChevronIcon className="size-5 shrink-0 text-slate-violet transition-transform duration-(--duration-base) ease-(--ease-out-quart) group-open/prog:rotate-180" />
            </summary>
            <ol className="flex flex-col gap-3 px-5 pt-1 pb-5">
              {modulos.map((modulo) => (
                <li key={modulo.numero} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-violet to-brand-deep font-display text-sm font-bold text-white"
                  >
                    {modulo.numero}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="leading-snug font-semibold text-ink">
                      <span className="sr-only">Módulo {modulo.numero}: </span>
                      {modulo.titulo}
                    </p>
                    <p className="text-sm text-ink/65">
                      {modulo.duracion} · {modulo.modalidad}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </details>
        ) : null}

        {logros.length ? (
          /* Con módulos, los logros son la metodología (lista simple).
             Sin módulos, van numerados y el bloque se estira para igualar
             la altura de la otra ficha. */
          <section
            className={cn(
              "flex flex-col gap-3",
              !modulos.length && "flex-1",
            )}
          >
            <Rotulo>{modulos.length ? "Metodología" : "¿Qué vas a lograr?"}</Rotulo>
            {modulos.length ? (
              <ul className="flex flex-col gap-2.5">
                {logros.map((logro) => (
                  <li key={logro.titulo} className="flex gap-3 text-ink/85">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand-deep"
                    />
                    <p>
                      <strong className="font-display font-bold text-ink">
                        {logro.titulo}.
                      </strong>{" "}
                      {logro.detalle}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <ol className="flex flex-1 flex-col justify-evenly gap-4 rounded-2xl border border-ink/10 bg-lavender-mist/60 px-5 py-5">
                {logros.map((logro, indice) => (
                  <li key={logro.titulo} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-violet to-brand-deep font-display text-sm font-bold text-white"
                    >
                      {indice + 1}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <p className="leading-snug font-semibold text-ink">
                        {logro.titulo}
                      </p>
                      <p className="text-sm text-ink/70">{logro.detalle}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ) : null}

        {curso.herramientas?.length ? (
          <section className="flex flex-col gap-2">
            <Rotulo>Herramientas</Rotulo>
            <ul className="flex flex-wrap gap-2">
              {curso.herramientas.map((herramienta) => (
                <li
                  key={herramienta}
                  className="rounded-pill border border-ink/12 bg-white px-3 py-1 text-sm font-semibold text-ink"
                >
                  {herramienta}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Si el curso está pendiente, el CTA es la lista de espera */}
        <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
          <Button href={SITE.inscripcionAnchor} className="flex-1">
            {pendiente ? "Únete a la lista de espera" : "Reserva tu cupo."}
          </Button>
          {curso.brochure ? (
            <Button
              href={curso.brochure.href}
              variant="ghost"
              withArrow
              target="_blank"
              className="flex-1"
            >
              {curso.brochure.etiqueta}
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

