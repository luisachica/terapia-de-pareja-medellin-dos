import type { JSX } from "react";

/**
 * Recibe un objeto y lo convierte en un script JSON-LD para SEO.
 */
export default function StructuredData({ data }: { data: object }): JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}