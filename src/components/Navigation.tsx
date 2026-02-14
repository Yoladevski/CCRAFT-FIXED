import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string, disciplineId?: string) => void;
}

const disciplines = [
  {
    id: 'boxing',
    name: 'Boxing',
    isActive: true,
    categories: [
      { id: 'attacks', name: 'Attacks' },
      { id: 'defence', name: 'Defence' },
      { id: 'footwork', name: 'Footwork' },
      { id: 'combos', name: 'Combos' }
    ]
  },
  {
    id: 'muay-thai',
    name: 'Muay Thai',
    isActive: false,
    categories: [
      { id: 'attacks', name: 'Attacks' },
      { id: 'defence', name: 'Defence' },
      { id: 'footwork', name: 'Footwork' },
      { id: 'combos', name: 'Combos' }
    ]
  },
  {
    id: 'bjj',
    name: 'BJJ',
    isActive: false,
    categories: [
      { id: 'positions', name: 'Positions' },
      { id: 'submissions', name: 'Submissions' },
      { id: 'escapes', name: 'Escapes' },
      { id: 'transitions', name: 'Transitions' }
    ]
  },
  {
    id: 'kickboxing',
    name: 'Kickboxing',
    isActive: false,
    categories: [
      { id: 'attacks', name: 'Attacks' },
      { id: 'defence', name: 'Defence' },
      { id: 'footwork', name: 'Footwork' },
      { id: 'combos', name: 'Combos' }
    ]
  },
  {
    id: 'karate',
    name: 'Karate',
    isActive: false,
    categories: [
      { id: 'kihon', name: 'Kihon' },
      { id: 'kata', name: 'Kata' },
      { id: 'kumite', name: 'Kumite' }
    ]
  },
  {
    id: 'taekwondo',
    name: 'Taekwondo',
    isActive: false,
    categories: [
      { id: 'kicks', name: 'Kicks' },
      { id: 'poomsae', name: 'Poomsae' },
      { id: 'sparring', name: 'Sparring' }
    ]
  },
  {
    id: 'judo',
    name: 'Judo',
    isActive: false,
    categories: [
      { id: 'throws', name: 'Throws' },
      { id: 'groundwork', name: 'Groundwork' },
      { id: 'pins', name: 'Pins' }
    ]
  },
];

const newsCategories = [
  { id: 'all', name: 'All News' },
  { id: 'boxing', name: 'Boxing' },
  { id: 'muay-thai', name: 'Muay Thai' },
  { id: 'bjj', name: 'BJJ' },
];

const legalItems = [
  { id: 'privacy', name: 'Privacy Policy' },
  { id: 'terms', name: 'Terms of Service' },
  { id: 'cookies', name: 'Cookie Policy' },
  { id: 'disclaimer', name: 'Disclaimer' },
];

