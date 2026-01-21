/*
  # Fix Function Immutability Issue

  ## Problem
  The update_updated_at_column function was marked as IMMUTABLE, but it has side effects
  (modifying NEW.updated_at), which violates PostgreSQL's IMMUTABLE constraint.

  ## Solution
  Change function to STABLE which allows side effects during execution.
  Keep SECURITY DEFINER and search_path settings.
*/

-- Drop existing triggers and function
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS update_blog_translations_updated_at ON blog_post_translations;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Recreate with correct STABLE keyword (not IMMUTABLE)
CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Recreate triggers
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_translations_updated_at
  BEFORE UPDATE ON blog_post_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
