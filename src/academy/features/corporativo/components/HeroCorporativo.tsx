import Image from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Section";
import { HERO_CORPORATIVO } from "../content";

// Hero con doble velo para que el texto blanco se lea sobre la foto
export function HeroCorporativo() {
  return (
    <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden lg:min-h-[620px]">
      <Image
        src="/assets/hero/crea-tu-curso.jpg"
        alt=""
        aria-hidden="true"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_75%_at_50%_55%,rgb(10_4_59/0.8),transparent_100%)]"
      />
      <Container className="relative">
        <Reveal className="on-dark mx-auto flex max-w-[52rem] flex-col items-center gap-6 py-20 text-center">
          <Image
            src="/assets/brand/almah-logo-white.png"
            alt="Almah Academy"
            width={799}
            height={343}
            preload
            className="h-auto w-44 sm:w-52"
          />
          <h1 className="font-display text-4xl leading-[1.08] font-bold text-balance text-white sm:text-5xl lg:text-6xl">
            {HERO_CORPORATIVO.titulo}
          </h1>
          <p className="max-w-[46ch] text-lg text-pretty text-white sm:text-xl">
            {HERO_CORPORATIVO.bajada}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

