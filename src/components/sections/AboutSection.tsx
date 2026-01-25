import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../translations/translations';
import OptimizedImage from '../OptimizedImage';

interface AboutSectionProps {
  onNavigate: (section: string) => void;
}

export default function AboutSection({ onNavigate }: AboutSectionProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <section id="about" className="py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-3xl p-2 backdrop-blur-xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl">
                <OptimizedImage
                  src="/tower-sm.webp"
                  alt={t.about.name}
                  width={400}
                  height={776}
                  className="rounded-2xl"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.about.title}
            </h2>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-orange-400 mb-1">
                {t.about.name}
              </h3>
              <p className="text-slate-400">
                {t.about.role}
              </p>
            </div>
            <p className="text-lg text-slate-300 mb-4 leading-relaxed">
              {t.about.description}
            </p>

            <p className="text-base text-slate-400 mb-6 leading-relaxed">
              {t.about.expertise}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-slate-300 text-sm">{t.about.qualities.item1}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-slate-300 text-sm">{t.about.qualities.item2}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-slate-300 text-sm">{t.about.qualities.item3}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-slate-300 text-sm">{t.about.qualities.item4}</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onNavigate('form')}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 hover:shadow-xl hover:shadow-orange-500/50 group"
              >
                {t.hero.startButton}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
