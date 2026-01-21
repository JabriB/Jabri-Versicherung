# Blog System - Complete Guide

## How The Blog System Works

Your blog system is a professional, database-driven content management system with these key features:

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│  - BlogHome.tsx (displays all posts)                        │
│  - BlogPost.tsx (displays single post)                      │
│  - useBlogPosts.ts (React hooks for data fetching)          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 BlogService (API Layer)                      │
│  - getAllBlogPosts()                                        │
│  - getBlogPostBySlug()                                      │
│  - createBlogPost()                                         │
│  - searchBlogPosts()                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 Supabase Database                            │
│  Table 1: blog_posts (slug, category, image, dates, etc.)  │
│  Table 2: blog_post_translations (title, content per lang)  │
└─────────────────────────────────────────────────────────────┘
```

### Database Structure

**blog_posts** table stores:
- `slug` - URL-friendly identifier (e.g., "rechtschutz-aachen-guide")
- `category` - Post category (e.g., "Rechtschutz", "Versicherung")
- `author` - Author name
- `read_time` - Reading time estimate
- `image` - Featured image URL
- `word_count` - Article word count
- `published_date` - Publication date
- `is_published` - Whether post is live

**blog_post_translations** table stores (one row per language):
- `blog_post_id` - Links to blog_posts table
- `language` - Language code (de, en, tr, ar)
- `title` - Post title in this language
- `seo_title` - SEO-optimized title
- `seo_description` - Meta description
- `content` - Full article content (HTML)
- `keywords` - Array of SEO keywords
- `primary_keyword` - Main keyword for SEO

### Multi-Language Support

When a user views the blog:
1. The frontend detects their selected language (from LanguageContext)
2. BlogService fetches posts with translations for that language
3. Only the translated content for that language is displayed
4. Each post can have translations in all 4 languages (de, en, tr, ar)

## How To Add New Blog Posts

### Method 1: Using the Seeding Script (Recommended for Multiple Posts)

1. **Edit the seeding script:**
   ```bash
   # Open the file
   nano scripts/seedBlogPosts.ts
   ```

2. **Add your blog post to the `sampleBlogPosts` array:**
   ```typescript
   {
     slug: 'your-post-slug',  // URL-friendly (no spaces, lowercase)
     category: 'Versicherung',  // Category name
     author: 'Brhan Jabri',
     readTime: '8 min',
     image: 'https://images.unsplash.com/photo-xxxxx',  // Image URL
     imageAlt: 'Description of image',
     wordCount: 1500,
     publishedDate: '2026-01-25',  // YYYY-MM-DD format
     translations: [
       {
         language: 'de',
         title: 'Your German Title',
         seoTitle: 'SEO Title DE',
         seoDescription: 'Meta description in German',
         keywords: ['keyword1', 'keyword2'],
         primaryKeyword: 'main keyword',
         content: `
           <h2>Section Title</h2>
           <p>Your content here...</p>
           <ul>
             <li>Point 1</li>
             <li>Point 2</li>
           </ul>
         `
       },
       // Add en, tr, ar translations...
     ]
   }
   ```

3. **Run the seeding script:**
   ```bash
   npm run seed:blog
   ```

4. **Regenerate the sitemap:**
   ```bash
   npm run generate:sitemap
   ```

### Method 2: Direct Database Insert (Quick Single Posts)

Use Supabase dashboard or execute SQL:

```sql
-- Insert the main post
INSERT INTO blog_posts (slug, category, author, read_time, image, image_alt, word_count, published_date, is_published)
VALUES (
  'my-new-post',
  'Versicherung',
  'Brhan Jabri',
  '10 min',
  'https://example.com/image.jpg',
  'Image description',
  2000,
  '2026-01-25',
  true
) RETURNING id;

-- Insert translations (use the ID from above)
INSERT INTO blog_post_translations (blog_post_id, language, title, seo_title, seo_description, content, keywords, primary_keyword)
VALUES
  ('POST_ID_HERE', 'de', 'German Title', 'SEO Title', 'Description', '<p>Content</p>', ARRAY['keyword1'], 'keyword1'),
  ('POST_ID_HERE', 'en', 'English Title', 'SEO Title', 'Description', '<p>Content</p>', ARRAY['keyword1'], 'keyword1'),
  ('POST_ID_HERE', 'tr', 'Turkish Title', 'SEO Title', 'Description', '<p>Content</p>', ARRAY['keyword1'], 'keyword1'),
  ('POST_ID_HERE', 'ar', 'Arabic Title', 'SEO Title', 'Description', '<p>Content</p>', ARRAY['keyword1'], 'keyword1');
