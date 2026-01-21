import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useLanguage } from '../contexts/LanguageContext';

export default function BlogHome() {
  const { posts, loading, error } = useBlogPosts();
  const { language } = useLanguage();

  const seoContent = {
    de: {
      title: 'Blog - Versicherungsberatung Aachen & Düren | Jabri Versicherung',
      description: 'Experten-Tipps zu Rechtschutz, Haftpflicht, Hausrat & mehr. Kostenlose Beratung für Aachen, Düren, Eschweiler.',
      keywords: 'Versicherung Blog, Rechtschutz Tipps, Versicherungsberatung Aachen',
      heading: 'Versicherungs-Expertise',
      subheading: 'Aktuelle Artikel zu Rechtschutz, Haftpflicht & mehr. Kostenlose Expertenberatung für Ihre Situation.',
      latestArticles: 'Neueste Artikel',
      noPostsMessage: 'Keine Blog-Beiträge verfügbar.',
      readMore: 'Weiterlesen',
      cta: 'Kostenlose Bedarfsanalyse',
      ctaSubtitle: 'Unsicher, welche Versicherung für Sie sinnvoll ist? Ich analysiere Ihre Situation kostenlos:',
      ctaList1: '15-minütiges Beratungsgespräch',
      ctaList2: 'Individuelle Risikoanalyse',
      ctaList3: 'Konkrete Empfehlung',
      ctaList4: 'Mehrsprachige Beratung (DE, EN, AR, TR)',
      ctaButton: 'Jetzt Termin vereinbaren'
    },
    en: {
      title: 'Blog - Insurance Consulting Aachen & Düren | Jabri Insurance',
      description: 'Expert tips on legal protection, liability, household insurance & more. Free consulting for Aachen, Düren, Eschweiler.',
      keywords: 'Insurance Blog, Legal Protection Tips, Insurance Consulting Aachen',
      heading: 'Insurance Expertise',
      subheading: 'Current articles on legal protection, liability & more. Free expert consulting for your situation.',
      latestArticles: 'Latest Articles',
      noPostsMessage: 'No blog posts available yet.',
      readMore: 'Read More',
      cta: 'Free Needs Analysis',
      ctaSubtitle: 'Unsure which insurance is right for you? I analyze your situation for free:',
      ctaList1: '15-minute consultation',
      ctaList2: 'Individual risk analysis',
      ctaList3: 'Concrete recommendation',
      ctaList4: 'Multilingual consulting (DE, EN, AR, TR)',
      ctaButton: 'Schedule Appointment Now'
    },
    ar: {
      title: 'المدونة - استشارة التأمين في آخن وديرين | جبري للتأمين',
      description: 'نصائح الخبراء حول الحماية القانونية والمسؤولية والتأمين على المنزل وغير ذلك. استشارة مجانية لآخن وديرين وإشفيلد.',
      keywords: 'مدونة التأمين, نصائح الحماية القانونية, استشارة التأمين',
      heading: 'خبرة التأمين',
      subheading: 'مقالات حالية حول الحماية القانونية والمسؤولية وغير ذلك. استشارة خبير مجانية لموقفك.',
      latestArticles: 'أحدث المقالات',
      noPostsMessage: 'لا توجد مقالات مدونة متاحة حالياً.',
      readMore: 'اقرأ المزيد',
      cta: 'تحليل احتياجات مجاني',
      ctaSubtitle: 'غير متأكد من نوع التأمين المناسب لك؟ أقوم بتحليل وضعك بشكل مجاني:',
      ctaList1: 'استشارة مدتها 15 دقيقة',
      ctaList2: 'تحليل المخاطر الفردية',
      ctaList3: 'توصية ملموسة',
      ctaList4: 'استشارة متعددة اللغات (DE, EN, AR, TR)',
      ctaButton: 'حدد موعدك الآن'
    },
    tr: {
      title: 'Blog - Aachen & Düren Sigorta Danışması | Jabri Sigorta',
      description: 'Yasal koruma, sorumluluk, ev sigortası ve daha fazlası hakkında uzman ipuçları. Aachen, Düren, Eschweiler için ücretsiz danışmanlık.',
      keywords: 'Sigorta Blogu, Yasal Koruma İpuçları, Sigorta Danışması',
      heading: 'Sigorta Uzmanlığı',
      subheading: 'Yasal koruma, sorumluluk ve daha fazlası hakkında güncel makaleler. Durumunuz için ücretsiz uzman danışmanı.',
      latestArticles: 'En Son Makaleler',
      noPostsMessage: 'Henüz mevcut blog yazısı yok.',
      readMore: 'Devamını Oku',
      cta: 'Ücretsiz İhtiyaçlar Analizi',
      ctaSubtitle: 'Hangi sigorta sizin için uygun olduğundan emin değil misiniz? Durumunuzu ücretsiz analiz ediyorum:',
      ctaList1: '15 dakikalık danışmanlık',
      ctaList2: 'Bireysel risk analizi',
      ctaList3: 'Somut tavsiye',
      ctaList4: 'Çok Dilli Danışmanlık (DE, EN, AR, TR)',
      ctaButton: 'Şimdi Randevu Al'
    }
  };

  const content = seoContent[language as keyof typeof seoContent] || seoContent.de;

  useSEO({
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    canonical: `https://jabriversicherung.de/blog`
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-400">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-red-400">
            <p>Error loading blog posts. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-slate-300">{content.latestArticles}</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            {language === 'ar' ? (
              <span>{content.heading}</span>
            ) : (
              <>
                {language === 'en' ? 'Insurance' : language === 'tr' ? 'Sigorta' : 'Versicherungs'}-<br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  {content.heading.includes('-') ? content.heading.split('-')[1].trim() : 'Expertise'}
                </span>
              </>
            )}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-slate-400 py-16">
            <p className="text-lg">{content.noPostsMessage}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {posts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.image_alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 group-hover:rotate-1"
                />
              </Link>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30 group-hover:bg-orange-500/30 group-hover:border-orange-500/50 transition-all duration-300 group-hover:scale-105">
                    {post.category}
                  </span>
                  <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{post.read_time}</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  <Link to={`/blog/${post.slug}`}>
                    {post.translation?.title || 'Untitled'}
                  </Link>
                </h2>

                <p className="text-slate-300 mb-6 line-clamp-3 group-hover:text-slate-200 transition-colors duration-300">
                  {post.translation?.seo_description || ''}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-700/50 group-hover:border-orange-500/20 transition-colors duration-300">
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {new Date(post.published_date).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2 transition-all group/link"
                  >
                    {content.readMore}
                    <svg className="w-5 h-5 group-hover/link:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-10 max-w-lg w-full hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 group backdrop-blur-xl">
            <h3 className="text-3xl font-bold text-orange-400 mb-3 group-hover:text-orange-300 transition-colors duration-300">
              {content.cta}
            </h3>
            <p className="text-slate-400 mb-6 text-base leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
              {content.ctaSubtitle}
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-100 opacity-0 animate-fade-in-right" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <span className="text-orange-500 font-bold text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{content.ctaList1}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-100 opacity-0 animate-fade-in-right" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                <span className="text-orange-500 font-bold text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{content.ctaList2}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-100 opacity-0 animate-fade-in-right" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                <span className="text-orange-500 font-bold text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{content.ctaList3}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-100 opacity-0 animate-fade-in-right" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                <span className="text-orange-500 font-bold text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">{content.ctaList4}</span>
              </li>
            </ul>

            <Link
              to="/formular"
              className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-7 rounded-lg transition-all hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 text-center group/btn"
            >
              <span className="flex items-center justify-center gap-2">
                {content.ctaButton}
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
