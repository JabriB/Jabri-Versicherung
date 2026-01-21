/*
  # Fix Security Issues

  ## Overview
  Addresses security warnings:
  1. Removes unused indexes that are not utilized by the simplified queries
  2. Fixes function search path mutability by making it immutable

  ## Changes
  - Drops unused blog_posts indexes (slug, category, published_date, is_published)
  - Drops unused blog_post_translations indexes (post_lang, language)
  - Recreates update_updated_at_column function with immutable search_path
  - Keeps essential index on is_published for WHERE clause optimization

  ## Rationale
  The simplified query architecture fetches all published posts and filters in application layer,
  so database-level indexes on slug, category, and published_date are not utilized.
  Only maintaining is_published index for basic filtering efficiency.
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_blog_posts_slug;
DROP INDEX IF EXISTS idx_blog_posts_category;
DROP INDEX IF EXISTS idx_blog_posts_published_date;
DROP INDEX IF EXISTS idx_blog_translations_post_lang;
DROP INDEX IF EXISTS idx_blog_translations_language;

-- Recreate the update function with immutable search_path for security
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
DROP TRIGGER IF EXISTS update_blog_translations_updated_at ON blog_post_translations;
DROP FUNCTION IF EXISTS update_updated_at_column();

CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER SET search_path = public;

-- Recreate triggers with the fixed function
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_translations_updated_at
  BEFORE UPDATE ON blog_post_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Recreate only the essential index on is_published for query optimization
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published)
  WHERE is_published = true;
