/*
  # Fix All Security Issues

  ## Summary
  Comprehensive security fix that resolves multiple issues identified by security scanning.

  ## Changes Made

  ### 1. Remove Conflicting Permissive Policies
  - Drop old "Anyone can request phone verification" policy (INSERT with always true)
  - Drop old "Anyone can check verification status" policy (SELECT with always true)
  - Drop old "Anyone can update verification status" policy (UPDATE with always true)
  - These policies conflict with the restrictive "Deny" policies and bypass RLS

  ### 2. Drop Unused Indexes
  The following indexes have not been used and add unnecessary overhead:
  - `idx_phone_verifications_verified` - Not used for queries
  - `idx_phone_verifications_last_sent_at` - Not used for queries
  - `idx_phone_verifications_ip_address` - Not used for queries
  - `idx_phone_verifications_vonage_request` - Not used for queries
  - `idx_blog_posts_is_published` - Not used, queries filter on this but use sequential scan

  ### 3. Fix Function Search Paths
  - Update `cleanup_expired_verification_codes` to use immutable search_path
  - Update `cleanup_expired_phone_verifications` to use immutable search_path
  - Prevents search path manipulation attacks

  ## Security Model After Fix
  - phone_verifications table: Only service_role has access (via edge functions)
  - Anonymous users: Explicitly denied all access
  - Functions: Protected with immutable search paths
  - Indexes: Only essential indexes remain for actual query patterns

  ## Notes
  - The restrictive "Deny anonymous" policies remain in place
  - The "Service role full access" policy remains in place
  - Only essential index on phone_number remains for lookups
*/

-- ============================================================================
-- 1. DROP CONFLICTING PERMISSIVE POLICIES
-- ============================================================================

-- Drop the old permissive policies that bypass RLS
DROP POLICY IF EXISTS "Anyone can request phone verification" ON phone_verifications;
DROP POLICY IF EXISTS "Anyone can check verification status" ON phone_verifications;
DROP POLICY IF EXISTS "Anyone can update verification status" ON phone_verifications;

-- ============================================================================
-- 2. DROP UNUSED INDEXES
-- ============================================================================

-- Drop unused indexes on phone_verifications table
DROP INDEX IF EXISTS idx_phone_verifications_verified;
DROP INDEX IF EXISTS idx_phone_verifications_last_sent_at;
DROP INDEX IF EXISTS idx_phone_verifications_ip_address;
DROP INDEX IF EXISTS idx_phone_verifications_vonage_request;

-- Drop unused index on blog_posts table
DROP INDEX IF EXISTS idx_blog_posts_is_published;

-- ============================================================================
-- 3. FIX FUNCTION SEARCH PATHS
-- ============================================================================

-- Recreate cleanup_expired_verification_codes with immutable search_path
CREATE OR REPLACE FUNCTION cleanup_expired_verification_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  DELETE FROM public.phone_verifications
  WHERE verified = false
    AND code_expires_at < now() - INTERVAL '24 hours';
END;
$$;

-- Recreate cleanup_expired_phone_verifications with immutable search_path
CREATE OR REPLACE FUNCTION cleanup_expired_phone_verifications()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Delete expired unverified codes
  DELETE FROM public.phone_verifications
  WHERE verified = false 
    AND code_expires_at < NOW();
  
  -- Delete old verified records (keep for 30 days for audit)
  DELETE FROM public.phone_verifications
  WHERE verified = true
    AND verified_at < NOW() - INTERVAL '30 days';
END;
$$;
