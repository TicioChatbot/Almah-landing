import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { PROXIMOS_CURSOS } from "../content";
import { CURSOS } from "../data";
import { CursoCard } from "./CursoCard";

export function ProximosCursos() {
  return (
    <Section id="cursos" className="bg-band-lavender grain">
      <Container className="flex flex-col gap-14">
        <Reveal>
          <SectionHeading
            title={PROXIMOS_CURSOS.titulo}
            lead={PROXIMOS_CURSOS.lead}
          />
        </Reveal>

        {/* Las fichas se estiran a la misma altura */}
        <ul className="grid items-stretch gap-8 lg:grid-cols-2">
          {CURSOS.map((curso, indice) => (
            <Reveal
              as="li"
              key={curso.slug}
              delay={indice * 100}
              className="flex"
            >
              <CursoCard curso={curso} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
