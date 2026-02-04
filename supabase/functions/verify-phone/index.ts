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

// Generate a random 6-digit verification code
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate a unique request ID for correlation
function generateRequestId(): string {
  return crypto.randomUUID();
}

// Hash the verification code using SHA-256
async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Compare a plain code with a hashed code
async function compareCode(plainCode: string, hashedCode: string): Promise<boolean> {
  const plainHash = await hashCode(plainCode);
  return plainHash === hashedCode;
}

// Normalize phone number to E.164 format (Germany-specific)
function normalizePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  // German numbers must have at least 9 digits (without country code)
  // or 10+ digits if country code is included
  if (cleaned.length < 9) {
    throw new Error('Phone number too short. German numbers need at least 9 digits.');
  }

  if (cleaned.startsWith('49')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+49${cleaned.substring(1)}`;
  } else if (cleaned.length >= 10) {
    return `+49${cleaned}`;
  } else if (cleaned.length === 9) {
    // 9 digits without country code
    return `+49${cleaned}`;
  }

  throw new Error('Invalid phone number format for Germany.');
}

// Validate E.164 phone number format
function isValidE164(phone: string): boolean {
  return /^\+\d{1,15}$/.test(phone);
}

// Extract IP address from request
function getClientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
         req.headers.get('x-real-ip') ||
         'unknown';
}

// Rate limiting check: max 3 sends per hour per phone
async function checkRateLimit(supabase: any, phone: string, ip: string): Promise<{ allowed: boolean; error?: string }> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  // Check by phone number
  const { data: phoneSends } = await supabase
    .from('phone_verifications')
    .select('last_sent_at')
    .eq('phone_number', phone)
    .gte('last_sent_at', oneHourAgo.toISOString())
    .order('last_sent_at', { ascending: false });

  if (phoneSends && phoneSends.length >= 3) {
    const oldestSend = new Date(phoneSends[phoneSends.length - 1].last_sent_at);
    const minutesUntilReset = Math.ceil((60 - (Date.now() - oldestSend.getTime()) / 60000));
    return {
      allowed: false,
      error: `Rate limit exceeded. Please wait ${minutesUntilReset} minutes before requesting a new code.`
    };
  }

  // Check by IP address (prevent abuse from same IP)
  const { data: ipSends } = await supabase
    .from('phone_verifications')
    .select('last_sent_at')
    .eq('ip_address', ip)
    .gte('last_sent_at', oneHourAgo.toISOString());

  if (ipSends && ipSends.length >= 10) {
    return {
      allowed: false,
      error: 'Too many verification requests from your location. Please try again later.'
    };
  }

  return { allowed: true };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const requestId = generateRequestId();
  const clientIp = getClientIp(req);

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
        JSON.stringify({
          success: false,
          error: "Phone number is required",
          requestId
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let normalizedPhone: string;
    try {
      normalizedPhone = normalizePhoneNumber(phone);
    } catch (normalizeError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: normalizeError instanceof Error ? normalizeError.message : "Invalid phone number format",
          requestId
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate phone number format
    if (!isValidE164(normalizedPhone)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid phone number format. Please enter a valid German phone number.",
          requestId
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === 'send') {
      // Check rate limiting
      const rateLimitCheck = await checkRateLimit(supabase, normalizedPhone, clientIp);
      if (!rateLimitCheck.allowed) {
        return new Response(
          JSON.stringify({
            success: false,
            error: rateLimitCheck.error,
            requestId
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const verificationCode = generateVerificationCode();
      const codeHash = await hashCode(verificationCode);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      const now = new Date().toISOString();

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
              error: "This phone number is already verified and registered",
              requestId
            }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        // Update existing record with new code
        const { error: updateError } = await supabase
          .from('phone_verifications')
          .update({
            verification_code_hash: codeHash,
            code_expires_at: expiresAt.toISOString(),
            attempts: 0,
            last_sent_at: now,
            ip_address: clientIp,
            request_id: requestId,
            updated_at: now,
          })
          .eq('phone_number', normalizedPhone);

        if (updateError) {
          console.error(`[${requestId}] Database update error:`, updateError);
          throw updateError;
        }
      } else {
        // Create new verification record
        const { error: insertError } = await supabase
          .from('phone_verifications')
          .insert({
            phone_number: normalizedPhone,
            verification_code_hash: codeHash,
            code_expires_at: expiresAt.toISOString(),
            last_sent_at: now,
            ip_address: clientIp,
            request_id: requestId,
          });

        if (insertError) {
          console.error(`[${requestId}] Database insert error:`, insertError);
          throw insertError;
        }
      }

      // Send SMS via Vonage
      const vonageApiKey = Deno.env.get("VONAGE_API_KEY");
      const vonageApiSecret = Deno.env.get("VONAGE_API_SECRET");
      const vonageFromNumber = Deno.env.get("VONAGE_FROM_NUMBER");

      // Dev mode fallback if Vonage is not configured or uses placeholder values
      const isDevMode = !vonageApiKey || !vonageApiSecret || !vonageFromNumber ||
        vonageApiKey.includes('your_') || vonageApiSecret.includes('your_') || vonageFromNumber.includes('your_');

      if (!isDevMode) {
        try {
          console.log(`[${requestId}] Attempting to send SMS to ${normalizedPhone}`);
          console.log(`[${requestId}] API Key configured: ${!!vonageApiKey}, Secret configured: ${!!vonageApiSecret}, From configured: ${!!vonageFromNumber}`);

          // Send SMS using Vonage API with timeout
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

          const vonageUrl = "https://rest.nexmo.com/sms/json";
          const params = new URLSearchParams({
            api_key: vonageApiKey,
            api_secret: vonageApiSecret,
            to: normalizedPhone,
            from: vonageFromNumber,
            text: `Your verification code is: ${verificationCode}. This code will expire in 10 minutes.`,
          });

          console.log(`[${requestId}] Sending to Vonage API with to: ${normalizedPhone}, from: ${vonageFromNumber}`);

          const vonageResponse = await fetch(vonageUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          console.log(`[${requestId}] Vonage response status: ${vonageResponse.status}`);

          if (!vonageResponse.ok) {
            const errorText = await vonageResponse.text();
            console.error(`[${requestId}] Vonage HTTP error ${vonageResponse.status}: ${errorText}`);
            throw new Error(`Vonage API returned ${vonageResponse.status}: ${errorText}`);
          }

          const responseData = await vonageResponse.json();
          console.log(`[${requestId}] Vonage response: ${JSON.stringify(responseData)}`);

          // Validate response structure
          if (!responseData.messages || !Array.isArray(responseData.messages) || responseData.messages.length === 0) {
            console.error(`[${requestId}] Invalid Vonage response structure:`, responseData);
            throw new Error('Invalid response from SMS provider');
          }

          const message = responseData.messages[0];

          // Check status codes
          if (message.status !== '0') {
            const errorText = message['error-text'] || 'Unknown error';
            console.error(`[${requestId}] Vonage error: ${errorText} (status: ${message.status})`);

            // Handle specific Vonage error codes
            if (message.status === '1') {
              throw new Error('SMS configuration error. Please contact support.');
            } else if (message.status === '4') {
              throw new Error('SMS service authentication failed. Please contact support.');
            } else if (message.status === '9') {
              throw new Error('Insufficient SMS credits. Please contact support.');
            } else {
              throw new Error(`Failed to send SMS: ${errorText}`);
            }
          }

          console.log(`[${requestId}] SMS sent successfully to ${normalizedPhone}`);
        } catch (smsError) {
          console.error(`[${requestId}] Error sending SMS:`, smsError);

          // Provide user-friendly error message
          const errorMessage = smsError instanceof Error && smsError.name === 'AbortError'
            ? 'SMS request timed out. Please try again.'
            : smsError instanceof Error
              ? smsError.message
              : 'Failed to send verification code. Please try again.';

          return new Response(
            JSON.stringify({
              success: false,
              error: errorMessage,
              requestId
            }),
            {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      } else {
        // Dev mode: log to console only (DO NOT return code to client)
        console.log(`[${requestId}] [DEV MODE] Verification code for ${normalizedPhone}: ${verificationCode}`);
        console.log(`[${requestId}] [DEV MODE] In production, this would be sent via SMS`);
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: isDevMode
            ? "Dev mode: Check server logs for verification code"
            : "Verification code sent successfully",
          requestId
          // SECURITY: Never return the actual code to the client
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === 'verify') {
      if (!code) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Verification code is required",
            requestId
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Validate code format (must be 6 digits)
      if (!/^\d{6}$/.test(code)) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Verification code must be 6 digits",
            requestId
          }),
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

      if (fetchError) {
        console.error(`[${requestId}] Database fetch error:`, fetchError);
        throw fetchError;
      }

      if (!verification) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "No verification request found. Please request a new code.",
            requestId
          }),
          {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check if already verified
      if (verification.verified) {
        return new Response(
          JSON.stringify({
            success: true,
            message: "Phone number already verified",
            requestId
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check attempt limit
      if (verification.attempts >= 5) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Too many verification attempts. Please request a new code.",
            requestId
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check expiration
      if (new Date(verification.code_expires_at) < new Date()) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Verification code expired. Please request a new one.",
            requestId
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Verify the code using hash comparison
      const isCodeValid = await compareCode(code, verification.verification_code_hash);

      if (!isCodeValid) {
        // Increment attempts
        await supabase
          .from('phone_verifications')
          .update({ attempts: verification.attempts + 1 })
          .eq('phone_number', normalizedPhone);

        const attemptsLeft = 5 - (verification.attempts + 1);

        return new Response(
          JSON.stringify({
            success: false,
            error: "Invalid verification code",
            attemptsLeft,
            requestId
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Mark as verified
      const { error: updateError } = await supabase
        .from('phone_verifications')
        .update({
          verified: true,
          verified_at: new Date().toISOString(),
        })
        .eq('phone_number', normalizedPhone);

      if (updateError) {
        console.error(`[${requestId}] Database update error:`, updateError);
        throw updateError;
      }

      console.log(`[${requestId}] Phone ${normalizedPhone} verified successfully`);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Phone number verified successfully",
          requestId
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid action. Must be 'send' or 'verify'.",
        requestId
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(`[${requestId}] Unexpected error:`, error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
        requestId
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
