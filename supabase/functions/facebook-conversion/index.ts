import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const event: ConversionEvent = await req.json();
    const accessToken = Deno.env.get("FACEBOOK_CONVERSION_API_TOKEN");
    const pixelId = "1981688579056965";

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Missing Facebook API token" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const payload = {
      data: [
        {
          event_name: event.event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: req.headers.get("referer") || "",
          event_id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...(event.event_data && { event_data: event.event_data }),
          ...(event.user_data && { user_data: event.user_data }),
        },
      ],
      test_event_code: "",
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
