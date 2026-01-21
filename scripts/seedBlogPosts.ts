import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  if (!supabaseUrl) console.error('  - VITE_SUPABASE_URL');
  if (!supabaseServiceKey) console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Translation {
  language: 'de' | 'en' | 'tr' | 'ar';
  title: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  keywords: string[];
  primaryKeyword: string;
}

interface BlogPostData {
  slug: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  imageAlt: string;
  wordCount: number;
  publishedDate: string;
  translations: Translation[];
}

const sampleBlogPosts: BlogPostData[] = [
  
];

async function seedBlogPosts() {
  console.log('\n🚀 Starting blog posts seeding...\n');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const postData of sampleBlogPosts) {
    try {
      // Check if post already exists
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', postData.slug)
        .maybeSingle();

      if (existingPost) {
        console.log(`⏭️  Post already exists: "${postData.slug}"`);
        skipCount++;
        continue;
      }

      // Create main blog post
      const { data: newPost, error: postError } = await supabase
        .from('blog_posts')
        .insert([{
          slug: postData.slug,
          category: postData.category,
          author: postData.author,
          read_time: postData.readTime,
          image: postData.image,
          image_alt: postData.imageAlt,
          word_count: postData.wordCount,
          published_date: postData.publishedDate,
          is_published: true
        }])
        .select()
        .single();

      if (postError) {
        console.error(`❌ Error creating post "${postData.slug}":`, postError.message);
        errorCount++;
        continue;
      }

      console.log(`📝 Created: ${postData.slug} (ID: ${newPost.id})`);

      // Create translations for all languages
      const supportedLanguages = ['de', 'en', 'tr', 'ar'];
      let translationCount = 0;

      for (const translation of postData.translations) {
        if (!supportedLanguages.includes(translation.language)) {
          console.warn(`   ⚠️  Unsupported language: ${translation.language}`);
          continue;
        }

        const { error: translationError } = await supabase
          .from('blog_post_translations')
          .insert([{
            blog_post_id: newPost.id,
            language: translation.language,
            title: translation.title,
            seo_title: translation.seoTitle,
            seo_description: translation.seoDescription,
            content: translation.content,
            keywords: translation.keywords,
            primary_keyword: translation.primaryKeyword
          }]);

        if (translationError) {
          console.error(`   ❌ ${translation.language}: ${translationError.message}`);
          errorCount++;
        } else {
          const langName = {
            de: 'Deutsch',
            en: 'English',
            tr: 'Türkçe',
            ar: 'العربية'
          }[translation.language];
          console.log(`   ✓ ${translation.language} (${langName})`);
          translationCount++;
        }
      }

      if (translationCount === 4) {
        console.log(`✅ Successfully seeded: ${postData.slug}\n`);
        successCount++;
      } else {
        console.log(`⚠️  Partially seeded: ${postData.slug} (${translationCount}/4 translations)\n`);
      }
    } catch (error) {
      console.error(`❌ Error processing post "${postData.slug}":`, error);
      errorCount++;
    }
  }

  // Summary
  console.log('\n📊 Seeding Summary:');
  console.log(`✅ Successfully created: ${successCount}`);
  console.log(`⏭️  Already existed: ${skipCount}`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount}`);
  }
  console.log('\n✨ Blog posts seeding completed!\n');
}

seedBlogPosts().catch(console.error);
