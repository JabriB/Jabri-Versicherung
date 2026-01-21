import { supabase } from '../lib/supabase';
import type { BlogPost, BlogPostTranslation, BlogPostWithTranslation, Language } from '../types/blog';

export class BlogService {
  static async getAllBlogPosts(language: Language = 'de'): Promise<BlogPostWithTranslation[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        translation:blog_post_translations(*)
      `)
      .eq('is_published', true)
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    return (data || []).map(post => ({
      ...post,
      translation: (post.translation || []).find((t: any) => t.language === language) || null
    })).filter(post => post.translation !== null);
  }

  static async getBlogPostBySlug(slug: string, language: Language = 'de'): Promise<BlogPostWithTranslation | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        translation:blog_post_translations(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }

    if (!data) return null;

    const translation = (data.translation || []).find((t: any) => t.language === language);
    if (!translation) return null;

    return {
      ...data,
      translation
    };
  }

  static async getBlogPostsByCategory(category: string, language: Language = 'de'): Promise<BlogPostWithTranslation[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        translation:blog_post_translations(*)
      `)
      .eq('category', category)
      .eq('is_published', true)
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts by category:', error);
      throw error;
    }

    return (data || []).map(post => ({
      ...post,
      translation: (post.translation || []).find((t: any) => t.language === language) || null
    })).filter(post => post.translation !== null);
  }

  static async searchBlogPosts(query: string, language: Language = 'de'): Promise<BlogPostWithTranslation[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        translation:blog_post_translations(*)
      `)
      .eq('is_published', true)
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error searching blog posts:', error);
      throw error;
    }

    const posts = (data || []).map(post => ({
      ...post,
      translation: (post.translation || []).find((t: any) => t.language === language) || null
    })).filter(post => post.translation !== null);

    const searchLower = query.toLowerCase();
    return posts.filter(post => {
      const translation = post.translation;
      if (!translation) return false;

      return (
        post.slug.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower) ||
        translation.title.toLowerCase().includes(searchLower) ||
        translation.content.toLowerCase().includes(searchLower) ||
        translation.keywords.some((k: string) => k.toLowerCase().includes(searchLower))
      );
    });
  }

  static async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('is_published', true);

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    const categories = [...new Set((data || []).map(post => post.category))];
    return categories;
  }

  static async getAllBlogPostsForSitemap(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts for sitemap:', error);
      throw error;
    }

    return data || [];
  }

  static async createBlogPost(
    post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>,
    translations: Omit<BlogPostTranslation, 'id' | 'blog_post_id' | 'created_at' | 'updated_at'>[]
  ): Promise<BlogPost> {
    const { data: postData, error: postError } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (postError) {
      console.error('Error creating blog post:', postError);
      throw postError;
    }

    const translationsWithPostId = translations.map(t => ({
      ...t,
      blog_post_id: postData.id
    }));

    const { error: translationsError } = await supabase
      .from('blog_post_translations')
      .insert(translationsWithPostId);

    if (translationsError) {
      console.error('Error creating blog post translations:', translationsError);
      throw translationsError;
    }

    return postData;
  }

  static async updateBlogPost(
    id: string,
    post: Partial<BlogPost>,
    translations?: Partial<BlogPostTranslation>[]
  ): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(post)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }

    if (translations && translations.length > 0) {
      for (const translation of translations) {
        const { language, ...translationData } = translation;
        if (!language) continue;

        const { error: translationError } = await supabase
          .from('blog_post_translations')
          .update(translationData)
          .eq('blog_post_id', id)
          .eq('language', language);

        if (translationError) {
          console.error('Error updating blog post translation:', translationError);
          throw translationError;
        }
      }
    }

    return data;
  }

  static async deleteBlogPost(id: string): Promise<void> {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  }
}
