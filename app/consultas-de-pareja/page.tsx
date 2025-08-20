import type { Metadata } from 'next';
import ConsultasPageClient from "./consultas-client"; // Importa el componente de cliente
import { generateMetadata } from "@/lib/config";

// Metadatos para el <head> que Next.js usará automáticamente
export const metadata: Metadata = generateMetadata({
  title: "Consultas de pareja en Medellín | Transforma tu relación",
  description: "Ofrecemos un espacio seguro y neutral para parejas que atraviesan crisis. Aprende a sanar heridas, recuperar el diálogo y fortalecer el vínculo.",
  path: "/consultas-de-pareja"
});

// Renderiza el componente de cliente que contiene todo el diseño
export default function ConsultasDePareja() {
  return <ConsultasPageClient />;
}