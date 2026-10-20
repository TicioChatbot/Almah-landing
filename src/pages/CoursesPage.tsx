import { useEffect } from "react";
import { ProgramaAMedida } from "@/features/corporativo/components/ProgramaAMedida";
import { ProximosCursos } from "@/features/cursos/components/ProximosCursos";
import { CursosAsincronicos } from "@/features/cursos-asincronicos/components/CursosAsincronicos";
import { EdicionesAnteriores } from "@/features/ediciones/components/EdicionesAnteriores";
import { EquipoDocente } from "@/features/equipo/components/EquipoDocente";
import { Hero } from "@/features/home/components/Hero";
import { VideoFormacion } from "@/features/home/components/VideoFormacion";
import { Resenas } from "@/features/resenas/components/Resenas";
import "@/styles/globals.css";

const CoursesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="almah-academy-scope flex min-h-screen flex-col pt-28">
      <main className="flex-1">
        <Hero />
        <ProximosCursos />
        <ProgramaAMedida />
        <VideoFormacion />
        <CursosAsincronicos />
        <EdicionesAnteriores />
        <EquipoDocente />
        <Resenas />
      </main>
    </div>
  );
};

export default CoursesPage;
