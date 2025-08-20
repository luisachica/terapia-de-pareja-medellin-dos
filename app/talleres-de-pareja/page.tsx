import type { Metadata } from 'next';
import TalleresPageClient from "./talleres-client"; // Importa el componente de cliente
import { generateMetadata } from "@/lib/config";

// Metadatos para el <head> que Next.js usará automáticamente
export const metadata: Metadata = generateMetadata({
  title: "Talleres de pareja en Medellín | Espacios para crecer juntos",
  description: "Participa en nuestros talleres de pareja vivenciales. Un espacio para mejorar la comunicación, sanar heridas y fortalecer la conexión emocional.",
  path: "/talleres-de-pareja"
});

// Renderiza el componente de cliente
export default function TalleresDePareja() {
  return <TalleresPageClient />;
}