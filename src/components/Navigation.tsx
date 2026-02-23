import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';

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
              <button
                onClick={() => handleNavigate('Home')}
                className={`button-text relative transition-colors pb-1 ${
                  currentPage === 'Home' ? 'text-white' : 'text-[#A0A0A0]'
                }`}
                style={{
                  fontSize: '0.9rem',
                  fontFamily: 'LatoBlack, sans-serif',
                  WebkitTextStroke: currentPage === 'Home' ? '0px' : '0px',
                  textStroke: currentPage === 'Home' ? '0px' : '0px'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 'Home') {
                    e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                    e.currentTarget.style.textStroke = '1.5px #B11226';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 'Home') {
                    e.currentTarget.style.WebkitTextStroke = '0px';
                    e.currentTarget.style.textStroke = '0px';
                    e.currentTarget.style.color = '#A0A0A0';
                  }
                }}
              >
                HOME
                {currentPage === 'Home' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              {user && (
                <button
                  onClick={() => handleNavigate('Dashboard')}
                  className={`button-text relative transition-colors pb-1 ${
                    currentPage === 'Dashboard' ? 'text-white' : 'text-[#A0A0A0]'
                  }`}
                  style={{
                    fontSize: '0.9rem',
                    fontFamily: 'LatoBlack, sans-serif',
                    WebkitTextStroke: '0px',
                    textStroke: '0px'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 'Dashboard') {
                      e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                      e.currentTarget.style.textStroke = '1.5px #B11226';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== 'Dashboard') {
                      e.currentTarget.style.WebkitTextStroke = '0px';
                      e.currentTarget.style.textStroke = '0px';
                      e.currentTarget.style.color = '#A0A0A0';
                    }
                  }}
                >
                  DASHBOARD
                  {currentPage === 'Dashboard' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              )}

              <button
                onClick={() => handleNavigate('Disciplines')}
                className={`button-text relative transition-colors pb-1 ${
                  currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique'
                    ? 'text-white'
                    : 'text-[#A0A0A0]'
                }`}
                style={{
                  fontSize: '0.9rem',
                  fontFamily: 'LatoBlack, sans-serif',
                  WebkitTextStroke: '0px',
                  textStroke: '0px'
                }}
                onMouseEnter={(e) => {
                  const isActive = currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique';
                  if (!isActive) {
                    e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                    e.currentTarget.style.textStroke = '1.5px #B11226';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  const isActive = currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique';
                  if (!isActive) {
                    e.currentTarget.style.WebkitTextStroke = '0px';
                    e.currentTarget.style.textStroke = '0px';
                    e.currentTarget.style.color = '#A0A0A0';
                  }
                }}
              >
                DISCIPLINES
                {(currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique') && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              <button
                onClick={() => handleNavigate('News')}
                className={`button-text relative transition-colors pb-1 ${
                  currentPage === 'News' ? 'text-white' : 'text-[#A0A0A0]'
                }`}
                style={{
                  fontSize: '0.9rem',
                  fontFamily: 'LatoBlack, sans-serif',
                  WebkitTextStroke: '0px',
                  textStroke: '0px'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 'News') {
                    e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                    e.currentTarget.style.textStroke = '1.5px #B11226';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 'News') {
                    e.currentTarget.style.WebkitTextStroke = '0px';
                    e.currentTarget.style.textStroke = '0px';
                    e.currentTarget.style.color = '#A0A0A0';
                  }
                }}
              >
                NEWS
                {currentPage === 'News' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              <button
                onClick={() => handleNavigate('Merchandise')}
                className={`button-text relative transition-colors pb-1 ${
                  currentPage === 'Merchandise' ? 'text-white' : 'text-[#A0A0A0]'
                }`}
                style={{
                  fontSize: '0.9rem',
                  fontFamily: 'LatoBlack, sans-serif',
                  WebkitTextStroke: '0px',
                  textStroke: '0px'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 'Merchandise') {
                    e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                    e.currentTarget.style.textStroke = '1.5px #B11226';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 'Merchandise') {
                    e.currentTarget.style.WebkitTextStroke = '0px';
                    e.currentTarget.style.textStroke = '0px';
                    e.currentTarget.style.color = '#A0A0A0';
                  }
                }}
              >
                MERCHANDISE
                {currentPage === 'Merchandise' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              {user ? (
                <button
                  onClick={() => handleNavigate('Account')}
                  className={`button-text relative transition-colors pb-1 whitespace-nowrap ${
                    currentPage === 'Account' ? 'text-white' : 'text-[#A0A0A0]'
                  }`}
                  style={{
                    fontSize: '0.9rem',
                    fontFamily: 'LatoBlack, sans-serif',
                    WebkitTextStroke: '0px',
                    textStroke: '0px'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 'Account') {
                      e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                      e.currentTarget.style.textStroke = '1.5px #B11226';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== 'Account') {
                      e.currentTarget.style.WebkitTextStroke = '0px';
                      e.currentTarget.style.textStroke = '0px';
                      e.currentTarget.style.color = '#A0A0A0';
                    }
                  }}
                >
                  MY ACCOUNT
                  {currentPage === 'Account' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleNavigate('Auth')}
                  className="button-text px-4 py-2 bg-[#B11226] rounded hover:bg-[#8B0E1C] transition-all whitespace-nowrap"
                  style={{ fontSize: '0.9rem', WebkitTextStroke: '0px', textStroke: '0px' }}
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
          <button
            onClick={() => handleNavigate('Home')}
            className={`button-text text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'Home'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
            }`}
            style={{
              WebkitTextStroke: '0px',
              textStroke: '0px'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'Home') {
                e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                e.currentTarget.style.textStroke = '1.5px #B11226';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'Home') {
                e.currentTarget.style.WebkitTextStroke = '0px';
                e.currentTarget.style.textStroke = '0px';
                e.currentTarget.style.color = '#A0A0A0';
              }
            }}
          >
            HOME
          </button>

          {user && (
            <button
              onClick={() => handleNavigate('Dashboard')}
              className={`button-text text-left text-xl py-4 px-4 rounded transition-all ${
                currentPage === 'Dashboard'
                  ? 'bg-[#B11226] text-white'
                  : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
              style={{
                WebkitTextStroke: '0px',
                textStroke: '0px'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 'Dashboard') {
                  e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                  e.currentTarget.style.textStroke = '1.5px #B11226';
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 'Dashboard') {
                  e.currentTarget.style.WebkitTextStroke = '0px';
                  e.currentTarget.style.textStroke = '0px';
                  e.currentTarget.style.color = '#A0A0A0';
                }
              }}
            >
              DASHBOARD
            </button>
          )}

          <button
            onClick={() => handleNavigate('Disciplines')}
            className={`button-text text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
            }`}
            style={{
              WebkitTextStroke: '0px',
              textStroke: '0px'
            }}
            onMouseEnter={(e) => {
              const isActive = currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique';
              if (!isActive) {
                e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                e.currentTarget.style.textStroke = '1.5px #B11226';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              const isActive = currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique';
              if (!isActive) {
                e.currentTarget.style.WebkitTextStroke = '0px';
                e.currentTarget.style.textStroke = '0px';
                e.currentTarget.style.color = '#A0A0A0';
              }
            }}
          >
            DISCIPLINES
          </button>

          <button
            onClick={() => handleNavigate('News')}
            className={`button-text text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'News'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
            }`}
            style={{
              WebkitTextStroke: '0px',
              textStroke: '0px'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'News') {
                e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                e.currentTarget.style.textStroke = '1.5px #B11226';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'News') {
                e.currentTarget.style.WebkitTextStroke = '0px';
                e.currentTarget.style.textStroke = '0px';
                e.currentTarget.style.color = '#A0A0A0';
              }
            }}
          >
            NEWS
          </button>

          <button
            onClick={() => handleNavigate('Merchandise')}
            className={`button-text text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'Merchandise'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
            }`}
            style={{
              WebkitTextStroke: '0px',
              textStroke: '0px'
            }}
            onMouseEnter={(e) => {
              if (currentPage !== 'Merchandise') {
                e.currentTarget.style.WebkitTextStroke = '1.5px #B11226';
                e.currentTarget.style.textStroke = '1.5px #B11226';
                e.currentTarget.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 'Merchandise') {
                e.currentTarget.style.WebkitTextStroke = '0px';
                e.currentTarget.style.textStroke = '0px';
                e.currentTarget.style.color = '#A0A0A0';
              }
            }}
          >
            MERCHANDISE
          </button>

          {user ? (
            <button
              onClick={() => handleNavigate('Account')}
              className={`text-left text-xl py-4 px-4 rounded transition-all font-bold ${
                currentPage === 'Account'
                  ? 'bg-[#B11226] text-white'
                  : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
              }`}
              style={{
                WebkitTextStroke: '0px',
                textStroke: '0px'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 'Account') {
                  e.currentTarget.style.WebkitTextStroke = '1.5px black';
                  e.currentTarget.style.textStroke = '1.5px black';
                  e.currentTarget.style.color = '#B11226';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 'Account') {
                  e.currentTarget.style.WebkitTextStroke = '0px';
                  e.currentTarget.style.textStroke = '0px';
                  e.currentTarget.style.color = '#A0A0A0';
                }
              }}
            >
              MY ACCOUNT
            </button>
          ) : (
            <button
              onClick={() => handleNavigate('Auth')}
              className="button-text w-full text-center text-xl py-4 px-4 rounded bg-[#B11226] hover:bg-[#8B0E1C] transition-all"
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
