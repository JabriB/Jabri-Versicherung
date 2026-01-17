import { useHead } from '../hooks/useHead';
import LegalLayout from './LegalLayout';

export default function AGB() {
  useHead({
    title: 'AGB - Allgemeine Geschäftsbedingungen | Jabri Versicherung',
    description: 'Allgemeine Geschäftsbedingungen (AGB) von Jabri Versicherung in Düren.',
    canonical: 'https://jabriversicherung.de/agb',
    ogTitle: 'AGB - Allgemeine Geschäftsbedingungen | Jabri Versicherung',
    ogDescription: 'Allgemeine Geschäftsbedingungen von Jabri Versicherung.',
    ogUrl: 'https://jabriversicherung.de/agb',
    ogImage: 'https://jabriversicherung.de/jabri-versicherung-logo.svg',
    robots: 'noindex, follow'
  });

  return (
    <LegalLayout title="Allgemeine Geschäftsbedingungen (AGB)">
      <div className="text-slate-300 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 1 Geltungsbereich</h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Beratungsleistungen und Versicherungsvermittlungen durch [Ihr Firmenname] (nachfolgend "Versicherungsmakler" genannt).
          </p>
          <p className="mt-2">
            Abweichende oder ergänzende Allgemeine Geschäftsbedingungen des Auftraggebers werden nur dann Vertragsbestandteil, wenn der Versicherungsmakler ihrer Geltung ausdrücklich schriftlich zugestimmt hat.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 2 Vertragsgegenstand und Leistungsumfang</h2>
          <p>
            Der Versicherungsmakler bietet folgende Leistungen an:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Beratung zu Versicherungsprodukten</li>
            <li>Analyse des individuellen Versicherungsbedarfs</li>
            <li>Vermittlung von Versicherungsverträgen</li>
            <li>Betreuung bestehender Versicherungsverträge</li>
            <li>Unterstützung im Schadensfall</li>
          </ul>
          <p className="mt-3">
            Der konkrete Leistungsumfang ergibt sich aus der jeweiligen Auftragserteilung.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 3 Zustandekommen des Vertrages</h2>
          <p>
            Der Vertrag kommt durch die Auftragserteilung des Kunden und die Annahme durch den Versicherungsmakler zustande. Die Annahme kann ausdrücklich oder durch Auftragsausführung erfolgen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 4 Pflichten des Versicherungsmaklers</h2>
          <p>
            Der Versicherungsmakler verpflichtet sich:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>zur gewissenhaften und sorgfältigen Beratung nach den Bedürfnissen des Kunden</li>
            <li>zur umfassenden Information über die vermittelten Produkte</li>
            <li>zur Dokumentation der Beratung gemäß gesetzlicher Vorgaben</li>
            <li>zur Wahrung der Schweigepflicht bezüglich aller Kundendaten</li>
            <li>zur fortlaufenden fachlichen Weiterbildung</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 5 Pflichten des Kunden</h2>
          <p>
            Der Kunde verpflichtet sich:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>zur wahrheitsgemäßen und vollständigen Angabe aller relevanten Informationen</li>
            <li>zur unverzüglichen Mitteilung von Änderungen, die für den Versicherungsschutz relevant sind</li>
            <li>zur rechtzeitigen Zahlung der Versicherungsprämien</li>
            <li>zur Mitwirkung bei der Schadenregulierung</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 6 Vergütung</h2>
          <p>
            Die Beratungsleistung ist für den Kunden grundsätzlich kostenfrei. Der Versicherungsmakler erhält seine Vergütung durch Courtagen der Versicherungsgesellschaften. Auf Wunsch informiert der Versicherungsmakler über die Höhe der erhaltenen Vergütung.
          </p>
          <p className="mt-2">
            Für besondere Beratungsleistungen kann eine gesonderte Honorarvereinbarung getroffen werden. Diese bedarf der Schriftform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 7 Haftung</h2>
          <p>
            Der Versicherungsmakler haftet für Vorsatz und grobe Fahrlässigkeit. Bei einfacher Fahrlässigkeit haftet der Versicherungsmakler nur bei Verletzung wesentlicher Vertragspflichten. Die Haftung ist in diesem Fall auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
          </p>
          <p className="mt-2">
            Der Versicherungsmakler unterhält eine Berufshaftpflichtversicherung gemäß den gesetzlichen Vorgaben. Die Deckungssumme beträgt mindestens 1.000.000 EUR je Versicherungsfall.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 8 Vertragsdauer und Kündigung</h2>
          <p>
            Der Maklervertrag wird auf unbestimmte Zeit geschlossen. Beide Parteien können den Vertrag jederzeit ohne Einhaltung einer Frist schriftlich kündigen.
          </p>
          <p className="mt-2">
            Bereits vermittelte Versicherungsverträge bleiben von einer Kündigung des Maklervertrages unberührt. Der Kunde kann jedoch jederzeit die Betreuung durch den Versicherungsmakler beenden.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 9 Datenschutz</h2>
          <p>
            Der Versicherungsmakler verarbeitet personenbezogene Daten des Kunden ausschließlich zur Vertragserfüllung und unter Beachtung der geltenden Datenschutzbestimmungen. Weitere Informationen entnehmen Sie bitte unserer Datenschutzerklärung.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">§ 10 Schlussbestimmungen</h2>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland. Erfüllungsort und Gerichtsstand ist [Ihr Ort], sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
          </p>
          <p className="mt-2">
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
          </p>
        </section>

      </div>
    </LegalLayout>
  );
}
