import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { PASOS_CORPORATIVOS } from "../content";
import { TextoConEnfasis } from "./TextoConEnfasis";

// Pasos numerados, unidos por una línea en escritorio
export function ComoTrabajamos() {
  return (
    <Section id="como-trabajamos">
      <Container className="flex flex-col gap-12">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className="font-display text-xs font-bold tracking-[0.18em] text-slate-violet uppercase">
            Cómo trabajamos
          </p>
          <h2 className="font-display text-3xl font-bold text-balance text-navy sm:text-4xl">
            Del diagnóstico al programa funcionando
          </h2>
        </Reveal>
        {/* La línea va fuera del <ol> para no meter un div en la lista */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-0.5 rounded-full bg-brand-gradient lg:block"
          />
          <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {PASOS_CORPORATIVOS.map((paso, indice) => (
              <Reveal
                as="li"
                key={paso.titulo}
                delay={indice * 90}
                className="hairline-gradient relative flex flex-col gap-4 rounded-3xl border border-ink/8 bg-white p-6 shadow-card transition-[transform,box-shadow,border-color] duration-(--duration-slow) ease-(--ease-out-quart) after:opacity-0 after:transition-opacity after:duration-(--duration-slow) hover:-translate-y-1.5 hover:border-transparent hover:shadow-card-hover hover:after:opacity-100"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-violet to-brand-deep font-display text-base font-bold text-white shadow-card"
                >
                  {indice + 1}
                </span>
                <h3 className="font-display text-xl leading-snug font-bold text-navy">
                  <span className="sr-only">Paso {indice + 1}: </span>
                  {paso.titulo}
                </h3>
                <p className="text-pretty text-ink/80">
                  <TextoConEnfasis fragmentos={paso.detalle} />
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
