import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import communityPrivacyImg from '../assets/community-privacy-new.jpg';
import logoHub from '../assets/logo-hub.png';
import serviceDocsImg from '../assets/service-docs.png';
import serviceChatbotImg from '../assets/service-chatbot.png';
import serviceAiToolsImg from '../assets/service-ai-tools.png';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import '@/styles/globals.css';

const HubPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleJoin = () => {
    navigate('/precios');
  };

  const handleAccess = () => {
    window.location.href = 'https://hubprivacidad.almah.ai';
  };

  const keyFeatures = [
    {
      title: 'Repositorio Normativo y Doctrinal',
      description: 'Acceso centralizado y permanentemente actualizado a normativas de protección de datos, leyes de Habeas Data, resoluciones de autoridades de control, circulares y estándares internacionales (RGPD).',
      img: serviceDocsImg,
      tag: 'Base de Conocimiento',
    },
    {
      title: 'Asistente IA con Citas y Jurisprudencia',
      description: 'Consultas complejas resueltas en segundos por modelos de inteligencia artificial calibrados con doctrina y sanciones, con trazabilidad exacta a fuentes oficiales verificables.',
      img: serviceChatbotImg,
      tag: 'IA Especializada',
    },
    {
      title: 'Herramientas de Diagnóstico y Cumplimiento',
      description: 'Checklists de accountability, matrices de impacto, modelos de cláusulas de transferencia de datos y plantillas operativas listas para firmas y Oficiales de Privacidad.',
      img: serviceAiToolsImg,
      tag: 'Operatividad',
    },
  ];

  const pillars = [
    {
      number: '01',
      title: 'Para Oficiales de Privacidad (DPO)',
      detail: 'Supervisa el cumplimiento de políticas de tratamiento de datos, gestiona incidentes y responde con rapidez requerimientos regulatorios con soporte técnico verificado.',
    },
    {
      number: '02',
      title: 'Para Abogados y Firmas Consultoras',
      detail: 'Agiliza la elaboración de conceptos jurídicos, auditorías y contratos para clientes corporativos utilizando doctrina consolidada y comparada.',
    },
    {
      number: '03',
      title: 'Comunidad Exclusiva y Networking',
      detail: 'Participa en sesiones privadas de debate, análisis de sanciones recientes y mesas de trabajo con los líderes de privacidad más influyentes de la región.',
    },
  ];

  return (
    <div className="almah-academy-scope flex min-h-screen flex-col pt-28">
      <main className="flex-1">
        {/* ================= HERO SECTION (Estilo Academy) ================= */}
        <section className="relative overflow-hidden bg-mesh-soft">
          {/* Manchas de color difuminadas */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 size-[28rem] rounded-full bg-lavender/40 blur-3xl animate-float-slow" />
            <div
              className="absolute -bottom-32 left-1/3 size-[26rem] rounded-full bg-mint/40 blur-3xl animate-float-slow"
              style={{ animationDelay: '-7s' }}
            />
          </div>

          <div className="relative grid lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <div className="flex flex-col items-center gap-8 px-6 py-16 text-center sm:px-12 lg:items-start lg:py-24 lg:pr-14 lg:pl-[max(2rem,calc((100vw-1240px)/2+2rem))] lg:text-left">
              <Reveal className="flex flex-col items-center gap-4 lg:items-start">
                <img
                  src={logoHub}
                  alt="Hub de Privacidad"
                  className="h-14 w-auto object-contain sm:h-16"
                />
              </Reveal>

              <Reveal delay={80} className="flex flex-col items-center gap-5 lg:items-start">
                <h1 className="max-w-[18ch] font-display text-4xl leading-[1.08] font-bold text-balance text-navy sm:text-5xl lg:text-[3.5rem]">
                  Hub de <span className="text-brand-deep">Privacidad</span>
                </h1>

                <p className="max-w-[56ch] text-lg text-pretty text-ink/80 sm:text-xl">
                  El espacio de actualización y trabajo donde la gestión de datos se debate con el rigor de los oficiales de privacidad y la claridad de expertos en derechos digitales e inteligencia artificial.
                </p>
              </Reveal>

              <Reveal delay={160} className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  onClick={handleJoin}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-52"
                >
                  Únete
                </Button>
                <Button
                  onClick={handleAccess}
                  variant="ghost"
                  size="lg"
                  withArrow
                  className="w-full sm:w-auto sm:min-w-44"
                >
                  Accede
                </Button>
              </Reveal>

              <Reveal delay={240} className="flex w-full flex-wrap items-center justify-center gap-6 border-t border-ink/10 pt-6 text-xs font-semibold text-ink/70 lg:justify-start">
                <span className="flex items-center gap-2">
                  <span className="text-brand-deep">✓</span> 2 meses gratis en cualquier plan
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-brand-deep">✓</span> IA con citas jurídicas verificadas
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-brand-deep">✓</span> Cancelación flexible
                </span>
              </Reveal>
            </div>

            {/* Imagen Principal Hero */}
            <div className="relative min-h-[340px] p-6 lg:min-h-[640px] lg:p-12 lg:pl-0 flex items-center justify-center">
              <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-card">
                <img
                  src={communityPrivacyImg}
                  alt="Hub de Privacidad Comunidad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= MÓDULOS Y CAPACIDADES (Estilo ProximosCursos) ================= */}
        <Section id="modulos" className="bg-band-lavender grain">
          <Container className="flex flex-col gap-12">
            <Reveal>
              <SectionHeading
                title="Tecnología y conocimiento para oficiales de privacidad"
                lead="Una suite completa que integra fuentes oficiales, análisis predictivo e inteligencia artificial conversacional para tu práctica diaria."
              />
            </Reveal>

            <ul className="grid items-stretch gap-8 lg:grid-cols-3">
              {keyFeatures.map((feat, index) => (
                <Reveal
                  as="li"
                  key={index}
                  delay={index * 100}
                  className="flex"
                >
                  <div className="flex w-full flex-col justify-between overflow-hidden rounded-[1.8rem] border border-ink/8 bg-white p-7 shadow-card transition-transform duration-300 hover:-translate-y-1">
                    <div>
                      <div className="mb-6 h-48 w-full overflow-hidden rounded-2xl bg-lavender-mist">
                        <img
                          src={feat.img}
                          alt={feat.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="mb-3 inline-block rounded-full bg-mint/30 px-3 py-1 font-display text-xs font-bold text-brand-deep uppercase">
                        {feat.tag}
                      </div>
                      <h3 className="font-display text-xl font-bold text-navy mb-3">
                        {feat.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink/75">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>

        {/* ================= A QUIÉN VA DIRIGIDO (Estilo Programa a Medida) ================= */}
        <Section id="perfiles" spacing="compact" className="bg-mesh-soft">
          <Container>
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-ink/8 bg-white shadow-card">
                <div aria-hidden="true" className="h-1.5 w-full bg-brand-gradient" />
                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="mb-10 text-center sm:text-left max-w-2xl">
                    <p className="font-display text-xs font-bold tracking-[0.18em] text-slate-violet uppercase mb-2">
                      Especialización
                    </p>
                    <h2 className="font-display text-3xl font-bold text-balance text-navy sm:text-4xl">
                      Diseñado para los más altos estándares corporativos
                    </h2>
                  </div>

                  <div className="grid gap-8 md:grid-cols-3">
                    {pillars.map((pillar, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-3 rounded-2xl bg-lavender-mist/60 p-6 sm:p-7 border border-ink/5"
                      >
                        <span className="font-display text-3xl font-black text-brand-deep">
                          {pillar.number}
                        </span>
                        <h3 className="font-display text-lg font-bold text-navy">
                          {pillar.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-ink/75">
                          {pillar.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* ================= BANNER FINAL DE ACCIÓN ================= */}
        <Section spacing="compact" className="bg-navy text-white grain">
          <Container className="text-center">
            <Reveal className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl font-bold sm:text-4xl text-white">
                Comienza hoy en el Hub de Privacidad
              </h2>
              <p className="text-base text-lavender-mist/80 sm:text-lg">
                Suscríbete con 2 meses 100% gratis de prueba y accede de inmediato al repositorio normativo y asistente con IA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2">
                <Button
                  onClick={handleJoin}
                  variant="primary"
                  size="lg"
                  className="sm:min-w-48"
                >
                  Únete
                </Button>
                <Button
                  onClick={handleAccess}
                  variant="lavender"
                  size="lg"
                  withArrow
                  className="sm:min-w-44"
                >
                  Accede
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>
    </div>
  );
};

export default HubPage;