const companyItems = [
  { id: 'about', name: 'About Us' },
  { id: 'vision', name: 'Vision' },
  { id: 'contact', name: 'Contact' },
  { id: 'affiliates', name: 'Affiliates' },
];

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [disciplinesDropdownOpen, setDisciplinesDropdownOpen] = useState(false);
  const [mobileDisciplinesOpen, setMobileDisciplinesOpen] = useState(false);
  const [hoveredDiscipline, setHoveredDiscipline] = useState<string | null>(null);
  const [expandedMobileDiscipline, setExpandedMobileDiscipline] = useState<string | null>(null);
  const { user } = useAuth();

  const mainNavItems = user
    ? [{ name: 'Home', page: 'Home' }, { name: 'Dashboard', page: 'Dashboard' }]
    : [{ name: 'Home', page: 'Home' }];

  const handleNavigate = (page: string, id?: string) => {
    onNavigate(page, id);
    setIsMobileMenuOpen(false);
    setMobileDisciplinesOpen(false);
    setDisciplinesDropdownOpen(false);
    setHoveredDiscipline(null);
    setExpandedMobileDiscipline(null);
  };

  const handleCategoryClick = (disciplineId: string, categoryId: string) => {
    onNavigate('Category', `${disciplineId}-${categoryId}`);
    setIsMobileMenuOpen(false);
    setMobileDisciplinesOpen(false);
    setDisciplinesDropdownOpen(false);
    setHoveredDiscipline(null);
    setExpandedMobileDiscipline(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0E0E0E] border-b border-[#2E2E2E]">
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

            <div className="hidden lg:flex items-center justify-center space-x-6">
              <button
                onClick={() => handleNavigate('Home')}
                className={`relative text-lg font-bold hover:text-[#B11226] transition-colors pb-1 ${
                  currentPage === 'Home' ? 'text-white' : 'text-[#A0A0A0]'
                }`}
              >
                HOME
                {currentPage === 'Home' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              {user && (
                <button
                  onClick={() => handleNavigate('Dashboard')}
                  className={`relative text-lg font-bold hover:text-[#B11226] transition-colors pb-1 ${
                    currentPage === 'Dashboard' ? 'text-white' : 'text-[#A0A0A0]'
                  }`}
                >
                  DASHBOARD
                  {currentPage === 'Dashboard' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              )}

              {user ? (
                <>
                  <div className="relative">
                    <button
                      onMouseEnter={() => setDisciplinesDropdownOpen(true)}
                      onMouseLeave={() => {
                        setDisciplinesDropdownOpen(false);
                        setHoveredDiscipline(null);
                      }}
                      onClick={() => handleNavigate('Disciplines')}
                      className={`relative flex items-center gap-1 text-lg font-bold hover:text-[#B11226] transition-colors pb-1 ${
                        currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique'
                          ? 'text-white'
                          : 'text-[#A0A0A0]'
                      }`}
                    >
                      DISCIPLINES
                      <ChevronDown size={18} />
                      {(currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique') && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                      )}
                    </button>

                    {disciplinesDropdownOpen && (
                      <div
                        onMouseEnter={() => setDisciplinesDropdownOpen(true)}
                        onMouseLeave={() => {
                          setDisciplinesDropdownOpen(false);
                          setHoveredDiscipline(null);
                        }}
                        className="absolute top-full left-0 pt-2 w-56 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg shadow-xl pb-2 animate-fade-in"
                        style={{ marginTop: '-8px', paddingTop: '10px' }}
                      >
                        {disciplines.map((discipline) => (
                          <div
                            key={discipline.id}
                            className="relative"
                            onMouseEnter={() => discipline.isActive && setHoveredDiscipline(discipline.id)}
                            onMouseLeave={() => setHoveredDiscipline(null)}
                          >
                            <button
                              onClick={() => discipline.isActive && handleNavigate('Discipline', discipline.id)}
                              disabled={!discipline.isActive}
                              className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                                discipline.isActive
                                  ? 'hover:bg-[#2E2E2E] text-white cursor-pointer'
                                  : 'text-[#A0A0A0] cursor-not-allowed opacity-60'
                              }`}
                            >
                              <span className="text-body">{discipline.name}</span>
                              <div className="flex items-center gap-2">
                                {!discipline.isActive && <Lock size={16} />}
                                {discipline.isActive && <ChevronRight size={16} />}
                              </div>
                            </button>

                            {hoveredDiscipline === discipline.id && discipline.isActive && (
                              <div
                                className="absolute left-full top-0 w-48 bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg shadow-xl py-2 animate-fade-in"
                                style={{ marginLeft: '-2px' }}
                                onMouseEnter={() => setHoveredDiscipline(discipline.id)}
                                onMouseLeave={() => setHoveredDiscipline(null)}
                              >
                                {discipline.categories.map((category) => (
                                  <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(discipline.id, category.id)}
                                    className="w-full text-left px-4 py-3 text-white hover:bg-[#2E2E2E] transition-colors text-body"
                                  >
                                    {category.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => handleNavigate('Disciplines')}
                  className={`relative text-lg font-bold hover:text-[#B11226] transition-colors pb-1 ${
                    currentPage === 'Disciplines' ? 'text-white' : 'text-[#A0A0A0]'
                  }`}
                >
                  DISCIPLINES
                  {currentPage === 'Disciplines' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              )}

              <button
                onClick={() => handleNavigate('News')}
                className={`relative text-lg font-bold hover:text-[#B11226] transition-colors pb-1 ${
                  currentPage === 'News' ? 'text-white' : 'text-[#A0A0A0]'
                }`}
              >
                NEWS
                {currentPage === 'News' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                )}
              </button>

              {user ? (
                <button
                  onClick={() => handleNavigate('Account')}
                  className={`relative text-lg font-bold hover:text-[#B11226] transition-colors pb-1 ${
                    currentPage === 'Account' ? 'text-white' : 'text-[#A0A0A0]'
                  }`}
                >
                  MY ACCOUNT
                  {currentPage === 'Account' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />
                  )}
                </button>
              ) : (
                <button
                  onClick={() => handleNavigate('Auth')}
                  className="px-6 py-3 bg-[#B11226] text-white font-bold rounded-lg hover:bg-[#8B0E1C] transition-all transform hover:scale-105"
                >
                  SIGN UP
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
                  {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleNavigate('Home')}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img src="https://i.postimg.cc/zBXKpsK9/xxlogo-removebg-preview.png" alt="COMBATCRAFT" className="h-10 w-auto max-w-[130px]" />
                </button>
              </div>

              <div className="flex items-center justify-end">
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
        className={`fixed top-0 left-0 bottom-0 w-full sm:w-96 bg-[#0E0E0E] z-50 transform transition-transform duration-300 ease-out lg:hidden ${
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
                : 'text-[#A0A0A0] hover:text-white hover:bg-[#2E2E2E]'
            }`}
          >
            HOME
          </button>

          {user && (
            <button
              onClick={() => handleNavigate('Dashboard')}
              className={`text-left text-xl py-4 px-4 rounded transition-all ${
                currentPage === 'Dashboard'
                  ? 'bg-[#B11226] text-white'
                  : 'text-[#A0A0A0] hover:text-white hover:bg-[#2E2E2E]'
              }`}
            >
              DASHBOARD
            </button>
          )}

          {user ? (
            <>
              <div>
                <button
                  onClick={() => setMobileDisciplinesOpen(!mobileDisciplinesOpen)}
                  className={`w-full text-left text-xl py-4 px-4 rounded transition-all flex items-center justify-between ${
                    currentPage === 'Disciplines' || currentPage === 'Discipline' || currentPage === 'Category' || currentPage === 'Technique'
                      ? 'bg-[#B11226] text-white'
                      : 'text-[#A0A0A0] hover:text-white hover:bg-[#2E2E2E]'
                  }`}
                >
                  DISCIPLINES
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform ${mobileDisciplinesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {mobileDisciplinesOpen && (
                  <div className="mt-2 ml-4 space-y-1 animate-fade-in">
                    {disciplines.map((discipline) => (
                      <div key={discipline.id}>
                        <button
                          onClick={() => {
                            if (discipline.isActive) {
                              setExpandedMobileDiscipline(
                                expandedMobileDiscipline === discipline.id ? null : discipline.id
                              );
                            }
                          }}
                          disabled={!discipline.isActive}
                          className={`w-full text-left py-3 px-4 rounded transition-all flex items-center justify-between ${
                            discipline.isActive
                              ? 'text-white hover:bg-[#2E2E2E]'
                              : 'text-[#A0A0A0] opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <span className="text-body">{discipline.name}</span>
                          <div className="flex items-center gap-2">
                            {!discipline.isActive && <Lock size={16} />}
                            {discipline.isActive && (
                              <ChevronDown
                                size={16}
                                className={`transform transition-transform ${
                                  expandedMobileDiscipline === discipline.id ? 'rotate-180' : ''
                                }`}
                              />
                            )}
                          </div>
                        </button>

                        {expandedMobileDiscipline === discipline.id && discipline.isActive && (
                          <div className="mt-1 ml-4 space-y-1 animate-fade-in">
                            {discipline.categories.map((category) => (
                              <button
                                key={category.id}
                                onClick={() => handleCategoryClick(discipline.id, category.id)}
                                className="w-full text-left py-2 px-4 rounded text-white hover:bg-[#2E2E2E] transition-all text-sm"
                              >
                                {category.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => handleNavigate('Disciplines')}
              className={`text-left text-xl py-4 px-4 rounded transition-all ${
                currentPage === 'Disciplines'
                  ? 'bg-[#B11226] text-white'
                  : 'text-[#A0A0A0] hover:text-white hover:bg-[#2E2E2E]'
              }`}
            >
              DISCIPLINES
            </button>
          )}

          <button
            onClick={() => handleNavigate('News')}
            className={`text-left text-xl py-4 px-4 rounded transition-all ${
              currentPage === 'News'
                ? 'bg-[#B11226] text-white'
                : 'text-[#A0A0A0] hover:text-white hover:bg-[#2E2E2E]'
            }`}
          >
            NEWS
          </button>

          {user ? (
            <button
              onClick={() => handleNavigate('Account')}
              className={`text-left text-xl py-4 px-4 rounded transition-all ${
                currentPage === 'Account'
                  ? 'bg-[#B11226] text-white'
                  : 'text-[#A0A0A0] hover:text-white hover:bg-[#2E2E2E]'
              }`}
            >
              MY ACCOUNT
            </button>
          ) : (
            <button
              onClick={() => handleNavigate('Auth')}
              className="w-full text-center text-xl py-4 px-4 rounded bg-[#B11226] text-white font-bold hover:bg-[#8B0E1C] transition-all"
            >
              SIGN UP
            </button>
          )}
        </div>
      </div>

      <div className="h-16" />
    </>
  );
}
