import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
const Merchandise = lazy(() => import('./pages/Merchandise'));
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
const PostVerify = lazy(() => import('./pages/PostVerify'));
const CreateProfile = lazy(() => import('./pages/CreateProfile'));

type Page = 'Home' | 'Auth' | 'Disciplines' | 'Discipline' | 'Category' | 'Technique' | 'Dashboard' | 'News' | 'Merchandise' | 'Account' | 'PrivacyPolicy' | 'TermsOfService' | 'CookiePolicy' | 'Disclaimer' | 'Legal' | 'AboutUs' | 'Vision' | 'Contact' | 'Affiliates';

interface NavigationState {
  page: Page;
  disciplineId?: string;
  categoryId?: string;
  techniqueId?: string;
  history: NavigationState[];
}

function AppContent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [navState, setNavState] = useState<NavigationState>({
    page: 'Home',
    history: [],
  });

  const handleNavigate = (page: Page, id?: string) => {
    window.scrollTo(0, 0);

    const routes: Record<string, string> = {
      'Home': '/',
      'Auth': '/auth',
      'Disciplines': '/disciplines',
      'Dashboard': '/dashboard',
      'News': '/news',
      'Merchandise': '/merchandise',
      'Account': '/account',
      'PrivacyPolicy': '/privacy-policy',
      'TermsOfService': '/terms-of-service',
      'CookiePolicy': '/cookie-policy',
      'Disclaimer': '/disclaimer',
      'Legal': '/legal',
      'AboutUs': '/about-us',
      'Vision': '/vision',
      'Contact': '/contact',
      'Affiliates': '/affiliates',
    };

    if (page === 'Discipline' && id) {
      navigate(`/discipline/${id}`);
    } else if (page === 'Category' && id) {
      navigate(`/category/${id}`);
    } else if (page === 'Technique' && id) {
      navigate(`/technique/${id}`);
    } else if (routes[page]) {
      navigate(routes[page]);
    }

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
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0] heading-font">LOADING...</div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0] heading-font">LOADING...</div>
      </div>
    }>
      <Routes>
        <Route path="/post-verify" element={<PostVerify />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="*" element={
          <div className="flex flex-col min-h-screen relative bg-[#0E0E0E]">
            <Navigation currentPage={navState.page} onNavigate={(page, id) => handleNavigate(page as Page, id)} />
            <main className="flex-grow relative z-10 bg-[#0E0E0E]">
              <Routes>
                <Route path="/" element={<Home onNavigate={(page) => handleNavigate(page as Page)} />} />
                <Route path="/auth" element={<Auth onNavigate={(page) => handleNavigate(page as Page)} />} />
                <Route path="/disciplines" element={<Disciplines onNavigate={(page, id) => handleNavigate(page as Page, id)} />} />
                <Route path="/discipline/:id" element={<DisciplinePage onNavigate={(page, id) => handleNavigate(page as Page, id)} />} />
                <Route path="/category/:id" element={<CategoryPage onNavigate={(page, id) => handleNavigate(page as Page, id)} />} />
                <Route path="/technique/:id" element={<TechniquePage onNavigate={(page) => handleNavigate(page as Page)} onBack={goBack} />} />
                <Route path="/dashboard" element={user ? <Dashboard onNavigate={(page) => handleNavigate(page as Page)} /> : <Auth onNavigate={(page) => handleNavigate(page as Page)} />} />
                <Route path="/news" element={<News onBack={goBack} />} />
                <Route path="/merchandise" element={<Merchandise onBack={goBack} />} />
                <Route path="/account" element={user ? <Account onBack={goBack} /> : <Auth onNavigate={(page) => handleNavigate(page as Page)} />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy onBack={goBack} />} />
                <Route path="/terms-of-service" element={<TermsOfService onBack={goBack} />} />
                <Route path="/cookie-policy" element={<CookiePolicy onBack={goBack} />} />
                <Route path="/disclaimer" element={<Disclaimer onBack={goBack} />} />
                <Route path="/legal" element={<Legal onNavigate={(page) => handleNavigate(page as Page)} onBack={goBack} />} />
                <Route path="/about-us" element={<AboutUs onNavigate={(page) => handleNavigate(page as Page)} onBack={goBack} />} />
                <Route path="/vision" element={<Vision onBack={goBack} />} />
                <Route path="/contact" element={<Contact onBack={goBack} />} />
                <Route path="/affiliates" element={<Affiliates onBack={goBack} />} />
              </Routes>
            </main>
            <Footer onNavigate={(page) => handleNavigate(page as Page)} />
          </div>
        } />
      </Routes>
    </Suspense>
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
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          {showLoading && !loadingComplete && (
            <LoadingScreen onComplete={handleLoadingComplete} />
          )}
          {loadingComplete && <AppContent />}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
