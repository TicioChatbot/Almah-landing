import { useEffect } from "react";
import { ComoTrabajamos } from "@/features/corporativo/components/ComoTrabajamos";
import { HeroCorporativo } from "@/features/corporativo/components/HeroCorporativo";
import { IntroCorporativa } from "@/features/corporativo/components/IntroCorporativa";
import { Experiencia } from "@/features/ediciones/components/Experiencia";
import "@/styles/globals.css";

const CreateCoursePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="almah-academy-scope flex min-h-screen flex-col pt-28">
      <main className="flex-1">
        <HeroCorporativo />
        <IntroCorporativa />
        <ComoTrabajamos />
        <Experiencia />
      </main>
    </div>
  );
};

export default CreateCoursePage;
