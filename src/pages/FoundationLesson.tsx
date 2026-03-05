import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  getLessonById,
  getNextLesson,
  isLastLessonInLevel,
  getLevelForLesson,
  BOXING_FOUNDATIONS_LEVELS,
} from '../data/foundationsLessons';

export default function FoundationLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completing, setCompleting] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);

  const lesson = lessonId ? getLessonById(lessonId) : undefined;
  const isLast = lessonId ? isLastLessonInLevel(lessonId) : false;
  const nextLesson = lessonId ? getNextLesson(lessonId) : null;
  const currentLevel = lessonId ? getLevelForLesson(lessonId) : 1;

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
      navigate('/boxing/foundations');
    } else if (nextLesson) {
      navigate(`/boxing/foundations/lesson/${nextLesson.id}`);
    }

    setCompleting(false);
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">Lesson not found</div>
      </div>
    );
  }

  const levelData = BOXING_FOUNDATIONS_LEVELS.find(l => l.level === currentLevel);
  const buttonLabel = isLast ? 'COMPLETE LEVEL' : 'NEXT ROUND';

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

        <div className="flex justify-center">
          <button
            onClick={handleAction}
            disabled={completing}
            className="w-full sm:w-auto px-10 sm:px-16 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: isLast
                ? 'linear-gradient(135deg, #B11226 0%, #8a0d1c 100%)'
                : 'linear-gradient(135deg, #B11226 0%, #8a0d1c 100%)',
              boxShadow: '0 0 20px rgba(177, 18, 38, 0.5), 0 0 40px rgba(177, 18, 38, 0.2)',
              letterSpacing: '0.1em',
            }}
          >
            {completing ? 'LOADING...' : buttonLabel}
          </button>
        </div>

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
    </div>
  );
}
