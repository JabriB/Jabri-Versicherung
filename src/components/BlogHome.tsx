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
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 group-hover:rotate-1"
                />
              </Link>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30 group-hover:bg-orange-500/30 group-hover:border-orange-500/50 transition-all duration-300 group-hover:scale-105">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{post.readTime}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-slate-300 mb-6 line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
                  {post.seoDescription}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-700/50 group-hover:border-orange-500/20 transition-colors duration-300">
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
                    <svg className="w-5 h-5 group-hover/link:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="bg-gradient-to-br from-[#1a2332] to-[#0f1922] border border-orange-500/20 rounded-lg p-10 max-w-lg w-full hover:border-orange-500/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 group">
            <h3 className="text-3xl font-bold text-[#ff6b35] mb-3 group-hover:scale-105 transition-transform duration-300">
              Kostenlose Bedarfsanalyse
            </h3>
            <p className="text-gray-400 mb-6 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Unsicher, welche Versicherung für Sie sinnvoll ist? Ich analysiere Ihre Situation kostenlos:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-100 opacity-0 animate-fade-in-right" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <span className="text-[#ff6b35] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">15-minütiges Beratungsgespräch</span>
              </li>
              <li className="flex items-center gap-3 text-gray-100 opacity-0 animate-fade-in-right" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                <span className="text-[#ff6b35] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Individuelle Risikoanalyse</span>
              </li>
              <li className="flex items-center gap-3 text-gray-100 opacity-0 animate-fade-in-right" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                <span className="text-[#ff6b35] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Konkrete Empfehlung</span>
              </li>
              <li className="flex items-center gap-3 text-gray-100 opacity-0 animate-fade-in-right" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                <span className="text-[#ff6b35] font-bold text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">Mehrsprachige Beratung (DE, EN, AR, TR)</span>
              </li>
            </ul>

            <Link
              to="/formular"
              className="block w-full bg-gradient-to-br from-[#ff6b35] to-[#f55a28] text-white font-semibold py-3 px-7 rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-1 active:translate-y-0 text-center group/btn"
            >
              <span className="flex items-center justify-center gap-2">
                Jetzt Termin vereinbaren
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
