import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import { NavMenuItem } from './NavMenuItem';
import { MobileNavMenuItem } from './MobileNavMenuItem';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string, disciplineId?: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
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

            <div className="hidden lg:flex items-center justify-center space-x-8">
              <NavMenuItem onClick={() => handleNavigate('Home')} isActive={currentPage === 'Home'}>
                HOME
              </NavMenuItem>

              {user && (
                <NavMenuItem onClick={() => handleNavigate('Dashboard')} isActive={currentPage === 'Dashboard'}>
                  DASHBOARD
                </NavMenuItem>
              )}

              <NavMenuItem
                onClick={() => handleNavigate('Disciplines')}
                isActive={currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique'}
              >
                DISCIPLINES
              </NavMenuItem>

              <NavMenuItem onClick={() => handleNavigate('News')} isActive={currentPage === 'News'}>
                NEWS
              </NavMenuItem>

              <NavMenuItem onClick={() => handleNavigate('Merchandise')} isActive={currentPage === 'Merchandise'}>
                MERCHANDISE
              </NavMenuItem>

              {user ? (
                <NavMenuItem onClick={() => handleNavigate('Account')} isActive={currentPage === 'Account'}>
                  MY ACCOUNT
                </NavMenuItem>
              ) : (
                <button
                  onClick={() => handleNavigate('Auth')}
                  className="px-4 py-2 bg-[#B11226] rounded hover:bg-[#8B0E1C] transition-all whitespace-nowrap"
                  style={{
                    fontSize: '18px',
                    fontFamily: 'Orbitron, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '5px',
                    color: '#FFFFFF'
                  }}
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

              <div className="flex items-center justify-end scale-110">
                <LanguageSelector compact />
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
          <MobileNavMenuItem onClick={() => handleNavigate('Home')} isActive={currentPage === 'Home'}>
            HOME
          </MobileNavMenuItem>

          {user && (
            <MobileNavMenuItem onClick={() => handleNavigate('Dashboard')} isActive={currentPage === 'Dashboard'}>
              DASHBOARD
            </MobileNavMenuItem>
          )}

          <MobileNavMenuItem
            onClick={() => handleNavigate('Disciplines')}
            isActive={currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique'}
          >
            DISCIPLINES
          </MobileNavMenuItem>

          <MobileNavMenuItem onClick={() => handleNavigate('News')} isActive={currentPage === 'News'}>
            NEWS
          </MobileNavMenuItem>

          <MobileNavMenuItem onClick={() => handleNavigate('Merchandise')} isActive={currentPage === 'Merchandise'}>
            MERCHANDISE
          </MobileNavMenuItem>

          {user ? (
            <MobileNavMenuItem onClick={() => handleNavigate('Account')} isActive={currentPage === 'Account'}>
              MY ACCOUNT
            </MobileNavMenuItem>
          ) : (
            <button
              onClick={() => handleNavigate('Auth')}
              className="w-full text-center text-xl py-4 px-4 rounded bg-[#B11226] hover:bg-[#8B0E1C] transition-all"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '5px',
                fontSize: '18px',
                color: '#FFFFFF'
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
}
