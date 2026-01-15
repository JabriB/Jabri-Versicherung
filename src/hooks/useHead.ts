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

    if (config.ogTitle) updateOrCreateMeta('og:title', config.ogTitle, true);
    if (config.ogDescription) updateOrCreateMeta('og:description', config.ogDescription, true);
    if (config.ogUrl) updateOrCreateMeta('og:url', config.ogUrl, true);
    if (config.ogImage) updateOrCreateMeta('og:image', config.ogImage, true);

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
