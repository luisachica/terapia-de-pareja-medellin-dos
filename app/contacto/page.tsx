import type { Metadata } from 'next';
import ContactoPageClient from "./contacto-client"; // Importa el nuevo componente de cliente

// Metadatos para el <head> que Next.js usará automáticamente
export const metadata: Metadata = {
  title: "Contacto - Agenda tu cita | Terapia de Pareja Medellín",
  description: "Contacta para agendar una cita o resolver tus dudas. Encuentra nuestra dirección, teléfono, WhatsApp y horarios de atención en Medellín.",
};

// Renderiza el componente de cliente que contiene todo el diseño
export default function ContactoPage() {
  return <ContactoPageClient />;
}