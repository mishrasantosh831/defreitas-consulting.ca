import { useEffect } from 'react';

/**
 * SEOHead - Sets document title, meta description, canonical URL,
 * and injects breadcrumb/structured data schema into the document <head>.
 * Used on all public-facing pages.
 */
export default function SEOHead({ title, description, canonical, breadcrumbSchema }) {
  useEffect(() => {
    // Set document title
    if (title) {
      document.title = title;
    }

    // Set / update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (description) {
      metaDesc.setAttribute('content', description);
    }

    // Set / update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    if (canonical) {
      canonicalLink.setAttribute('href', canonical);
    }

    // Inject breadcrumb JSON-LD schema (remove any previous one first)
    const existingSchema = document.getElementById('breadcrumb-schema');
    if (existingSchema) {
      existingSchema.remove();
    }
    if (breadcrumbSchema) {
      let cleanSchema = String(breadcrumbSchema).trim();
      if (cleanSchema.startsWith('<script')) {
        cleanSchema = cleanSchema.replace(/^<script[^>]*>/i, '').replace(/<\/script>$/i, '').trim();
      }
      if (cleanSchema) {
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'breadcrumb-schema');
        script.textContent = cleanSchema;
        document.head.appendChild(script);
      }
    }

    // Cleanup function - restore defaults on unmount
    return () => {
      // Keep the last set title/meta rather than clearing on unmount
    };
  }, [title, description, canonical, breadcrumbSchema]);

  return null; // This component renders nothing to the DOM
}
