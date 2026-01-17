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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-slate-300">Neueste Artikel</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Versicherungs-<br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Aktuelle Artikel zu Rechtschutz, Haftpflicht & mehr. Kostenlose Expertenberatung für Ihre Situation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </Link>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{post.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-slate-300 mb-6 line-clamp-3 group-hover:text-slate-200 transition-colors">
                  {post.seoDescription}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {new Date(post.date).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2 transition-all group/link"
                  >
                    Weiterlesen
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 sm:p-12 border border-orange-400/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-2xl blur-2xl" />
            <div className="relative">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Sie haben Fragen zu Versicherungen?
              </h3>
              <p className="text-lg text-orange-50 mb-8 max-w-2xl mx-auto">
                Ich berate Sie kostenlos und unverbindlich zu allen Versicherungsthemen.
                Mehrsprachig in Deutsch, Englisch, Arabisch und Türkisch.
              </p>
              <Link
                to="/formular"
                className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Jetzt kostenlose Beratung anfragen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
