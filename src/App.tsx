import { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const Auth = lazy(() => import('./pages/Auth'));
const Disciplines = lazy(() => import('./pages/Disciplines'));
const DisciplinePage = lazy(() => import('./pages/DisciplinePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const TechniquePage = lazy(() => import('./pages/TechniquePage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const News = lazy(() => import('./pages/News'));
const Account = lazy(() => import('./pages/Account'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Legal = lazy(() => import('./pages/Legal'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Vision = lazy(() => import('./pages/Vision'));
const Contact = lazy(() => import('./pages/Contact'));
const Affiliates = lazy(() => import('./pages/Affiliates'));

type Page = 'Home' | 'Auth' | 'Disciplines' | 'Discipline' | 'Category' | 'Technique' | 'Dashboard' | 'News' | 'Account' | 'PrivacyPolicy' | 'TermsOfService' | 'CookiePolicy' | 'Disclaimer' | 'Legal' | 'AboutUs' | 'Vision' | 'Contact' | 'Affiliates';

interface NavigationState {
  page: Page;
  disciplineId?: string;
  categoryId?: string;
  techniqueId?: string;
  history: NavigationState[];
}

function AppContent() {
  const { user, loading } = useAuth();
  const [navState, setNavState] = useState<NavigationState>({
    page: 'Home',
    history: [],
  });

  const navigate = (page: Page, id?: string) => {
    window.scrollTo(0, 0);
    setNavState((prev) => {
      const newState: NavigationState = {
        page,
        history: [...prev.history, { ...prev }],
      };

      if (page === 'Discipline') {
        newState.disciplineId = id;
      } else if (page === 'Category') {
        newState.categoryId = id;
        newState.disciplineId = prev.disciplineId;
      } else if (page === 'Technique') {
        newState.techniqueId = id;
        newState.categoryId = prev.categoryId;
        newState.disciplineId = prev.disciplineId;
      }

      return newState;
    });
  };

  const goBack = () => {
    window.scrollTo(0, 0);
    setNavState((prev) => {
      if (prev.history.length === 0) {
        return { page: 'Home', history: [] };
      }
      const previous = prev.history[prev.history.length - 1];
      return {
        ...previous,
        history: prev.history.slice(0, -1),
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0] heading-font">LOADING...</div>
      </div>
    );
  }

  if (!user && navState.page !== 'Home') {
    return (
      <div className="flex flex-col min-h-screen bg-[#0E0E0E]">
        <Navigation currentPage="Home" onNavigate={(page, id) => navigate(page as Page, id)} />
        <Suspense fallback={
          <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
            <div className="text-2xl text-[#A0A0A0] heading-font">LOADING...</div>
          </div>
        }>
          <Auth onNavigate={(page) => navigate(page as Page)} />
        </Suspense>
        <Footer onNavigate={(page) => navigate(page as Page)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#0E0E0E]">
      <Navigation currentPage={navState.page} onNavigate={(page, id) => navigate(page as Page, id)} />

      <main className="flex-grow relative z-10 bg-[#0E0E0E]">
        <Suspense fallback={
          <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
            <div className="text-2xl text-[#A0A0A0] heading-font">LOADING...</div>
          </div>
        }>
          {navState.page === 'Home' && <Home onNavigate={(page) => navigate(page as Page)} />}

          {navState.page === 'Disciplines' && (
            <Disciplines onNavigate={(page, id) => navigate(page as Page, id)} />
          )}

          {navState.page === 'Discipline' && navState.disciplineId && (
            <DisciplinePage
              disciplineId={navState.disciplineId}
              onNavigate={(page, id) => navigate(page as Page, id)}
            />
          )}

          {navState.page === 'Category' && navState.categoryId && (
            <CategoryPage
              categoryId={navState.categoryId}
              onNavigate={(page, id) => navigate(page as Page, id)}
            />
          )}

          {navState.page === 'Technique' && navState.techniqueId && (
            <TechniquePage
              techniqueId={navState.techniqueId}
              onNavigate={(page) => navigate(page as Page)}
              onBack={goBack}
            />
          )}

          {navState.page === 'Dashboard' && user && (
            <Dashboard onNavigate={(page) => navigate(page as Page)} />
          )}

          {navState.page === 'News' && <News onBack={goBack} />}

          {navState.page === 'Account' && user && <Account onBack={goBack} />}

          {navState.page === 'PrivacyPolicy' && <PrivacyPolicy onBack={goBack} />}

          {navState.page === 'TermsOfService' && <TermsOfService onBack={goBack} />}

          {navState.page === 'CookiePolicy' && <CookiePolicy onBack={goBack} />}

          {navState.page === 'Disclaimer' && <Disclaimer onBack={goBack} />}

          {navState.page === 'Legal' && <Legal onNavigate={(page) => navigate(page as Page)} onBack={goBack} />}

          {navState.page === 'AboutUs' && <AboutUs onNavigate={(page) => navigate(page as Page)} onBack={goBack} />}

          {navState.page === 'Vision' && <Vision onBack={goBack} />}

          {navState.page === 'Contact' && <Contact onBack={goBack} />}

          {navState.page === 'Affiliates' && <Affiliates onBack={goBack} />}
        </Suspense>
      </main>

      <Footer onNavigate={(page) => navigate(page as Page)} />
    </div>
  );
}

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const hasShownLoading = sessionStorage.getItem('cc_loading_shown');
    if (hasShownLoading) {
      setShowLoading(false);
      setLoadingComplete(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('cc_loading_shown', 'true');
    setLoadingComplete(true);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {showLoading && !loadingComplete && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
        {loadingComplete && <AppContent />}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
