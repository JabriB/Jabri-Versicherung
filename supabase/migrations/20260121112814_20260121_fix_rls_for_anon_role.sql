/*
  # Fix RLS Policies for Anonymous Access

  ## Problem
  The current RLS policies are set for "public" role, but Supabase's anonymous 
  API key uses the "anon" role. This prevents unauthenticated users from accessing
  the blog posts through the Supabase client.

  ## Solution
  Drop existing policies and recreate them for both "anon" and "authenticated" roles
  to ensure the blog is accessible to everyone.

  ## Changes
  1. Drop existing policies
  2. Create new policies for "anon" role (unauthenticated users)
  3. Create new policies for "authenticated" role (logged-in users)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view published blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Public can view published blog post translations" ON blog_post_translations;

-- Create policies for blog_posts table
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (is_published = true);

-- Create policies for blog_post_translations table
CREATE POLICY "Anyone can view published blog post translations"
  ON blog_post_translations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_post_translations.blog_post_id
        AND blog_posts.is_published = true
    )
  );
