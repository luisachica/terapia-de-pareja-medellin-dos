import type { Metadata } from 'next';
import SobreMiPageClient from "./sobre-mi-client"; // Importa el nuevo componente de cliente

// Metadatos para el <head> que Next.js usará automáticamente
export const metadata: Metadata = {
  title: "Yolanda Osorio, Psicóloga y terapeuta de pareja en Medellín",
  description: "Yolanda Osorio, psicóloga especializada en terapia de pareja, sexualidad y trauma. Descubre mi enfoque terapéutico para construir una relación más sana.",
};

// Renderiza el componente de cliente que contiene todo el diseño
export default function SobreMiPage() {
  return <SobreMiPageClient />;
}