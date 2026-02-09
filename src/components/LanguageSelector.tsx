import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const languages = [
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
  { code: 'tr' as Language, name: 'Türkçe', flag: '🇹🇷' },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition text-white" aria-label="Sprache wählen" aria-expanded="false">
        <Globe size={18} />
        <span className="text-sm hidden sm:inline">
          {languages.find(l => l.code === language)?.flag}
        </span>
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-neutral-700 transition first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code ? 'bg-neutral-700 text-gold-500' : 'text-white'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
