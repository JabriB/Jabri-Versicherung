import { useState, useEffect } from 'react';
import { BlogService } from '../services/blogService';
import type { BlogPostWithTranslation, Language } from '../types/blog';
import { useLanguage } from '../contexts/LanguageContext';

export function useBlogPosts() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPostWithTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getAllBlogPosts(language as Language);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [language]);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPostWithTranslation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getBlogPostBySlug(slug, language as Language);
        setPost(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, language]);

  return { post, loading, error };
}

export function useBlogPostsByCategory(category: string) {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPostWithTranslation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getBlogPostsByCategory(category, language as Language);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching blog posts by category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, language]);

  return { posts, loading, error };
}

export function useSearchBlogPosts(query: string) {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPostWithTranslation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setPosts([]);
      return;
    }

    const searchPosts = async () => {
      try {
        setLoading(true);
        const data = await BlogService.searchBlogPosts(query, language as Language);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error searching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query, language]);

  return { posts, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
