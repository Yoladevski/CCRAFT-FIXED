import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Lock, CheckCircle, ChevronLeft, ChevronRight, Facebook, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BOXING_FOUNDATIONS_LEVELS, FoundationLesson } from '../data/foundationsLessons';
import LevelProgressIndicator from '../components/LevelProgressIndicator';
import BackButton from '../components/BackButton';

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

interface LevelCompleteState {
  levelComplete: boolean;
  levelNumber: number;
  levelTitle: string;
  userName: string;
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

  const hasConfetti = confetti.length > 0;

  useEffect(() => {
    if (!hasConfetti) return;

    const animate = () => {
      setConfetti(prev => {
        if (prev.length === 0) return prev;
        const next = prev.map(piece => ({
          ...piece,
          x: piece.x + piece.velocityX,
          y: piece.y + piece.velocityY + 2,
          rotation: piece.rotation + 5,
          velocityX: piece.velocityX * 0.99,
          velocityY: piece.velocityY + 0.1,
        })).filter(piece => piece.y < window.innerHeight + 50);
        if (next.length > 0) {
          animationRef.current = requestAnimationFrame(animate);
        }
        return next;
      });
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasConfetti]);

  const shareText = `I just completed Level ${levelNumber}: ${levelTitle} on CombatCraft! Training like a champion.`;
  const shareUrl = 'https://combatcraft.co.uk';

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleInstagramShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'CombatCraft', text: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleSnapchatShare = () => {
    window.open(`https://www.snapchat.com/share?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleMessageShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'CombatCraft', text: shareText, url: shareUrl });
    } else {
      window.open(`sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 bg-black/90 overflow-hidden">
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
          background: '#000000',
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
            alt="CombatCraft"
            className="w-36 h-36 sm:w-44 sm:h-44 object-contain rounded-full mb-4"
          />

          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-2"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#B11226',
              textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 0 4px #ff0000',
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
            className="w-full transition-transform hover:scale-[1.02] active:scale-95"
          >
            <img
              src="https://api.combatcraft.co.uk/storage/v1/object/public/images/continue%20new%20(2).png"
              alt="Continue"
              className="w-full h-auto"
              style={{ objectFit: 'contain', display: 'block' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BoxingFoundations() {
  const navigate = useNavigate();
  const location = useLocation();
  const { levelNumber: levelParam } = useParams<{ levelNumber?: string }>();
  const { user } = useAuth();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [levelCompleteData, setLevelCompleteData] = useState<LevelCompleteState | null>(null);

  const totalLevels = BOXING_FOUNDATIONS_LEVELS.length;

  const activeLevel = (() => {
    if (levelParam) {
      const parsed = parseInt(levelParam, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= totalLevels) return parsed;
    }
    const state = location.state as (LevelCompleteState & { level?: number }) | null;
    if (state?.levelComplete) return state.levelNumber;
    if (state?.level) return state.level;
    if (state?.levelNumber) return state.levelNumber;
    return 1;
  })();

  const setActiveLevel = (level: number) => {
    navigate(`/boxing/foundations/level/${level}`, { replace: true });
  };

  const loadProgress = useCallback(async () => {
    if (!user) { setLoading(false); return; }

    const { data } = await supabase
      .from('foundations_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('discipline', 'boxing')
      .eq('completed', true);

    if (data) {
      setCompletedLessons(new Set(data.map(r => r.lesson_id)));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProgress();

    const state = location.state as (LevelCompleteState & { level?: number }) | null;
    if (state?.levelComplete) {
      setLevelCompleteData(state);
      setShowLevelComplete(true);
      navigate(`/boxing/foundations/level/${state.levelNumber}`, { replace: true, state: {} });
    } else if ((state?.level || state?.levelNumber) && !levelParam) {
      const lvl = state.level ?? state.levelNumber!;
      navigate(`/boxing/foundations/level/${lvl}`, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, loadProgress, levelParam, navigate]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadProgress();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [loadProgress]);

  function isLevelUnlocked(level: number): boolean {
    if (level === 1) return true;
    if (loading) return false;
    const previousLevel = BOXING_FOUNDATIONS_LEVELS.find(l => l.level === level - 1);
    if (!previousLevel) return false;
    return previousLevel.lessons.every(lesson => completedLessons.has(lesson.id));
  }

  function getLevelProgress(level: number): { completed: number; total: number } {
    const lvl = BOXING_FOUNDATIONS_LEVELS.find(l => l.level === level);
    if (!lvl) return { completed: 0, total: 0 };
    const completed = lvl.lessons.filter(l => completedLessons.has(l.id)).length;
    return { completed, total: lvl.lessons.length };
  }

  function handleLessonClick(lesson: FoundationLesson) {
    if (!isLevelUnlocked(lesson.level)) return;
    navigate(`/boxing/foundations/lesson/${lesson.id}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">LOADING...</div>
      </div>
    );
  }

  const activeData = BOXING_FOUNDATIONS_LEVELS.find(l => l.level === activeLevel)!;
  const unlocked = isLevelUnlocked(activeLevel);
  const { completed, total } = getLevelProgress(activeLevel);

  return (
    <div className="min-h-screen py-6 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <BackButton onClick={() => navigate('/boxing/5c45a8e7-aa73-433a-8344-dd8aadf2eed2')} />
        </div>

        <h1 className="cc-outline-text text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10">
          FOUNDATION PATHWAY
        </h1>

        <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveLevel(Math.max(1, activeLevel - 1))}
            disabled={activeLevel === 1}
            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              activeLevel === 1
                ? 'border-[#2E2E2E] text-[#2E2E2E] cursor-not-allowed'
                : 'border-[#B11226] text-[#B11226] hover:bg-[#B11226]/10'
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex flex-col items-center min-w-[120px] sm:min-w-[160px]">
            {(() => {
              const lvl = BOXING_FOUNDATIONS_LEVELS.find(l => l.level === activeLevel)!;
              const locked = !isLevelUnlocked(lvl.level);
              const prog = getLevelProgress(lvl.level);
              const isComplete = prog.completed === prog.total && prog.total > 0;

              return (
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-1">
                    {locked ? (
                      <Lock size={16} className="text-[#A0A0A0]" />
                    ) : isComplete ? (
                      <CheckCircle size={16} className="text-[#B11226]" />
                    ) : null}
                    <span className="text-white font-bold text-lg sm:text-xl">
                      LEVEL {lvl.level}
                    </span>
                  </div>
                  <span className="text-[#A0A0A0] text-xs sm:text-sm font-medium">
                    {lvl.title}
                  </span>
                </div>
              );
            })()}
          </div>

          <button
            onClick={() => setActiveLevel(Math.min(totalLevels, activeLevel + 1))}
            disabled={activeLevel === totalLevels}
            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              activeLevel === totalLevels
                ? 'border-[#2E2E2E] text-[#2E2E2E] cursor-not-allowed'
                : 'border-[#B11226] text-[#B11226] hover:bg-[#B11226]/10'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div
          className="rounded-2xl border-2 p-4 sm:p-6 mb-6 relative overflow-hidden"
          style={{
            borderColor: unlocked ? '#B11226' : '#2E2E2E',
            background: '#000000',
            boxShadow: unlocked ? '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)' : 'none',
            isolation: 'isolate',
          }}
        >
          <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="cc-outline-text text-xl sm:text-2xl font-bold">
                LEVEL {activeData.level}
              </h2>
              <p className="text-[#A0A0A0] text-sm mt-0.5" style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '0.05em' }}>{activeData.title}</p>
            </div>
            {!unlocked && (
              <div className="flex items-center gap-2 text-[#A0A0A0]">
                <Lock size={18} />
                <span className="text-sm font-medium">LOCKED</span>
              </div>
            )}
          </div>

          {unlocked && (
            <div className="mb-5">
              <LevelProgressIndicator
                level={activeData.level}
                completed={completed}
                total={total}
              />
            </div>
          )}

          {!unlocked ? (
            <div className="flex items-center justify-center py-8 sm:py-12">
              <div className="text-center">
                <Lock size={40} className="mx-auto mb-3 text-[#A0A0A0]" />
                <p className="text-[#A0A0A0] text-sm">
                  Complete Level {activeData.level - 1} to unlock this level
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:gap-3">
              {activeData.lessons.map((lesson) => {
                const isDone = completedLessons.has(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 rounded-xl border transition-all sm:hover:scale-[1.01] cursor-pointer text-left card-btn"
                    style={{
                      borderColor: isDone ? '#B11226' : '#2E2E2E',
                      background: isDone ? 'rgba(177, 18, 38, 0.08)' : '#000000',
                      boxShadow: isDone ? '0 0 8px rgba(177, 18, 38, 0.2)' : 'none',
                    }}
                  >
                    <span className={`font-medium text-sm sm:text-base ${isDone ? 'text-white' : 'text-[#A0A0A0]'}`}>
                      {lesson.order}. {lesson.title}
                    </span>
                    {isDone && (
                      <CheckCircle size={18} className="text-[#B11226] flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
          </div>
        </div>
      </div>

      {showLevelComplete && levelCompleteData && (
        <LevelCompleteModal
          levelNumber={levelCompleteData.levelNumber}
          levelTitle={levelCompleteData.levelTitle}
          userName={levelCompleteData.userName}
          onClose={() => {
            setShowLevelComplete(false);
            const nextLevelNum = levelCompleteData.levelNumber + 1;
            const nextLevel = BOXING_FOUNDATIONS_LEVELS.find(l => l.level === nextLevelNum);
            if (nextLevel && nextLevel.lessons.length > 0) {
              navigate(`/boxing/foundations/lesson/${nextLevel.lessons[0].id}`);
            }
          }}
        />
      )}
    </div>
  );
}
