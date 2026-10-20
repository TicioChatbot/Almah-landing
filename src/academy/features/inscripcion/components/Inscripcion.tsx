"use client";

import Image from "@/components/ui/Image";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Form";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SITE } from "@/config/site";
import { CURSOS, OPCIONES_CURSO } from "@/features/cursos/data";
import { PasarelaSlot } from "@/features/pagos/components/PasarelaSlot";
import { erroresPorCampo } from "@/lib/validation";
import { INSCRIPCION } from "../content";
import { PAISES } from "../data";
import { inscripcionSchema } from "../schema";

const VALORES_INICIALES = {
  nombre: "",
  email: "",
  telefono: "",
  curso: "",
  cantidad: "1",
  pais: "CO",
};

// Formulario de inscripción. El pago queda pendiente (ver PasarelaSlot).
// Todo el texto va en blanco sólido: con opacidad no pasa el contraste.
export function Inscripcion() {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  const total = useMemo(() => {
    const curso = CURSOS.find((c) => c.slug === valores.curso);
    if (!curso?.precioCOP) return null;
    const cantidad = Number(valores.cantidad);
    if (!Number.isFinite(cantidad) || cantidad < 1) return null;
    return curso.precioCOP * cantidad;
  }, [valores.curso, valores.cantidad]);

  const actualizar = (campo: keyof typeof VALORES_INICIALES, valor: string) => {
    setValores((previo) => ({ ...previo, [campo]: valor }));
    setErrores((previo) => {
      if (!previo[campo]) return previo;
      const siguiente = { ...previo };
      delete siguiente[campo];
      return siguiente;
    });
  };

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const resultado = inscripcionSchema.safeParse(valores);

    if (!resultado.success) {
      setErrores(erroresPorCampo(resultado.error));
      setEnviado(false);
      // Foco en el primer campo con error
      const primerCampo = resultado.error.issues[0]?.path[0];
      if (primerCampo) {
        document
          .querySelector<HTMLElement>(`[name="${String(primerCampo)}"]`)
          ?.focus();
      }
      return;
    }

    setErrores({});
    setEnviado(true);
    // TODO: crear la transacción en la pasarela y guardar la inscripción
  };

  return (
    <Section id="inscripcion" onDark className="bg-band-violet grain">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Reveal>
            <form
              noValidate
              onSubmit={enviar}
              className="flex flex-col gap-8 rounded-[2rem] border border-white/15 bg-white/5 p-6 shadow-card-hover backdrop-blur-sm sm:p-10"
            >
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {INSCRIPCION.titulo}
                </h2>
                <p className="text-white">{INSCRIPCION.lead}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Nombre" required error={errores.nombre}>
                  <Input
                    name="nombre"
                    autoComplete="name"
                    placeholder="Nombre y apellido"
                    value={valores.nombre}
                    onChange={(e) => actualizar("nombre", e.target.value)}
                  />
                </Field>

                <Field label="Email" required error={errores.email}>
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="nombre@despacho.com"
                    value={valores.email}
                    onChange={(e) => actualizar("email", e.target.value)}
                  />
                </Field>

                <Field label="Teléfono" required error={errores.telefono}>
                  <Input
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+57 300 000 0000"
                    value={valores.telefono}
                    onChange={(e) => actualizar("telefono", e.target.value)}
                  />
                </Field>

                <div className="grid grid-cols-[1fr_120px] gap-4">
                  <Field label="Curso" required error={errores.curso}>
                    <Select
                      name="curso"
                      options={OPCIONES_CURSO}
                      placeholder="Elige un curso"
                      value={valores.curso}
                      onChange={(e) => actualizar("curso", e.target.value)}
                    />
                  </Field>

                  <Field label="Cantidad" required error={errores.cantidad}>
                    <Input
                      name="cantidad"
                      type="number"
                      min={1}
                      max={50}
                      inputMode="numeric"
                      value={valores.cantidad}
                      onChange={(e) => actualizar("cantidad", e.target.value)}
                    />
                  </Field>
                </div>

                <Field label="País" required error={errores.pais}>
                  <Select
                    name="pais"
                    options={PAISES}
                    value={valores.pais}
                    onChange={(e) => actualizar("pais", e.target.value)}
                  />
                </Field>
              </div>

              <hr className="border-white/60" />

              <PasarelaSlot montoCOP={total} />

              <Button
                type="submit"
                variant="dark"
                size="lg"
                className="sm:w-[450px]"
              >
                {INSCRIPCION.cta}
              </Button>

              <p aria-live="polite" className="min-h-6">
                {enviado ? (
                  <span className="font-display font-bold text-white">
                    Datos validados. Falta conectar la pasarela de pago para
                    completar la reserva.
                  </span>
                ) : null}
              </p>

              <p className="text-sm text-white">
                ¿Prefieres que te acompañemos? Escríbenos a{" "}
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="font-bold underline decoration-white/50 underline-offset-4 transition-colors duration-(--duration-fast) hover:decoration-white"
                >
                  {SITE.contactEmail}
                </a>
                .
              </p>
            </form>
          </Reveal>

          <Reveal delay={120} className="hidden flex-col items-center gap-8 pt-10 lg:flex">
            <Image
              src="/assets/brand/almah-logo-white.png"
              alt=""
              aria-hidden="true"
              width={799}
              height={343}
              className="h-auto w-full max-w-[260px]"
            />
            <p className="max-w-[26ch] text-center text-white">
              Cursos de IA para abogados, diseñados sobre el trabajo real de
              cada firma.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

