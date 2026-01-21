import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BlogPostData {
  slug: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  imageAlt: string;
  wordCount: number;
  publishedDate: string;
  translations: {
    language: 'de' | 'en' | 'tr' | 'ar';
    title: string;
    seoTitle: string;
    seoDescription: string;
    content: string;
    keywords: string[];
    primaryKeyword: string;
  }[];
}

const sampleBlogPosts: BlogPostData[] = [
  {
    slug: 'rechtschutz-aachen-guide',
    category: 'Rechtschutz',
    author: 'Brhan Jabri',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    imageAlt: 'Rechtschutzversicherung Beratung Aachen',
    wordCount: 2500,
    publishedDate: '2026-01-24',
    translations: [
      {
        language: 'de',
        title: 'Rechtschutzversicherung Aachen: Vollständiger Guide 2026',
        seoTitle: 'Rechtschutz Aachen 2026 - Kosten, Deckung & Vergleich',
        seoDescription: 'Rechtschutzversicherung in Aachen: Was ist versichert? Welche Kosten entstehen? Kompletter Beratungs-Guide mit Empfehlungen.',
        keywords: ['Rechtschutz Aachen', 'Rechtschutzversicherung Kosten', 'Rechtsschutz Vergleich'],
        primaryKeyword: 'Rechtschutz Aachen',
        content: `
          <h2>Rechtschutzversicherung in Aachen - Ihr umfassender Guide</h2>
          <p>Eine Rechtschutzversicherung schützt Sie vor hohen Anwalts- und Gerichtskosten. In Aachen und Umgebung gibt es besondere Aspekte zu beachten.</p>

          <h3>Was deckt eine Rechtschutzversicherung ab?</h3>
          <p>Eine gute Rechtschutzversicherung übernimmt:</p>
          <ul>
            <li>Anwaltskosten</li>
            <li>Gerichtskosten</li>
            <li>Gutachterkosten</li>
            <li>Kosten für Zeugen und Sachverständige</li>
          </ul>

          <h3>Kosten in Aachen</h3>
          <p>Die durchschnittlichen Kosten für eine Rechtschutzversicherung in Aachen liegen zwischen 15€ und 40€ monatlich, abhängig von:</p>
          <ul>
            <li>Versicherungsumfang</li>
            <li>Selbstbeteiligung</li>
            <li>Familiensituation</li>
          </ul>

          <h3>Empfohlene Anbieter</h3>
          <p>Für die Region Aachen empfehlen wir folgende Versicherer aufgrund ihrer lokalen Expertise und fairen Konditionen.</p>

          <h3>Jetzt Beratung vereinbaren</h3>
          <p>Kontaktieren Sie uns für eine kostenlose, unverbindliche Beratung zu Ihrer individuellen Situation.</p>
        `
      },
      {
        language: 'en',
        title: 'Legal Protection Insurance Aachen: Complete Guide 2026',
        seoTitle: 'Legal Insurance Aachen 2026 - Costs, Coverage & Comparison',
        seoDescription: 'Legal protection insurance in Aachen: What is covered? What are the costs? Complete advisory guide with recommendations.',
        keywords: ['Legal Insurance Aachen', 'Legal Protection Costs', 'Insurance Comparison'],
        primaryKeyword: 'Legal Insurance Aachen',
        content: `
          <h2>Legal Protection Insurance in Aachen - Your Comprehensive Guide</h2>
          <p>Legal protection insurance protects you from high lawyer and court costs. There are special aspects to consider in Aachen and the surrounding area.</p>

          <h3>What does legal protection insurance cover?</h3>
          <p>Good legal protection insurance covers:</p>
          <ul>
            <li>Lawyer costs</li>
            <li>Court costs</li>
            <li>Expert costs</li>
            <li>Costs for witnesses and experts</li>
          </ul>

          <h3>Costs in Aachen</h3>
          <p>The average costs for legal protection insurance in Aachen range from €15 to €40 monthly, depending on:</p>
          <ul>
            <li>Insurance scope</li>
            <li>Deductible</li>
            <li>Family situation</li>
          </ul>

          <h3>Contact us for advice</h3>
          <p>Contact us for free, non-binding advice on your individual situation.</p>
        `
      },
      {
        language: 'tr',
        title: 'Hukuki Koruma Sigortası Aachen: Kapsamlı Rehber 2026',
        seoTitle: 'Hukuki Sigorta Aachen 2026 - Maliyetler, Kapsam ve Karşılaştırma',
        seoDescription: 'Aachen\'de hukuki koruma sigortası: Neler kapsanır? Maliyetler nelerdir? Önerilerle birlikte eksiksiz danışmanlık rehberi.',
        keywords: ['Hukuki Sigorta Aachen', 'Hukuki Koruma Maliyetleri', 'Sigorta Karşılaştırması'],
        primaryKeyword: 'Hukuki Sigorta Aachen',
        content: `
          <h2>Aachen'de Hukuki Koruma Sigortası - Kapsamlı Rehberiniz</h2>
          <p>Hukuki koruma sigortası sizi yüksek avukat ve mahkeme masraflarından korur. Aachen ve çevresinde dikkate alınması gereken özel yönler vardır.</p>

          <h3>Hukuki koruma sigortası neleri kapsar?</h3>
          <p>İyi bir hukuki koruma sigortası şunları kapsar:</p>
          <ul>
            <li>Avukat masrafları</li>
            <li>Mahkeme masrafları</li>
            <li>Uzman masrafları</li>
            <li>Tanık ve bilirkişi masrafları</li>
          </ul>

          <h3>Danışmanlık için bize ulaşın</h3>
          <p>Bireysel durumunuz için ücretsiz, bağlayıcı olmayan danışmanlık için bizimle iletişime geçin.</p>
        `
      },
      {
        language: 'ar',
        title: 'تأمين الحماية القانونية آخن: دليل شامل 2026',
        seoTitle: 'التأمين القانوني آخن 2026 - التكاليف والتغطية والمقارنة',
        seoDescription: 'تأمين الحماية القانونية في آخن: ما الذي يتم تغطيته؟ ما هي التكاليف؟ دليل استشاري كامل مع التوصيات.',
        keywords: ['التأمين القانوني آخن', 'تكاليف الحماية القانونية', 'مقارنة التأمين'],
        primaryKeyword: 'التأمين القانوني آخن',
        content: `
          <h2>تأمين الحماية القانونية في آخن - دليلك الشامل</h2>
          <p>يحميك تأمين الحماية القانونية من تكاليف المحاماة والمحكمة العالية. هناك جوانب خاصة يجب مراعاتها في آخن والمنطقة المحيطة.</p>

          <h3>ماذا يغطي تأمين الحماية القانونية؟</h3>
          <p>يغطي تأمين الحماية القانونية الجيد:</p>
          <ul>
            <li>تكاليف المحاماة</li>
            <li>تكاليف المحكمة</li>
            <li>تكاليف الخبراء</li>
            <li>تكاليف الشهود والخبراء</li>
          </ul>

          <h3>اتصل بنا للحصول على المشورة</h3>
          <p>اتصل بنا للحصول على مشورة مجانية وغير ملزمة بشأن وضعك الفردي.</p>
        `
      }
    ]
  }
];

async function seedBlogPosts() {
  console.log('Starting blog posts seeding...');

  for (const postData of sampleBlogPosts) {
    try {
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', postData.slug)
        .maybeSingle();

      if (existingPost) {
        console.log(`Post with slug "${postData.slug}" already exists. Skipping...`);
        continue;
      }

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
        console.error(`Error creating post "${postData.slug}":`, postError);
        continue;
      }

      console.log(`Created blog post: ${postData.slug} (ID: ${newPost.id})`);

      for (const translation of postData.translations) {
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
          console.error(`Error creating translation for "${postData.slug}" (${translation.language}):`, translationError);
        } else {
          console.log(`  - Created ${translation.language} translation`);
        }
      }

      console.log(`✓ Successfully seeded: ${postData.slug}\n`);
    } catch (error) {
      console.error(`Error processing post "${postData.slug}":`, error);
    }
  }

  console.log('Blog posts seeding completed!');
}

seedBlogPosts().catch(console.error);
