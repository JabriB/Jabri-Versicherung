import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../translations/translations';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <section id="hero" className="pt-40 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700 mb-6 animate-fade-in-down">
              <div className="w-3 h-3 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-sm text-neutral-200">{t.hero.badge}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up opacity-0 delay-100">
              {t.hero.title}<br />
              <span className="text-gold-500">
                {t.hero.titleHighlight}
              </span>
            </h1>

            <p className="text-lg text-neutral-400 mb-8 max-w-lg animate-fade-in-up opacity-0 delay-200">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up opacity-0 delay-300">
              <button
                onClick={() => onNavigate('form')}
                className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gold-500/30 animate-pulse-glow"
              >
                {t.hero.startButton}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('ablauf')}
                className="px-8 py-3 bg-transparent hover:bg-gold-500 text-gold-500 hover:text-black rounded-lg font-semibold border-2 border-gold-500 transition-all duration-300 hover:shadow-lg"
              >
                {t.hero.learnMore}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm animate-fade-in-up opacity-0 delay-400">
              <div className="flex items-center gap-3 group">
                <CheckCircle2 className="text-gold-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <span className="text-neutral-200">{t.hero.features.free}</span>
              </div>
              <div className="flex items-center gap-3 group">
                <CheckCircle2 className="text-gold-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <span className="text-neutral-200">{t.hero.features.personal}</span>
              </div>
              <div className="flex items-center gap-3 group">
                <CheckCircle2 className="text-gold-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                <span className="text-neutral-200">{t.hero.features.multilingual}</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative animate-fade-in-right opacity-0 delay-200">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-gold-400/20 rounded-3xl blur-2xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-neutral-700 rounded-3xl p-8 backdrop-blur-xl hover:border-gold-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-4xl font-bold text-white mb-2 hover:text-gold-500 transition-colors">9.2/10</div>
                      <p className="text-neutral-400 text-sm">{t.hero.stats.rating}</p>
                    </div>
                    <div className="text-3xl animate-bounce-slow">⭐⭐⭐⭐⭐</div>
                  </div>

                  <div className="pt-6 border-t border-neutral-700 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">{t.hero.stats.successRate}</span>
                      <span className="text-white font-semibold">98%</span>
                    </div>
                    <div className="w-full bg-neutral-700/50 rounded-full h-2 overflow-hidden">
                      <div className="bg-gold-500 h-2 rounded-full transition-all duration-1000" style={{ width: '98%' }} />
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <span className="text-neutral-400">{t.hero.stats.satisfaction}</span>
                      <span className="text-white font-semibold">95%</span>
                    </div>
                    <div className="w-full bg-neutral-700/50 rounded-full h-2 overflow-hidden">
                      <div className="bg-gold-400 h-2 rounded-full transition-all duration-1000" style={{ width: '95%' }} />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-700">
                    <p className="text-neutral-400 text-sm">
                      <span className="text-gold-400 font-semibold hover:text-gold-300 transition-colors">500+</span> {t.hero.stats.customers}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
