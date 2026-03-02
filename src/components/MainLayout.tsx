import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface MainLayoutProps {
  currentPage: string;
  onNavigate: (page: string, id?: string) => void;
}

export default function MainLayout({ currentPage, onNavigate }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#0E0E0E]">
      <Navigation currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-grow relative z-10 bg-[#0E0E0E]">
        <Outlet />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
