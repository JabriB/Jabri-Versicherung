import { useHead } from '../hooks/useHead';
import LegalLayout from './LegalLayout';

export default function Impressum() {
  useHead({
    title: 'Impressum | Jabri Versicherung',
    description: 'Impressum und rechtliche Informationen von Jabri Versicherung in Düren.',
    canonical: 'https://jabriversicherung.de/impressum',
    ogTitle: 'Impressum | Jabri Versicherung',
    ogDescription: 'Impressum und rechtliche Informationen von Jabri Versicherung.',
    ogUrl: 'https://jabriversicherung.de/impressum',
    ogImage: 'https://jabriversicherung.de/jabri-versicherung-logo.svg'
  });

  return (
    <LegalLayout title="Impressum">
      <div className="text-slate-300 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Kontakt</h2>
          <p>
            <strong className="text-white">Telefon:</strong> +49 1575 5588 142<br />
            <strong className="text-white">E-Mail:</strong> jabri.versicherung@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
          <p className="mb-4">
            Ich bin tätig als <strong className="text-white">gebundener Versicherungsvertreter nach § 34d Absatz 7 Satz 1 Nummer 1 GewO</strong>.
          </p>
          <p className="mb-4">
            Berufsrechtliche Regelungen finden sich in §§ 59 – 68 VVG sowie in der VersVermV.
          </p>
          <p>
            Diese gesetzlichen Regelungen können Sie über die vom Bundesministerium der Justiz und von der juris GmbH
            betriebenen Homepage{' '}
            <a href="https://www.gesetze-im-internet.de" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">
              www.gesetze-im-internet.de
            </a>{' '}
            einsehen und abrufen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Eintrag im Handelsregister</h2>
          <p className="mb-4">
            Ich bin beim Deutschen Industrie- und Handelskammertag (DIHK) e.V. unter der IHK-Register-Nr.{' '}
            <strong className="text-white">D-0DLW-6WPLE-77</strong> eingetragen:
          </p>
          <p className="mb-4">
            <strong className="text-white">Hauptgeschäftsstelle Aachen-Düren</strong><br />
            Schoellerstr. 33<br />
            52351 Düren
          </p>
          <p className="mb-2">
            <strong className="text-white">Rückfragen bei Deutsche Industrie- und Handelskammertag (DIHK) e.V.</strong><br />
            Breite Straße 29<br />
            10178 Berlin<br />
            <a href="https://www.vermittlerregister.info" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">
              www.vermittlerregister.info
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Und wenn Sie mal nicht zufrieden sein sollten?</h2>
          <p className="mb-4">
            Sollten Sie an meiner Leistung etwas auszusetzen haben, kontaktieren Sie bitte:
          </p>
          <p className="mb-4">
            <strong className="text-white">ARAG SE</strong><br />
            ARAG Platz 1<br />
            40472 Düsseldorf<br />
            Fax: 0211 963-2850<br />
            E-Mail: <a href="mailto:service@ARAG.de" className="text-orange-400 hover:text-orange-300 underline">service@ARAG.de</a>
          </p>
          <p>
            <strong className="text-white">Versicherungsombudsmann e.V.</strong><br />
            Postfach 08 06 32<br />
            10006 Berlin<br />
            <a href="https://www.versicherungsombudsmann.de" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">
              www.versicherungsombudsmann.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Verbraucherinformation</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
