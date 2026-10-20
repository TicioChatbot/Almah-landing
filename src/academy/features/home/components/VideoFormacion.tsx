import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { VIDEO } from "../content";

export function VideoFormacion() {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const videoSrc = `${baseUrl}/assets/video/almah-academy.mp4`;

  return (
    <Section id="clases">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            {/* brand-deep porque el verde de marca no contrasta sobre blanco */}
            <h2 className="font-display text-3xl font-bold text-balance text-brand-deep sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {VIDEO.titulo}
            </h2>
            <p className="max-w-[52ch] text-lg text-pretty text-ink/80 sm:text-xl">
              {VIDEO.lead}
            </p>
            <ul className="flex flex-col gap-3">
              {VIDEO.puntos.map((punto) => (
                <li key={punto} className="flex items-center gap-3 text-lg">
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mint-mist text-brand-deep"
                  >
                    <svg viewBox="0 0 20 20" className="size-4">
                      <path
                        d="m4.5 10.5 3.5 3.5 7.5-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-ink/85">{punto}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Marco del vídeo con halo de degradado */}
          <Reveal delay={120} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-[2.25rem] bg-brand-gradient opacity-60 blur-2xl"
            />
            <div className="rounded-[1.75rem] bg-lavender-pale p-3 shadow-card-hover">
              <video
                controls
                preload="metadata"
                playsInline
                className="aspect-video w-full rounded-[1.25rem] bg-ink object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
                Tu navegador no puede reproducir este vídeo.
              </video>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
