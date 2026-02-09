import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, Phone, Mail, Home, HelpCircle } from 'lucide-react';
import { useHead } from '../hooks/useHead';
import { pixelEvents } from '../lib/pixelTracking';

export default function FAQ() {
  const { language } = useLanguage();
  const [openItems, setOpenItems] = useState<string[]>([]);

  useHead({
    title: 'FAQ - Häufig gestellte Fragen | Jabri Versicherung',
    description: 'Antworten auf häufig gestellte Fragen zu Versicherungen, Beratung und unseren Services in Düren.',
    canonical: 'https://jabriversicherung.de/faq',
    ogTitle: 'FAQ - Häufig gestellte Fragen | Jabri Versicherung',
    ogDescription: 'Antworten auf häufig gestellte Fragen zu Versicherungen und unseren Services.',
    ogUrl: 'https://jabriversicherung.de/faq',
    ogImage: 'https://jabriversicherung.de/jabri-versicherung-logo.svg'
  });

  const toggleItem = (id: string) => {
    pixelEvents.viewContent(`FAQ ${id}`, 'faq');
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const faqContent = {
    de: {
      title: 'Häufig gestellte Fragen',
      subtitle: 'Antworten auf die wichtigsten Fragen zu unseren Versicherungsberatungen',
      backToHome: 'Zurück zur Startseite',
      contactTitle: 'Haben Sie weitere Fragen?',
      contactText: 'Kontaktieren Sie uns gerne unter',
      categories: [
        {
          id: 'general',
          title: 'Allgemeine Fragen zur Beratung',
          questions: [
            {
              id: 'cost',
              question: 'Was kostet die Beratung?',
              answer: 'Die Erstberatung und Bedarfsanalyse sind für dich völlig kostenlos und unverbindlich. Du zahlst nur, wenn du dich für eine Versicherung entscheidest – die Kosten sind dann in den Versicherungsbeiträgen enthalten.'
            },
            {
              id: 'languages',
              question: 'In welchen Sprachen beraten Sie?',
              answer: 'Ich berate dich persönlich in Deutsch, Englisch, Arabisch und Türkisch. So kannst du alle Details in deiner Muttersprache besprechen und sicherstellen, dass du alles vollständig verstehst.'
            },
            {
              id: 'process',
              question: 'Wie läuft eine Beratung ab?',
              answer: 'Der Prozess ist einfach: Du kontaktierst mich über das Formular oder telefonisch, wir vereinbaren einen Termin (vor Ort oder online), ich analysiere deinen Bedarf und erstelle ein maßgeschneidertes Angebot. Bei Interesse setzen wir alles gemeinsam um.'
            },
            {
              id: 'location',
              question: 'Wo finden die Beratungsgespräche statt?',
              answer: 'Du kannst mich in meinem Büro in der Schöllerstraße 33, 52351 Düren besuchen. Alternativ biete ich auch Online-Beratungen oder Hausbesuche nach Vereinbarung an – ganz wie es für dich am besten passt.'
            },
            {
              id: 'appointment',
              question: 'Wie schnell erhalte ich einen Termin?',
              answer: 'In der Regel können wir innerhalb von 1-3 Werktagen einen Termin vereinbaren. Bei dringenden Anliegen rufe mich direkt an unter +49 1575 5588 142 – oft lässt sich kurzfristig eine Lösung finden.'
            },
            {
              id: 'insurers',
              question: 'Arbeiten Sie mit mehreren Versicherern zusammen?',
              answer: 'Ich arbeite mit einem der führenden deutschen Versicherer zusammen. Dies ermöglicht mir, dir tiefgreifende Expertise und optimale Konditionen bei hochwertigen Produkten zu bieten.'
            }
          ]
        },
        {
          id: 'legal',
          title: 'Rechtsschutzversicherung',
          questions: [
            {
              id: 'what-is',
              question: 'Was ist eine Rechtsschutzversicherung?',
              answer: 'Eine Rechtsschutzversicherung übernimmt die Kosten für rechtliche Auseinandersetzungen – von Anwaltskosten über Gerichtsgebühren bis zu Sachverständigen. Sie schützt dich vor den oft hohen finanziellen Belastungen eines Rechtsstreits.'
            },
            {
              id: 'types',
              question: 'Welche Arten von Rechtsschutz gibt es?',
              answer: 'Ich biete verschiedene Rechtsschutz-Lösungen an: Privat-Rechtsschutz, Verkehrs-Rechtsschutz, Miet-Rechtsschutz, Arbeits-Rechtsschutz, Immobilien-Rechtsschutz und spezielle Lösungen für Selbstständige und Unternehmen.'
            },
            {
              id: 'waiting',
              question: 'Gibt es Wartezeiten bei Rechtsschutzversicherungen?',
              answer: 'Bei vielen Leistungen wie der Anwaltshotline, Schadensersatz-, Steuer- oder Straf-Rechtsschutz gibt es keine Wartezeit – diese können sofort genutzt werden. Für bestimmte Bereiche wie Arbeits- oder Miet-Rechtsschutz gelten üblicherweise 3 Monate Wartezeit.'
            },
            {
              id: 'instant',
              question: 'Was bedeutet "Rechtsschutz Sofort"?',
              answer: 'Bei den "Sofort"-Produkten wie Miet-Rechtsschutz Sofort oder Verkehrs-Rechtsschutz Sofort entfallen die üblichen Wartezeiten. Du bist vom ersten Tag an vollumfänglich geschützt.'
            },
            {
              id: 'active',
              question: 'Was ist der Unterschied zwischen Aktiv-Rechtsschutz und normalem Rechtsschutz?',
              answer: 'Der Aktiv-Rechtsschutz bietet zusätzliche Soforthilfe-Leistungen und erweiterten Service. Du erhältst schnellere Unterstützung und Zugang zu erweiterten Beratungsleistungen, die über den klassischen Rechtsschutz hinausgehen.'
            },
            {
              id: 'right-choice',
              question: 'Welcher Rechtsschutz ist der richtige für mich?',
              answer: 'Das hängt von deiner persönlichen Situation ab. Als Mieter ist Miet-Rechtsschutz wichtig, als Autofahrer Verkehrs-Rechtsschutz, als Arbeitnehmer Arbeits-Rechtsschutz. In der kostenlosen Beratung analysieren wir gemeinsam deinen Bedarf.'
            },
            {
              id: 'legal-cost',
              question: 'Was kostet eine Rechtsschutzversicherung?',
              answer: 'Die Beiträge variieren je nach gewähltem Schutzumfang, Selbstbeteiligung und persönlichen Faktoren. Ein Basis-Privatrechtsschutz beginnt oft bei unter 20 € monatlich, während Kombi-Pakete mehr kosten aber umfassender schützen.'
            }
          ]
        },
        {
          id: 'liability',
          title: 'Haftpflicht- und Hausratversicherung',
          questions: [
            {
              id: 'need-liability',
              question: 'Brauche ich eine Privathaftpflichtversicherung?',
              answer: 'Eine Privathaftpflicht ist eine der wichtigsten Versicherungen überhaupt. Sie schützt dich vor den finanziellen Folgen, wenn du anderen einen Schaden zufügst – und Schadensersatzforderungen können schnell existenzbedrohend werden.'
            },
            {
              id: 'household',
              question: 'Was deckt die Hausratversicherung ab?',
              answer: 'Die Hausratversicherung schützt dein Hab und Gut in der Wohnung gegen Gefahren wie Einbruch, Feuer, Leitungswasser, Sturm und Hagel. Auch Wertsachen sind bis zu vereinbarten Grenzen mitversichert.'
            },
            {
              id: 'household-vs-building',
              question: 'Was ist der Unterschied zwischen Hausrat und Wohngebäudeversicherung?',
              answer: 'Hausrat versichert dein bewegliches Eigentum (Möbel, Elektronik, Kleidung). Die Wohngebäudeversicherung schützt das Gebäude selbst und ist für Eigentümer relevant – sie deckt Schäden am Haus, nicht am Inventar.'
            },
            {
              id: 'valuables',
              question: 'Welche Wertsachen sind in der Hausratversicherung abgedeckt?',
              answer: 'Schmuck, Bargeld, Wertpapiere und andere Wertsachen sind bis zu bestimmten Höchstgrenzen mitversichert. Für besonders wertvolle Gegenstände kann eine Zusatzversicherung sinnvoll sein.'
            }
          ]
        },
        {
          id: 'business',
          title: 'Geschäfts- und Gewerbeversicherungen',
          questions: [
            {
              id: 'self-employed',
              question: 'Welche Versicherungen brauche ich als Selbstständiger?',
              answer: 'Als Selbstständiger solltest du mindestens an Berufshaftpflicht, Rechtsschutz für Selbstständige, Berufsunfähigkeitsversicherung und eventuell Betriebsunterbrechungsversicherung denken. Die genaue Zusammenstellung hängt von deiner Branche ab.'
            },
            {
              id: 'business-aktiv',
              question: 'Was ist im BusinessAktiv-Paket enthalten?',
              answer: 'BusinessAktiv kombiniert verschiedene Gewerbeversicherungen in einem Paket. Details zum konkreten Leistungsumfang besprechen wir gerne in einem persönlichen Gespräch, da die Zusammenstellung auf dein Geschäft abgestimmt werden kann.'
            },
            {
              id: 'debt-management',
              question: 'Bieten Sie auch Forderungsmanagement an?',
              answer: 'Ja, ich biete professionelles Forderungsmanagement für Unternehmen. Du erhältst Unterstützung beim Einzug offener Forderungen und bei der Durchsetzung deiner Ansprüche.'
            }
          ]
        },
        {
          id: 'vehicle',
          title: 'Fahrzeug- und Verkehrsversicherungen',
          questions: [
            {
              id: 'top-schutzbrief',
              question: 'Was ist der Top-Schutzbrief?',
              answer: 'Der Top-Schutzbrief bietet umfassende Assistance-Leistungen bei Pannen und Unfällen. Er geht über normale Schutzbriefe hinaus und bietet erweiterte Leistungen wie Mietwagen, Übernachtungskosten und Rücktransport.'
            },
            {
              id: 'traffic-legal-pedestrian',
              question: 'Ist der Verkehrs-Rechtsschutz auch für Fußgänger und Radfahrer sinnvoll?',
              answer: 'Ja, Verkehrs-Rechtsschutz gilt nicht nur für Autofahrer. Als Fußgänger oder Radfahrer bist du im Straßenverkehr ebenfalls Rechtsrisiken ausgesetzt – etwa bei Unfällen oder Auseinandersetzungen mit anderen Verkehrsteilnehmern.'
            },
            {
              id: 'accident-insurance',
              question: 'Was deckt die Unfallversicherung ab?',
              answer: 'Die Unfallversicherung leistet bei Invalidität oder Tod durch Unfälle. Sie zahlt einmalige Kapitalleistungen oder Renten und kann durch Zusatzbausteine wie Krankenhaustagegeld oder Genesungsgeld erweitert werden.'
            }
          ]
        },
        {
          id: 'health',
          title: 'Kranken- und Zusatzversicherungen',
          questions: [
            {
              id: 'public-vs-private',
              question: 'Was ist der Unterschied zwischen gesetzlicher und privater Krankenversicherung?',
              answer: 'Die gesetzliche Krankenversicherung bietet Standardleistungen für alle Versicherten. Die private Krankenversicherung ermöglicht individuell wählbare Leistungen, oft mit besseren Konditionen – ist aber nicht für jeden zugänglich.'
            },
            {
              id: 'beihilfe',
              question: 'Für wen ist eine Beihilfeversicherung relevant?',
              answer: 'Beihilfeversicherungen sind speziell für Beamte, Richter und Soldaten konzipiert. Sie ergänzen die staatliche Beihilfe und decken den verbleibenden Eigenanteil der Krankheitskosten ab.'
            },
            {
              id: 'pet-insurance',
              question: 'Was leistet TierProtect?',
              answer: 'TierProtect ist eine Krankenversicherung für deine Haustiere. Sie übernimmt Tierarztkosten bei Krankheiten oder Unfällen und schützt dich vor hohen unerwarteten Ausgaben für Operationen oder Behandlungen.'
            }
          ]
        },
        {
          id: 'contract',
          title: 'Vertragsmanagement',
          questions: [
            {
              id: 'claim',
              question: 'Wie kann ich einen Schaden melden?',
              answer: 'Bei einem Schadensfall kannst du mich direkt kontaktieren – ich unterstütze dich bei der Schadenmeldung. Alternativ kannst du Schäden auch direkt beim Versicherer online melden oder die Hotline nutzen.'
            },
            {
              id: 'cancellation',
              question: 'Kann ich meine Versicherung jederzeit kündigen?',
              answer: 'Die Kündigungsmöglichkeiten hängen von der Vertragsart ab. Meist gilt eine Kündigungsfrist von 3 Monaten zum Vertragsablauf. Nach einem Schadensfall oder bei Beitragserhöhungen hast du oft ein Sonderkündigungsrecht.'
            },
            {
              id: 'change-data',
              question: 'Wie ändere ich meine persönlichen Daten?',
              answer: 'Änderungen wie Adresse, Bankverbindung oder Name kannst du mir einfach mitteilen. Ich kümmere mich um die Aktualisierung beim Versicherer. Bei dringenden Änderungen geht es auch direkt über das Online-Kundenportal.'
            },
            {
              id: 'payment-issues',
              question: 'Was passiert, wenn ich meinen Beitrag nicht zahlen kann?',
              answer: 'Kontaktiere mich bei Zahlungsschwierigkeiten frühzeitig. Oft lassen sich Lösungen finden wie Ratenzahlungen, vorübergehende Beitragsreduktion oder Anpassung des Versicherungsschutzes, bevor der Vertrag gekündigt wird.'
            },
            {
              id: 'processing-time',
              question: 'Wie lange dauert die Bearbeitung eines Leistungsantrags?',
              answer: 'Die Bearbeitungszeit variiert je nach Komplexität. Einfache Fälle werden oft innerhalb weniger Tage bearbeitet, komplexere Sachverhalte können länger dauern. Den Status kannst du jederzeit online verfolgen oder bei mir erfragen.'
            }
          ]
        },
        {
          id: 'payment',
          title: 'Kosten und Zahlung',
          questions: [
            {
              id: 'payment-method',
              question: 'Wie werden die Beiträge bezahlt?',
              answer: 'Die Versicherungsbeiträge werden üblicherweise monatlich, vierteljährlich, halbjährlich oder jährlich per Lastschrift abgebucht. Bei jährlicher Zahlung gibt es oft einen Nachlass.'
            },
            {
              id: 'change-payment',
              question: 'Kann ich die Zahlungsweise ändern?',
              answer: 'Ja, die Zahlungsweise lässt sich in der Regel anpassen. Beachte aber, dass bei monatlicher Zahlung oft ein kleiner Aufschlag im Vergleich zur jährlichen Zahlung anfällt.'
            },
            {
              id: 'family-discount',
              question: 'Gibt es Familientarife oder Rabatte?',
              answer: 'Ja, bei vielen Versicherungen gibt es günstigere Familientarife. Auch bei Kombination mehrerer Versicherungen oder längerer Vertragsbindung sind Rabatte möglich. Das besprechen wir individuell.'
            },
            {
              id: 'tax-deduction',
              question: 'Sind Versicherungsbeiträge steuerlich absetzbar?',
              answer: 'Viele Versicherungen sind steuerlich absetzbar. Besonders Vorsorgeversicherungen, Haftpflicht und Rechtsschutz können in der Steuererklärung geltend gemacht werden – am besten mit deinem Steuerberater klären.'
            }
          ]
        },
        {
          id: 'special',
          title: 'Besondere Situationen',
          questions: [
            {
              id: 'moving',
              question: 'Was passiert bei einem Umzug?',
              answer: 'Bei einem Umzug innerhalb Deutschlands bleibt dein Versicherungsschutz bestehen. Wichtig ist, die neue Adresse zeitnah zu melden. Bei Hausrat kann sich durch Wohnflächenänderung der Beitrag ändern.'
            },
            {
              id: 'abroad',
              question: 'Bin ich im Ausland versichert?',
              answer: 'Der Auslandsschutz hängt von der jeweiligen Versicherung ab. Viele Versicherungen bieten weltweiten oder europäischen Schutz. Für längere Auslandsaufenthalte gibt es spezielle Zusatzversicherungen wie Reiseprotect 365.'
            },
            {
              id: 'marriage-divorce',
              question: 'Was ist bei Heirat oder Scheidung zu beachten?',
              answer: 'Heirat und Scheidung sind wichtige Ereignisse für Versicherungen. Partner können oft in bestehende Verträge aufgenommen werden, bei Scheidung benötigt jeder wieder eigenen Schutz. Ich berate dich gerne zur optimalen Anpassung.'
            },
            {
              id: 'shared-flat',
              question: 'Wie funktioniert die Versicherung bei Wohngemeinschaften?',
              answer: 'In WGs ist jeder Bewohner einzeln für seine Haftpflicht und seinen Hausrat verantwortlich. Gemeinschaftlich genutzte Räume können zu Unklarheiten führen – hier ist gute Beratung wichtig.'
            },
            {
              id: 'renting-out',
              question: 'Was muss ich bei Vermietung meiner Wohnung beachten?',
              answer: 'Bei Vermietung benötigst du als Vermieter eine spezielle Haus- und Grundbesitzer-Haftpflicht. Der normale Hausrat deiner eigenen Wohnung deckt vermietete Objekte nicht ab. Auch Immobilien-Rechtsschutz ist für Vermieter sehr empfehlenswert.'
            }
          ]
        },
        {
          id: 'digital',
          title: 'Digitale Services und Support',
          questions: [
            {
              id: 'online-portal',
              question: 'Gibt es ein Online-Kundenportal?',
              answer: 'Ja, im Kundenportal kannst du deine Verträge einsehen, Dokumente herunterladen, Schäden melden und den Bearbeitungsstatus verfolgen. Du hast 24/7 Zugriff auf alle wichtigen Informationen zu deinen Versicherungen.'
            },
            {
              id: 'legal-hotline',
              question: 'Bieten Sie telefonische Rechtsberatung an?',
              answer: 'Ja, bei vielen Rechtsschutz-Tarifen ist eine telefonische Anwaltshotline inklusive. Du kannst rechtliche Fragen vorab besprechen, bevor es zum Streitfall kommt – dieser Service steht dir als Kunde zur Verfügung.'
            },
            {
              id: 'mediation',
              question: 'Was ist Mediation?',
              answer: 'Mediation ist ein außergerichtliches Konfliktlösungsverfahren. Ein neutraler Vermittler hilft, Streitigkeiten ohne Gerichtsverfahren beizulegen – das spart Zeit, Nerven und oft auch Kosten.'
            },
            {
              id: 'emergency-contact',
              question: 'Wie erreiche ich Sie im Notfall?',
              answer: 'Im Notfall kannst du mich unter +49 1575 5588 142 erreichen. Bei versicherungstechnischen Notfällen außerhalb meiner Erreichbarkeit steht dir auch die 24/7-Hotline des Versicherers zur Verfügung.'
            }
          ]
        }
      ]
    },
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most important questions about our insurance consulting services',
      backToHome: 'Back to Home',
      contactTitle: 'Have more questions?',
      contactText: 'Feel free to contact us at',
      categories: []
    },
    ar: {
      title: 'الأسئلة المتكررة',
      subtitle: 'إجابات على أهم الأسئلة حول خدمات استشارات التأمين لدينا',
      backToHome: 'العودة إلى الصفحة الرئيسية',
      contactTitle: 'هل لديك المزيد من الأسئلة؟',
      contactText: 'لا تتردد في الاتصال بنا على',
      categories: []
    },
    tr: {
      title: 'Sık Sorulan Sorular',
      subtitle: 'Sigorta danışmanlık hizmetlerimiz hakkında en önemli soruların cevapları',
      backToHome: 'Ana Sayfaya Dön',
      contactTitle: 'Daha fazla sorunuz mu var?',
      contactText: 'Bize ulaşmaktan çekinmeyin',
      categories: []
    }
  };

  const content = faqContent[language] || faqContent.de;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gold-500 rounded-2xl mb-4 sm:mb-6">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {content.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {content.categories.length > 0 ? (
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {content.categories.map((category) => (
              <div key={category.id} className="space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gold-500 rounded-full"></div>
                  {category.title}
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {category.questions.map((item) => {
                    const itemId = `${category.id}-${item.id}`;
                    const isOpen = openItems.includes(itemId);

                    return (
                      <div
                        key={itemId}
                        className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 border border-neutral-700/50 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full text-left p-4 sm:p-5 lg:p-6 flex items-start justify-between gap-4 hover:bg-neutral-800/40 transition-colors"
                        >
                          <span className="text-base sm:text-lg lg:text-xl font-semibold text-white leading-relaxed pr-2">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 sm:w-6 sm:h-6 text-gold-500 flex-shrink-0 transition-transform duration-300 mt-1 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'max-h-96' : 'max-h-0'
                          }`}
                        >
                          <div className="px-4 sm:px-5 lg:px-6 pb-4 sm:pb-5 lg:pb-6 pt-0">
                            <div className="text-sm sm:text-base lg:text-lg text-neutral-200 leading-relaxed border-t border-neutral-700/50 pt-4">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-400">
            <p className="text-lg">FAQ content coming soon in {language.toUpperCase()}</p>
          </div>
        )}

        <div className="mt-12 sm:mt-16 lg:mt-20 bg-gradient-to-br from-gold-500/10 to-gold-400/10 border border-gold-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
            {content.contactTitle}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-200 mb-6 sm:mb-8">
            {content.contactText}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <a
              href="tel:+4915755588142"
              onClick={() => pixelEvents.contact()}
              className="inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-gold-500 hover:text-gold-400 transition-colors group"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">+49 1575 5588 142</span>
            </a>

            <div className="hidden sm:block w-px h-6 bg-neutral-600"></div>

            <a
              href="mailto:jabri.versicherung@gmail.com"
              onClick={() => pixelEvents.contact()}
              className="inline-flex items-center gap-2 sm:gap-3 text-base sm:text-lg text-gold-500 hover:text-gold-400 transition-colors group"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">jabri.versicherung@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 bg-neutral-800/30 border border-neutral-700/50 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 text-center">
            Weitere hilfreiche Seiten
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <Link
              to="/"
              className="text-center p-3 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 border border-neutral-600/30 hover:border-gold-500/30 transition-all"
            >
              <span className="text-sm text-neutral-200 hover:text-gold-500">Startseite</span>
            </Link>
            <Link
              to="/blog"
              className="text-center p-3 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 border border-neutral-600/30 hover:border-gold-500/30 transition-all"
            >
              <span className="text-sm text-neutral-200 hover:text-gold-500">Blog</span>
            </Link>
            <Link
              to="/impressum"
              className="text-center p-3 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 border border-neutral-600/30 hover:border-gold-500/30 transition-all"
            >
              <span className="text-sm text-neutral-200 hover:text-gold-500">Impressum</span>
            </Link>
            <Link
              to="/datenschutz"
              className="text-center p-3 rounded-lg bg-neutral-700/30 hover:bg-neutral-700/50 border border-neutral-600/30 hover:border-gold-500/30 transition-all"
            >
              <span className="text-sm text-neutral-200 hover:text-gold-500">Datenschutz</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-neutral-400 hover:text-gold-500 transition-colors px-4 py-2 rounded-lg hover:bg-neutral-800/50"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{content.backToHome}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
