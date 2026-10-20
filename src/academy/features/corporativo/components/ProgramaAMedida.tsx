import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { LogosAliados } from "@/features/ediciones/components/LogosAliados";
import { PROGRAMA_A_MEDIDA } from "../content";

// Bloque que lleva a la página "Crea tu curso"
export function ProgramaAMedida() {
  return (
    <Section id="a-medida" spacing="compact" className="bg-mesh-soft">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-ink/8 bg-white shadow-card">
            {/* Línea superior con degradado */}
            <div aria-hidden="true" className="h-1.5 w-full bg-brand-gradient" />
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center lg:gap-16">
              <div className="flex flex-col gap-5">
                <p className="font-display text-xs font-bold tracking-[0.18em] text-slate-violet uppercase">
                  {PROGRAMA_A_MEDIDA.antetitulo}
                </p>
                <h2 className="font-display text-3xl font-bold text-balance text-navy sm:text-4xl">
                  {PROGRAMA_A_MEDIDA.titulo}
                </h2>
                <p className="max-w-[60ch] text-lg text-pretty text-ink/80 sm:text-xl">
                  {PROGRAMA_A_MEDIDA.lead}
                </p>
                <Button
                  href="/crea-tu-curso"
                  variant="gradient"
                  size="lg"
                  withArrow
                  className="mt-2 w-full sm:w-fit"
                >
                  {PROGRAMA_A_MEDIDA.cta}
                </Button>
              </div>

              <div className="flex flex-col gap-4 rounded-3xl bg-lavender-mist p-6 sm:p-8">
                <p className="text-center text-sm font-semibold text-ink/70">
                  Ya hemos diseñado programas para
                </p>
                <LogosAliados className="gap-x-6" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
