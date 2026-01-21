export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  primaryKeyword: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  imageAlt: string;
  category: string;
  wordCount: number;
  content: string;
}

export const blogPosts: BlogPost[] = [
  // RECHTSCHUTZ (25)
  {
    id: 1,
    slug: 'rechtschutz-aachen-guide',
    title: 'Rechtschutzversicherung Aachen: Vollständiger Guide 2026',
    seoTitle: 'Rechtschutz Aachen 2026 - Kosten, Deckung & Vergleich',
    seoDescription: 'Rechtschutzversicherung in Aachen: Was ist versichert? Welche Kosten entstehen? Kompletter Beratungs-Guide mit Empfehlungen.',
    keywords: ['Rechtschutz Aachen', 'Rechtschutzversicherung Kosten', 'Rechtsschutz Vergleich'],
    primaryKeyword: 'Rechtschutz Aachen',
    date: '2026-01-24',
    author: 'Brhan Jabri',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    imageAlt: 'Rechtschutzversicherung Beratung Aachen',
    category: 'Rechtschutz',
    wordCount: 2500,
    content: '<p>Placeholder - wird mit AI generiert</p>'
  },
  {
    id: 2,
    slug: 'ist-rechtschutz-notwendig',
    title: 'Ist Rechtschutzversicherung wirklich notwendig? 3 Fallstudien',
    seoTitle: 'Brauche ich Rechtschutzversicherung? - Experten-Analyse 2026',
    seoDescription: 'Ist Rechtschutzversicherung sinnvoll? 3 echte Fallbeispiele, Pro & Contra, konkrete Empfehlungen für Ihre Situation.',
    keywords: ['Ist Rechtschutzversicherung notwendig', 'Rechtsschutz sinnvoll', 'Brauche ich Rechtsschutz'],
    primaryKeyword: 'Ist Rechtschutzversicherung notwendig',
    date: '2026-01-31',
    author: 'Brhan Jabri',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    imageAlt: 'Rechtschutz Fallstudien und Beispiele',
    category: 'Rechtschutz',
    wordCount: 1800,
    content: '<p>Placeholder</p>'
  },
  {
    id: 3,
    slug: 'haeufigste-fehler-rechtschutz',
    title: '5 häufigste Fehler bei Rechtschutzversicherung',
    seoTitle: 'Häufige Fehler bei Rechtschutzversicherung - So vermeiden Sie sie',
    seoDescription: 'Diese 5 Fehler kosten Sie Tausende Euro! Welche Fehler Sie vermeiden müssen und wie Sie richtig versichert sind.',
    keywords: ['Fehler Rechtschutzversicherung', 'Rechtsschutz Tipps', 'Häufige Fehler Versicherung'],
    primaryKeyword: 'Fehler Rechtschutzversicherung',
    date: '2026-02-07',
    author: 'Brhan Jabri',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    imageAlt: 'Fehler bei Rechtschutzversicherung vermeiden',
    category: 'Rechtschutz',
    wordCount: 1600,
    content: '<p>Placeholder</p>'
  },
  {
    id: 4,
    slug: 'rechtschutz-selbststaendige',
    title: 'Rechtschutzversicherung für Selbstständige - Das müssen Sie wissen',
    seoTitle: 'Selbstständigen-Rechtschutz 2026 - Kosten & beste Deckung',
    seoDescription: 'Welche Rechtschutzversicherung passt zu Ihrer Selbstständigkeit? Welche Leistungen brauchen Sie wirklich?',
    keywords: ['Rechtschutz Selbstständige', 'Freiberufler Rechtsschutz', 'Unternehmensrechtsschutz'],
    primaryKeyword: 'Rechtschutz Selbstständige',
    date: '2026-02-14',
    author: 'Brhan Jabri',
    readTime: '11 min',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    imageAlt: 'Rechtschutz für Freiberufler und Selbstständige',
    category: 'Rechtschutz',
    wordCount: 2200,
    content: '<p>Placeholder</p>'
  },
  {
    id: 5,
    slug: 'mieter-vermieter-rechtsschutz',
    title: 'Mieter- vs. Vermieter-Rechtsschutz: Welcher passt zu Ihnen?',
    seoTitle: 'Mieter Vermieter Rechtsschutz - Unterschiede & Kosten 2026',
    seoDescription: 'Was ist der Unterschied zwischen Mieter- und Vermieter-Rechtsschutz? Welcher ist für Sie richtig?',
    keywords: ['Mieter Rechtsschutz', 'Vermieter Rechtsschutz', 'Mietrecht Versicherung'],
    primaryKeyword: 'Mieter Vermieter Rechtsschutz',
    date: '2026-02-21',
    author: 'Brhan Jabri',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    imageAlt: 'Mieter und Vermieter Rechtsschutz Vergleich',
    category: 'Rechtschutz',
    wordCount: 2000,
    content: '<p>Placeholder</p>'
  }
];

export default blogPosts;
