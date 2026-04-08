import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Shield, LogOut, Globe, ChevronRight, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuDropdownProps {
  onNavigate?: () => void;
}

const menuItems = [
  { label: 'Profile', icon: User, path: '/account', tab: 'profile' },
  { label: 'Settings', icon: Settings, path: '/account', tab: 'settings' },
  { label: 'Security', icon: Shield, path: '/account', tab: 'security' },
];

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

function triggerLanguageChange(langCode: string) {
  const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (selectElement) {
    selectElement.value = langCode;
    selectElement.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

export default function UserMenuDropdown({ onNavigate }: UserMenuDropdownProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('preferredLanguage') || 'en');
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('profile_picture_url, full_name')
      .eq('user_id', user.id)
      .maybeSingle();
    if (data?.profile_picture_url) {
      try {
        const url = new URL(data.profile_picture_url);
        url.searchParams.set('t', Date.now().toString());
        setProfilePicture(url.toString());
      } catch {
        setProfilePicture(data.profile_picture_url);
      }
    }
    if (data?.full_name) setFullName(data.full_name);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`profile-${user.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: `user_id=eq.${user.id}`,
      }, () => {
        fetchProfile();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, fetchProfile]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setLangOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleNavigate = useCallback((path: string, tab?: string) => {
    setOpen(false);
    setLangOpen(false);
    onNavigate?.();
    navigate(path, tab ? { state: { tab } } : undefined);
  }, [navigate, onNavigate]);

  const handleSignOut = useCallback(async () => {
    setOpen(false);
    setLangOpen(false);
    onNavigate?.();
    await signOut();
    navigate('/');
  }, [signOut, navigate, onNavigate]);

  const changeLanguage = useCallback((langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setLangOpen(false);
    if (langCode === 'en') {
      window.location.hash = '';
      window.location.reload();
    } else {
      triggerLanguageChange(langCode);
    }
  }, []);

  if (!user) return null;

  const initials = fullName
    ? fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.[0]?.toUpperCase() ?? 'U';

  const currentLang = languages.find(l => l.code === selectedLanguage);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => { setOpen(prev => !prev); setLangOpen(false); }}
        className="flex items-center justify-center rounded-full overflow-hidden border-2 transition-all duration-200"
        style={{
          width: 36,
          height: 36,
          borderColor: open ? '#B11226' : '#3a3a3a',
          flexShrink: 0,
        }}
        aria-label="Account menu"
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            width="36"
            height="36"
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white font-bold text-xs"
            style={{ background: '#1a1a1a', fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
          >
            {initials}
          </div>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 z-[200]"
          style={{
            width: 220,
            background: '#0d0d0d',
            border: '1px solid #2a2a2a',
            borderRadius: 8,
            boxShadow: '0 8px 32px rgba(0,0,0,0.8), 0 0 0 1px rgba(177,18,38,0.1)',
            overflow: 'hidden',
          }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: '#1e1e1e' }}>
            <p className="text-white font-semibold text-sm truncate" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
              {fullName || 'Fighter'}
            </p>
            <p className="text-xs truncate mt-0.5" style={{ color: '#666', fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
              {user.email}
            </p>
          </div>

          <div className="py-1">
            {menuItems.map(({ label, icon: Icon, path, tab }) => (
              <button
                key={label}
                onClick={() => handleNavigate(path, tab)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 group"
                style={{
                  color: '#b0b0b0',
                  fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#1a1a1a';
                  (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = '#b0b0b0';
                }}
              >
                <Icon size={15} style={{ flexShrink: 0, color: '#B11226' }} />
                {label}
              </button>
            ))}
          </div>

          <div className="border-t" style={{ borderColor: '#1e1e1e' }}>
            <button
              onClick={() => setLangOpen(prev => !prev)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150"
              style={{
                color: '#b0b0b0',
                fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.03em',
                background: langOpen ? '#1a1a1a' : 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#1a1a1a';
                (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = langOpen ? '#1a1a1a' : 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = '#b0b0b0';
              }}
            >
              <Globe size={15} style={{ flexShrink: 0, color: '#B11226' }} />
              <span className="flex-1">{currentLang?.name ?? 'Language'}</span>
              {langOpen ? <ChevronDown size={13} style={{ color: '#666' }} /> : <ChevronRight size={13} style={{ color: '#666' }} />}
            </button>

            {langOpen && (
              <div
                className="overflow-y-auto border-t"
                style={{ maxHeight: 200, borderColor: '#1e1e1e', background: '#080808' }}
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="w-full text-left px-6 py-2 text-xs transition-colors duration-100"
                    style={{
                      color: selectedLanguage === lang.code ? '#B11226' : '#888',
                      background: selectedLanguage === lang.code ? '#150507' : 'transparent',
                      fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                      fontWeight: selectedLanguage === lang.code ? 600 : 400,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      if (selectedLanguage !== lang.code) {
                        (e.currentTarget as HTMLButtonElement).style.background = '#111';
                        (e.currentTarget as HTMLButtonElement).style.color = '#ccc';
                      }
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = selectedLanguage === lang.code ? '#150507' : 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = selectedLanguage === lang.code ? '#B11226' : '#888';
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t" style={{ borderColor: '#1e1e1e' }}>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150"
              style={{
                color: '#b0b0b0',
                fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.03em',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#1a0a0a';
                (e.currentTarget as HTMLButtonElement).style.color = '#ff4455';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = '#b0b0b0';
              }}
            >
              <LogOut size={15} style={{ flexShrink: 0, color: '#B11226' }} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
