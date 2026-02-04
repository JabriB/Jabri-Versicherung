/*
  # Add Vonage Request ID Field

  1. Changes
    - Add `vonage_request_id` column to `phone_verifications` table
      - Stores the Vonage Verify API v2 request ID
      - Used to check verification codes with Vonage API
    - Make `verification_code` nullable
      - Used in dev mode when Vonage is not configured
      - When using Vonage API, vonage_request_id is used instead
    
  2. Important Notes
    - When using Vonage Verify API v2, the vonage_request_id is stored
    - When in dev mode (no Vonage credentials), verification_code_hash is used
    - This supports both production (Vonage API) and dev mode operation
*/

-- Add vonage_request_id column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'phone_verifications' AND column_name = 'vonage_request_id'
  ) THEN
    ALTER TABLE phone_verifications ADD COLUMN vonage_request_id text;
  END IF;
END $$;

-- Make verification_code nullable (since we might use vonage_request_id instead)
DO $$
BEGIN
  ALTER TABLE phone_verifications ALTER COLUMN verification_code DROP NOT NULL;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Create index for faster lookups by vonage_request_id
CREATE INDEX IF NOT EXISTS idx_phone_verifications_vonage_request ON phone_verifications(vonage_request_id);
