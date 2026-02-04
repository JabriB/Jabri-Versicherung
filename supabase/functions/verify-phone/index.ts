import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface RequestPayload {
  phone: string;
  action: 'send' | 'verify';
  code?: string;
}

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function normalizePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('49')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+49${cleaned.substring(1)}`;
  } else if (cleaned.length >= 10) {
    return `+49${cleaned}`;
  }

  return `+${cleaned}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { phone, action, code }: RequestPayload = await req.json();

    if (!phone) {
      return new Response(
        JSON.stringify({ success: false, error: "Phone number is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const normalizedPhone = normalizePhoneNumber(phone);

    if (action === 'send') {
      const verificationCode = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      const { data: existing } = await supabase
        .from('phone_verifications')
        .select('*')
        .eq('phone_number', normalizedPhone)
        .maybeSingle();

      if (existing) {
        if (existing.verified) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "This phone number is already verified and registered"
            }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const { error: updateError } = await supabase
          .from('phone_verifications')
          .update({
            verification_code: verificationCode,
            code_expires_at: expiresAt.toISOString(),
            attempts: 0,
            updated_at: new Date().toISOString(),
          })
          .eq('phone_number', normalizedPhone);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('phone_verifications')
          .insert({
            phone_number: normalizedPhone,
            verification_code: verificationCode,
            code_expires_at: expiresAt.toISOString(),
          });

        if (insertError) throw insertError;
      }

      // Send SMS via Twilio
      const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
      const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
      const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

      // Dev mode fallback if Twilio is not configured
      const isDevMode = !twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber;

      if (!isDevMode) {
        try {
          // Send SMS using Twilio API
          const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
          const twilioResponse = await fetch(twilioUrl, {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa(`${twilioAccountSid}:${twilioAuthToken}`),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              To: normalizedPhone,
              From: twilioPhoneNumber,
              Body: `Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`,
            }),
          });

          if (!twilioResponse.ok) {
            const errorData = await twilioResponse.json();
            console.error('Twilio error:', errorData);
            throw new Error(`Failed to send SMS: ${errorData.message || 'Unknown error'}`);
          }

          console.log(`SMS sent successfully to ${normalizedPhone}`);
        } catch (smsError) {
          console.error('Error sending SMS:', smsError);
          return new Response(
            JSON.stringify({
              success: false,
              error: "Failed to send verification code. Please try again."
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      } else {
        // Dev mode: log to console
        console.log(`[DEV MODE] Verification code for ${normalizedPhone}: ${verificationCode}`);
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Verification code sent",
          // Only include devCode in dev mode
          ...(isDevMode && { devCode: verificationCode })
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === 'verify') {
      if (!code) {
        return new Response(
          JSON.stringify({ success: false, error: "Verification code is required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { data: verification, error: fetchError } = await supabase
        .from('phone_verifications')
        .select('*')
        .eq('phone_number', normalizedPhone)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!verification) {
        return new Response(
          JSON.stringify({ success: false, error: "No verification request found" }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (verification.attempts >= 5) {
        return new Response(
          JSON.stringify({ success: false, error: "Too many attempts. Please request a new code" }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (new Date(verification.code_expires_at) < new Date()) {
        return new Response(
          JSON.stringify({ success: false, error: "Verification code expired. Please request a new one" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (verification.verification_code !== code) {
        await supabase
          .from('phone_verifications')
          .update({ attempts: verification.attempts + 1 })
          .eq('phone_number', normalizedPhone);

        return new Response(
          JSON.stringify({
            success: false,
            error: "Invalid verification code",
            attemptsLeft: 5 - (verification.attempts + 1)
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error: updateError } = await supabase
        .from('phone_verifications')
        .update({
          verified: true,
          verified_at: new Date().toISOString(),
        })
        .eq('phone_number', normalizedPhone);

      if (updateError) throw updateError;

      return new Response(
        JSON.stringify({ success: true, message: "Phone number verified successfully" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid action" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
