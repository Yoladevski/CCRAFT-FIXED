import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { StreakProvider } from './contexts/StreakContext';
import MainLayout from './components/MainLayout';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

const homeModule = import('./pages/Home');
const Home = lazy(() => homeModule);
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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <S><Auth /></S>;
}

function AppContent() {
  const { loading } = useAuth();

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
        <Route element={<S><MainLayout /></S>}>
          <Route path="/" element={<S><Home /></S>} />
          <Route path="/auth" element={<S><Auth /></S>} />
          <Route path="/signin" element={<S><Auth initialMode="signin" /></S>} />
          <Route path="/disciplines" element={<S><Disciplines /></S>} />
          <Route path="/discipline/:id" element={<S><DisciplinePage /></S>} />
          <Route path="/category/:id" element={<S><CategoryPage /></S>} />
          <Route path="/technique/:id" element={<S><TechniquePage /></S>} />
          <Route path="/dashboard" element={<ProtectedRoute><S><Dashboard /></S></ProtectedRoute>} />
          <Route path="/news" element={<S><News /></S>} />
          <Route path="/merchandise" element={<S><Merchandise /></S>} />
          <Route path="/account" element={<ProtectedRoute><S><Account /></S></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<S><PrivacyPolicy /></S>} />
          <Route path="/terms-of-service" element={<S><TermsOfService /></S>} />
          <Route path="/cookie-policy" element={<S><CookiePolicy /></S>} />
          <Route path="/disclaimer" element={<S><Disclaimer /></S>} />
          <Route path="/legal" element={<S><Legal /></S>} />
          <Route path="/about-us" element={<S><AboutUs /></S>} />
          <Route path="/vision" element={<S><Vision /></S>} />
          <Route path="/contact" element={<S><Contact /></S>} />
          <Route path="/affiliates" element={<S><Affiliates /></S>} />
          <Route path="/structured-progression" element={<S><StructuredProgression /></S>} />
          <Route path="/ai-instruction" element={<S><AIInstruction /></S>} />
          <Route path="/combat-craft" element={<S><CombatCraft /></S>} />
          <Route path="/explore-disciplines" element={<S><ExploreDisciplines /></S>} />
          <Route path="/how-it-works" element={<S><HowItWorks /></S>} />
          <Route path="/multi-discipline" element={<S><MultiDiscipline /></S>} />
          <Route path="/boxing/foundations/lesson/:lessonId" element={<S><FoundationLesson /></S>} />
          <Route path="/boxing/foundations/level/:levelNumber" element={<S><BoxingFoundations /></S>} />
          <Route path="/boxing/foundations" element={<S><BoxingFoundations /></S>} />
          <Route path="/boxing-workouts" element={<S><BoxingWorkouts /></S>} />
          <Route path="/boxing-workouts/:sessionSlug" element={<S><WorkoutSession /></S>} />
          <Route path="/boxing/:disciplineId" element={<S><BoxingOverview /></S>} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
