import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/formular', priority: '0.9', changefreq: 'monthly' },
  { path: '/faq', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'daily' },
  { path: '/impressum', priority: '0.5', changefreq: 'yearly' },
  { path: '/datenschutz', priority: '0.5', changefreq: 'yearly' },
  { path: '/agb', priority: '0.5', changefreq: 'yearly' },
  { path: '/sitemap', priority: '0.6', changefreq: 'monthly' }
];

async function generateSitemap() {
  console.log('Generating sitemap...');

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('slug, published_date, updated_at')
    .eq('is_published', true)
    .order('published_date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    process.exit(1);
  }

  const baseUrl = 'https://jabriversicherung.de';
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  STATIC_PAGES.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${page.path}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });

  posts?.forEach(post => {
    const lastmod = post.updated_at
      ? new Date(post.updated_at).toISOString().split('T')[0]
      : new Date(post.published_date).toISOString().split('T')[0];

    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
    sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.7</priority>\n`;
    sitemap += '  </url>\n';
  });

  sitemap += '</urlset>';

  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  fs.writeFileSync(sitemapPath, sitemap, 'utf-8');

  console.log(`✓ Sitemap generated successfully!`);
  console.log(`  - Static pages: ${STATIC_PAGES.length}`);
  console.log(`  - Blog posts: ${posts?.length || 0}`);
  console.log(`  - Total URLs: ${STATIC_PAGES.length + (posts?.length || 0)}`);
  console.log(`  - Location: ${sitemapPath}`);
}

generateSitemap().catch(console.error);
