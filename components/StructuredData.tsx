interface StructuredDataProps {
  data: object;
}

/**
 * Recibe un objeto y lo convierte en un script JSON-LD para SEO.
 */
export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}