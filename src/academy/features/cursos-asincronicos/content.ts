import { SITE } from "@/config/site";

// Cursos grabados. Todavía no hay fecha ni modelo de acceso, por eso el texto
// va en futuro y el CTA es un correo.
export const CURSOS_ASINCRONICOS = {
  antetitulo: "Próximamente · Cursos asincrónicos",
  titulo: "Los mismos talleres en formato asincrónico.",
  lead: "Estamos grabando nuestros talleres para que los tomes en línea y sin horario. Cada curso quedará en una plataforma con módulos en video y material descargable: avanzas cuando puedes y vuelves al contenido cuando lo necesitas.",
  comparacion: {
    encabezados: ["En directo (hoy)", "Asincrónico (próximamente)"],
    filas: [
      { aspecto: "Horario", directo: "Fechas y horas fijas", asincronico: "Cuando quieras" },
      { aspecto: "Ritmo", directo: "El del grupo", asincronico: "El tuyo" },
      { aspecto: "Formato", directo: "Sesiones en vivo de 2 a 4 h", asincronico: "Módulos cortos en video" },
      { aspecto: "Cupos", directo: "Limitados por edición", asincronico: "Sin cupo" },
      { aspecto: "Material", directo: "Grabaciones al terminar", asincronico: "Contenido y plantillas desde el primer día" },
    ],
  },
  catalogoTitulo: "Primeros cursos en grabación",
  catalogo: [
    "IA en derecho comercial",
    "IA para el abogado de seguros",
    "IA en el procedimiento arbitral",
    "IA en derecho societario",
  ],
  catalogoNota: "Parten de los talleres ya dictados en directo. Se sumarán cursos nuevos.",
  cta: "Avísame cuando esté disponible",
  ctaHref:
    `mailto:${SITE.contactEmail}?subject=` +
    encodeURIComponent("Cursos asincrónicos — avísenme cuando estén disponibles"),
} as const;
