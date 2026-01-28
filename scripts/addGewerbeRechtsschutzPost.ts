import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import type { BlogPost, BlogPostTranslation } from '../src/types/blog';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const newBlogPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'> = {
  slug: 'gewerbe-rechtsschutz-unternehmer-2026',
  category: 'Rechtschutz',
  author: 'Brhan Jabri',
  read_time: '11 min',
  image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200',
  image_alt: 'Unternehmer bei Beratung zu Gewerbe Rechtsschutz',
  word_count: 2100,
  published_date: '2026-01-28',
  is_published: true
};

const translations: Omit<BlogPostTranslation, 'id' | 'blog_post_id' | 'created_at' | 'updated_at'>[] = [
  {
    language: 'de',
    title: 'Gewerbe Rechtsschutz – Der Schutzschild für Ihr Unternehmen',
    seo_title: 'Gewerbe Rechtsschutz Kosten 2026 – Für Selbstständige',
    seo_description: 'Gewerbe Rechtsschutz für Unternehmer: Kosten ab 15€/Monat, Leistungen & Vergleich. Steuern, Verträge, Arbeitsrecht – alles abgesichert!',
    keywords: ['Gewerbe Rechtsschutz', 'Firmenrechtsschutz Kosten', 'Rechtsschutz Selbstständige', 'Unternehmensrechtsschutz', 'Vertragsrechtsschutz Gewerbe'],
    primary_keyword: 'Gewerbe Rechtsschutz',
    content: `
        <h2>Was ist Gewerbe Rechtsschutz?</h2>
        <p>Der Gewerbe Rechtsschutz (auch Firmenrechtsschutz oder Unternehmensrechtsschutz genannt) schützt Selbstständige, Freiberufler und Unternehmen vor den finanziellen Risiken von Rechtsstreitigkeiten. Er übernimmt Anwalts-, Gerichts- und Sachverständigerkosten – unabhängig vom Ausgang des Verfahrens.</p>

        <p>Während Privatpersonen selten mit Behördenstreitigkeiten oder Vertragsrecht zu tun haben, sind diese für Unternehmer Alltag. Eine gute Gewerberechtsschutzversicherung ist daher essenziell für jedes Unternehmen – egal ob Einzelunternehmer, GmbH oder Freiberufler.</p>

        <h2>Welche Kosten übernimmt der Gewerbe Rechtsschutz?</h2>
        <p>Die Versicherung deckt folgende Kosten ab:</p>
        <ul>
          <li><strong>Anwaltsgebühren:</strong> Vollständige Übernahme der Anwaltskosten</li>
          <li><strong>Gerichtskosten:</strong> Instanzgebühren und Verfahrenskosten</li>
          <li><strong>Sachverständigengutachten:</strong> Technische Prüfungen und Wertgutachten</li>
          <li><strong>Gegenseitige Kosten:</strong> Kosten der Gegenseite bei Gewinn</li>
          <li><strong>Mediation:</strong> außergerichtliche Streitbeilegung</li>
          <li><strong>Kautionen:</strong> Darlehen für Strafrecht-Kautionen</li>
          <li><strong>Übersetzungen:</strong> Bei internationalen Streitigkeiten</li>
        </ul>

        <h2>Welche Rechtsbereiche sind abgedeckt?</h2>
        <p>Ein umfassender Gewerbe Rechtsschutz umfasst folgende Module:</p>

        <h3>1. Allgemeiner Firmenrechtsschutz</h3>
        <ul>
          <li>Schadensersatzansprüche (Kunden, Lieferanten)</li>
          <li>Steuer- und Sozialversicherungsrecht</li>
          <li>Behörden- und Verwaltungsrecht (z.B. Baugenehmigungen)</li>
          <li>Ordnungswidrigkeiten und Bußgelder</li>
        </ul>

        <h3>2. Arbeitsrechtsschutz</h3>
        <ul>
          <li>Kündigungsschutzklagen Ihrer Mitarbeiter</li>
          <li>Streitigkeiten über Arbeitsverträge</li>
          <li>Lohn- und Gehaltsstreitigkeiten</li>
          <li>Aufhebungsverträge und Abfindungen</li>
        </ul>

        <h3>3. Vertragsrechtsschutz</h3>
        <ul>
          <li>Lieferverzögerungen und Mangelfälle</li>
          <li>Zahlungsstreitigkeiten mit Kunden</li>
          <li>Vertragsverletzungen aller Art</li>
          <li>Insolvenzanfechtungen</li>
        </ul>

        <h3>4. Immobilienrechtsschutz</h3>
        <ul>
          <li>Miet- und Pachtstreitigkeiten</li>
          <li>Nebenkostenabrechnungen</li>
          <li>Kündigungsschutz Gewerbeflächen</li>
          <li>Bau- und Architektenrecht</li>
        </ul>

        <h2>Kostenübersicht Gewerbe Rechtsschutz 2026</h2>
        <p>Die Kosten variieren je nach Unternehmensgröße und Leistungsumfang:</p>

        <table>
          <thead>
            <tr>
              <th>Unternehmen</th>
              <th>Mitarbeiter</th>
              <th>Umsatz</th>
              <th>Monatsbeitrag (netto)</th>
              <th>Deckungssumme</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Einzelunternehmer</td>
              <td>0</td>
              <td><50.000€</td>
              <td>15-25€</td>
              <td>500.000€</td>
            </tr>
            <tr>
              <td>Freiberufler</td>
              <td>0-2</td>
              <td>50-150.000€</td>
              <td>20-35€</td>
              <td>1.000.000€</td>
            </tr>
            <tr>
              <td>Kleines Unternehmen</td>
              <td>3-10</td>
              <td>150-500.000€</td>
              <td>40-80€</td>
              <td>unbegrenzt</td>
            </tr>
            <tr>
              <td>Mittelstand</td>
              <td>11-50</td>
              <td>>500.000€</td>
              <td>100-250€</td>
              <td>unbegrenzt</td>
            </tr>
          </tbody>
        </table>

        <h2>Beispielrechnung: Wann lohnt sich der Gewerbe Rechtsschutz?</h2>

        <h3>Szenario 1: Kündigungsschutzklage eines Mitarbeiters</h3>
        <p>Ein Mitarbeiter klagt gegen Kündigung. Streitwert: 40.000€</p>
        <ul>
          <li>Anwaltskosten: 8.500€</li>
          <li>Gerichtskosten: 2.800€</li>
          <li>Sachverständigengutachten: 1.200€</li>
          <li><strong>Gesamtkosten: 12.500€</strong></li>
        </ul>
        <p><strong>Monatliche Prämie (12 Monate):</strong> 25€ x 12 = 300€ → <strong>Ersparnis: 12.200€</strong></p>

        <h3>Szenario 2: Zahlungsstreit mit Lieferant</h3>
        <p>Lieferant fordert 25.000€ für angeblich mangelhafte Ware</p>
        <ul>
          <li>Anwalts-/Gerichtskosten: 6.800€</li>
          <li>Sachverständigengutachten: 2.500€</li>
          <li>Gegenseitige Kosten: 3.200€</li>
          <li><strong>Gesamtkosten: 12.500€</strong></li>
        </ul>

        <h2>Worauf Unternehmer beim Vergleich achten sollten</h2>
        <ul>
          <li><strong>Deckungssumme:</strong> Mindestens 500.000€, besser unbegrenzt [web:13]</li>
          <li><strong>Selbstbeteiligung:</strong> 250-500€ je nach Budget</li>
          <li><strong>Wartezeit:</strong> 3 Monate (bei Arbeitsrecht 6 Monate)</li>
          <li><strong>Freie Anwaltswahl:</strong> Wichtig für Branchenspezialisten</li>
          <li><strong>Vertragsrechtsschutz:</strong> Nur bei Premium-Tarifen enthalten</li>
          <li><strong>Steuerliche Absetzbarkeit:</strong> Beiträge als Betriebsausgaben</li>
        </ul>

        <h2>Spezielle Risiken für verschiedene Branchen</h2>

        <h3>Handel & E-Commerce</h3>
        <ul>
          <li>Wettbewerbsrecht (Werbung, Preisangaben)</li>
          <li>Produkthaftung und Rückrufaktionen</li>
          <li>Datenschutzrecht (DSGVO-Verstöße)</li>
        </ul>

        <h3>Handwerk & Dienstleister</h3>
        <ul>
          <li>Mängelhaftung und Nachbesserung</li>
          <li>Arbeitsrechtliche Streitigkeiten</li>
          <li>Meisterprüfungsrechtsschutz</li>
        </ul>

        <h3>IT & Software</h3>
        <ul>
          <li>Urheber- und Patentrecht</li>
          <li>Lizenzstreitigkeiten</li>
          <li>Software-Mängelansprüche</li>
        </ul>

        <h2>Checkliste: So wählen Sie den richtigen Gewerbe Rechtsschutz</h2>
        <ul>
          <li>☑️ <strong>Deckungssumme:</strong> unbegrenzt empfohlen</li>
          <li>☑️ <strong>Arbeitsrechtsschutz:</strong> inklusive (auch für Abfindungen)</li>
          <li>☑️ <strong>Vertragsrechtsschutz:</strong> für Hilfsgeschäfte</li>
          <li>☑️ <strong>Steuerrechtsschutz:</strong> Finanzamt-Streitigkeiten</li>
          <li>☑️ <strong>Datenschutzrechtsschutz:</strong> DSGVO-Verstöße</li>
          <li>☑️ <strong>Spezial-Strafrechtsschutz:</strong> bei falschen Vorwürfen</li>
          <li>☑️ <strong>Forderungsmanagement:</strong> Mahnverfahren inklusive</li>
        </ul>

        <h2>Fazit: Ein Muss für jedes Unternehmen</h2>
        <p>Ein Rechtsstreit kann ein Unternehmen existenziell bedrohen – egal ob Einzelkämpfer oder Mittelstand. Die monatlichen Kosten von 20-100€ sind minimal gegen die potenziellen Risiken von Zehntausenden Euro.</p>

        <p><strong>Empfehlung:</strong> Lassen Sie sich individuell beraten und vergleichen Sie mindestens 3 Anbieter. Achten Sie besonders auf die Deckungssumme, Wartezeiten und die Mitversicherung von Vertragsrechtsschutz. Ein guter Gewerbe Rechtsschutz gibt Ihnen die Sicherheit, Ihr Recht jederzeit durchsetzen zu können – ohne finanzielle Abstinenz.</p>
      `
  },
  {
    language: 'en',
    title: 'Commercial Legal Protection – Your Business Shield',
    seo_title: 'Commercial Legal Protection Costs 2026 – For Entrepreneurs',
    seo_description: 'Commercial legal protection for businesses: Costs from €15/month, coverage & comparison. Taxes, contracts, employment law – all secured!',
    keywords: ['commercial legal protection', 'business legal insurance costs', 'legal protection self-employed', 'corporate legal protection', 'contract legal protection business'],
    primary_keyword: 'commercial legal protection',
    content: `
        <h2>What is Commercial Legal Protection?</h2>
        <p>Commercial legal protection (also called corporate legal protection or business legal protection) protects self-employed individuals, freelancers, and companies from the financial risks of legal disputes. It covers lawyer, court, and expert witness costs – regardless of the outcome of the proceedings.</p>

        <p>While private individuals rarely deal with disputes with authorities or contract law, these are everyday life for entrepreneurs. Good commercial legal protection insurance is therefore essential for every company – whether sole proprietor, GmbH, or freelancer.</p>

        <h2>Which Costs Does Commercial Legal Protection Cover?</h2>
        <p>The insurance covers the following costs:</p>
        <ul>
          <li><strong>Lawyer fees:</strong> Full coverage of attorney costs</li>
          <li><strong>Court costs:</strong> Instance fees and procedural costs</li>
          <li><strong>Expert opinions:</strong> Technical inspections and valuations</li>
          <li><strong>Opponent costs:</strong> Costs of the opposing party in case of win</li>
          <li><strong>Mediation:</strong> out-of-court dispute resolution</li>
          <li><strong>Bail:</strong> Loans for criminal procedure bail</li>
          <li><strong>Translations:</strong> For international disputes</li>
        </ul>

        <h2>Which Legal Areas Are Covered?</h2>
        <p>Comprehensive commercial legal protection includes the following modules:</p>

        <h3>1. General Corporate Legal Protection</h3>
        <ul>
          <li>Damage claims (customers, suppliers)</li>
          <li>Tax and social security law</li>
          <li>Authorities and administrative law (e.g. building permits)</li>
          <li>Administrative offenses and fines</li>
        </ul>

        <h3>2. Employment Law Protection</h3>
        <ul>
          <li>Dismissal protection lawsuits from your employees</li>
          <li>Disputes over employment contracts</li>
          <li>Wage and salary disputes</li>
          <li>Termination agreements and severance payments</li>
        </ul>

        <h3>3. Contract Law Protection</h3>
        <ul>
          <li>Delivery delays and defects</li>
          <li>Payment disputes with customers</li>
          <li>All types of contract breaches</li>
          <li>Insolvency clawbacks</li>
        </ul>

        <h3>4. Property Law Protection</h3>
        <ul>
          <li>Rent and lease disputes</li>
          <li>Utility bill disputes</li>
          <li>Termination protection for commercial spaces</li>
          <li>Construction and architect law</li>
        </ul>

        <h2>Cost Overview Commercial Legal Protection 2026</h2>
        <p>Costs vary depending on company size and scope of coverage:</p>

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Employees</th>
              <th>Revenue</th>
              <th>Monthly Premium (net)</th>
              <th>Coverage Limit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sole proprietor</td>
              <td>0</td>
              <td><€50,000</td>
              <td>€15-25</td>
              <td>€500,000</td>
            </tr>
            <tr>
              <td>Freelancer</td>
              <td>0-2</td>
              <td>€50-150,000</td>
              <td>€20-35</td>
              <td>€1,000,000</td>
            </tr>
            <tr>
              <td>Small business</td>
              <td>3-10</td>
              <td>€150-500,000</td>
              <td>€40-80</td>
              <td>unlimited</td>
            </tr>
            <tr>
              <td>Medium-sized company</td>
              <td>11-50</td>
              <td>>€500,000</td>
              <td>€100-250</td>
              <td>unlimited</td>
            </tr>
          </tbody>
        </table>

        <h2>Example Calculation: When Is Commercial Legal Protection Worth It?</h2>

        <h3>Scenario 1: Employee Dismissal Protection Lawsuit</h3>
        <p>An employee sues against dismissal. Dispute value: €40,000</p>
        <ul>
          <li>Lawyer costs: €8,500</li>
          <li>Court costs: €2,800</li>
          <li>Expert opinion: €1,200</li>
          <li><strong>Total costs: €12,500</strong></li>
        </ul>
        <p><strong>Monthly premium (12 months):</strong> €25 x 12 = €300 → <strong>Savings: €12,200</strong></p>

        <h2>Checklist: How to Choose the Right Commercial Legal Protection</h2>
        <ul>
          <li>☑️ <strong>Coverage limit:</strong> unlimited recommended</li>
          <li>☑️ <strong>Employment law protection:</strong> included (also for severance)</li>
          <li>☑️ <strong>Contract law protection:</strong> for auxiliary transactions</li>
          <li>☑️ <strong>Tax law protection:</strong> tax office disputes</li>
          <li>☑️ <strong>Data protection law protection:</strong> GDPR violations</li>
          <li>☑️ <strong>Special criminal law protection:</strong> for false accusations</li>
          <li>☑️ <strong>Debt collection management:</strong> collection procedures included</li>
        </ul>

        <h2>Conclusion: Essential for Every Business</h2>
        <p>A legal dispute can threaten a company's existence – whether solo entrepreneur or medium-sized business. Monthly costs of €20-100 are minimal compared to potential risks of tens of thousands of euros.</p>

        <p><strong>Recommendation:</strong> Get individual advice and compare at least 3 providers. Pay particular attention to coverage limit, waiting periods, and inclusion of contract law protection. Good commercial legal protection gives you the security to enforce your rights at any time – without financial abstinence.</p>
      `
  },
  {
    language: 'tr',
    title: 'Ticari Hukuk Koruması – İşletmeniz İçin Kalkan',
    seo_title: 'Ticari Hukuk Koruması Maliyetleri 2026 – Girişimciler İçin',
    seo_description: 'Ticari hukuk koruması işletmeler için: Aylık 15€\'dan başlayan fiyatlar, teminatlar & karşılaştırma. Vergiler, sözleşmeler, iş hukuku – hepsi güvence altında!',
    keywords: ['ticari hukuk koruması', 'işletme hukuk sigortası maliyetleri', 'serbest çalışanlar hukuk koruması', 'şirket hukuk koruması', 'ticari sözleşme hukuk koruması'],
    primary_keyword: 'ticari hukuk koruması',
    content: `
        <h2>Ticari Hukuk Koruması Nedir?</h2>
        <p>Ticari hukuk koruması (aynı zamanda şirket hukuk koruması veya işletme hukuk koruması olarak da bilinir), serbest çalışanları, serbest meslek sahiplerini ve şirketleri hukuki anlaşmazlıkların mali risklerinden korur. Avukat, mahkeme ve bilirkişi masraflarını – dava sonucundan bağımsız olarak – karşılar.</p>

        <p>Oysa özel bireyler nadiren idari makamlarla veya sözleşme hukuku ile uğraşırken, girişimciler için bunlar günlük hayattır. İyi bir ticari hukuk koruma sigortası her şirket için vazgeçilmezdir – ister tek kişilik işletme, ister GmbH, ister serbest meslek sahibi.</p>

        <h2>Ticari Hukuk Koruması Hangi Masrafları Karşılar?</h2>
        <p>Sigorta aşağıdaki masrafları kapsar:</p>
        <ul>
          <li><strong>Avukat ücretleri:</strong> Avukat masraflarının tam karşılığı</li>
          <li><strong>Mahkeme masrafları:</strong> Derece ücretleri ve işlem masrafları</li>
          <li><strong>Bilirkişi raporları:</strong> Teknik incelemeler ve değerleme raporları</li>
          <li><strong>Muhalif taraf masrafları:</strong> Kazanım durumunda karşı tarafın masrafları</li>
          <li><strong>Arabuluculuk:</strong> Mahkeme dışı uyuşmazlık çözümü</li>
          <li><strong>Teminatlar:</strong> Ceza prosedürü teminat kredileri</li>
          <li><strong>Çeviriler:</strong> Uluslararası uyuşmazlıklar için</li>
        </ul>

        <h2>Hangi Hukuk Alanları Kapsanır?</h2>
        <p>Kapsamlı ticari hukuk koruması şu modülleri içerir:</p>
      `
  },
  {
    language: 'ar',
    title: 'الحماية القانونية التجارية - درع عملك التجاري',
    seo_title: 'تكاليف الحماية القانونية التجارية 2026 - لرجال الأعمال',
    seo_description: 'الحماية القانونية التجارية للشركات: تكاليف تبدأ من 15€/شهر، التغطية والمقارنة. الضرائب، العقود، قانون العمل - كل شيء مؤمن عليه!',
    keywords: ['الحماية القانونية التجارية', 'تكاليف تأمين الحماية القانونية للأعمال', 'حماية قانونية للمستقلين', 'حماية قانونية للشركات', 'حماية قانونية للعقود التجارية'],
    primary_keyword: 'الحماية القانونية التجارية',
    content: `
        <h2>ما هي الحماية القانونية التجارية؟</h2>
        <p>الحماية القانونية التجارية (تُعرف أيضًا بالحماية القانونية للشركات أو حماية الأعمال القانونية) تحمي الأفراد المستقلين وأصحاب الأعمال الحرة والشركات من المخاطر المالية للنزاعات القانونية. تغطي تكاليف المحامين والمحاكم وخبراء الشهود - بغض النظر عن نتيجة الإجراءات.</p>
      `
  }
];

async function createBlogPost(
  post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>,
  translations: Omit<BlogPostTranslation, 'id' | 'blog_post_id' | 'created_at' | 'updated_at'>[]
): Promise<BlogPost> {
  const { data: postData, error: postError } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();

  if (postError) {
    console.error('Error creating blog post:', postError);
    throw postError;
  }

  const translationsWithPostId = translations.map(t => ({
    ...t,
    blog_post_id: postData.id
  }));

  const { error: translationsError } = await supabase
    .from('blog_post_translations')
    .insert(translationsWithPostId);

  if (translationsError) {
    console.error('Error creating blog post translations:', translationsError);
    throw translationsError;
  }

  return postData;
}

async function main() {
  try {
    console.log('Adding new blog post: Gewerbe Rechtsschutz...');

    const result = await createBlogPost(newBlogPost, translations);

    console.log('✓ Blog post added successfully!');
    console.log(`  - ID: ${result.id}`);
    console.log(`  - Slug: ${result.slug}`);
    console.log(`  - Category: ${result.category}`);
    console.log(`  - Published: ${result.published_date}`);
    console.log(`  - Translations: ${translations.length} languages`);
  } catch (error) {
    console.error('Error adding blog post:', error);
    process.exit(1);
  }
}

main();
