"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Form";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SITE } from "@/config/site";
import { erroresPorCampo } from "@/lib/validation";
import { FORMULARIO_CORPORATIVO } from "../content";
import { propuestaCorporativaSchema } from "../schema";

const VALORES_INICIALES = {
  nombre: "",
  email: "",
  empresa: "",
  cargo: "",
  necesidad: "",
};

// Formulario de propuesta corporativa. El envío tiene que ir por servidor
// para no exponer las credenciales del servicio de correo.
export function PropuestaCorporativa() {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

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
    const resultado = propuestaCorporativaSchema.safeParse(valores);

    if (!resultado.success) {
      setErrores(erroresPorCampo(resultado.error));
      setEnviado(false);
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
    // TODO: enviar a SITE.contactEmail con una Server Action (rate limit + honeypot o captcha)
  };

  return (
    // Título en texto oscuro sobre el verde y campos dentro de una tarjeta blanca
    <Section id="propuesta" className="bg-band-brand-mid grain">
      <Container className="max-w-[900px]">
        <div className="flex flex-col gap-10">
          <Reveal className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-display text-3xl font-bold text-balance text-ink sm:text-4xl lg:text-5xl">
              {FORMULARIO_CORPORATIVO.titulo}
            </h2>
            <p className="max-w-[56ch] text-lg text-pretty text-ink/85">
              {FORMULARIO_CORPORATIVO.lead}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <form
              noValidate
              onSubmit={enviar}
              className="flex flex-col gap-6 rounded-[2rem] bg-white p-6 shadow-card-hover sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Nombre y Apellido"
                  required
                  tone="sobre-claro"
                  error={errores.nombre}
                >
                  <Input
                    name="nombre"
                    autoComplete="name"
                    placeholder="Nombre y apellido"
                    value={valores.nombre}
                    onChange={(e) => actualizar("nombre", e.target.value)}
                  />
                </Field>

                <Field
                  label="Correo corporativo"
                  required
                  tone="sobre-claro"
                  error={errores.email}
                >
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="nombre@tufirma.com"
                    value={valores.email}
                    onChange={(e) => actualizar("email", e.target.value)}
                  />
                </Field>

                <Field
                  label="Empresa, Firma o Entidad"
                  required
                  tone="sobre-claro"
                  error={errores.empresa}
                >
                  <Input
                    name="empresa"
                    autoComplete="organization"
                    placeholder="Nombre de la organización"
                    value={valores.empresa}
                    onChange={(e) => actualizar("empresa", e.target.value)}
                  />
                </Field>

                <Field
                  label="Cargo / Rol"
                  required
                  tone="sobre-claro"
                  error={errores.cargo}
                >
                  <Input
                    name="cargo"
                    autoComplete="organization-title"
                    placeholder="Socio, director jurídico…"
                    value={valores.cargo}
                    onChange={(e) => actualizar("cargo", e.target.value)}
                  />
                </Field>
              </div>

              <hr className="border-ink/10" />

              <Field
                label="¿En qué área o necesidad te gustaría enfocar el programa?"
                required
                tone="sobre-claro"
                error={errores.necesidad}
              >
                <Textarea
                  name="necesidad"
                  rows={7}
                  placeholder="Cuéntanos sobre tu equipo, sus áreas de práctica y qué te gustaría automatizar."
                  value={valores.necesidad}
                  onChange={(e) => actualizar("necesidad", e.target.value)}
                />
              </Field>

              {/* Borde oscuro para que el botón se distinga sobre blanco */}
              <Button
                type="submit"
                variant="lavender"
                size="lg"
                className="mx-auto w-full border-2 border-ink sm:w-[600px]"
              >
                Solicitar propuesta corporativa
              </Button>

              <p aria-live="polite" className="min-h-6 text-center">
                {enviado ? (
                  <span className="font-display font-bold text-ink">
                    Datos validados. Falta conectar el envío a{" "}
                    {SITE.contactEmail}.
                  </span>
                ) : null}
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
