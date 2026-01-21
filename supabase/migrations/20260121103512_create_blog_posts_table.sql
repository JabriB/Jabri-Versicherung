/*
  # Create Blog Posts Table with Multi-Language Support

  ## Overview
  Creates a comprehensive blog posts system with support for 4 languages (German, English, Turkish, Arabic)
  and full SEO optimization.

  ## Tables Created
  
  ### `blog_posts`
  - `id` (uuid, primary key) - Unique identifier
  - `slug` (text, unique) - URL-friendly slug
  - `category` (text) - Blog post category
  - `author` (text) - Author name
  - `read_time` (text) - Estimated reading time
  - `image` (text) - Image URL
  - `image_alt` (text) - Image alt text for accessibility
  - `word_count` (integer) - Word count
  - `published_date` (date) - Publication date
  - `is_published` (boolean) - Publication status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `blog_post_translations`
  - `id` (uuid, primary key) - Unique identifier
  - `blog_post_id` (uuid, foreign key) - Reference to blog_posts
  - `language` (text) - Language code (de, en, tr, ar)
  - `title` (text) - Translated title
  - `seo_title` (text) - SEO-optimized title
  - `seo_description` (text) - SEO meta description
  - `content` (text) - Full blog post content (HTML)
  - `keywords` (text[]) - SEO keywords array
  - `primary_keyword` (text) - Main keyword for SEO
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Indexes
  - Index on `slug` for fast lookups
  - Index on `category` for filtering
  - Index on `published_date` for sorting
  - Index on `blog_post_id` and `language` for translation lookups
  - Index on `is_published` for published posts filtering

  ## Security
  - Enable RLS on both tables
  - Allow public read access to published posts
  - Restrict write access (for future admin implementation)
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  author text NOT NULL DEFAULT 'Brhan Jabri',
  read_time text NOT NULL,
  image text NOT NULL,
  image_alt text NOT NULL,
  word_count integer NOT NULL DEFAULT 0,
  published_date date NOT NULL,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_post_translations table
CREATE TABLE IF NOT EXISTS blog_post_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  language text NOT NULL CHECK (language IN ('de', 'en', 'tr', 'ar')),
  title text NOT NULL,
  seo_title text NOT NULL,
  seo_description text NOT NULL,
  content text NOT NULL,
  keywords text[] NOT NULL DEFAULT '{}',
  primary_keyword text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(blog_post_id, language)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON blog_posts(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_translations_post_lang ON blog_post_translations(blog_post_id, language);
CREATE INDEX IF NOT EXISTS idx_blog_translations_language ON blog_post_translations(language);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_translations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to published posts
CREATE POLICY "Public can view published blog posts"
  ON blog_posts
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can view published blog post translations"
  ON blog_post_translations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_post_translations.blog_post_id
      AND blog_posts.is_published = true
    )
  );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_translations_updated_at ON blog_post_translations;
CREATE TRIGGER update_blog_translations_updated_at
  BEFORE UPDATE ON blog_post_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
