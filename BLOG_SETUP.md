# Blog System Setup Guide

This project uses Supabase for storing blog posts with multi-language support (German, English, Turkish, Arabic).

## Database Structure

The blog system uses two main tables:

1. **blog_posts** - Main blog post data (slug, category, author, images, dates, etc.)
2. **blog_post_translations** - Translated content for each blog post (title, content, SEO data)

## Setup Instructions

### 1. Database Migration

The database tables have already been created via Supabase migration. You can verify this by checking your Supabase dashboard.

### 2. Install Dependencies

```bash
npm install
```

### 3. Seed Sample Blog Posts

To populate the database with sample blog posts:

```bash
npm run seed:blog
```

This will create sample blog posts with translations in all 4 languages.

**Note**: You need the `SUPABASE_SERVICE_ROLE_KEY` environment variable set to run the seeding script. This key should be added to your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The service role key can be found in your Supabase dashboard under Settings > API.

### 4. Adding More Blog Posts

To add more blog posts, you can:

#### Option A: Use the Seeding Script

1. Edit `scripts/seedBlogPosts.ts`
2. Add your blog post data to the `sampleBlogPosts` array
3. Run `npm run seed:blog`

#### Option B: Use the BlogService API

```typescript
import { BlogService } from './src/services/blogService';

const post = await BlogService.createBlogPost(
  {
    slug: 'my-post-slug',
    category: 'Rechtschutz',
    author: 'Brhan Jabri',
    read_time: '10 min',
    image: 'https://example.com/image.jpg',
    image_alt: 'Alt text',
    word_count: 2000,
    published_date: '2026-01-24',
    is_published: true
  },
  [
    {
      language: 'de',
      title: 'German Title',
      seo_title: 'SEO Title DE',
      seo_description: 'SEO Description',
      content: '<h2>Content in HTML</h2><p>Text...</p>',
      keywords: ['keyword1', 'keyword2'],
      primary_keyword: 'keyword1'
    },
    // Add more languages...
  ]
);
```

## Language Support

The blog system automatically displays content in the user's selected language:

- **de** - German (Deutsch)
- **en** - English
- **tr** - Turkish (Türkçe)
- **ar** - Arabic (العربية)

Language is controlled by the `LanguageContext` which is already integrated into your application.

## API Reference

### BlogService Methods

- `getAllBlogPosts(language)` - Get all published blog posts
- `getBlogPostBySlug(slug, language)` - Get a single blog post
- `getBlogPostsByCategory(category, language)` - Get posts by category
- `searchBlogPosts(query, language)` - Search posts
- `getCategories()` - Get all categories
- `createBlogPost(post, translations)` - Create new blog post
- `updateBlogPost(id, post, translations)` - Update blog post
- `deleteBlogPost(id)` - Delete blog post

### React Hooks

- `useBlogPosts()` - Fetch all blog posts
- `useBlogPost(slug)` - Fetch single blog post
- `useBlogPostsByCategory(category)` - Fetch posts by category
- `useSearchBlogPosts(query)` - Search posts with debouncing
- `useCategories()` - Fetch all categories

## SEO Optimization

Each blog post includes:
- SEO title and description
- Keywords array
- Primary keyword
- Structured data (JSON-LD)
- Open Graph tags
- Canonical URLs

The sitemap is automatically updated based on database content.

## Security

- Row Level Security (RLS) is enabled on all tables
- Public users can only read published posts
- Write operations require authentication (for future admin panel)

## Troubleshooting

### Seeding fails with permission error
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set in `.env`
- Check that your Supabase project is active

### Blog posts don't show up
- Verify `is_published` is set to `true`
- Check that translations exist for the current language
- Check browser console for errors

### Images don't load
- Verify image URLs are accessible
- Check CORS settings if using external image sources
