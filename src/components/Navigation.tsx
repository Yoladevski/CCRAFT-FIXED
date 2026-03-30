import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import UserMenuDropdown from './UserMenuDropdown';

const Navigation = React.memo(function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const pathname = location.pathname;
  const isHome = pathname === '/';
  const isDashboard = pathname === '/dashboard';
  const isDisciplines = pathname.startsWith('/discipline') || pathname === '/disciplines';
  const isNews = pathname === '/news';
  const isMerchandise = pathname === '/merchandise';
  const isAccount = pathname === '/account';

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="hidden lg:flex items-center justify-start">
              <button
                onClick={() => handleNavigate('/')}
                className="hover:opacity-80 transition-opacity"
              >
                <img src="https://i.postimg.cc/zBXKpsK9/xxlogo-removebg-preview.png" alt="COMBATCRAFT" className="h-[62px] w-auto max-w-[365px]" />
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-center space-x-5 py-[3px]">
              <button
                onClick={() => handleNavigate('/')}
                className="nav-menu-item relative transition-all duration-300 pb-1"
              >
                HOME
                {isHome && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              {user && (
                <button
                  onClick={() => handleNavigate('/dashboard')}
                  className="nav-menu-item relative transition-all duration-300 pb-1"
                >
                  DASHBOARD
                  {isDashboard && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              )}

              <button
                onClick={() => handleNavigate('/disciplines')}
                className="nav-menu-item relative transition-all duration-300 pb-1"
              >
                DISCIPLINES
                {isDisciplines && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              <button
                onClick={() => handleNavigate('/news')}
                className="nav-menu-item relative transition-all duration-300 pb-1"
              >
                NEWS
                {isNews && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              <button
                onClick={() => handleNavigate('/merchandise')}
                className="nav-menu-item relative transition-all duration-300 pb-1"
              >
                MERCHANDISE
                {isMerchandise && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              {user ? (
                <button
                  onClick={() => handleNavigate('/account')}
                  className="nav-menu-item relative transition-all duration-300 pb-1 whitespace-nowrap"
                >
                  MY ACCOUNT
                  {isAccount && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleNavigate('/signin')}
                  className="px-5 py-2 bg-[#B11226] hover:bg-[#8B0E1C] transition-all whitespace-nowrap cursor-pointer text-white text-sm font-bold tracking-wider flex items-center justify-center"
                >
                  SIGN IN
                </button>
              )}
            </div>

            <div className="hidden lg:flex items-center justify-end gap-3">
              <LanguageSelector />
              {user && <UserMenuDropdown />}
            </div>

            <div className="lg:hidden grid grid-cols-[auto_1fr_auto] items-center w-full">
              <div className="flex items-center justify-start pl-2">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:text-[#B11226] transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={31} /> : <Menu size={31} />}
                </button>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleNavigate('/')}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="https://i.postimg.cc/zBXKpsK9/xxlogo-removebg-preview.png" alt="COMBATCRAFT" className="h-[57px] w-auto max-w-[186px]" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 pr-1">
                {user ? (
                  <UserMenuDropdown onNavigate={() => setIsMobileMenuOpen(false)} />
                ) : (
                  <button
                    onClick={() => handleNavigate('/signin')}
                    className="px-3 py-1.5 bg-[#B11226] hover:bg-[#8B0E1C] transition-all text-white text-[10px] font-bold whitespace-nowrap"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    SIGN IN
                  </button>
                )}
                <div className="scale-110">
                  <LanguageSelector compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 w-full sm:w-96 bg-black z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-[#2E2E2E] overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#2E2E2E]">
          <button
            onClick={() => handleNavigate('/')}
            className="hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img src="https://i.postimg.cc/zBXKpsK9/xxlogo-removebg-preview.png" alt="COMBATCRAFT" className="h-[62px] w-auto max-w-[365px] object-contain" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-[#B11226] transition-colors p-2 flex-shrink-0"
          >
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-2">
          <button
            onClick={() => handleNavigate('/')}
            className={`nav-mobile-item text-left text-xl py-4 px-4 rounded transition-all ${isHome ? 'active bg-[#B11226]' : 'hover:bg-[#2E2E2E]'}`}
            style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textShadow: '0 0 6px rgba(255, 0, 0, 0.6)' }}
          >
            HOME
          </button>

          {user && (
            <button
              onClick={() => handleNavigate('/dashboard')}
              className={`nav-mobile-item text-left text-xl py-4 px-4 rounded transition-all ${isDashboard ? 'active bg-[#B11226]' : 'hover:bg-[#2E2E2E]'}`}
              style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              DASHBOARD
            </button>
          )}

          <button
            onClick={() => handleNavigate('/disciplines')}
            className={`nav-mobile-item text-left text-xl py-4 px-4 rounded transition-all ${isDisciplines ? 'active bg-[#B11226]' : 'hover:bg-[#2E2E2E]'}`}
            style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textShadow: '0 0 6px rgba(255, 0, 0, 0.6)' }}
          >
            DISCIPLINES
          </button>

          <button
            onClick={() => handleNavigate('/news')}
            className={`nav-mobile-item text-left text-xl py-4 px-4 rounded transition-all ${isNews ? 'active bg-[#B11226]' : 'hover:bg-[#2E2E2E]'}`}
            style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textShadow: '0 0 6px rgba(255, 0, 0, 0.6)' }}
          >
            NEWS
          </button>

          <button
            onClick={() => handleNavigate('/merchandise')}
            className={`nav-mobile-item text-left text-xl py-4 px-4 rounded transition-all ${isMerchandise ? 'active bg-[#B11226]' : 'hover:bg-[#2E2E2E]'}`}
            style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textShadow: '0 0 6px rgba(255, 0, 0, 0.6)' }}
          >
            MERCHANDISE
          </button>

          {user ? (
            <button
              onClick={() => handleNavigate('/account')}
              className={`nav-mobile-item text-left text-xl py-4 px-4 rounded transition-all ${isAccount ? 'active bg-[#B11226]' : 'hover:bg-[#2E2E2E]'}`}
              style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              MY ACCOUNT
            </button>
          ) : (
            <button
              onClick={() => handleNavigate('/signin')}
              className="w-full text-center text-xl py-4 px-4 rounded bg-[#B11226] hover:bg-[#8B0E1C] transition-all text-white"
              style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', textShadow: '0 0 6px rgba(255, 0, 0, 0.6)' }}
            >
              SIGN IN
            </button>
          )}
        </div>
      </div>

      <div className="h-16" />
    </>
  );
});

export default Navigation;
