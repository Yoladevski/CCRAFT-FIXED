import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string, disciplineId?: string) => void;
}

const Navigation = React.memo(function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const handleNavigate = (page: string, id?: string) => {
    onNavigate(page, id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="hidden lg:flex items-center justify-start">
              <button
                onClick={() => handleNavigate('Home')}
                className="hover:opacity-80 transition-opacity"
              >
                <img src="https://i.postimg.cc/zBXKpsK9/xxlogo-removebg-preview.png" alt="COMBATCRAFT" className="h-12 w-auto max-w-[280px]" />
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-center space-x-5 py-[3px]">
              <button
                onClick={() => handleNavigate('Home')}
                className="nav-menu-item relative transition-all duration-300 pb-1"
              >
                HOME
                {currentPage === 'Home' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              {user && (
                <button
                  onClick={() => handleNavigate('Dashboard')}
                  className="nav-menu-item relative transition-all duration-300 pb-1"
                >
                  DASHBOARD
                  {currentPage === 'Dashboard' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              )}

              <button
                onClick={() => handleNavigate('Disciplines')}
                className="nav-menu-item relative transition-all duration-300 pb-1"
              >
                DISCIPLINES
                {(currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              <button
                onClick={() => handleNavigate('News')}
                className="nav-menu-item relative transition-all duration-300 pb-1"
              >
                NEWS
                {currentPage === 'News' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              <button
                onClick={() => handleNavigate('Merchandise')}
                className="nav-menu-item relative transition-all duration-300 pb-1"
              >
                MERCHANDISE
                {currentPage === 'Merchandise' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              {user ? (
                <button
                  onClick={() => handleNavigate('Account')}
                  className="nav-menu-item relative transition-all duration-300 pb-1 whitespace-nowrap"
                >
                  MY ACCOUNT
                  {currentPage === 'Account' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleNavigate('SignIn')}
                  className="px-5 py-2 bg-[#B11226] hover:bg-[#8B0E1C] transition-all whitespace-nowrap cursor-pointer text-white text-sm font-bold tracking-wider flex items-center justify-center"
                >
                  SIGN IN
                </button>
              )}
            </div>

            <div className="hidden lg:flex items-center justify-end">
              <LanguageSelector />
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
                  onClick={() => handleNavigate('Home')}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="https://i.postimg.cc/zBXKpsK9/xxlogo-removebg-preview.png" alt="COMBATCRAFT" className="h-11 w-auto max-w-[143px]" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-2">
                {!user && (
                  <button
                    onClick={() => handleNavigate('SignIn')}
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
            onClick={() => handleNavigate('Home')}
            className="hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img src="https://i.postimg.cc/zBXKpsK9/xxlogo-removebg-preview.png" alt="COMBATCRAFT" className="h-12 w-auto max-w-[280px] object-contain" />
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
            onClick={() => handleNavigate('Home')}
            className={`text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'Home'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
            }`}
            style={{
              fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textShadow: '0 0 6px rgba(255, 0, 0, 0.6)',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'Home') {
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'Home') {
                e.currentTarget.style.color = '#A0A0A0';
              }
            }}
          >
            HOME
          </button>

          {user && (
            <button
              onClick={() => handleNavigate('Dashboard')}
              className={`text-left text-xl py-4 px-4 rounded transition-all ${
                currentPage === 'Dashboard'
                  ? 'bg-[#B11226] text-white'
                  : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
              style={{
                fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 'Dashboard') {
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 'Dashboard') {
                  e.currentTarget.style.color = '#A0A0A0';
                }
              }}
            >
              DASHBOARD
            </button>
          )}

          <button
            onClick={() => handleNavigate('Disciplines')}
            className={`text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
            }`}
            style={{
              fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textShadow: '0 0 6px rgba(255, 0, 0, 0.6)',
            }}
            onMouseEnter={(e) => {
              const isActive = currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique';
              if (!isActive) {
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              const isActive = currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique';
              if (!isActive) {
                e.currentTarget.style.color = '#A0A0A0';
              }
            }}
          >
            DISCIPLINES
          </button>

          <button
            onClick={() => handleNavigate('News')}
            className={`text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'News'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
            }`}
            style={{
              fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textShadow: '0 0 6px rgba(255, 0, 0, 0.6)',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'News') {
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'News') {
                e.currentTarget.style.color = '#A0A0A0';
              }
            }}
          >
            NEWS
          </button>

          <button
            onClick={() => handleNavigate('Merchandise')}
            className={`text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'Merchandise'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
            }`}
            style={{
              fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              textShadow: '0 0 6px rgba(255, 0, 0, 0.6)',
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'Merchandise') {
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'Merchandise') {
                e.currentTarget.style.color = '#A0A0A0';
              }
            }}
          >
            MERCHANDISE
          </button>

          {user ? (
            <button
              onClick={() => handleNavigate('Account')}
              className={`text-left text-xl py-4 px-4 rounded transition-all ${
                currentPage === 'Account'
                  ? 'bg-[#B11226] text-white'
                  : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
              style={{
                fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 'Account') {
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 'Account') {
                  e.currentTarget.style.color = '#A0A0A0';
                }
              }}
            >
              MY ACCOUNT
            </button>
          ) : (
            <button
              onClick={() => handleNavigate('SignIn')}
              className="w-full text-center text-xl py-4 px-4 rounded bg-[#B11226] hover:bg-[#8B0E1C] transition-all"
              style={{
                fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                textShadow: '0 0 6px rgba(255, 0, 0, 0.6)',
              }}
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
