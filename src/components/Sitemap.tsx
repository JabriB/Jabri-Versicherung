import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { FileText, Home, Shield, Lock, FileCheck, HelpCircle } from 'lucide-react';

export default function Sitemap() {
  const { language } = useLanguage();
  const t = getTranslation(language);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-5xl">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {language === 'de' ? 'Sitemap' : language === 'en' ? 'Sitemap' : language === 'ar' ? 'خريطة الموقع' : 'Site Haritası'}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
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
                className="block bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-lg sm:rounded-xl lg:rounded-2xl p-5 sm:p-6 lg:p-8 hover:bg-slate-800/80 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-orange-500/10"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 lg:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:from-orange-600 group-hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-2 group-hover:text-orange-400 transition-colors">
                      {page.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 mb-2 sm:mb-3 leading-relaxed">
                      {page.description}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 font-mono break-all">
                      https://jabriversicherung.de{page.path}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-slate-400 hover:text-orange-400 transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
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
