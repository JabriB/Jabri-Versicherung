import { useHead } from '../hooks/useHead';
import LegalLayout from './LegalLayout';

export default function Datenschutz() {
  useHead({
    title: 'Datenschutzerklärung | Jabri Versicherung',
    description: 'Datenschutzerklärung von Jabri Versicherung. Erfahren Sie wie wir Ihre persönlichen Daten schützen.',
    canonical: 'https://jabriversicherung.de/datenschutz',
    ogTitle: 'Datenschutzerklärung | Jabri Versicherung',
    ogDescription: 'Datenschutzerklärung von Jabri Versicherung.',
    ogUrl: 'https://jabriversicherung.de/datenschutz',
    ogImage: 'https://jabriversicherung.de/jabri-versicherung-logo.svg'
  });

  return (
    <LegalLayout title="Datenschutzerklärung">
      <div className="text-slate-300 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">1. Datenschutz auf einen Blick</h2>

          <h3 className="text-xl font-semibold text-white mb-3 mt-4">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
          </p>

          <h3 className="text-xl font-semibold text-white mb-3 mt-4">Datenerfassung auf dieser Website</h3>
          <p className="mb-2">
            <strong className="text-white">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
          </p>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <p className="mb-2 mt-4">
            <strong className="text-white">Wie erfassen wir Ihre Daten?</strong>
          </p>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
          </p>
          <p className="mt-2">
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>

          <p className="mb-2 mt-4">
            <strong className="text-white">Wofür nutzen wir Ihre Daten?</strong>
          </p>
          <p>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
          </p>

          <p className="mb-2 mt-4">
            <strong className="text-white">Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
          </p>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">2. Hosting</h2>
          <p className="mb-3">
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
          </p>
          <p className="mb-2">
            <strong className="text-white">Hostinger</strong><br />
            HOSTINGER operations, UAB<br />
            Švitrigailos str. 34, Vilnius 03230, Litauen
          </p>
          <p>
            Details entnehmen Sie der Datenschutzerklärung des Anbieters:{' '}
            <a href="https://www.hostinger.com/de/legal/datenschutz-bestimmungen" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">
              https://www.hostinger.com/de/legal/datenschutz-bestimmungen
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

          <h3 className="text-xl font-semibold text-white mb-3 mt-4">Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="text-xl font-semibold text-white mb-3 mt-4">Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p className="mt-2">
            <strong className="text-white">Brhan Jabri</strong><br />
            Schoellerstraße 33<br />
            52351 Düren<br />
            Telefon: +49 1575 5588 142<br />
            E-Mail: jabri.versicherung@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">4. Datenerfassung auf dieser Website</h2>

          <h3 className="text-xl font-semibold text-white mb-3 mt-4">Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p className="mt-2">
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-4">5. Ihre Rechte</h2>
          <p>
            Sie haben folgende Rechte:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
          </ul>
        </section>
      </div>
    </LegalLayout>
  );
}
