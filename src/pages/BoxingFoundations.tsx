import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BOXING_FOUNDATIONS_LEVELS, FoundationLesson } from '../data/foundationsLessons';

export default function BoxingFoundations() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeLevel, setActiveLevel] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
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
    }

    loadProgress();
  }, [user]);

  function isLevelUnlocked(level: number): boolean {
    if (level === 1) return true;
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
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-body font-medium">BACK</span>
          </button>
        </div>

        <h1 className="cc-outline-text text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10">
          FOUNDATIONS PATHWAY
        </h1>

        <div className="flex gap-1 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1">
          {BOXING_FOUNDATIONS_LEVELS.map((lvl) => {
            const locked = !isLevelUnlocked(lvl.level);
            const isActive = activeLevel === lvl.level;
            const prog = getLevelProgress(lvl.level);
            const isComplete = prog.completed === prog.total && prog.total > 0;

            return (
              <button
                key={lvl.level}
                onClick={() => setActiveLevel(lvl.level)}
                className={`flex-shrink-0 flex flex-col items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl border transition-all text-center min-w-[60px] sm:min-w-[80px] ${
                  isActive
                    ? 'border-[#B11226] bg-[#B11226]/20 text-white'
                    : locked
                    ? 'border-[#2E2E2E] bg-[#1A1A1A] text-[#A0A0A0] opacity-60'
                    : 'border-[#2E2E2E] bg-[#1A1A1A] text-[#A0A0A0] hover:border-[#B11226]/50 hover:text-white'
                }`}
              >
                {locked ? (
                  <Lock size={14} className="mb-1" />
                ) : isComplete ? (
                  <CheckCircle size={14} className="mb-1 text-[#B11226]" />
                ) : (
                  <span className="text-xs font-bold mb-1">{lvl.level}</span>
                )}
                <span className="text-[10px] sm:text-xs font-medium leading-tight">
                  {lvl.level === 4 ? 'FLOW' : lvl.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="rounded-2xl border-2 p-4 sm:p-6 mb-6"
          style={{
            borderColor: unlocked ? '#B11226' : '#2E2E2E',
            background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
            boxShadow: unlocked ? '0 0 15px rgba(177, 18, 38, 0.3)' : 'none',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="cc-outline-text text-xl sm:text-2xl font-bold">
                LEVEL {activeData.level}
              </h2>
              <p className="text-[#A0A0A0] text-sm mt-0.5">{activeData.title}</p>
            </div>
            {unlocked && (
              <div className="text-right">
                <p className="text-[#A0A0A0] text-xs">PROGRESS</p>
                <p className="text-white font-bold text-sm">{completed}/{total}</p>
              </div>
            )}
            {!unlocked && (
              <div className="flex items-center gap-2 text-[#A0A0A0]">
                <Lock size={18} />
                <span className="text-sm font-medium">LOCKED</span>
              </div>
            )}
          </div>

          {unlocked && total > 0 && (
            <div className="w-full h-1.5 bg-[#2E2E2E] rounded-full mb-5">
              <div
                className="h-full bg-[#B11226] rounded-full transition-all duration-500"
                style={{ width: `${(completed / total) * 100}%` }}
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
                    className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 rounded-xl border transition-all hover:scale-[1.01] cursor-pointer text-left"
                    style={{
                      borderColor: isDone ? '#B11226' : '#2E2E2E',
                      background: isDone ? 'rgba(177, 18, 38, 0.08)' : '#1A1A1A',
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
  );
}
