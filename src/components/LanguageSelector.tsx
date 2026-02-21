import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh-CN', name: '中文 (简体)' },
  { code: 'zh-TW', name: '中文 (繁體)' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'th', name: 'ไทย' },
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'pl', name: 'Polski' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sv', name: 'Svenska' },
];

interface LanguageSelectorProps {
  compact?: boolean;
}

export default function LanguageSelector({ compact = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }

    const initGoogleTranslate = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;

        window.googleTranslateElementInit = () => {
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: languages.map(l => l.code).join(','),
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              'google_translate_element'
            );
            setIsInitialized(true);

            if (savedLanguage && savedLanguage !== 'en') {
              setTimeout(() => {
                triggerLanguageChange(savedLanguage);
              }, 1000);
            }
          } catch (error) {
            console.error('Google Translate initialization error:', error);
          }
        };

        document.body.appendChild(script);
      } else if (window.google && window.google.translate) {
        setIsInitialized(true);
      }
    };

    initGoogleTranslate();
  }, []);

  const triggerLanguageChange = (langCode: string) => {
    const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = langCode;
      selectElement.dispatchEvent(new Event('change', { bubbles: true }));

      setTimeout(() => {
        const frame = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
        if (frame && frame.contentDocument) {
          const option = frame.contentDocument.querySelector(`[value="${langCode}"]`) as HTMLElement;
          if (option) {
            option.click();
          }
        }
      }, 100);
    }
  };

  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setIsOpen(false);

    if (langCode === 'en') {
      window.location.hash = '';
      window.location.reload();
    } else {
      triggerLanguageChange(langCode);
    }
  };

  const currentLanguage = languages.find(l => l.code === selectedLanguage) || languages[0];

  return (
    <div className="relative">
      <div id="google_translate_element" className="hidden"></div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 ${
          compact
            ? 'px-3 py-2 bg-transparent hover:bg-[#1A1A1A]'
            : 'px-6 py-3 bg-[#1A1A1A] border border-[#2E2E2E]'
        } rounded-lg transition-colors`}
        aria-label="Select language"
      >
        <Globe size={compact ? 18 : 20} className="text-[#B11226]" />
        <span className="text-white font-medium text-sm" style={{ fontFamily: 'Redhawk' }}>
          {compact ? selectedLanguage.toUpperCase() : currentLanguage.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute bottom-full left-0 mb-2 w-64 max-h-96 overflow-y-auto bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg shadow-2xl z-50">
            <div className="p-2">
              <div className="px-4 py-2 text-xs text-[#666666] uppercase tracking-wider">
                Select Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-3 rounded hover:bg-[#252525] transition-colors ${
                    selectedLanguage === lang.code
                      ? 'text-[#B11226] bg-[#2E2E2E]'
                      : 'text-[#A0A0A0]'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
