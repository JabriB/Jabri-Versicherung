declare global {
  interface Window {
    fbq?: (event: string, eventName: string, data?: Record<string, any>) => void;
  }
}

export const trackPixelEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, data);
  }
};

export const pixelEvents = {
  pageView: () => trackPixelEvent('PageView'),
  viewContent: (contentName?: string, contentType?: string) => {
    trackPixelEvent('ViewContent', {
      content_name: contentName,
      content_type: contentType,
    });
  },
  lead: () => trackPixelEvent('Lead'),
  contact: () => trackPixelEvent('Contact'),
  schedule: () => trackPixelEvent('Schedule'),
  completeRegistration: () => trackPixelEvent('CompleteRegistration'),
};
