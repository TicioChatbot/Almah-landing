import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { SITE } from "@/config/site";
import { SECCION_RESENAS } from "../content";
import { RESENAS } from "../data";
import { TestimoniosCarrusel } from "./TestimoniosCarrusel";

export function Resenas() {
  return (
    <Section id="resenas" className="overflow-hidden">
      <Container className="flex flex-col items-center gap-12">
        <Reveal>
          <SectionHeading title={SECCION_RESENAS.titulo} lead={SECCION_RESENAS.lead} />
        </Reveal>

        <Reveal delay={100} className="w-full">
          <TestimoniosCarrusel resenas={RESENAS} />
        </Reveal>

        <Reveal delay={160}>
          <Button href={SITE.inscripcionAnchor} size="lg" className="w-full sm:w-96">
            {SECCION_RESENAS.cta}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
