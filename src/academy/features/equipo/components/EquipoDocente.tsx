import Image from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { EQUIPO_DOCENTE } from "../content";
import { EQUIPO } from "../data";

export function EquipoDocente() {
  return (
    <Section id="equipo" className="bg-mesh-soft">
      <Container className="flex flex-col gap-14">
        <Reveal>
          <SectionHeading
            title={EQUIPO_DOCENTE.titulo}
            lead={EQUIPO_DOCENTE.lead}
          />
        </Reveal>

        {/* Igual que en ediciones: flex-wrap para centrar la última fila */}
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-14">
          {EQUIPO.map((docente, indice) => (
            /* max-w solo en móvil, en escritorio manda el ancho calculado */
            <Reveal
              as="li"
              key={docente.nombre}
              delay={(indice % 3) * 90}
              className="group/docente flex w-full max-w-[320px] flex-col items-center gap-5 text-center md:w-[calc((100%-4.5rem)/3)] md:max-w-none"
            >
              {/* object-top porque las fotos tienen la cabeza pegada arriba */}
              <div className="rounded-full bg-brand-gradient p-[3px] opacity-80 shadow-card transition-[opacity,box-shadow,transform] duration-(--duration-slow) ease-(--ease-out-quart) group-hover/docente:-translate-y-1 group-hover/docente:opacity-100 group-hover/docente:shadow-card-hover">
                <div className="overflow-hidden rounded-full bg-white p-1">
                  <Image
                    src={docente.foto.src}
                    alt={docente.foto.alt}
                    width={docente.foto.width}
                    height={docente.foto.height}
                    sizes="208px"
                    className="size-48 rounded-full object-cover object-top transition-transform duration-(--duration-slow) ease-(--ease-out-quart) group-hover/docente:scale-[1.04] sm:size-52"
                  />
                </div>
              </div>

              {/* Dos líneas fijas para que los nombres largos no descuadren la fila */}
              <h3 className="flex min-h-[2lh] items-center font-display text-2xl leading-tight font-bold text-slate-violet">
                {docente.nombre}
              </h3>
              <p className="max-w-[30ch] text-pretty text-ink/85">
                <strong className="font-display font-bold text-ink">
                  {docente.cargo}
                </strong>
                {docente.especialidad ? (
                  <>
                    <br />
                    {docente.especialidad}
                  </>
                ) : null}
              </p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

