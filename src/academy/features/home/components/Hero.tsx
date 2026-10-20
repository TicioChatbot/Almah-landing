import Image from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/config/site";
import { LogosAliados } from "@/features/ediciones/components/LogosAliados";
import { HERO } from "../content";

// Texto a la izquierda y foto a la derecha (62/38). En móvil se apilan.
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh-soft">
      {/* Manchas de color de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 size-[28rem] rounded-full bg-lavender/40 blur-3xl animate-float-slow" />
        <div
          className="absolute -bottom-32 left-1/3 size-[26rem] rounded-full bg-mint/40 blur-3xl animate-float-slow"
          style={{ animationDelay: "-7s" }}
        />
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,62fr)_minmax(0,38fr)]">
        <div className="flex flex-col items-center gap-9 px-6 py-16 text-center sm:px-12 lg:items-start lg:py-24 lg:pr-16 lg:pl-[max(2rem,calc((100vw-1240px)/2+2rem))] lg:text-left">
          <Reveal className="flex flex-col items-center gap-7 lg:items-start">
            <Image
              src="/assets/brand/almah-logo-color.png"
              alt="Almah Academy"
              width={795}
              height={347}
              preload
              className="h-auto w-40 sm:w-48"
            />

            <p className="font-display text-xs font-bold tracking-[0.18em] text-slate-violet uppercase">
              {HERO.antetitulo}
            </p>
          </Reveal>

          <Reveal delay={80} className="flex flex-col items-center gap-5 lg:items-start">
            <h1 className="max-w-[18ch] font-display text-4xl leading-[1.08] font-bold text-balance text-navy sm:text-5xl lg:text-[3.6rem]">
              {HERO.titulo[0]}
              <span className="text-brand-deep">{HERO.titulo[1]}</span>
            </h1>

            <p className="max-w-[56ch] text-lg text-pretty text-ink/80 sm:text-xl">
              {HERO.bajada}
            </p>
          </Reveal>

          <Reveal delay={160} className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              href={SITE.inscripcionAnchor}
              size="lg"
              className="w-full sm:w-auto sm:min-w-56"
            >
              {HERO.ctaPrimario}
            </Button>
            <Button
              href="/crea-tu-curso"
              variant="ghost"
              size="lg"
              withArrow
              className="w-full sm:w-auto"
            >
              {HERO.ctaSecundario}
            </Button>
          </Reveal>

          {/* Aliados */}
          <Reveal delay={240} className="flex w-full flex-col items-center gap-4 border-t border-ink/10 pt-8 lg:items-start">
            <p className="text-sm font-semibold text-ink/70">{HERO.aval}</p>
            <LogosAliados className="justify-center lg:justify-start" />
          </Reveal>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[760px]">
          <Image
            src="/assets/hero/header-gradient.jpg"
            alt="Profesional trabajando con herramientas digitales durante una sesión de formación"
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 38vw"
            className="object-cover lg:rounded-l-[3rem]"
          />
          {/* Fundido entre el panel y la foto */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white/70 to-transparent lg:block"
          />
        </div>
      </div>
    </section>
  );
}

