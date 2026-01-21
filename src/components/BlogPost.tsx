import { useParams, Link, Navigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { useBlogPost, useBlogPosts } from '../hooks/useBlogPosts';
import { useEffect } from 'react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error } = useBlogPost(slug || '');
  const { posts: allPosts } = useBlogPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const translation = post?.translation;

  useSEO({
    title: translation?.seo_title || 'Blog Post',
    description: translation?.seo_description || '',
    keywords: translation?.keywords?.join(', ') || '',
    image: post?.image || '',
    canonical: `https://jabriversicherung.de/blog/${post?.slug || ''}`,
    type: 'article',
    author: post?.author || '',
    datePublished: post?.published_date || '',
    schema: post && translation ? {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": translation.seo_title,
      "description": translation.seo_description,
      "image": post.image,
      "datePublished": post.published_date,
      "author": {
        "@type": "Person",
        "name": post.author,
        "jobTitle": "Versicherungsvertreter",
        "url": "https://jabriversicherung.de"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Jabri Versicherung",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jabriversicherung.de/jabri-versicherung-logo.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://jabriversicherung.de/blog/${post.slug}`
      }
    } : undefined
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-400">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-40">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-300">{translation?.title}</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {translation?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.published_date).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.read_time}
            </div>
          </div>

          <img
            src={post.image}
            alt={post.image_alt}
            className="w-full rounded-xl shadow-2xl border border-slate-700"
          />
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-orange-400 prose-a:no-underline hover:prose-a:text-orange-300
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-slate-300 prose-ul:my-6
            prose-li:my-2
            prose-table:border-slate-700
            prose-th:bg-slate-800 prose-th:text-white
            prose-td:border-slate-700"
          dangerouslySetInnerHTML={{ __html: translation?.content || '' }}
        />

        <nav className="mt-12 grid md:grid-cols-2 gap-6">
          {prevPost && (
            <Link
              to={`/blog/${prevPost.slug}`}
              className="p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 group"
            >
              <div className="text-sm text-slate-400 mb-3 group-hover:text-slate-300 transition-colors">← Vorheriger Artikel</div>
              <div className="text-white font-semibold group-hover:text-orange-400 transition-colors text-lg">
                {prevPost.translation?.title}
              </div>
            </Link>
          )}

          {nextPost && (
            <Link
              to={`/blog/${nextPost.slug}`}
              className="p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 group md:text-right"
            >
              <div className="text-sm text-slate-400 mb-3 group-hover:text-slate-300 transition-colors">Nächster Artikel →</div>
              <div className="text-white font-semibold group-hover:text-orange-400 transition-colors text-lg">
                {nextPost.translation?.title}
              </div>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
