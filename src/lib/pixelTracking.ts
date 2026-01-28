import { trackConversion } from './facebookConversion';

declare global {
  interface Window {
    fbq?: (event: string, eventName: string, data?: Record<string, any>) => void;
  }
}

interface TrackingData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  value?: number;
  currency?: string;
  contentName?: string;
  contentType?: string;
}

export const trackPixelEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, data);
  }
};

export const pixelEvents = {
  pageView: () => {
    trackPixelEvent('PageView');
    trackConversion({ event_name: 'PageView' });
  },

  viewContent: (contentName?: string, contentType?: string, value?: number, currency?: string) => {
    const pixelData: any = {
      content_name: contentName,
      content_type: contentType || 'product',
    };

    const eventData: any = {
      content_name: contentName,
      content_type: contentType || 'product',
    };

    if (value) {
      pixelData.value = value;
      pixelData.currency = currency || 'EUR';
      eventData.value = value;
      eventData.currency = currency || 'EUR';
    }

    trackPixelEvent('ViewContent', pixelData);
    trackConversion({
      event_name: 'ViewContent',
      event_data: eventData,
    });
  },

  lead: (data?: TrackingData) => {
    const conversionData: any = {};

    if (data?.email) conversionData.em = data.email;
    if (data?.phone) conversionData.ph = data.phone;
    if (data?.firstName) conversionData.fn = data.firstName;
    if (data?.lastName) conversionData.ln = data.lastName;

    trackPixelEvent('Lead');
    trackConversion({
      event_name: 'Lead',
      ...(Object.keys(conversionData).length > 0 && { user_data: conversionData }),
    });
  },

  contact: (data?: TrackingData) => {
    const conversionData: any = {};

    if (data?.email) conversionData.em = data.email;
    if (data?.phone) conversionData.ph = data.phone;

    trackPixelEvent('Contact');
    trackConversion({
      event_name: 'Contact',
      ...(Object.keys(conversionData).length > 0 && { user_data: conversionData }),
    });
  },

  schedule: () => {
    trackPixelEvent('Schedule');
    trackConversion({ event_name: 'Schedule' });
  },

  completeRegistration: (data?: TrackingData) => {
    const conversionData: any = {};

    if (data?.email) conversionData.em = data.email;
    if (data?.phone) conversionData.ph = data.phone;
    if (data?.firstName) conversionData.fn = data.firstName;
    if (data?.lastName) conversionData.ln = data.lastName;

    trackPixelEvent('CompleteRegistration');
    trackConversion({
      event_name: 'CompleteRegistration',
      ...(Object.keys(conversionData).length > 0 && { user_data: conversionData }),
    });
  },

  submitApplication: (data?: TrackingData) => {
    const conversionData: any = {};

    if (data?.email) conversionData.em = data.email;
    if (data?.phone) conversionData.ph = data.phone;

    trackPixelEvent('SubmitApplication');
    trackConversion({
      event_name: 'SubmitApplication',
      ...(Object.keys(conversionData).length > 0 && { user_data: conversionData }),
    });
  },

  purchase: (value: number, currency: string = 'EUR', contentName?: string) => {
    const pixelData: any = { value, currency };
    const eventData: any = { value, currency };

    if (contentName) {
      pixelData.content_name = contentName;
      eventData.content_name = contentName;
    }

    trackPixelEvent('Purchase', pixelData);
    trackConversion({
      event_name: 'Purchase',
      event_data: eventData,
    });
  },
};
