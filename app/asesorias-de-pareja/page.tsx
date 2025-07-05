import type { Metadata } from 'next';
import AsesoriasPageClient from "./asesorias-client"; // Importa el nuevo componente de cliente

// Metadatos para el <head> que Next.js usará automáticamente
export const metadata: Metadata = {
  title: "Asesorías de pareja | Terapia de Pareja Medellín",
  description: "Ofrecemos asesorías de pareja para abordar temas específicos, resolver conflictos y tomar decisiones con guía profesional."
};

// Renderiza el componente de cliente que contiene todo el diseño
export default function AsesoriasDePareja() {
  return <AsesoriasPageClient />;
}