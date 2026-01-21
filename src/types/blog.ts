export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  author: string;
  read_time: string;
  image: string;
  image_alt: string;
  word_count: number;
  published_date: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPostTranslation {
  id: string;
  blog_post_id: string;
  language: 'de' | 'en' | 'tr' | 'ar';
  title: string;
  seo_title: string;
  seo_description: string;
  content: string;
  keywords: string[];
  primary_keyword: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPostWithTranslation extends BlogPost {
  translation?: BlogPostTranslation;
}

export interface BlogPostFull extends BlogPost {
  translations: BlogPostTranslation[];
}

export type Language = 'de' | 'en' | 'tr' | 'ar';

export const SUPPORTED_LANGUAGES: Language[] = ['de', 'en', 'tr', 'ar'];

export const LANGUAGE_NAMES: Record<Language, string> = {
  de: 'Deutsch',
  en: 'English',
  tr: 'Türkçe',
  ar: 'العربية'
};
