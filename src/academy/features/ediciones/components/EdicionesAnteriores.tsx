import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { EDICIONES_ANTERIORES } from "../content";
import { EDICIONES } from "../data";
import { EdicionCard } from "./EdicionCard";

export function EdicionesAnteriores() {
  return (
    /* Sin onDark: sobre este verde se ve mejor el foco navy que el blanco */
    <Section id="ediciones" className="bg-band-brand grain">
      <Container className="flex flex-col gap-14">
        <Reveal>
          <SectionHeading
            title={EDICIONES_ANTERIORES.titulo}
            lead={EDICIONES_ANTERIORES.lead}
          />
        </Reveal>

        {/* flex-wrap en vez de grid para centrar la última fila. Se resta un
            poco más que el gap para que el redondeo no baje la última tarjeta. */}
        <ul className="flex flex-wrap justify-center gap-8">
          {EDICIONES.map((edicion, indice) => (
            <Reveal
              as="li"
              key={edicion.slug}
              delay={(indice % 3) * 90}
              className="flex w-full md:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-4.5rem)/3)]"
            >
              <EdicionCard edicion={edicion} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
