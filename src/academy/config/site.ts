export const SITE = {
  name: "Almah Academy",
  url: import.meta.env.VITE_SITE_URL ?? "https://almahacademy.co",
  description:
    "Almah Academy diseña e imparte cursos de inteligencia artificial " +
    "aplicada al derecho, a la medida de firmas de abogados y organizaciones " +
    "jurídicas en Colombia.",

  // Correo que recibe los formularios
  contactEmail: "info@redek.co",

  social: {
    linkedin: "https://www.linkedin.com/company/almahcol/",
    instagram: "https://www.instagram.com/almah_col/",
  },

  // Todos los CTA de inscripción quedan vacíos por el momento
  inscripcionAnchor: "#",
} as const;

export const LEGAL_LINKS = [
  { label: "Política de privacidad", href: "/legal/politica-de-privacidad.pdf" },
  { label: "Términos y condiciones", href: "/legal/terminos-y-condiciones.pdf" },
] as const;
