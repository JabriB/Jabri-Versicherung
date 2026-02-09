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
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-gold-400/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-neutral-700 rounded-3xl p-2 backdrop-blur-xl overflow-hidden hover:border-gold-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10">
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
              <h3 className="text-2xl font-semibold text-gold-500 mb-1">
                {t.about.name}
              </h3>
              <p className="text-neutral-400">
                {t.about.role}
              </p>
            </div>
            <p className="text-lg text-neutral-200 mb-4 leading-relaxed">
              {t.about.description}
            </p>

            <p className="text-base text-neutral-400 mb-6 leading-relaxed">
              {t.about.expertise}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-gold-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-neutral-200 text-sm">{t.about.qualities.item1}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-gold-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-neutral-200 text-sm">{t.about.qualities.item2}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-gold-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-neutral-200 text-sm">{t.about.qualities.item3}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-gold-500 flex-shrink-0 mt-1" size={20} />
                <span className="text-neutral-200 text-sm">{t.about.qualities.item4}</span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onNavigate('form')}
                className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 hover:shadow-xl hover:shadow-gold-500/30 group"
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
