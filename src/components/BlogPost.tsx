import { useParams, Link, Navigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { blogPosts } from '../data/blogPosts';
import { useEffect } from 'react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  useSEO({
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords.join(', '),
    image: post.image,
    canonical: `https://jabriversicherung.de/blog/${post.slug}`,
    type: 'article',
    author: post.author,
    datePublished: post.date,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.seoTitle,
      "description": post.seoDescription,
      "image": post.image,
      "datePublished": post.date,
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
    }
  });

  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-40">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-300">{post.title}</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
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
              {new Date(post.date).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </div>
          </div>

          <img
            src={post.image}
            alt={post.imageAlt}
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
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.internalLinks && post.internalLinks.length > 0 && (
          <div className="mt-12 p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur rounded-2xl border border-slate-700/50 hover:border-orange-500/30 transition-all">
            <h3 className="text-xl font-bold text-white mb-4 text-orange-400">Verwandte Artikel:</h3>
            <ul className="space-y-3">
              {post.internalLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.url}
                    className="text-orange-400 hover:text-orange-300 transition-all flex items-center gap-2 group"
                  >
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <nav className="mt-12 grid md:grid-cols-2 gap-6">
          {prevPost && (
            <Link
              to={`/blog/${prevPost.slug}`}
              className="p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10 group"
            >
              <div className="text-sm text-slate-400 mb-3 group-hover:text-slate-300 transition-colors">← Vorheriger Artikel</div>
              <div className="text-white font-semibold group-hover:text-orange-400 transition-colors text-lg">
                {prevPost.title}
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
                {nextPost.title}
              </div>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
