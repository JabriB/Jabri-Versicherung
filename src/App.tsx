import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './components/LandingPage';
import MultiStepForm from './components/MultiStepForm';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import AGB from './components/AGB';
import Sitemap from './components/Sitemap';
import FAQ from './components/FAQ';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/formular" element={<MultiStepForm />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <CookieConsent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
