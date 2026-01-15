import { useEffect } from 'react';

interface HeadConfig {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
}

export function useHead(config: HeadConfig) {
  useEffect(() => {
    document.title = config.title;

    const updateOrCreateMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateOrCreateMeta('description', config.description);
    updateOrCreateMeta('og:title', config.ogTitle || config.title, true);
    updateOrCreateMeta('og:description', config.ogDescription || config.description, true);
    updateOrCreateMeta('og:url', config.ogUrl || window.location.href, true);
    updateOrCreateMeta('og:image', config.ogImage || 'https://jabriversicherung.de/jabri-versicherung-logo.svg', true);
    updateOrCreateMeta('twitter:title', config.ogTitle || config.title);
    updateOrCreateMeta('twitter:description', config.ogDescription || config.description);

    if (config.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = config.canonical;
    }
  }, [config]);
}
