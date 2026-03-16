import React, { useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { StreakProvider } from './contexts/StreakContext';
import MainLayout from './components/MainLayout';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

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
const StructuredProgression = lazy(() => import('./pages/StructuredProgression'));
const AIInstruction = lazy(() => import('./pages/AIInstruction'));
const MultiDiscipline = lazy(() => import('./pages/MultiDiscipline'));
const EmailAssets = lazy(() => import('./pages/EmailAssets'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const BoxingOverview = lazy(() => import('./pages/BoxingOverview'));
const BoxingFoundations = lazy(() => import('./pages/BoxingFoundations'));
const BoxingWorkouts = lazy(() => import('./pages/BoxingWorkouts'));
const WorkoutSession = lazy(() => import('./pages/WorkoutSession'));
const FoundationLesson = lazy(() => import('./pages/FoundationLesson'));
const CombatCraft = lazy(() => import('./pages/CombatCraft'));
const ExploreDisciplines = lazy(() => import('./pages/ExploreDisciplines'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));

const PageFallback = () => (
  <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
    <div className="text-2xl text-[#A0A0A0] heading-font">LOADING...</div>
  </div>
);

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageFallback />}>{children}</Suspense>
);

type Page = 'Home' | 'Auth' | 'Disciplines' | 'Discipline' | 'Category' | 'Technique' | 'Dashboard' | 'News' | 'Merchandise' | 'Account' | 'PrivacyPolicy' | 'TermsOfService' | 'CookiePolicy' | 'Disclaimer' | 'Legal' | 'AboutUs' | 'Vision' | 'Contact' | 'Affiliates' | 'StructuredProgression' | 'AIInstruction' | 'MultiDiscipline' | 'BoxingOverview' | 'BoxingFoundations' | 'CombatCraft' | 'ExploreDisciplines' | 'HowItWorks';

interface NavSnapshot {
  page: Page;
  disciplineId?: string;
  categoryId?: string;
  techniqueId?: string;
}

interface NavigationState extends NavSnapshot {
  history: NavSnapshot[];
}

function AppContent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [navState, setNavState] = useState<NavigationState>({
    page: 'Home',
    history: [],
  });

  const handleNavigate = useCallback((page: Page, id?: string) => {
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
      'StructuredProgression': '/structured-progression',
      'AIInstruction': '/ai-instruction',
      'MultiDiscipline': '/multi-discipline',
      'BoxingFoundations': '/boxing/foundations',
      'CombatCraft': '/combat-craft',
      'ExploreDisciplines': '/explore-disciplines',
      'HowItWorks': '/how-it-works',
    };

    if (page === 'BoxingOverview' && id) {
      navigate(`/boxing/${id}`);
    } else if (page === 'Discipline' && id) {
      navigate(`/discipline/${id}`);
    } else if (page === 'Category' && id) {
      navigate(`/category/${id}`);
    } else if (page === 'Technique' && id) {
      navigate(`/technique/${id}`);
    } else if (routes[page]) {
      navigate(routes[page]);
    }

    setNavState((prev) => {
      const snapshot: NavSnapshot = {
        page: prev.page,
        disciplineId: prev.disciplineId,
        categoryId: prev.categoryId,
        techniqueId: prev.techniqueId,
      };

      const newState: NavigationState = {
        page,
        history: [...prev.history, snapshot],
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
  }, [navigate]);

  const goBack = useCallback(() => {
    window.scrollTo(0, 0);
    navigate(-1);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0] heading-font">LOADING...</div>
      </div>
    );
  }

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/email-assets" element={<S><EmailAssets /></S>} />
      <Route path="/post-verify" element={<S><PostVerify /></S>} />
      <Route path="/create-profile" element={<S><CreateProfile /></S>} />
      <Route path="/auth/callback" element={<S><AuthCallback /></S>} />
      <Route element={<S><MainLayout currentPage={navState.page} onNavigate={(page, id) => handleNavigate(page as Page, id)} /></S>}>
        <Route path="/" element={<S><Home onNavigate={(page) => handleNavigate(page as Page)} /></S>} />
        <Route path="/auth" element={<S><Auth onNavigate={(page) => handleNavigate(page as Page)} /></S>} />
        <Route path="/disciplines" element={<S><Disciplines onNavigate={(page, id) => handleNavigate(page as Page, id)} /></S>} />
        <Route path="/discipline/:id" element={<S><DisciplinePage onNavigate={(page, id) => handleNavigate(page as Page, id)} /></S>} />
        <Route path="/category/:id" element={<S><CategoryPage onNavigate={(page, id) => handleNavigate(page as Page, id)} /></S>} />
        <Route path="/technique/:id" element={<S><TechniquePage onNavigate={(page, id) => handleNavigate(page as Page, id)} onBack={goBack} /></S>} />
        <Route path="/dashboard" element={user ? <S><Dashboard onNavigate={(page) => handleNavigate(page as Page)} /></S> : <S><Auth onNavigate={(page) => handleNavigate(page as Page)} /></S>} />
        <Route path="/news" element={<S><News onBack={goBack} /></S>} />
        <Route path="/merchandise" element={<S><Merchandise onBack={goBack} /></S>} />
        <Route path="/account" element={user ? <S><Account onBack={goBack} /></S> : <S><Auth onNavigate={(page) => handleNavigate(page as Page)} /></S>} />
        <Route path="/privacy-policy" element={<S><PrivacyPolicy onBack={goBack} /></S>} />
        <Route path="/terms-of-service" element={<S><TermsOfService onBack={goBack} /></S>} />
        <Route path="/cookie-policy" element={<S><CookiePolicy onBack={goBack} /></S>} />
        <Route path="/disclaimer" element={<S><Disclaimer onBack={goBack} /></S>} />
        <Route path="/legal" element={<S><Legal onNavigate={(page) => handleNavigate(page as Page)} onBack={goBack} /></S>} />
        <Route path="/about-us" element={<S><AboutUs onNavigate={(page) => handleNavigate(page as Page)} onBack={goBack} /></S>} />
        <Route path="/vision" element={<S><Vision onBack={goBack} /></S>} />
        <Route path="/contact" element={<S><Contact onBack={goBack} /></S>} />
        <Route path="/affiliates" element={<S><Affiliates onBack={goBack} /></S>} />
        <Route path="/structured-progression" element={<S><StructuredProgression /></S>} />
        <Route path="/ai-instruction" element={<S><AIInstruction /></S>} />
        <Route path="/combat-craft" element={<S><CombatCraft /></S>} />
        <Route path="/explore-disciplines" element={<S><ExploreDisciplines /></S>} />
        <Route path="/how-it-works" element={<S><HowItWorks onBack={goBack} /></S>} />
        <Route path="/multi-discipline" element={<S><MultiDiscipline onNavigate={(page, id) => handleNavigate(page as Page, id)} /></S>} />
        <Route path="/boxing/foundations/lesson/:lessonId" element={<S><FoundationLesson /></S>} />
        <Route path="/boxing/foundations/level/:levelNumber" element={<S><BoxingFoundations /></S>} />
        <Route path="/boxing/foundations" element={<S><BoxingFoundations /></S>} />
        <Route path="/boxing-workouts" element={<S><BoxingWorkouts /></S>} />
        <Route path="/boxing-workouts/:sessionSlug" element={<S><WorkoutSession /></S>} />
        <Route path="/boxing/:disciplineId" element={<S><BoxingOverview onNavigate={(page, id) => handleNavigate(page as Page, id)} /></S>} />
      </Route>
    </Routes>
    </>
  );
}

function App() {
  const [showLoading, setShowLoading] = useState(() => !sessionStorage.getItem('cc_loading_shown'));

  const handleLoadingComplete = () => {
    sessionStorage.setItem('cc_loading_shown', 'true');
    setShowLoading(false);
  };

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <StreakProvider>
            <AppContent />
            {showLoading && (
              <LoadingScreen onComplete={handleLoadingComplete} />
            )}
          </StreakProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
