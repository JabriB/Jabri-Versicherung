import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { FileText, Home, Shield, Lock, FileCheck, HelpCircle, BookOpen } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';

export default function Sitemap() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const { posts, loading } = useBlogPosts();

  const pages = [
    {
      path: '/',
      title: language === 'de' ? 'Startseite' : language === 'en' ? 'Home' : language === 'ar' ? 'الصفحة الرئيسية' : 'Ana Sayfa',
      description: language === 'de' ? 'Professionelle Versicherungsberatung für Ihre Zukunft' : language === 'en' ? 'Professional insurance consulting for your future' : language === 'ar' ? 'استشارات تأمين احترافية لمستقبلك' : 'Geleceğiniz için profesyonel sigorta danışmanlığı',
      icon: Home
    },
    {
      path: '/formular',
      title: language === 'de' ? 'Beratungsformular' : language === 'en' ? 'Consultation Form' : language === 'ar' ? 'نموذج الاستشارة' : 'Danışma Formu',
      description: language === 'de' ? 'Starten Sie Ihre kostenlose Beratung' : language === 'en' ? 'Start your free consultation' : language === 'ar' ? 'ابدأ استشارتك المجانية' : 'Ücretsiz danışmanlığınızı başlatın',
      icon: FileText
    },
    {
      path: '/faq',
      title: language === 'de' ? 'FAQ' : language === 'en' ? 'FAQ' : language === 'ar' ? 'الأسئلة المتكررة' : 'SSS',
      description: language === 'de' ? 'Häufig gestellte Fragen und Antworten' : language === 'en' ? 'Frequently asked questions and answers' : language === 'ar' ? 'الأسئلة والأجوبة المتكررة' : 'Sık sorulan sorular ve cevaplar',
      icon: HelpCircle
    },
    {
      path: '/impressum',
      title: t.footer.links.imprint,
      description: language === 'de' ? 'Rechtliche Informationen und Kontaktdaten' : language === 'en' ? 'Legal information and contact details' : language === 'ar' ? 'المعلومات القانونية وتفاصيل الاتصال' : 'Yasal bilgiler ve iletişim detayları',
      icon: Shield
    },
    {
      path: '/datenschutz',
      title: t.footer.links.privacy,
      description: language === 'de' ? 'Datenschutzerklärung und Informationen zum Datenschutz' : language === 'en' ? 'Privacy policy and data protection information' : language === 'ar' ? 'سياسة الخصوصية ومعلومات حماية البيانات' : 'Gizlilik politikası ve veri koruma bilgileri',
      icon: Lock
    },
    {
      path: '/agb',
      title: t.footer.links.terms,
      description: language === 'de' ? 'Allgemeine Geschäftsbedingungen' : language === 'en' ? 'Terms and conditions' : language === 'ar' ? 'الشروط والأحكام' : 'Şartlar ve koşullar',
      icon: FileCheck
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-5xl">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {language === 'de' ? 'Sitemap' : language === 'en' ? 'Sitemap' : language === 'ar' ? 'خريطة الموقع' : 'Site Haritası'}
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            {language === 'de' ? 'Übersicht aller Seiten auf jabriversicherung.de' : language === 'en' ? 'Overview of all pages on jabriversicherung.de' : language === 'ar' ? 'نظرة عامة على جميع الصفحات على jabriversicherung.de' : 'jabriversicherung.de üzerindeki tüm sayfaların genel görünümü'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.path}
                to={page.path}
                className="block bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 border border-neutral-700/50 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 hover:bg-neutral-800/80 hover:border-gold-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-gold-500/10"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold-500 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-gold-600 transition-all shadow-lg shadow-gold-500/20">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-gold-500 transition-colors">
                      {page.title}
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-200 mb-2 sm:mb-3 leading-relaxed">
                      {page.description}
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-500 font-mono break-all">
                      https://jabriversicherung.de{page.path}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {!loading && posts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-gold-500" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {language === 'de' ? 'Blog Artikel' : language === 'en' ? 'Blog Posts' : language === 'ar' ? 'مقالات المدونة' : 'Blog Yazıları'}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-neutral-400">
                {language === 'de' ? `${posts.length} Artikel verfügbar` : language === 'en' ? `${posts.length} articles available` : language === 'ar' ? `${posts.length} مقالة متاحة` : `${posts.length} makale mevcut`}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="block bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-neutral-700/30 rounded-lg p-4 sm:p-5 hover:bg-neutral-800/60 hover:border-gold-500/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gold-500/20 rounded-lg flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
                      <BookOpen className="w-4 h-4 text-gold-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-medium text-white mb-1 group-hover:text-gold-500 transition-colors line-clamp-1">
                        {post.translation?.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mb-1">
                        {post.category} • {post.read_time}
                      </p>
                      <p className="text-xs text-neutral-500 font-mono break-all">
                        https://jabriversicherung.de/blog/{post.slug}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-neutral-400 hover:text-gold-500 transition-colors px-4 py-2 rounded-lg hover:bg-neutral-800/50"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>
              {language === 'de' ? 'Zurück zur Startseite' : language === 'en' ? 'Back to Home' : language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Ana Sayfaya Dön'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
