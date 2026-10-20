// Tipos compartidos entre features

export type Imagen = {
  src: string;
  alt: string;
  /** Tamaño real del archivo, lo necesita next/image */
  width: number;
  height: number;
};

export type Aliado = {
  nombre: string;
  logo: Imagen;
  /** Fondo sobre el que se ve bien el logo */
  necesitaFondo: "claro" | "oscuro";
};
