import { useState } from 'react';
import { ChevronRight, CheckCircle2, Shield, ArrowRight, Menu, X, Phone, ChevronDown, Home, Car, Building2, Heart, MapPin, HelpCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import LanguageSelector from './LanguageSelector';
import { useHead } from '../hooks/useHead';
import { pixelEvents } from '../lib/pixelTracking';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [openPanels, setOpenPanels] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<string[]>([]);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);

  useHead({
    title: 'Versicherungsberatung Düren & Aachen | Brhan Jabri | Jabri Versicherung',
    description: 'Jabri Versicherung - Ihr Versicherungsberater in Düren und Aachen. Professionelle Beratung für Rechtsschutz, Haftpflicht, Hausrat & Wohngebäude. Kostenlose Erstberatung ☎ +49 1575 5588142',
    canonical: 'https://jabriversicherung.de/',
    ogTitle: 'Jabri Versicherung - Ihr Versicherungsberater in Düren & Aachen | Brhan Jabri',
    ogDescription: 'Professionelle Versicherungsberatung von Brhan Jabri in Düren und Aachen. Rechtsschutz, Haftpflicht, Hausrat & Wohngebäude. Kostenlose Beratung in Deutsch, Englisch, Arabisch und Türkisch.',
    ogUrl: 'https://jabriversicherung.de/',
    ogImage: 'https://jabriversicherung.de/jabri-versicherung-logo.svg'
  });

  const togglePanel = (panelId: string) => {
    setOpenPanels(prev =>
      prev.includes(panelId)
        ? prev.filter(id => id !== panelId)
        : [...prev, panelId]
    );
  };

  const toggleFaq = (faqId: string) => {
    setOpenFaq(prev =>
      prev.includes(faqId)
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'form') {
      pixelEvents.viewContent('Consultation Form', 'page');
      navigate('/formular');
      return;
    }
    pixelEvents.viewContent(sectionId, 'section');
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = (contactType: string) => {
    pixelEvents.contact();
  };

  return (
    <>
      {/* Emergency Contact Banner */}
      <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <a
            href="tel:+4915755588142"
            onClick={() => handleContactClick('phone')}
            className="flex items-center justify-center gap-2 text-white hover:text-orange-100 transition group"
          >
            <Phone size={18} className="animate-pulse" />
            <span className="text-xs sm:text-base font-semibold">
              {t.emergency.title} <span className="underline group-hover:no-underline" dir="ltr">{t.emergency.phone}</span>
            </span>
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-10 w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/jabri-versicherung-logo.svg"
                  alt="Jabri Versicherung Logo"
                  width="40"
                  height="40"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{t.common.companyName}</div>
                <div className="text-xs text-slate-400">{t.common.companyRole}</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white transition text-sm">
                {t.nav.about}
              </button>
              <button onClick={() => scrollToSection('vorteile')} className="text-slate-300 hover:text-white transition text-sm">
                {t.nav.benefits}
              </button>
              <button onClick={() => scrollToSection('produkte')} className="text-slate-300 hover:text-white transition text-sm">
                {t.nav.products}
              </button>
              <Link to="/blog" className="text-slate-300 hover:text-white transition text-sm">
                {t.nav.blog}
              </Link>
              <button onClick={() => scrollToSection('testimonials')} className="text-slate-300 hover:text-white transition text-sm">
                {t.nav.testimonials}
              </button>
              <button onClick={() => scrollToSection('ablauf')} className="text-slate-300 hover:text-white transition text-sm">
                {t.nav.process}
              </button>
              <button onClick={() => scrollToSection('standort')} className="text-slate-300 hover:text-white transition text-sm">
                {t.nav.location}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <LanguageSelector />
              <button
                onClick={() => scrollToSection('form')}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold transition transform hover:scale-105"
              >
                {t.nav.cta}
              </button>
            </div>

            {/* Mobile Menu Button & Language Selector */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
                aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection('vorteile')}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
              >
                {t.nav.benefits}
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
              >
                {t.nav.testimonials}
              </button>
              <button
                onClick={() => scrollToSection('produkte')}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
              >
                {t.nav.products}
              </button>
              <Link
                to="/blog"
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.blog}
              </Link>
              <button
                onClick={() => scrollToSection('ablauf')}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
              >
                {t.nav.process}
              </button>
              <button
                onClick={() => scrollToSection('standort')}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-white transition"
              >
                {t.nav.location}
              </button>
              <button
                onClick={() => scrollToSection('form')}
                className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold"
              >
                {t.nav.cta}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section id="hero" className="pt-40 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-6 animate-fade-in-down">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-slate-300">{t.hero.badge}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up opacity-0 delay-100">
                {t.hero.title}<br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent animate-gradient-shift">
                  {t.hero.titleHighlight}
                </span>
              </h1>

              <p className="text-lg text-slate-400 mb-8 max-w-lg animate-fade-in-up opacity-0 delay-200">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up opacity-0 delay-300">
                <button
                  onClick={() => scrollToSection('form')}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-pulse-glow"
                >
                  {t.hero.startButton}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollToSection('ablauf')}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold border border-slate-600 transition-all duration-300 hover:border-orange-500 hover:shadow-lg"
                >
                  {t.hero.learnMore}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm animate-fade-in-up opacity-0 delay-400">
                <div className="flex items-center gap-3 group">
                  <CheckCircle2 className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-slate-300">{t.hero.features.free}</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <CheckCircle2 className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-slate-300">{t.hero.features.personal}</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <CheckCircle2 className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-slate-300">{t.hero.features.multilingual}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="hidden lg:block">
              <div className="relative animate-fade-in-right opacity-0 delay-200">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur-2xl animate-pulse" />
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-3xl p-8 backdrop-blur-xl hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-4xl font-bold text-white mb-2 hover:text-orange-400 transition-colors">9.2/10</div>
                        <p className="text-slate-400 text-sm">{t.hero.stats.rating}</p>
                      </div>
                      <div className="text-3xl animate-bounce-slow">⭐⭐⭐⭐⭐</div>
                    </div>

                    <div className="pt-6 border-t border-slate-700 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">{t.hero.stats.successRate}</span>
                        <span className="text-white font-semibold">98%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000" style={{ width: '98%' }} />
                      </div>

                      <div className="flex justify-between items-center pt-4">
                        <span className="text-slate-400">{t.hero.stats.satisfaction}</span>
                        <span className="text-white font-semibold">95%</span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-1000" style={{ width: '95%' }} />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-700">
                      <p className="text-slate-400 text-sm">
                        <span className="text-green-400 font-semibold hover:text-green-300 transition-colors">500+</span> {t.hero.stats.customers}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-3xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-3xl p-2 backdrop-blur-xl overflow-hidden hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl" style={{aspectRatio: '1/1.94'}}>
                  <img
                    src="/tower-sm.webp"
                    alt={t.about.name}
                    width="400"
                    height="776"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text Column */}
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
                Mit langjähriger Erfahrung in der Versicherungsbranche biete ich umfassende Beratung für Privat- und Geschäftskunden in Düren, Aachen und Umgebung. Meine Expertise umfasst alle wichtigen Versicherungsbereiche - von Rechtsschutz über Haftpflicht bis hin zu Hausrat- und Wohngebäudeversicherungen. Als unabhängiger Versicherungsberater arbeite ich mit führenden Versicherungsgesellschaften zusammen, um für jeden Kunden die optimale Lösung zu finden. Mein Ziel ist es, Sie vor finanziellen Risiken zu schützen und gleichzeitig beste Konditionen zu sichern.
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
                  onClick={() => scrollToSection('form')}
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

      {/* Benefits Section */}
      <section id="vorteile" className="py-5 px-4 sm:px-6 lg:px-8 bg-slate-800/30 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in-up opacity-0">
              {t.benefits.title}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto animate-fade-in-up opacity-0 delay-100">
              {t.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '💡', key: 'analysis' },
              { icon: '🛡️', key: 'transparency' },
              { icon: '🤝', key: 'support' },
              { icon: '🌍', key: 'multilingual' },
              { icon: '⚡', key: 'fast' },
              { icon: '✓', key: 'certified' }
            ].map((benefit, index) => (
              <div
                key={index}
                className={`group p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl hover:border-orange-500/50 transition-all duration-500 hover:bg-gradient-to-br hover:from-slate-800/80 hover:to-slate-900/80 cursor-pointer animate-scale-in opacity-0 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 delay-${index * 100}`}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 animate-float">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {t.benefits.items[benefit.key as keyof typeof t.benefits.items].title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {t.benefits.items[benefit.key as keyof typeof t.benefits.items].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Products Section */}
      <section id="produkte" className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.products.title}
            </h2>
            <p className="text-lg text-slate-400">
              {t.products.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {/* Rechtsschutz Category */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
              <button
                onClick={() => togglePanel('rechtsschutz')}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <Shield className="text-orange-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={28} />
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {t.products.categories.legal}
                  </h3>
                </div>
                <ChevronDown
                  className={`text-slate-400 group-hover:text-orange-500 transition-all duration-300 ${
                    openPanels.includes('rechtsschutz') ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openPanels.includes('rechtsschutz')
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Aktiv-Rechtsschutz mit Soforthilfe', type: 'Recht/Privat' },
                      { name: 'Privat Rechtsschutz', type: 'Recht/Privat' },
                      { name: 'Miet-Rechtsschutz Sofort', type: 'Recht/Privat' },
                      { name: 'Rechtsschutz für Manager (Privatlösung)', type: 'Recht/Privat' },
                      { name: 'Verkehrs-Rechtsschutz Sofort', type: 'Recht/Privat' },
                      { name: 'web@ktiv', type: 'Recht/Privat' },
                      { name: 'Immobilien-Rechtsschutz', type: 'Recht/Gewerbe' },
                      { name: 'Immobilien-Rechtsschutz', type: 'Recht/Privat' },
                      { name: 'Recht & Heim', type: 'SHU' },
                      { name: 'Recht und Gewerbe', type: 'Recht/Gewerbe' },
                      { name: 'Rechtsschutz für Manager (Unternehmenlösung)', type: 'Recht/Gewerbe' },
                      { name: 'Rechtsschutz für Selbstständige', type: 'Recht/Gewerbe' },
                      { name: 'Rechtsschutz Verkehr für Selbstständige', type: 'Recht/Gewerbe' },
                      { name: 'web@ktiv für Selbstständige', type: 'Recht/Gewerbe' },
                      { name: 'Firmen-Fahrer Rechtsschutz', type: 'Recht/Gewerbe' },
                      { name: 'JuraCheck', type: 'Recht/Privat' },
                      { name: 'JuraCheck Plus', type: 'Recht/Privat' },
                      { name: 'JuraCheck Plus', type: 'Recht/Gewerbe' },
                    ].map((product, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                      >
                        <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {product.name}
                        </h4>
                        <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all">
                          {product.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Wohnschutz Category */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
              <button
                onClick={() => togglePanel('wohnschutz')}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <Home className="text-orange-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={28} />
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {t.products.categories.home}
                  </h3>
                </div>
                <ChevronDown
                  className={`text-slate-400 group-hover:text-orange-500 transition-all duration-300 ${
                    openPanels.includes('wohnschutz') ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openPanels.includes('wohnschutz')
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Haftpflicht-Schutz', type: 'SHU' },
                      { name: 'Haushalt-Schutz', type: 'SHU' },
                      { name: 'Recht & Heim', type: 'SHU' },
                      { name: 'Wohngebäude-Schutz', type: 'SHU' },
                      { name: 'Reiseprotect 365', type: 'SHU' },
                      { name: 'Top-Schutzbrief', type: 'SHU' },
                    ].map((product, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                      >
                        <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {product.name}
                        </h4>
                        <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all">
                          {product.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Fahrzeug Category */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
              <button
                onClick={() => togglePanel('fahrzeug')}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <Car className="text-orange-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={28} />
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {t.products.categories.vehicle}
                  </h3>
                </div>
                <ChevronDown
                  className={`text-slate-400 group-hover:text-orange-500 transition-all duration-300 ${
                    openPanels.includes('fahrzeug') ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openPanels.includes('fahrzeug')
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Unfall-Schutz', type: 'SHU' },
                      { name: 'Unfall-Schutzbrief', type: 'SHU' },
                      { name: 'Top-Schutzbrief', type: 'SHU' },
                      { name: 'Verkehrs-Rechtsschutz', type: 'Recht/Privat' },
                    ].map((product, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                      >
                        <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {product.name}
                        </h4>
                        <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all">
                          {product.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Geschäft & Gewerbe Category */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
              <button
                onClick={() => togglePanel('gewerbe')}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <Building2 className="text-orange-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={28} />
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {t.products.categories.business}
                  </h3>
                </div>
                <ChevronDown
                  className={`text-slate-400 group-hover:text-orange-500 transition-all duration-300 ${
                    openPanels.includes('gewerbe') ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openPanels.includes('gewerbe')
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'BusinessAktiv', type: 'SHU/Gewerbe' },
                      { name: 'Firmen-Fahrer Rechtsschutz', type: 'Recht/Gewerbe' },
                      { name: 'Forderungsmanagement', type: 'Recht/Gewerbe' },
                    ].map((product, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                      >
                        <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {product.name}
                        </h4>
                        <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all">
                          {product.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gesundheit & Versicherungen Category */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
              <button
                onClick={() => togglePanel('gesundheit')}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <Heart className="text-orange-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" size={28} />
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {t.products.categories.health}
                  </h3>
                </div>
                <ChevronDown
                  className={`text-slate-400 group-hover:text-orange-500 transition-all duration-300 ${
                    openPanels.includes('gesundheit') ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openPanels.includes('gesundheit')
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Beihilfeversicherung', type: 'KV' },
                      { name: 'Krankenversicherung', type: 'KV' },
                      { name: 'KV Rundumschutz', type: 'KV' },
                      { name: 'TierProtect', type: 'SHU' },
                    ].map((product, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                      >
                        <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                          {product.name}
                        </h4>
                        <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded group-hover:bg-orange-500/20 group-hover:text-orange-300 transition-all">
                          {product.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-5 px-4 sm:px-6 lg:px-8 bg-slate-800/30 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-up opacity-0">
              {t.testimonials.title}
            </h2>
            <p className="text-lg text-slate-400 animate-fade-in-up opacity-0 delay-100">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.items.map((testimonial, index) => (
              <div
                key={index}
                className={`group p-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl hover:border-orange-500/50 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 animate-fade-in-up opacity-0 delay-${(index + 1) * 100}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 group-hover:scale-125 transition-transform duration-300 inline-block" style={{ transitionDelay: `${i * 50}ms` }}>★</span>
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic group-hover:text-white transition-colors">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white group-hover:text-orange-400 transition-colors">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="ablauf" className="py-5 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.process.title}
            </h2>
            <p className="text-lg text-slate-400">
              {t.process.subtitle}
            </p>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {t.process.steps.map((step, index) => (
              <div key={index} className="text-center md:text-start">
                <div className="mb-4 flex items-center justify-center md:justify-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <ChevronRight 
                      className="text-slate-600 hidden md:block rtl:rotate-180" 
                      size={24} 
                    />
                  )}
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="standort" className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t.location.title}
            </h2>
            <p className="text-lg text-slate-400">
              {t.location.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Address Info */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t.location.office}</h3>
                  <p className="text-slate-400">{t.location.officeSubtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-t border-slate-700 pt-6">
                  <h4 className="text-sm font-semibold text-slate-400 mb-2">{t.location.address}</h4>
                  <p className="text-white text-lg">
                    Schöllerstraße 33<br />
                    52351 Düren
                  </p>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h4 className="text-sm font-semibold text-slate-400 mb-2">{t.location.contact}</h4>
                  <div className="space-y-2">
                    <a
                      href="tel:+4915755588142"
                      onClick={() => handleContactClick('phone')}
                      className="text-white hover:text-orange-400 transition flex items-center gap-2"
                    >
                      <Phone size={18} />
                      <span dir="ltr">{t.emergency.phone}</span>
                    </a>
                    <a
                      href="mailto:jabri.versicherung@gmail.com"
                      onClick={() => handleContactClick('email')}
                      className="text-white hover:text-orange-400 transition block"
                    >
                      jabri.versicherung@gmail.com
                    </a>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6">
                  <h4 className="text-sm font-semibold text-slate-400 mb-2">{t.location.hours}</h4>
                  <div className="text-white space-y-1">
                    <p>{t.location.hoursText.weekdays}</p>
                    <p>{t.location.hoursText.sunday}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => scrollToSection('form')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 group flex items-center justify-center gap-2"
                  >
                    {t.location.appointmentButton}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="hidden lg:block bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden h-[600px] hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <img
                src="/map.webp"
                alt="Standort Versicherung Düren-Aachen Brhan Jabri"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                srcSet="/map.webp"
                sizes="(max-width: 1024px) 100vw, 500px"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-5 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {language === 'de' ? 'Häufig gestellte Fragen' : language === 'en' ? 'Frequently Asked Questions' : language === 'ar' ? 'الأسئلة المتكررة' : 'Sık Sorulan Sorular'}
            </h2>
            <p className="text-lg text-slate-400">
              {language === 'de' ? 'Die wichtigsten Antworten auf einen Blick' : language === 'en' ? 'The most important answers at a glance' : language === 'ar' ? 'أهم الإجابات في لمحة' : 'En önemli cevaplar bir bakışta'}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                id: 'cost',
                question: language === 'de' ? 'Was kostet die Beratung?' : language === 'en' ? 'How much does the consultation cost?' : language === 'ar' ? 'كم تكلف الاستشارة؟' : 'Danışmanlık ücreti nedir?',
                answer: language === 'de' ? 'Die Erstberatung und Bedarfsanalyse sind für dich völlig kostenlos und unverbindlich. Du zahlst nur, wenn du dich für eine Versicherung entscheidest – die Kosten sind dann in den Versicherungsbeiträgen enthalten.' : language === 'en' ? 'The initial consultation and needs analysis are completely free and non-binding. You only pay if you decide on an insurance – the costs are then included in the insurance premiums.' : language === 'ar' ? 'الاستشارة الأولية وتحليل الاحتياجات مجانية تماماً وغير ملزمة. تدفع فقط إذا قررت الحصول على تأمين - التكاليف مدرجة في أقساط التأمين.' : 'İlk danışmanlık ve ihtiyaç analizi tamamen ücretsiz ve bağlayıcı değildir. Sadece bir sigorta kararı verirseniz ödeme yaparsınız - maliyetler sigorta primlerine dahildir.'
              },
              {
                id: 'languages',
                question: language === 'de' ? 'In welchen Sprachen beraten Sie?' : language === 'en' ? 'In which languages do you provide consultation?' : language === 'ar' ? 'بأي لغات تقدمون الاستشارة؟' : 'Hangi dillerde danışmanlık veriyorsunuz?',
                answer: language === 'de' ? 'Ich berate dich persönlich in Deutsch, Englisch, Arabisch und Türkisch. So kannst du alle Details in deiner Muttersprache besprechen und sicherstellen, dass du alles vollständig verstehst.' : language === 'en' ? 'I personally advise you in German, English, Arabic and Turkish. This way you can discuss all details in your native language and ensure that you fully understand everything.' : language === 'ar' ? 'أقدم لك المشورة شخصياً بالألمانية والإنجليزية والعربية والتركية. بهذه الطريقة يمكنك مناقشة جميع التفاصيل بلغتك الأم والتأكد من فهمك لكل شيء بالكامل.' : 'Size Almanca, İngilizce, Arapça ve Türkçe kişisel danışmanlık veriyorum. Bu şekilde tüm detayları ana dilinizde tartışabilir ve her şeyi tam olarak anladığınızdan emin olabilirsiniz.'
              },
              {
                id: 'process',
                question: language === 'de' ? 'Wie läuft eine Beratung ab?' : language === 'en' ? 'How does a consultation work?' : language === 'ar' ? 'كيف تسير الاستشارة؟' : 'Danışmanlık nasıl çalışır?',
                answer: language === 'de' ? 'Der Prozess ist einfach: Du kontaktierst mich über das Formular oder telefonisch, wir vereinbaren einen Termin (vor Ort oder online), ich analysiere deinen Bedarf und erstelle ein maßgeschneidertes Angebot. Bei Interesse setzen wir alles gemeinsam um.' : language === 'en' ? 'The process is simple: You contact me via the form or by phone, we schedule an appointment (on-site or online), I analyze your needs and create a customized offer. If interested, we implement everything together.' : language === 'ar' ? 'العملية بسيطة: تتصل بي عبر النموذج أو الهاتف، نحدد موعداً (في الموقع أو عبر الإنترنت)، أقوم بتحليل احتياجاتك وإنشاء عرض مخصص. إذا كنت مهتماً، ننفذ كل شيء معاً.' : 'Süreç basittir: Benimle form veya telefonla iletişime geçersiniz, bir randevu ayarlarız (yerinde veya çevrimiçi), ihtiyaçlarınızı analiz eder ve özelleştirilmiş bir teklif oluştururum. İlgileniyorsanız, her şeyi birlikte uygularız.'
              },
              {
                id: 'liability',
                question: language === 'de' ? 'Brauche ich eine Privathaftpflichtversicherung?' : language === 'en' ? 'Do I need personal liability insurance?' : language === 'ar' ? 'هل أحتاج إلى تأمين المسؤولية الشخصية؟' : 'Kişisel sorumluluk sigortasına ihtiyacım var mı?',
                answer: language === 'de' ? 'Eine Privathaftpflicht ist eine der wichtigsten Versicherungen überhaupt. Sie schützt dich vor den finanziellen Folgen, wenn du anderen einen Schaden zufügst – und Schadensersatzforderungen können schnell existenzbedrohend werden.' : language === 'en' ? 'Personal liability insurance is one of the most important insurance policies. It protects you from the financial consequences if you cause damage to others – and compensation claims can quickly become existentially threatening.' : language === 'ar' ? 'تأمين المسؤولية الشخصية هو أحد أهم وثائق التأمين. يحميك من العواقب المالية إذا تسببت في ضرر للآخرين - ويمكن أن تصبح مطالبات التعويض مهددة للوجود بسرعة.' : 'Kişisel sorumluluk sigortası en önemli sigorta poliçelerinden biridir. Başkalarına zarar vermeniz durumunda sizi mali sonuçlardan korur - ve tazminat talepleri hızla varoluşsal tehdit haline gelebilir.'
              },
              {
                id: 'legal-protection',
                question: language === 'de' ? 'Was ist eine Rechtsschutzversicherung?' : language === 'en' ? 'What is legal protection insurance?' : language === 'ar' ? 'ما هو تأمين الحماية القانونية؟' : 'Hukuki koruma sigortası nedir?',
                answer: language === 'de' ? 'Eine Rechtsschutzversicherung übernimmt die Kosten für rechtliche Auseinandersetzungen – von Anwaltskosten über Gerichtsgebühren bis zu Sachverständigen. Sie schützt dich vor den oft hohen finanziellen Belastungen eines Rechtsstreits.' : language === 'en' ? 'Legal protection insurance covers the costs of legal disputes – from lawyer fees to court costs to expert witnesses. It protects you from the often high financial burden of a legal dispute.' : language === 'ar' ? 'يغطي تأمين الحماية القانونية تكاليف النزاعات القانونية - من أتعاب المحامين إلى تكاليف المحكمة إلى شهود الخبراء. يحميك من العبء المالي الكبير غالباً للنزاع القانوني.' : 'Hukuki koruma sigortası hukuki anlaşmazlıkların maliyetlerini karşılar - avukat ücretlerinden mahkeme masraflarına ve uzman tanıklara kadar. Sizi hukuki bir anlaşmazlığın genellikle yüksek mali yükünden korur.'
              }
            ].map((faq) => {
              const isOpen = openFaq.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="text-lg font-semibold text-white leading-relaxed pr-2">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-6 h-6 text-orange-500 flex-shrink-0 transition-transform duration-300 mt-1 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="text-base text-slate-300 leading-relaxed border-t border-slate-700/50 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/30 group"
            >
              <HelpCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>
                {language === 'de' ? 'Alle FAQ ansehen' : language === 'en' ? 'View All FAQ' : language === 'ar' ? 'عرض جميع الأسئلة المتكررة' : 'Tüm SSS\'leri Görüntüle'}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-y border-slate-700 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in-up opacity-0">
            {t.cta.title}
          </h2>
          <p className="text-lg text-slate-300 mb-8 animate-fade-in-up opacity-0 delay-100">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 delay-200">
            <button
              onClick={() => scrollToSection('form')}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/50 animate-pulse-glow group"
            >
              <span className="flex items-center gap-2">
                {t.cta.requestButton}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <a
              href="tel:+4915755588142"
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold border border-slate-600 transition-all duration-300 hover:border-orange-500 hover:scale-105 hover:shadow-lg group flex items-center gap-2"
              dir="ltr"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t.emergency.phone}
            </a>
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
                  <img
                    src="/jabri-versicherung-_logo.png"
                    alt="Jabri Versicherung Logo"
                    width="32"
                    height="32"
                    loading="lazy"
                    decoding="async"
                    srcSet="/jabri-versicherung-_logo.png 1x, /jabri-versicherung-_logo.png 2x"
                    sizes="32px"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-white">{t.common.companyName}</span>
              </div>
              <p className="text-sm text-slate-400">
                {t.footer.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">{t.footer.navigation}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition">{t.nav.about}</button></li>
                <li><button onClick={() => scrollToSection('vorteile')} className="hover:text-white transition">{t.nav.benefits}</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition">{t.nav.testimonials}</button></li>
                <li><button onClick={() => scrollToSection('ablauf')} className="hover:text-white transition">{t.nav.process}</button></li>
                <li><button onClick={() => scrollToSection('standort')} className="hover:text-white transition">{t.nav.location}</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">{t.footer.legal}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/impressum" className="hover:text-white transition">{t.footer.links.imprint}</Link></li>
                <li><Link to="/datenschutz" className="hover:text-white transition">{t.footer.links.privacy}</Link></li>
                <li><Link to="/agb" className="hover:text-white transition">{t.footer.links.terms}</Link></li>
                <li><Link to="/sitemap" className="hover:text-white transition">{language === 'de' ? 'Sitemap' : language === 'en' ? 'Sitemap' : language === 'ar' ? 'خريطة الموقع' : 'Site Haritası'}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">{t.footer.contact}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="tel:+4915755588142" onClick={() => handleContactClick('phone')} className="hover:text-white transition" dir="ltr">{t.emergency.phone}</a></li>
                <li><a href="mailto:jabri.versicherung@gmail.com" onClick={() => handleContactClick('email')} className="hover:text-white transition">jabri.versicherung@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
              <p>{t.footer.copyright}</p>
              <p>{t.footer.gdpr}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
