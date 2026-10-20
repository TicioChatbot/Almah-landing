import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { INTRO_CORPORATIVA } from "../content";
import { TextoConEnfasis } from "./TextoConEnfasis";

// Apertura sobre la banda verde, con texto oscuro
export function IntroCorporativa() {
  return (
    <Section spacing="compact" className="bg-band-brand grain">
      <Container>
        <Reveal className="mx-auto flex max-w-[64ch] flex-col gap-6 text-center">
          {INTRO_CORPORATIVA.map((parrafo, indice) => (
            <p
              key={indice}
              className="text-xl text-pretty text-ink sm:text-2xl lg:text-[1.9rem] lg:leading-snug"
            >
              <TextoConEnfasis fragmentos={parrafo} />
            </p>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
