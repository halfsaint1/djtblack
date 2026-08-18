import { personJsonLd } from '@/lib/seo';

export default function JsonLd() {
  const schema = personJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
