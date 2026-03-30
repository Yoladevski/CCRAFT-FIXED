import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const MainLayout = React.memo(function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#0E0E0E]">
      <Navigation />
      <main className="flex-grow relative z-0 main-grid">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
});

export default MainLayout;
