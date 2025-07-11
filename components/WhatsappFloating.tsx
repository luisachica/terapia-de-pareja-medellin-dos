// components/WhatsappFloating.tsx

"use client"; // 👈 ¡Muy importante! Esto convierte el componente en uno de cliente.

import { usePathname } from "next/navigation";

export default function WhatsappFloating() {
  const pathname = usePathname(); // Obtiene la ruta actual (ej: "/servicios")

  // Define tu número de teléfono una sola vez
  const phoneNumber = "573137415861";

  // Lógica para elegir el mensaje según la página
  const getMessage = () => {
    switch (pathname) {
      case "/asesorias-de-pareja":
        return "Hola, vi la página de asesorías de pareja y me gustaría más información.";
      case "/consultas-de-pareja":
        return "Hola, vengo de la página de consultas de pareja y quisiera hacer una consulta.";
      case "/talleres-de-pareja":
        return "Hola, me interesa saber más sobre los talleres de pareja.";
      default:
        return "Hola, he visto tu sitio web y me gustaría hacer una consulta.";
    }
  };

  const message = getMessage();

  // Codificamos el mensaje para que funcione correctamente en una URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 transition-transform duration-300 hover:scale-110"
    >
      {/* Ícono SVG para mejor calidad y rendimiento */}
      <img
        src="/images/whatsapp.png"
        alt="WhatsApp"
        className="h-16 w-16"
      />
    </a>
  );
}