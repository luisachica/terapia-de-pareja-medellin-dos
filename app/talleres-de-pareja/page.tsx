import type { Metadata } from 'next';
import TalleresPageClient from "./talleres-client"; // Importa el componente de cliente

// Metadatos para el <head>
export const metadata: Metadata = {
  title: "Talleres de pareja en Medellín - Espacios para crecer juntos",
  description: "Participa en nuestros talleres de pareja vivenciales. Un espacio para mejorar la comunicación, sanar heridas y fortalecer la conexión emocional."
};

// Renderiza el componente de cliente
export default function TalleresDePareja() {
  return <TalleresPageClient />;
}