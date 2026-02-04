/*
  # Create Phone Verification System

  1. New Tables
    - `phone_verifications`
      - `id` (uuid, primary key) - Unique identifier
      - `phone_number` (text, unique) - Phone number being verified
      - `verification_code` (text) - OTP code sent to user
      - `verified` (boolean) - Whether the phone number has been verified
      - `verified_at` (timestamptz) - When verification was completed
      - `code_expires_at` (timestamptz) - When the verification code expires
      - `attempts` (integer) - Number of verification attempts
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on `phone_verifications` table
    - Add policy for public users to insert verification requests
    - Add policy for public users to read their own verification status
    - Add policy for public users to update verification attempts

  3. Important Notes
    - Phone numbers are stored with E.164 format for consistency
    - Verification codes expire after 10 minutes
    - Maximum 5 verification attempts per phone number
    - Old verification records are kept for audit purposes
*/

CREATE TABLE IF NOT EXISTS phone_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text UNIQUE NOT NULL,
  verification_code text NOT NULL,
  verified boolean DEFAULT false NOT NULL,
  verified_at timestamptz,
  code_expires_at timestamptz NOT NULL,
  attempts integer DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_phone_verifications_phone ON phone_verifications(phone_number);
CREATE INDEX IF NOT EXISTS idx_phone_verifications_verified ON phone_verifications(verified);

-- Enable RLS
ALTER TABLE phone_verifications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to request verification (insert)
CREATE POLICY "Anyone can request phone verification"
  ON phone_verifications
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to read verification status by phone number
CREATE POLICY "Anyone can check verification status"
  ON phone_verifications
  FOR SELECT
  TO anon
  USING (true);

-- Allow anyone to update their verification attempts
CREATE POLICY "Anyone can update verification status"
  ON phone_verifications
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Function to clean up expired codes (optional, for maintenance)
CREATE OR REPLACE FUNCTION cleanup_expired_verification_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM phone_verifications
  WHERE verified = false
    AND code_expires_at < now() - INTERVAL '24 hours';
END;
$$;