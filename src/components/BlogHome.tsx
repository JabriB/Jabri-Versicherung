import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { blogPosts } from '../data/blogPosts';

export default function BlogHome() {
  useSEO({
    title: 'Blog - Versicherungsberatung Aachen & Düren | Jabri Versicherung',
    description: 'Experten-Tipps zu Rechtschutz, Haftpflicht, Hausrat & mehr. Kostenlose Beratung für Aachen, Düren, Eschweiler.',
    keywords: 'Versicherung Blog, Rechtschutz Tipps, Versicherungsberatung Aachen',
    canonical: 'https://jabriversicherung.de/blog'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Versicherungs-Blog
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Aktuelle Artikel zu Rechtschutz, Haftpflicht & mehr. Kostenlose Expertenberatung für Ihre Situation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-slate-800/50 backdrop-blur rounded-xl overflow-hidden border border-slate-700 hover:border-orange-500 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <Link to={`/blog/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-64 object-cover"
                />
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-sm">{post.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-slate-300 mb-4 line-clamp-3">
                  {post.seoDescription}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>📅 {new Date(post.date).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2 transition-colors"
                  >
                    Weiterlesen
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 border border-orange-400/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sie haben Fragen zu Versicherungen?
            </h3>
            <p className="text-orange-50 mb-6 max-w-2xl mx-auto">
              Ich berate Sie kostenlos und unverbindlich zu allen Versicherungsthemen.
              Mehrsprachig in Deutsch, Englisch, Arabisch und Türkisch.
            </p>
            <Link
              to="/formular"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              Jetzt kostenlose Beratung anfragen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
