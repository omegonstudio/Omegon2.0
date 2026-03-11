/**
 * Structured Data Component for JSON-LD Schemas
 * Use this component to add JSON-LD structured data to any page
 */

interface StructuredDataProps {
  schema: Record<string, any>;
}

export default function StructuredData({ schema }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      suppressHydrationWarning
    />
  );
}
