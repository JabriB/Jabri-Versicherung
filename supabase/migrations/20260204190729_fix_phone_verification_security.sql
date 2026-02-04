/*
  # Fix Phone Verification Security

  1. Schema Changes
    - Add `last_sent_at` timestamp for rate limiting
    - Add `verification_code_hash` for secure code storage
    - Add `ip_address` for tracking suspicious patterns
    - Add constraints for data integrity

  2. Security Changes
    - Drop overly permissive RLS policies
    - Create restrictive policies that only allow service role access
    - Prevent anonymous users from directly accessing the table
    - All access must go through edge function with service role key

  3. Data Integrity
    - Add check constraint for verified/verified_at consistency
    - Add check constraint for code expiration logic
    - Add index on last_sent_at for rate limiting queries

  ## Security Model
  - Anonymous users: NO direct database access
  - Service role (edge function): Full access for validation logic
  - All verification logic happens in the edge function
*/

-- Add new columns for enhanced security and rate limiting
DO $$
BEGIN
  -- Add last_sent_at for rate limiting
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_verifications' AND column_name = 'last_sent_at'
  ) THEN
    ALTER TABLE phone_verifications ADD COLUMN last_sent_at timestamptz;
  END IF;

  -- Add verification_code_hash for secure storage
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_verifications' AND column_name = 'verification_code_hash'
  ) THEN
    ALTER TABLE phone_verifications ADD COLUMN verification_code_hash text;
  END IF;

  -- Add ip_address for tracking
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_verifications' AND column_name = 'ip_address'
  ) THEN
    ALTER TABLE phone_verifications ADD COLUMN ip_address text;
  END IF;

  -- Add request_id for correlation
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_verifications' AND column_name = 'request_id'
  ) THEN
    ALTER TABLE phone_verifications ADD COLUMN request_id text;
  END IF;
END $$;

-- Add index on last_sent_at for rate limiting queries
CREATE INDEX IF NOT EXISTS idx_phone_verifications_last_sent_at 
  ON phone_verifications(last_sent_at);

-- Add index on ip_address for abuse detection
CREATE INDEX IF NOT EXISTS idx_phone_verifications_ip_address 
  ON phone_verifications(ip_address);

-- Drop the overly permissive RLS policies
DROP POLICY IF EXISTS "Allow anonymous users to insert verification requests" ON phone_verifications;
DROP POLICY IF EXISTS "Allow anonymous users to read their verification status" ON phone_verifications;
DROP POLICY IF EXISTS "Allow anonymous users to update verification status" ON phone_verifications;

-- Create restrictive policies that only allow service role access
-- Anonymous users should NOT have direct database access

CREATE POLICY "Service role full access"
  ON phone_verifications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Explicitly deny all access to anonymous users
CREATE POLICY "Deny anonymous read access"
  ON phone_verifications
  FOR SELECT
  TO anon
  USING (false);

CREATE POLICY "Deny anonymous insert access"
  ON phone_verifications
  FOR INSERT
  TO anon
  WITH CHECK (false);

CREATE POLICY "Deny anonymous update access"
  ON phone_verifications
  FOR UPDATE
  TO anon
  USING (false);

CREATE POLICY "Deny anonymous delete access"
  ON phone_verifications
  FOR DELETE
  TO anon
  USING (false);

-- Add check constraints for data integrity
DO $$
BEGIN
  -- Ensure verified_at is set when verified is true
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'verified_at_consistency'
  ) THEN
    ALTER TABLE phone_verifications
    ADD CONSTRAINT verified_at_consistency
    CHECK (
      (verified = true AND verified_at IS NOT NULL) OR
      (verified = false)
    );
  END IF;

  -- Ensure code_expires_at is in the future when created
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'code_expiration_valid'
  ) THEN
    ALTER TABLE phone_verifications
    ADD CONSTRAINT code_expiration_valid
    CHECK (code_expires_at > created_at);
  END IF;
END $$;

-- Update cleanup function to also clean up old verified records (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_expired_phone_verifications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete expired unverified codes
  DELETE FROM phone_verifications
  WHERE verified = false 
    AND code_expires_at < NOW();
  
  -- Delete old verified records (keep for 30 days for audit)
  DELETE FROM phone_verifications
  WHERE verified = true
    AND verified_at < NOW() - INTERVAL '30 days';
END;
$$;