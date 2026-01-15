import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import LandingPage from './components/LandingPage';
import CookieConsent from './components/CookieConsent';

const MultiStepForm = lazy(() => import('./components/MultiStepForm'));
const Impressum = lazy(() => import('./components/Impressum'));
const Datenschutz = lazy(() => import('./components/Datenschutz'));
const AGB = lazy(() => import('./components/AGB'));
const Sitemap = lazy(() => import('./components/Sitemap'));
const FAQ = lazy(() => import('./components/FAQ'));

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/formular" element={<Suspense fallback={null}><MultiStepForm /></Suspense>} />
          <Route path="/impressum" element={<Suspense fallback={null}><Impressum /></Suspense>} />
          <Route path="/datenschutz" element={<Suspense fallback={null}><Datenschutz /></Suspense>} />
          <Route path="/agb" element={<Suspense fallback={null}><AGB /></Suspense>} />
          <Route path="/sitemap" element={<Suspense fallback={null}><Sitemap /></Suspense>} />
          <Route path="/faq" element={<Suspense fallback={null}><FAQ /></Suspense>} />
        </Routes>
        <CookieConsent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
