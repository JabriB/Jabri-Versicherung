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

// Generate a random 6-digit verification code (for dev mode only)
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate a unique request ID for correlation
function generateRequestId(): string {
  return crypto.randomUUID();
}

// Base64 URL encoding
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Convert PEM formatted private key to PKCS8 format for Web Crypto API
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const binaryString = atob(
    pem
      .replace(/-----BEGIN PRIVATE KEY-----/g, '')
      .replace(/-----END PRIVATE KEY-----/g, '')
      .replace(/\n/g, '')
  );
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Generate Vonage JWT token using RSA-SHA256
async function generateVonageJWT(applicationId: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    application_id: applicationId,
    iat: now,
    exp: now + 900, // 15 minutes
    jti: crypto.randomUUID(),
  };

  const header = { alg: "RS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  const keyBuffer = pemToArrayBuffer(privateKey);

  const key = await crypto.subtle.importKey(
    'pkcs8',
    keyBuffer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    encoder.encode(signatureInput)
  );

  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureBase64 = btoa(String.fromCharCode(...signatureArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return `${signatureInput}.${signatureBase64}`;
}

// Hash the verification code using SHA-256 (for dev mode only)
async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Compare a plain code with a hashed code (for dev mode only)
async function compareCode(plainCode: string, hashedCode: string): Promise<boolean> {
  const plainHash = await hashCode(plainCode);
  return plainHash === hashedCode;
}

// Normalize phone number to E.164 format (Germany-specific)
function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.trim().replace(/\s+/g, '');
  cleaned = cleaned.replace(/\D/g, '');

  if (cleaned.length < 9) {
    throw new Error('Phone number too short. German numbers need at least 9 digits.');
  }

  if (cleaned.startsWith('49')) {
    // Already has country code 49
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    // Starts with 0, replace with +49
    return `+49${cleaned.substring(1)}`;
  } else {
    // No country code prefix, add +49
    return `+49${cleaned}`;
  }
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

// Rate limiting check: No limit for unverified numbers, only prevent verified numbers from requesting new codes
async function checkRateLimit(supabase: any, phone: string, ip: string): Promise<{ allowed: boolean; error?: string }> {
  // Check if phone is already verified
  const { data: existing } = await supabase
    .from('phone_verifications')
    .select('verified')
    .eq('phone_number', phone)
    .maybeSingle();

  // If number is already verified, don't allow new verification requests
  if (existing?.verified) {
    return {
      allowed: false,
      error: "This phone number is already verified and registered"
    };
  }

  // Allow unlimited requests for unverified numbers
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

      const now = new Date().toISOString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      const { data: existing } = await supabase
        .from('phone_verifications')
        .select('*')
        .eq('phone_number', normalizedPhone)
        .maybeSingle();

      if (existing?.verified) {
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

      // Get Vonage credentials
      const vonageApplicationId = Deno.env.get("VONAGE_APPLICATION_ID");
      const vonagePrivateKey = Deno.env.get("VONAGE_PRIVATE_KEY");

      // Dev mode: If Vonage credentials are not configured
      if (!vonageApplicationId || !vonagePrivateKey) {
        console.log(`[${requestId}] DEV MODE - Vonage credentials not configured`);

        const verificationCode = generateVerificationCode();
        const codeHash = await hashCode(verificationCode);

        console.log(`[${requestId}] DEV MODE - Verification code for ${normalizedPhone}: ${verificationCode}`);

        // Store in database for dev mode verification
        if (existing) {
          await supabase
            .from('phone_verifications')
            .update({
              verification_code_hash: codeHash,
              code_expires_at: expiresAt.toISOString(),
              attempts: 0,
              last_sent_at: now,
              ip_address: clientIp,
              request_id: requestId,
              updated_at: now,
              vonage_request_id: null,
            })
            .eq('phone_number', normalizedPhone);
        } else {
          await supabase
            .from('phone_verifications')
            .insert({
              phone_number: normalizedPhone,
              verification_code_hash: codeHash,
              code_expires_at: expiresAt.toISOString(),
              last_sent_at: now,
              ip_address: clientIp,
              request_id: requestId,
              vonage_request_id: null,
            });
        }

        return new Response(
          JSON.stringify({
            success: true,
            message: "Verification code sent successfully",
            requestId,
            devMode: true,
            devCode: verificationCode
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Production mode: Use Vonage Verify API v2
      try {
        console.log(`[${requestId}] Using Vonage Verify API v2 for ${normalizedPhone}`);

        const jwt = await generateVonageJWT(vonageApplicationId, vonagePrivateKey);

        const verifyRequestBody = {
          brand: "ARAG Brhan Jabri",
          code_length: 6,
          channel_timeout: 300,
          workflow: [
            {
              channel: "sms",
              to: normalizedPhone
            }
          ]
        };

        console.log(`[${requestId}] Sending Vonage Verify request`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const vonageResponse = await fetch("https://api.nexmo.com/v2/verify", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(verifyRequestBody),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const responseText = await vonageResponse.text();
        console.log(`[${requestId}] Vonage response status: ${vonageResponse.status}, body: ${responseText}`);

        if (!vonageResponse.ok) {
          console.error(`[${requestId}] Vonage HTTP error ${vonageResponse.status}: ${responseText}`);
          throw new Error(`Vonage Verify API error ${vonageResponse.status}: ${responseText}`);
        }

        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch {
          console.error(`[${requestId}] Failed to parse Vonage response as JSON: ${responseText}`);
          throw new Error('Invalid response format from SMS provider');
        }

        const vonageRequestId = responseData.request_id;
        if (!vonageRequestId) {
          console.error(`[${requestId}] No request_id in Vonage response: ${JSON.stringify(responseData)}`);
          throw new Error('Invalid response from SMS provider');
        }

        console.log(`[${requestId}] Vonage request_id: ${vonageRequestId}`);

        // Store vonage_request_id in database
        if (existing) {
          await supabase
            .from('phone_verifications')
            .update({
              vonage_request_id: vonageRequestId,
              code_expires_at: expiresAt.toISOString(),
              attempts: 0,
              last_sent_at: now,
              ip_address: clientIp,
              request_id: requestId,
              updated_at: now,
              verification_code_hash: null,
            })
            .eq('phone_number', normalizedPhone);
        } else {
          await supabase
            .from('phone_verifications')
            .insert({
              phone_number: normalizedPhone,
              vonage_request_id: vonageRequestId,
              code_expires_at: expiresAt.toISOString(),
              last_sent_at: now,
              ip_address: clientIp,
              request_id: requestId,
              verification_code_hash: null,
            });
        }

        console.log(`[${requestId}] Verification request sent successfully via Vonage Verify API`);
      } catch (verifyError) {
        console.error(`[${requestId}] Vonage Verify API error:`, verifyError);

        const errorMessage = verifyError instanceof Error && verifyError.name === 'AbortError'
          ? 'Verification request timed out. Please try again.'
          : verifyError instanceof Error
            ? verifyError.message
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

      return new Response(
        JSON.stringify({
          success: true,
          message: "Verification code sent successfully",
          requestId
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

      // Check if using Vonage Verify API or dev mode
      const vonageApplicationId = Deno.env.get("VONAGE_APPLICATION_ID");
      const vonagePrivateKey = Deno.env.get("VONAGE_PRIVATE_KEY");

      let isCodeValid = false;

      // Dev mode: Use hash comparison
      if (!vonageApplicationId || !vonagePrivateKey || verification.verification_code_hash) {
        console.log(`[${requestId}] DEV MODE - Verifying code using hash comparison`);
        isCodeValid = await compareCode(code, verification.verification_code_hash);
      }
      // Production mode: Use Vonage Verify API v2
      else if (verification.vonage_request_id) {
        console.log(`[${requestId}] Production mode - Verifying code with Vonage API`);

        try {
          const jwt = await generateVonageJWT(vonageApplicationId, vonagePrivateKey);

          const verifyCheckBody = {
            code: code
          };

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          const vonageResponse = await fetch(
            `https://api.nexmo.com/v2/verify/${verification.vonage_request_id}`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(verifyCheckBody),
              signal: controller.signal,
            }
          );

          clearTimeout(timeoutId);

          const responseText = await vonageResponse.text();
          console.log(`[${requestId}] Vonage check response status: ${vonageResponse.status}, body: ${responseText}`);

          if (vonageResponse.ok) {
            const responseData = JSON.parse(responseText);
            if (responseData.status === 'completed') {
              isCodeValid = true;
              console.log(`[${requestId}] Vonage verification completed successfully`);
            } else {
              console.log(`[${requestId}] Vonage verification status: ${responseData.status}`);
            }
          } else {
            console.error(`[${requestId}] Vonage check failed: ${responseText}`);
            // Treat API errors as invalid code
            isCodeValid = false;
          }
        } catch (vonageError) {
          console.error(`[${requestId}] Vonage check error:`, vonageError);
          // If Vonage API fails, treat as invalid code
          isCodeValid = false;
        }
      } else {
        console.error(`[${requestId}] No verification method available`);
        throw new Error('Invalid verification state');
      }

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
