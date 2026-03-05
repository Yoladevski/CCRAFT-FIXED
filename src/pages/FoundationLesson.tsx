import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, Facebook, MessageCircle, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';
import {
  getLessonById,
  getNextLesson,
  isLastLessonInLevel,
  getLevelForLesson,
  BOXING_FOUNDATIONS_LEVELS,
} from '../data/foundationsLessons';

type Technique = Database['public']['Tables']['techniques']['Row'];

const VICTORY_QUOTES = [
  "CHAMPION!",
  "VICTORIOUS!",
  "UNSTOPPABLE!",
  "LEGENDARY!",
  "DOMINANT!",
];

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  side: 'left' | 'right';
}

function LevelCompleteModal({
  levelNumber,
  levelTitle,
  userName,
  onClose,
}: {
  levelNumber: number;
  levelTitle: string;
  userName: string;
  onClose: () => void;
}) {
  const [showContent, setShowContent] = useState(false);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  const quote = VICTORY_QUOTES[Math.floor(Math.random() * VICTORY_QUOTES.length)];

  const createConfetti = useCallback(() => {
    const colors = ['#B11226', '#FFD700', '#FFFFFF', '#FF4444', '#FF6B6B'];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 100; i++) {
      const side = i < 50 ? 'left' : 'right';
      pieces.push({
        id: i,
        x: side === 'left' ? -20 : window.innerWidth + 20,
        y: Math.random() * window.innerHeight * 0.6,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        velocityX: side === 'left' ? Math.random() * 15 + 5 : -(Math.random() * 15 + 5),
        velocityY: Math.random() * 5 - 2,
        side,
      });
    }
    setConfetti(pieces);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio('https://api.combatcraft.co.uk/storage/v1/object/public/audio/crowd-cheer.mp3');
    audioRef.current.volume = 0.5;
    audioRef.current.play().catch(() => {});

    createConfetti();

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    const shareTimer = setTimeout(() => {
      setShowShareButtons(true);
    }, 1100);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(shareTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createConfetti]);

  useEffect(() => {
    if (confetti.length === 0) return;

    const animate = () => {
      setConfetti(prev =>
        prev.map(piece => ({
          ...piece,
          x: piece.x + piece.velocityX,
          y: piece.y + piece.velocityY + 2,
          rotation: piece.rotation + 5,
          velocityX: piece.velocityX * 0.99,
          velocityY: piece.velocityY + 0.1,
        })).filter(piece => piece.y < window.innerHeight + 50)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [confetti.length > 0]);

  const shareText = `I just completed Level ${levelNumber}: ${levelTitle} on Combat Craft! Training like a champion.`;
  const shareUrl = 'https://combatcraft.co.uk';

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleInstagramShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Combat Craft', text: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleSnapchatShare = () => {
    window.open(`https://www.snapchat.com/share?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleMessageShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Combat Craft', text: shareText, url: shareUrl });
    } else {
      window.open(`sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 overflow-hidden">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute pointer-events-none"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}

      <div
        className="relative z-10 flex flex-col items-center mx-4 p-6 sm:p-8 rounded-2xl border border-[#2E2E2E] max-w-sm w-full"
        style={{
          background: 'linear-gradient(180deg, #1A1A1A 0%, #0E0E0E 100%)',
          boxShadow: '0 0 40px rgba(177, 18, 38, 0.3), 0 0 80px rgba(0, 0, 0, 0.8)',
        }}
      >
        <div
          className={`flex flex-col items-center transition-all duration-700 ease-out ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <img
            src="https://api.combatcraft.co.uk/storage/v1/object/public/images/xxlogo.JPG"
            alt="Combat Craft"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-full mb-4"
          />

          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-2"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#B11226',
              textShadow: '0 0 20px rgba(177, 18, 38, 0.8)',
            }}
          >
            {userName.toUpperCase()}
          </h2>

          <p className="text-[#A0A0A0] text-center text-sm mb-1">Completed</p>

          <h3
            className="text-lg sm:text-xl font-bold text-center text-white mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            LEVEL {levelNumber}: {levelTitle.toUpperCase()}
          </h3>

          <p
            className="text-2xl sm:text-3xl font-bold text-center mb-6"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {quote}
          </p>
        </div>

        <div
          className={`flex flex-col items-center w-full transition-all duration-500 ${
            showShareButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-white text-sm font-medium mb-4 text-center">SHARE YOUR SUCCESS</p>

          <div className="flex gap-3 mb-6">
            <button
              onClick={handleFacebookShare}
              className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Facebook size={20} className="text-white" />
            </button>

            <button
              onClick={handleInstagramShare}
              className="w-11 h-11 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              style={{
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>

            <button
              onClick={handleSnapchatShare}
              className="w-11 h-11 rounded-full bg-[#FFFC00] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-black">
                <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/>
              </svg>
            </button>

            <button
              onClick={handleMessageShare}
              className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <MessageCircle size={20} className="text-white" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #B11226 0%, #8a0d1c 100%)',
              boxShadow: '0 0 20px rgba(177, 18, 38, 0.5)',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}

function formatHowSection(text: string) {
  const lines = text.split('\n');
  const items: { heading: string; body: string[] }[] = [];
  let current: { heading: string; body: string[] } | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('•')) {
      if (current) items.push(current);
      current = { heading: trimmed.replace(/^•\s*/, ''), body: [] };
    } else {
      if (current) {
        current.body.push(trimmed);
      } else {
        items.push({ heading: trimmed, body: [] });
      }
    }
  }
  if (current) items.push(current);

  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-[#B11226] font-bold text-body shrink-0" style={{ fontFamily: 'Orbitron, sans-serif', minWidth: '1.5rem' }}>{i + 1}.</span>
          <div>
            <span className="text-white font-semibold text-body">{item.heading}</span>
            {item.body.map((b, j) => (
              <p key={j} className="text-[#A0A0A0] text-body leading-relaxed mt-1">{b}</p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

function formatText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return <span key={index} className="text-2xl font-bold text-white">{content}</span>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default function FoundationLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completing, setCompleting] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [loadingTechnique, setLoadingTechnique] = useState(true);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [userName, setUserName] = useState('Fighter');

  const [openSections, setOpenSections] = useState({
    why: false,
    how: false,
    mistakes: false,
    drills: false,
    coachesTips: false,
  });

  const [sectionsRead, setSectionsRead] = useState({
    why: false,
    how: false,
    mistakes: false,
    drills: false,
    coachesTips: false,
  });

  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const isLast = lessonId ? isLastLessonInLevel(lessonId) : false;
  const nextLesson = lessonId ? getNextLesson(lessonId) : null;
  const currentLevel = lessonId ? getLevelForLesson(lessonId) : 1;

  const allSectionsRead = () => {
    if (!technique) return false;
    const availableSections = [
      technique.why ? 'why' : null,
      technique.how ? 'how' : null,
      technique.common_mistakes ? 'mistakes' : null,
      technique.simple_drills ? 'drills' : null,
      technique.coaches_tips ? 'coachesTips' : null,
    ].filter(Boolean) as (keyof typeof sectionsRead)[];

    return availableSections.length === 0 || availableSections.every(section => sectionsRead[section]);
  };

  useEffect(() => {
    async function checkCompletion() {
      if (!user || !lessonId) return;
      const { data } = await supabase
        .from('foundations_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .eq('completed', true)
        .maybeSingle();

      if (data) setAlreadyDone(true);
    }
    checkCompletion();
  }, [user, lessonId]);

  useEffect(() => {
    async function fetchUserName() {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data?.full_name) {
        setUserName(data.full_name);
      }
    }
    fetchUserName();
  }, [user]);

  useEffect(() => {
    async function loadTechnique() {
      if (!lesson?.techniqueId) {
        setLoadingTechnique(false);
        return;
      }

      const { data } = await supabase
        .from('techniques')
        .select('*')
        .eq('id', lesson.techniqueId)
        .maybeSingle();

      if (data) {
        setTechnique(data);
      }
      setLoadingTechnique(false);
    }

    loadTechnique();
  }, [lesson?.techniqueId]);

  const toggleSection = (section: keyof typeof openSections) => {
    const wasOpen = openSections[section];
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

    if (!wasOpen && !sectionsRead[section]) {
      setSectionsRead(prev => ({ ...prev, [section]: true }));
    }
  };

  async function handleAction() {
    if (!user || !lesson || completing) return;
    setCompleting(true);

    if (!alreadyDone) {
      await supabase
        .from('foundations_progress')
        .upsert({
          user_id: user.id,
          discipline: lesson.discipline,
          level: lesson.level,
          lesson_id: lesson.id,
          completed: true,
          completed_at: new Date().toISOString(),
        }, { onConflict: 'user_id,lesson_id' });
      setAlreadyDone(true);
    }

    if (isLast) {
      setShowLevelComplete(true);
    } else if (nextLesson) {
      navigate(`/boxing/foundations/lesson/${nextLesson.id}`);
      window.scrollTo(0, 0);
    }

    setCompleting(false);
  }

  const handleLevelCompleteClose = () => {
    setShowLevelComplete(false);
    navigate('/boxing/foundations');
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">Lesson not found</div>
      </div>
    );
  }

  const levelData = BOXING_FOUNDATIONS_LEVELS.find(l => l.level === currentLevel);

  return (
    <div className="min-h-screen py-6 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-body font-medium">BACK</span>
          </button>
        </div>

        <div className="text-center mb-2">
          <p className="text-[#A0A0A0] text-xs sm:text-sm font-medium tracking-widest uppercase">
            Level {currentLevel} &mdash; {levelData?.title}
          </p>
        </div>

        <h1 className="cc-outline-text text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10">
          {lesson.title.toUpperCase()}
        </h1>

        {technique?.video_url ? (
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="relative w-full md:w-64 aspect-[9/16] bg-black rounded-lg overflow-hidden">
              <iframe
                src={technique.video_url}
                title={lesson.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div
            className="w-full rounded-2xl overflow-hidden border-2 border-[#2E2E2E] mb-8 sm:mb-10 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
              aspectRatio: '16 / 9',
            }}
          >
            <div className="flex flex-col items-center gap-3 text-[#A0A0A0]">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#2E2E2E] flex items-center justify-center"
              >
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-[#A0A0A0] ml-1" />
              </div>
              <p className="text-sm">Video Coming Soon</p>
            </div>
          </div>
        )}

        {technique && !loadingTechnique && (
          <div className="space-y-8 mb-8 sm:mb-10">
            {technique.why && (
              <div
                className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden"
                style={{
                  boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                }}
              >
                <button
                  onClick={() => toggleSection('why')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">WHY</h3>
                    {sectionsRead.why && (
                      <Check size={24} className="text-[#B11226]" />
                    )}
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-[#B11226] transition-transform ${openSections.why ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSections.why && (
                  <div className="px-6 pb-6">
                    <p className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">{technique.why}</p>
                  </div>
                )}
              </div>
            )}

            {technique.how && (
              <div
                className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden"
                style={{
                  boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                }}
              >
                <button
                  onClick={() => toggleSection('how')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">HOW</h3>
                    {sectionsRead.how && (
                      <Check size={24} className="text-[#B11226]" />
                    )}
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-[#B11226] transition-transform ${openSections.how ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSections.how && (
                  <div className="px-6 pb-6">
                    {formatHowSection(technique.how)}
                  </div>
                )}
              </div>
            )}

            {technique.common_mistakes && (
              <div
                className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden"
                style={{
                  boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                }}
              >
                <button
                  onClick={() => toggleSection('mistakes')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">COMMON MISTAKES</h3>
                    {sectionsRead.mistakes && (
                      <Check size={24} className="text-[#B11226]" />
                    )}
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-[#B11226] transition-transform ${openSections.mistakes ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSections.mistakes && (
                  <div className="px-6 pb-6">
                    <p className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">{technique.common_mistakes}</p>
                  </div>
                )}
              </div>
            )}

            {technique.simple_drills && (
              <div
                className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden"
                style={{
                  boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                }}
              >
                <button
                  onClick={() => toggleSection('drills')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">SIMPLE DRILLS</h3>
                    {sectionsRead.drills && (
                      <Check size={24} className="text-[#B11226]" />
                    )}
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-[#B11226] transition-transform ${openSections.drills ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSections.drills && (
                  <div className="px-6 pb-6">
                    <div className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">
                      {formatText(technique.simple_drills)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {technique.coaches_tips && (
              <div
                className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden"
                style={{
                  boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                }}
              >
                <button
                  onClick={() => toggleSection('coachesTips')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">COACHES' TIPS</h3>
                    {sectionsRead.coachesTips && (
                      <Check size={24} className="text-[#B11226]" />
                    )}
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-[#B11226] transition-transform ${openSections.coachesTips ? 'rotate-180' : ''}`}
                  />
                </button>
                {openSections.coachesTips && (
                  <div className="px-6 pb-6">
                    <p className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">{technique.coaches_tips}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!isLast && nextLesson && (
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={handleAction}
              disabled={completing || !allSectionsRead()}
              className={`transition-all transform ${
                allSectionsRead() && !completing
                  ? 'hover:scale-105 opacity-100'
                  : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/nr.png"
                alt="Next Round"
                className="w-full max-w-[300px] sm:max-w-[400px] h-auto"
              />
            </button>
            {!allSectionsRead() && (
              <p className="text-center text-[#666666] mt-4 text-sm">
                Read all sections to unlock the next round
              </p>
            )}
          </div>
        )}

        {isLast && (
          <div className="flex flex-col items-center mt-12">
            <button
              onClick={handleAction}
              disabled={completing || !allSectionsRead()}
              className={`w-full sm:w-auto px-10 sm:px-16 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg text-white transition-all hover:scale-[1.02] ${
                allSectionsRead() && !completing
                  ? ''
                  : 'opacity-40 cursor-not-allowed'
              }`}
              style={{
                background: 'linear-gradient(135deg, #B11226 0%, #8a0d1c 100%)',
                boxShadow: '0 0 20px rgba(177, 18, 38, 0.5), 0 0 40px rgba(177, 18, 38, 0.2)',
                letterSpacing: '0.1em',
              }}
            >
              {completing ? 'LOADING...' : 'COMPLETE LEVEL'}
            </button>
            {!allSectionsRead() && (
              <p className="text-center text-[#666666] mt-4 text-sm">
                Read all sections to complete this level
              </p>
            )}
          </div>
        )}

        <div className="mt-6 sm:mt-8 flex justify-center gap-1.5 flex-wrap">
          {levelData?.lessons.map((l) => {
            const isCurrent = l.id === lesson.id;
            return (
              <div
                key={l.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-[#B11226] scale-125'
                    : alreadyDone && l.order <= lesson.order
                    ? 'bg-[#B11226]/50'
                    : 'bg-[#2E2E2E]'
                }`}
              />
            );
          })}
        </div>
      </div>

      {showLevelComplete && levelData && (
        <LevelCompleteModal
          levelNumber={currentLevel}
          levelTitle={levelData.title}
          userName={userName}
          onClose={handleLevelCompleteClose}
        />
      )}
    </div>
  );
}
