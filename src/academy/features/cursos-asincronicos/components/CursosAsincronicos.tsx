import Image from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { CURSOS_ASINCRONICOS } from "../content";

// Anuncio de los cursos asincrónicos (textos en ../content.ts)
export function CursosAsincronicos() {
  const { comparacion, catalogo } = CURSOS_ASINCRONICOS;

  return (
    <Section id="asincronicos" className="relative overflow-hidden bg-mesh-soft grain">
      {/* Isotipo de fondo */}
      <Image
        src="/assets/brand/almah-isotipo.png"
        alt=""
        aria-hidden="true"
        width={197}
        height={241}
        className="pointer-events-none absolute -right-8 -bottom-10 h-auto w-56 opacity-[0.06] sm:w-72"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-navy px-3.5 py-1.5 font-display text-xs font-bold tracking-[0.16em] text-white uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
              {CURSOS_ASINCRONICOS.antetitulo}
            </p>
            <h2 className="font-display text-3xl font-bold text-balance text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {CURSOS_ASINCRONICOS.titulo}
            </h2>
            <p className="max-w-[56ch] text-lg text-pretty text-ink/80 sm:text-xl">
              {CURSOS_ASINCRONICOS.lead}
            </p>

            {/* Cursos en grabación */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-sm font-bold tracking-[0.12em] text-slate-violet uppercase">
                {CURSOS_ASINCRONICOS.catalogoTitulo}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {catalogo.map((linea) => (
                  <li
                    key={linea}
                    className="rounded-pill border border-ink/12 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink"
                  >
                    {linea}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-ink/70">{CURSOS_ASINCRONICOS.catalogoNota}</p>
            </div>

            <Button
              href={CURSOS_ASINCRONICOS.ctaHref}
              variant="gradient"
              size="lg"
              withArrow
              className="mt-2 w-full sm:w-fit"
            >
              {CURSOS_ASINCRONICOS.cta}
            </Button>
          </Reveal>

          {/* Comparación directo vs asincrónico */}
          <Reveal delay={120}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-gradient opacity-40 blur-2xl"
              />
              <div className="overflow-hidden rounded-[1.75rem] border border-ink/8 bg-white shadow-card-hover">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    Diferencias entre las clases en directo y los cursos
                    asincrónicos
                  </caption>
                  <thead>
                    <tr className="bg-navy text-white">
                      <th scope="col" className="sr-only">
                        Aspecto
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-4 font-display text-xs font-bold tracking-[0.12em] uppercase sm:px-6"
                      >
                        {comparacion.encabezados[0]}
                      </th>
                      <th
                        scope="col"
                        className="bg-brand-deep px-5 py-4 font-display text-xs font-bold tracking-[0.12em] uppercase sm:px-6"
                      >
                        {comparacion.encabezados[1]}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparacion.filas.map((fila) => (
                      <tr key={fila.aspecto} className="border-t border-ink/8">
                        <th
                          scope="row"
                          className="w-[24%] px-5 py-4 align-top font-display text-[11px] font-bold tracking-[0.14em] text-slate-violet uppercase sm:px-6"
                        >
                          {fila.aspecto}
                        </th>
                        <td className="px-5 py-4 align-top text-sm text-ink/80 sm:px-6 sm:text-base">
                          {fila.directo}
                        </td>
                        <td className="bg-lavender-mist px-5 py-4 align-top text-sm font-semibold text-navy sm:px-6 sm:text-base">
                          {fila.asincronico}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

