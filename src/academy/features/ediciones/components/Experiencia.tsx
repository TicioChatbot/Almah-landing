import Image from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { EXPERIENCIA } from "../content";
import { EDICIONES } from "../data";
import { esDato } from "../utils";
import { LogosAliados } from "./LogosAliados";

// Línea de tiempo con las ediciones anteriores (sin precios)
export function Experiencia() {
  return (
    <Section id="experiencia" className="bg-mesh-soft grain">
      <Container className="flex flex-col gap-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="font-display text-xs font-bold tracking-[0.18em] text-slate-violet uppercase">
            {EXPERIENCIA.antetitulo}
          </p>
          <h2 className="max-w-[24ch] font-display text-3xl font-bold text-balance text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {EXPERIENCIA.titulo}
          </h2>
          <p className="max-w-[62ch] text-lg text-pretty text-ink/80 sm:text-xl">
            {EXPERIENCIA.lead}
          </p>
        </Reveal>

        {/* Línea vertical, fuera del <ol> */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[1.1rem] w-0.5 rounded-full bg-brand-gradient md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="relative flex flex-col gap-6 md:gap-8">
            {EDICIONES.map((edicion, indice) => {
              const placa = edicion.aliado.necesitaFondo === "oscuro";
              const detalles = [
                { etiqueta: "Duración", valor: edicion.detalles.duracion },
                { etiqueta: "Cupos", valor: edicion.detalles.cupos },
              ].filter((d) => esDato(d.valor));
              const izquierda = indice % 2 === 0;

              return (
                <Reveal
                  as="li"
                  key={edicion.slug}
                  delay={80}
                  className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-5 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-x-0"
                >
                  {/* Número sobre la línea */}
                  <div
                    className={cn(
                      "col-start-1 row-start-1 flex justify-center md:col-start-2",
                    )}
                  >
                    <span className="flex size-9 items-center justify-center rounded-full bg-brand-gradient p-[2px] shadow-card">
                      <span className="flex size-full items-center justify-center rounded-full bg-white font-display text-sm font-bold text-navy">
                        {indice + 1}
                      </span>
                    </span>
                  </div>

                  <article
                    className={cn(
                      "hairline-gradient relative col-start-2 row-start-1 flex flex-col gap-5 rounded-3xl border border-ink/8 bg-white p-6 shadow-card",
                      "transition-[transform,box-shadow,border-color] duration-(--duration-slow) ease-(--ease-out-quart) after:opacity-0 after:transition-opacity after:duration-(--duration-slow)",
                      "hover:-translate-y-1 hover:border-transparent hover:shadow-card-hover hover:after:opacity-100 sm:p-7",
                      izquierda ? "md:col-start-1 md:mr-6" : "md:col-start-3 md:ml-6",
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div
                        className={cn(
                          "flex h-12 items-center",
                          placa && "rounded-xl bg-ink px-3",
                        )}
                      >
                        <Image
                          src={edicion.aliado.logo.src}
                          alt={edicion.aliado.logo.alt}
                          width={edicion.aliado.logo.width}
                          height={edicion.aliado.logo.height}
                          className="h-9 w-auto object-contain"
                        />
                      </div>
                      {detalles.length ? (
                        <dl className="flex flex-wrap gap-2">
                          {detalles.map((d) => (
                            <div
                              key={d.etiqueta}
                              className="flex items-baseline gap-1.5 rounded-pill bg-lavender-mist px-3 py-1 text-xs"
                            >
                              <dt className="font-semibold text-ink/70">
                                {d.etiqueta}
                              </dt>
                              <dd className="font-bold text-ink">{d.valor}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <p className="font-display text-[11px] font-bold tracking-[0.14em] text-slate-violet uppercase">
                        {edicion.aliado.nombre}
                      </p>
                      <h3 className="font-display text-xl leading-snug font-bold text-balance text-navy">
                        {edicion.titulo}
                      </h3>
                    </div>

                    <ul className="flex flex-wrap gap-1.5" aria-label="Herramientas">
                      {edicion.techStack.map((herramienta) => (
                        <li
                          key={herramienta}
                          className="rounded-pill border border-ink/12 px-2.5 py-1 text-xs font-semibold text-ink"
                        >
                          {herramienta}
                        </li>
                      ))}
                    </ul>

                    {edicion.brochureUrl ? (
                      <Button
                        href={edicion.brochureUrl}
                        variant="ghost"
                        size="sm"
                        withArrow
                        className="w-fit"
                      >
                        Brochure del curso
                        <span className="sr-only">
                          {" "}
                          de {edicion.titulo} (se abre en una pestaña nueva)
                        </span>
                      </Button>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal className="flex flex-col items-center gap-6 rounded-3xl bg-white/70 p-8 shadow-card">
          <LogosAliados />
          <p className="text-center text-sm font-semibold text-ink/70">
            {EXPERIENCIA.proximo}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

