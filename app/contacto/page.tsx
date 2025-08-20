import type { Metadata } from 'next';
import ContactoPageClient from "./contacto-client"; // Importa el nuevo componente de cliente
import { generateMetadata } from "@/lib/config";

// Metadatos para el <head> que Next.js usará automáticamente
export const metadata: Metadata = generateMetadata({
  title: "Contacto | Agenda tu cita | Terapia de Pareja Medellín",
  description: "Contacta para agendar una cita o resolver tus dudas. Encuentra nuestra dirección, teléfono, WhatsApp y horarios de atención en Medellín.",
  path: "/contacto"
});

// Renderiza el componente de cliente que contiene todo el diseño
export default function ContactoPage() {
  return <ContactoPageClient />;
}