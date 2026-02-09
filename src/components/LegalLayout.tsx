import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function LegalLayout({ children, title }: LegalLayoutProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-neutral-900/80 border-b border-neutral-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-800 flex items-center justify-center">
                <img
                  src="/jabri-versicherung-_logo.png"
                  alt="Jabri Versicherung Logo"
                  width="40"
                  height="40"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{t.common.companyName}</div>
                <div className="text-xs text-neutral-400">{t.common.companyRole}</div>
              </div>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-200 hover:text-gold-500 transition"
            >
              <ArrowLeft size={20} />
              <span>{t.common.backButton}</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
          <div className="bg-neutral-800/30 border border-neutral-700/50 rounded-2xl p-8">
            <div className="prose prose-invert max-w-none">
              {children}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-neutral-800 py-8 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center">
              <img
                src="/jabri-versicherung-_logo.png"
                alt="Jabri Versicherung Logo"
                width="32"
                height="32"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-white">{t.common.companyName}</span>
          </div>
          <p className="text-sm text-neutral-400">
            © 2025 {t.common.companyName}. {t.common.allRightsReserved}
          </p>
        </div>
      </footer>
    </div>
  );
}
