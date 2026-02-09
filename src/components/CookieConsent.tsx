import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { Link } from 'react-router-dom';

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = (type: 'all' | 'necessary') => {
    const prefs: CookiePreferences = {
      necessary: true,
      functional: type === 'all',
      analytics: type === 'all',
      marketing: type === 'all',
    };
    localStorage.setItem('cookieConsent', type);
    localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
    setIsVisible(false);
    setShowSettings(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsVisible(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl shadow-2xl border border-neutral-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-black" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t.cookies.settings.title}</h2>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-neutral-200 mb-6">{t.cookies.settings.description}</p>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{t.cookies.settings.necessary.title}</h3>
                    <span className="text-xs px-3 py-1 bg-neutral-700 text-neutral-200 rounded-full">
                      {t.cookies.settings.necessary.alwaysActive}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400">{t.cookies.settings.necessary.description}</p>
                </div>

                {/* Functional Cookies */}
                <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{t.cookies.settings.functional.title}</h3>
                    <button
                      onClick={() => togglePreference('functional')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.functional ? 'bg-gold-500' : 'bg-neutral-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.functional ? 'translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-400">{t.cookies.settings.functional.description}</p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{t.cookies.settings.analytics.title}</h3>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.analytics ? 'bg-gold-500' : 'bg-neutral-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.analytics ? 'translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-400">{t.cookies.settings.analytics.description}</p>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{t.cookies.settings.marketing.title}</h3>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences.marketing ? 'bg-gold-500' : 'bg-neutral-600'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences.marketing ? 'translate-x-6' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-400">{t.cookies.settings.marketing.description}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold-500/50"
                >
                  {t.cookies.settings.saveSettings}
                </button>
                <button
                  onClick={() => handleAccept('all')}
                  className="flex-1 px-6 py-3 bg-neutral-700 text-neutral-200 rounded-xl font-semibold hover:bg-neutral-600 transition-all duration-200"
                >
                  {t.cookies.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl shadow-2xl border border-neutral-700 overflow-hidden backdrop-blur-sm">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Cookie className="w-6 h-6 text-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t.cookies.title}
                  </h3>
                  <p className="text-neutral-200 text-sm md:text-base leading-relaxed mb-4">
                    {t.cookies.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleAccept('all')}
                      className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gold-500/50 hover:scale-105"
                    >
                      {t.cookies.acceptAll}
                    </button>

                    <button
                      onClick={() => handleAccept('necessary')}
                      className="px-6 py-3 bg-neutral-700 text-neutral-200 rounded-xl font-semibold hover:bg-neutral-600 transition-all duration-200"
                    >
                      {t.cookies.acceptNecessary}
                    </button>

                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-6 py-3 text-gold-500 hover:text-gold-400 font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4" />
                      {t.cookies.customize}
                    </button>

                    <Link
                      to="/datenschutz"
                      className="px-6 py-3 text-neutral-400 hover:text-neutral-200 font-semibold flex items-center justify-center transition-colors duration-200"
                    >
                      {t.cookies.learnMore}
                    </Link>
                  </div>
                </div>

                <button
                  onClick={() => setIsVisible(false)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors duration-200"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