```

### Method 3: Using BlogService API (Programmatic)

Create a script or add to your admin panel:

```typescript
import { BlogService } from './src/services/blogService';

const newPost = await BlogService.createBlogPost(
  {
    slug: 'my-new-post',
    category: 'Versicherung',
    author: 'Brhan Jabri',
    read_time: '10 min',
    image: 'https://example.com/image.jpg',
    image_alt: 'Image description',
    word_count: 2000,
    published_date: '2026-01-25',
    is_published: true
  },
  [
    {
      language: 'de',
      title: 'German Title',
      seo_title: 'SEO Title',
      seo_description: 'Meta description',
      content: '<h2>Content</h2><p>Text...</p>',
      keywords: ['keyword1', 'keyword2'],
      primary_keyword: 'keyword1'
    },
    // Add other languages...
  ]
);
```

## Content Writing Tips

### HTML Content Format

Your content should be in HTML format. Supported tags:
- `<h2>`, `<h3>` - Section headings
- `<p>` - Paragraphs
- `<ul>`, `<ol>`, `<li>` - Lists
- `<strong>`, `<em>` - Bold and italic
- `<a href="">` - Links
- `<blockquote>` - Quotes

Example:
```html
<h2>Main Section</h2>
<p>Introduction paragraph with <strong>important</strong> points.</p>

<h3>Subsection</h3>
<ul>
  <li>First point</li>
  <li>Second point</li>
  <li>Third point</li>
</ul>

<p>More content with a <a href="https://example.com">link</a>.</p>
```

### SEO Optimization

For each blog post, provide:

1. **SEO Title** (50-60 characters)
   - Include main keyword
   - Make it compelling
   - Example: "Rechtschutz Aachen 2026 - Kosten & Vergleich"

2. **SEO Description** (150-160 characters)
   - Summarize the post
   - Include call-to-action
   - Example: "Rechtschutzversicherung in Aachen: Was ist versichert? Welche Kosten entstehen? Jetzt vergleichen!"

3. **Keywords** (5-10 relevant keywords)
   - Mix of broad and specific
   - Example: ['Rechtschutz Aachen', 'Versicherung Kosten', 'Rechtsschutz Vergleich']

4. **Primary Keyword** (your main target keyword)
   - Most important keyword for this post
   - Example: 'Rechtschutz Aachen'

### Image Guidelines

- Use high-quality stock photos from Unsplash or Pexels
- Format: `https://images.unsplash.com/photo-xxxxx?w=800`
- Always provide alt text for accessibility
- Recommended size: 1200x630px (or 800px width minimum)

## Checking Your Blog Posts

### View All Posts
Navigate to: `https://yourdomain.com/blog`

### View Single Post
Navigate to: `https://yourdomain.com/blog/your-post-slug`

### Check Database
```bash
# In your terminal or Supabase dashboard
SELECT slug, category, is_published FROM blog_posts;
SELECT blog_post_id, language, title FROM blog_post_translations;
```

## Troubleshooting

### Posts don't appear on the blog page
1. Check `is_published` is set to `true`
2. Verify translations exist for the current language
3. Check browser console for errors (F12)
4. Verify Supabase connection in .env file

### Changes don't appear immediately
1. Refresh the browser (Ctrl+F5 for hard refresh)
2. Check if you're viewing the correct language
3. Verify the database was updated

### Images don't load
1. Verify image URL is accessible
2. Check image URL format (should be HTTPS)
3. Try a different image source

## Best Practices

1. **Always create translations for all 4 languages** to ensure consistent experience
2. **Use descriptive slugs** (e.g., "versicherung-guide-2026" not "post-1")
3. **Keep content focused** - one topic per post
4. **Update the sitemap** after adding posts: `npm run generate:sitemap`
5. **Test on different screen sizes** - the blog is responsive
6. **Include internal links** to your services or other blog posts
7. **Regular updates** - publish new content consistently

## Current Categories

- Rechtschutz (Legal Protection)
- Versicherung (Insurance)
- Kfz-Versicherung (Car Insurance)
- Lebensversicherung (Life Insurance)
- Hausratversicherung (Home Insurance)
- Berufsunfähigkeit (Disability Insurance)

Add more categories as needed by simply using them in new posts!

## Quick Reference Commands

```bash
# Seed sample blog posts
npm run seed:blog

# Generate sitemap with blog posts
npm run generate:sitemap

# Build the project
npm run build

# Start development server
npm run dev
```

## Future Enhancements

Consider adding:
- Admin dashboard for managing posts
- Image upload functionality
- Post scheduling
- Comment system
- Social media sharing
- Related posts suggestions
- Analytics integration
