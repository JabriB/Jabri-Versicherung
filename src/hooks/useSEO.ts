import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  type?: string;
  author?: string;
  datePublished?: string;
  schema?: Record<string, unknown>;
}

export function useSEO({
  title,
  description,
  keywords,
  image,
  canonical,
  type = 'website',
  author,
  datePublished,
  schema
}: SEOProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMetaTag = (name: string, content: string) => {
      if (!content) return;

      let tag = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);

      if (!tag) {
        tag = document.createElement('meta');
        const isProperty = name.includes('og:') || name.includes('article:');
        tag.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    if (description) {
      setMetaTag('description', description);
    }

    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    if (title) {
      setMetaTag('og:title', title);
      setMetaTag('twitter:title', title);
    }

    if (description) {
      setMetaTag('og:description', description);
      setMetaTag('twitter:description', description);
    }

    setMetaTag('og:type', type);
    setMetaTag('og:url', window.location.href);

    if (image) {
      setMetaTag('og:image', image);
      setMetaTag('twitter:image', image);
    }

    setMetaTag('twitter:card', 'summary_large_image');

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonical || window.location.href);

    if (type === 'article' && datePublished) {
      setMetaTag('article:published_time', datePublished);
      if (author) {
        setMetaTag('article:author', author);
      }
    }

    if (schema) {
      let schemaScript = document.querySelector('script[data-schema="true"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.setAttribute('type', 'application/ld+json');
        schemaScript.setAttribute('data-schema', 'true');
        document.head.appendChild(schemaScript);
      }
      schemaScript.innerHTML = JSON.stringify(schema);
    }
  }, [title, description, keywords, image, canonical, type, author, datePublished, schema]);
}
