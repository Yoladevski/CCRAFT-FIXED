import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface MainLayoutProps {
  currentPage: string;
  onNavigate: (page: string, id?: string) => void;
}

const MainLayout = React.memo(function MainLayout({ currentPage, onNavigate }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#0E0E0E]">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url(https://api.combatcraft.co.uk/storage/v1/object/public/images/runnn.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          opacity: 0.07,
        }}
      />
      <Navigation currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
});

export default MainLayout;
