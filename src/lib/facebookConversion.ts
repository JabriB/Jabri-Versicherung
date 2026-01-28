interface ConversionEvent {
  event_name: string;
  event_data?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_type?: string;
  };
  user_data?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  };
}

export async function trackConversion(event: ConversionEvent): Promise<void> {
  try {
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/facebook-conversion`;

    const response = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      console.warn(`Facebook Conversion API error: ${response.status}`);
    }
  } catch (error) {
    console.warn("Failed to track Facebook conversion:", error);
  }
}

export function trackPageView(): void {
  trackConversion({
    event_name: "PageView",
  });
}

export function trackLead(data?: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}): void {
  trackConversion({
    event_name: "Lead",
    user_data: {
      em: data?.email,
      ph: data?.phone,
      fn: data?.firstName,
      ln: data?.lastName,
    },
  });
}

export function trackPurchase(
  value: number,
  currency: string = "EUR",
  contentName?: string
): void {
  trackConversion({
    event_name: "Purchase",
    event_data: {
      value,
      currency,
      content_name: contentName,
    },
  });
}

export function trackViewContent(
  contentName: string,
  value?: number,
  currency: string = "EUR"
): void {
  trackConversion({
    event_name: "ViewContent",
    event_data: {
      content_name: contentName,
      content_type: "product",
      ...(value && { value, currency }),
    },
  });
}
