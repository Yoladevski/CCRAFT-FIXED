import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';
import BackButton from '../components/BackButton';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';
import LevelProgressIndicator from '../components/LevelProgressIndicator';
import { useStreakContext } from '../contexts/StreakContext';
import {
  getLessonById,
  getNextLesson,
  isLastLessonInLevel,
  getLevelForLesson,
  BOXING_FOUNDATIONS_LEVELS,
} from '../data/foundationsLessons';

type Technique = Database['public']['Tables']['techniques']['Row'];

function formatHowSection(text: string) {
  const lines = text.split('\n');
  const items: { heading: string; body: string[] }[] = [];
  let current: { heading: string; body: string[] } | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const isBullet = trimmed.startsWith('•');
    const isNumbered = /^\d+\.\s/.test(trimmed);
    if (isBullet || isNumbered) {
      if (current) items.push(current);
      const heading = isBullet
        ? trimmed.replace(/^•\s*/, '')
        : trimmed.replace(/^\d+\.\s*/, '');
      current = { heading, body: [] };
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

function formatMistakes(text: string) {
  const blocks = text.split(/\n\n+/);
  const items: { heading: string; lines: { type: 'body' | 'fix' | 'think'; text: string }[] }[] = [];

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) continue;

    const firstLine = lines[0];
    const isBoldHeading = firstLine.startsWith('**') && firstLine.endsWith('**');
    const heading = isBoldHeading ? firstLine.slice(2, -2) : firstLine;
    const bodyLines = lines.slice(1);

    const parsed = bodyLines.map(l => {
      if (l.startsWith('How to fix:')) return { type: 'fix' as const, text: l.replace('How to fix:', '').trim() };
      if (l.startsWith('Think:')) return { type: 'think' as const, text: l.replace('Think:', '').trim() };
      return { type: 'body' as const, text: l };
    });

    items.push({ heading, lines: parsed });
  }

  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={i} className="space-y-1">
          <p className="text-xl font-bold text-white">{item.heading}</p>
          {item.lines.map((l, j) => {
            if (l.type === 'fix') {
              return (
                <p key={j} className="text-body leading-relaxed">
                  <span className="text-[#B11226] font-semibold">How to fix: </span>
                  <span className="text-[#A0A0A0]">{l.text}</span>
                </p>
              );
            }
            if (l.type === 'think') {
              return (
                <p key={j} className="text-body leading-relaxed">
                  <span className="text-[#B11226] font-semibold">Think: </span>
                  <span className="text-[#A0A0A0] italic">{l.text}</span>
                </p>
              );
            }
            return <p key={j} className="text-[#A0A0A0] text-body leading-relaxed">{l.text}</p>;
          })}
        </div>
      ))}
    </div>
  );
}

const XP_PER_LESSON = 50;

interface LessonCompletePopupProps {
  onContinue: () => void;
}

function LessonCompletePopup({ onContinue }: LessonCompletePopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/75 px-4">
      <div className="lesson-complete-panel flex flex-col items-center gap-4 rounded-2xl px-8 py-10 w-full max-w-xs sm:max-w-sm text-center">
        <div
          className="text-white font-black tracking-widest"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.25rem, 5vw, 1.75rem)',
            letterSpacing: '0.12em',
            textShadow: '0 0 20px rgba(177,18,38,0.8), 2px 2px 0 #000',
          }}
        >
          LESSON COMPLETE
        </div>

        <div
          className="text-[#B11226] font-black"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.5rem, 6vw, 2.25rem)',
            letterSpacing: '0.08em',
            textShadow: '0 0 30px rgba(177,18,38,1), 0 0 60px rgba(177,18,38,0.5)',
          }}
        >
          +{XP_PER_LESSON} XP EARNED
        </div>

        <p
          className="text-[#A0A0A0]"
          style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif', fontSize: '0.875rem', letterSpacing: '0.05em' }}
        >
          Progress saved
        </p>

        <button
          onClick={onContinue}
          className="mt-2 w-full transition-transform hover:scale-105 active:scale-95"
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
  );
}

export default function FoundationLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { recordTraining } = useStreakContext();
  const [completing, setCompleting] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [lessonJustCompleted, setLessonJustCompleted] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [completedInLevel, setCompletedInLevel] = useState<Set<string>>(new Set());
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [loadingTechnique, setLoadingTechnique] = useState(true);
  const [userName, setUserName] = useState('Fighter');
  const [newRank, setNewRank] = useState<string | null>(null);

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
  const [accessChecked, setAccessChecked] = useState(false);

  useEffect(() => {
    setAlreadyDone(false);
    setLessonJustCompleted(false);
    setShowCompletionPopup(false);
    setCompletedInLevel(new Set());
    setTechnique(null);
    setLoadingTechnique(true);
    setAccessChecked(false);
    setCompleting(false);
    setNewRank(null);
    setOpenSections({ why: false, how: false, mistakes: false, drills: false, coachesTips: false });
    setSectionsRead({ why: false, how: false, mistakes: false, drills: false, coachesTips: false });
  }, [lessonId]);

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
      if (!lessonId || !lesson) return;

      if (!user) {
        if (lesson.level > 1) {
          navigate(`/boxing/foundations/level/${lesson.level}`, { replace: true });
          return;
        }
        setAccessChecked(true);
        return;
      }

      const levelLessonIds = BOXING_FOUNDATIONS_LEVELS
        .find(l => l.level === lesson.level)
        ?.lessons.map(l => l.id) ?? [];

      const { data } = await supabase
        .from('foundations_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('completed', true)
        .in('lesson_id', levelLessonIds);

      if (data) {
        const done = new Set(data.map(r => r.lesson_id));
        setCompletedInLevel(done);
        if (done.has(lessonId)) setAlreadyDone(true);
      }

      if (lesson.level > 1) {
        const prevLevelLessons = BOXING_FOUNDATIONS_LEVELS
          .find(l => l.level === lesson.level - 1)
          ?.lessons ?? [];

        if (prevLevelLessons.length > 0) {
          const { data: prevData } = await supabase
            .from('foundations_progress')
            .select('lesson_id')
            .eq('user_id', user.id)
            .eq('completed', true)
            .in('lesson_id', prevLevelLessons.map(l => l.id));

          const prevDone = new Set((prevData ?? []).map(r => r.lesson_id));
          const prevComplete = prevLevelLessons.every(l => prevDone.has(l.id));

          if (!prevComplete) {
            navigate(`/boxing/foundations/level/${lesson.level}`, { replace: true });
            return;
          }
        }
      }

      setAccessChecked(true);
    }
    checkCompletion();
  }, [user, lessonId, lesson, navigate]);

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

  async function saveCompletion(): Promise<{ rankUp: string | null }> {
    if (!user || !lesson || alreadyDone) return { rankUp: null };

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
    setLessonJustCompleted(true);
    setCompletedInLevel(prev => new Set([...prev, lesson.id]));

    const { data: profile } = await supabase
      .from('profiles')
      .select('power_level, rank')
      .eq('user_id', user.id)
      .maybeSingle();

    let rankUp: string | null = null;

    if (profile) {
      const oldRank = profile.rank;
      const newPowerLevel = profile.power_level + XP_PER_LESSON;

      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ power_level: newPowerLevel })
        .eq('user_id', user.id)
        .select()
        .maybeSingle();

      if (updatedProfile && updatedProfile.rank !== oldRank) {
        rankUp = updatedProfile.rank;
      }
    }

    return { rankUp };
  }

  async function handleCompleteLesson() {
    if (!user || !lesson || completing || alreadyDone) return;
    setCompleting(true);

    const { rankUp } = await saveCompletion();
    await recordTraining();

    setCompleting(false);

    if (rankUp) {
      setNewRank(rankUp);
    } else {
      setShowCompletionPopup(true);
    }
  }

  function handlePopupContinue() {
    setShowCompletionPopup(false);
  }

  function handleNextRound() {
    if (isLast) {
      navigate('/boxing/foundations', {
        state: {
          levelComplete: true,
          levelNumber: currentLevel,
          levelTitle: levelData?.title || '',
          userName,
        },
      });
    } else if (nextLesson) {
      window.scrollTo(0, 0);
      navigate(`/boxing/foundations/lesson/${nextLesson.id}`);
    }
  }

  function handleRankUpContinue() {
    setNewRank(null);
    setShowCompletionPopup(true);
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">Lesson not found</div>
      </div>
    );
  }

  if (lesson.level > 1 && !accessChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">LOADING...</div>
      </div>
    );
  }

  const levelData = BOXING_FOUNDATIONS_LEVELS.find(l => l.level === currentLevel);
  const isUnlocked = alreadyDone || lessonJustCompleted || allSectionsRead();
  const showNextRoundActive = alreadyDone || lessonJustCompleted;

  return (
    <div className="min-h-screen py-6 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <BackButton onClick={() => navigate(`/boxing/foundations/level/${currentLevel}`)} />
        </div>

        <div className="text-center mb-2">
          <p className="text-[#A0A0A0] text-xs sm:text-sm font-medium tracking-widest uppercase">
            Level {currentLevel} &mdash; {levelData?.title}
          </p>
        </div>

        <h1 className="cc-outline-text text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
          {lesson.title.toUpperCase()}
        </h1>

        {alreadyDone && (
          <div className="flex justify-center mb-6 sm:mb-8">
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-[#B11226] border border-[#B11226]/40 bg-[#B11226]/10">
              <Check size={14} />
              COMPLETED
            </span>
          </div>
        )}
        {!alreadyDone && <div className="mb-8 sm:mb-10" />}

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
              background: '#000000',
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
                className="bg-black rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
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
                    <div className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">
                      {formatText(technique.why)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {technique.how && (
              <div
                className="bg-black rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
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
                className="bg-black rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
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
                    {formatMistakes(technique.common_mistakes)}
                  </div>
                )}
              </div>
            )}

            {technique.simple_drills && (
              <div
                className="bg-black rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
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
                className="bg-black rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
                style={{
                  boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                }}
              >
                <button
                  onClick={() => toggleSection('coachesTips')}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">COACH'S TIPS</h3>
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
                    <div className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">
                      {formatText(technique.coaches_tips)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!isLast && nextLesson && (
          <div className="mt-12 flex flex-col items-center gap-4">
            {showNextRoundActive && (
              <div className="w-full max-w-sm">
                <LevelProgressIndicator
                  level={currentLevel}
                  completed={levelData ? levelData.lessons.filter(l => completedInLevel.has(l.id)).length : 0}
                  total={levelData?.lessons.length ?? 0}
                />
              </div>
            )}
            {showNextRoundActive && (
              <p
                className="text-center text-[#A0A0A0] text-sm tracking-wide"
                style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
              >
                Next lesson unlocked. Continue your training.
              </p>
            )}

            {!alreadyDone && isUnlocked && !lessonJustCompleted && (
              <button
                onClick={handleCompleteLesson}
                disabled={completing}
                className="px-10 py-3 text-white font-black tracking-widest transition-all hover:scale-105 active:scale-95"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  background: 'linear-gradient(135deg, #B11226 0%, #8a0d1c 100%)',
                  boxShadow: '0 0 20px rgba(177,18,38,0.6), 0 0 40px rgba(177,18,38,0.2)',
                  borderRadius: '9999px',
                }}
              >
                {completing ? 'SAVING...' : 'COMPLETE LESSON'}
              </button>
            )}

            <button
              onClick={handleNextRound}
              disabled={!showNextRoundActive}
              className={`transition-all transform ${showNextRoundActive ? 'hover:scale-105 active:scale-95 opacity-100' : 'opacity-30 cursor-not-allowed'}`}
            >
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/nr.png"
                alt="Next Lesson"
                className="w-full max-w-[300px] sm:max-w-[400px] h-auto"
                style={showNextRoundActive ? {
                  filter: 'drop-shadow(0 0 12px rgba(177,18,38,0.8)) drop-shadow(0 0 24px rgba(177,18,38,0.4))',
                } : {}}
              />
            </button>

            {!isUnlocked && (
              <p className="text-center text-[#666666] text-sm" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                Read all sections to unlock the next lesson
              </p>
            )}
          </div>
        )}

        {isLast && (
          <div className="flex flex-col items-center mt-12 gap-4">
            {showNextRoundActive && (
              <div className="w-full max-w-sm">
                <LevelProgressIndicator
                  level={currentLevel}
                  completed={levelData ? levelData.lessons.filter(l => completedInLevel.has(l.id)).length : 0}
                  total={levelData?.lessons.length ?? 0}
                />
              </div>
            )}
            {showNextRoundActive && (
              <p
                className="text-center text-[#A0A0A0] text-sm tracking-wide"
                style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}
              >
                Level Complete. Continue your training.
              </p>
            )}

            {!alreadyDone && isUnlocked && !lessonJustCompleted && (
              <button
                onClick={handleCompleteLesson}
                disabled={completing}
                className="px-10 py-3 text-white font-black tracking-widest transition-all hover:scale-105 active:scale-95"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  background: 'linear-gradient(135deg, #B11226 0%, #8a0d1c 100%)',
                  boxShadow: '0 0 20px rgba(177,18,38,0.6), 0 0 40px rgba(177,18,38,0.2)',
                  borderRadius: '9999px',
                }}
              >
                {completing ? 'SAVING...' : 'COMPLETE LESSON'}
              </button>
            )}

            <button
              onClick={handleNextRound}
              disabled={!showNextRoundActive}
              className={`w-full sm:w-auto px-10 sm:px-16 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg text-white transition-all ${
                showNextRoundActive
                  ? 'hover:scale-[1.02] active:scale-95'
                  : 'opacity-30 cursor-not-allowed'
              }`}
              style={showNextRoundActive ? {
                background: 'linear-gradient(135deg, #B11226 0%, #8a0d1c 100%)',
                boxShadow: '0 0 20px rgba(177, 18, 38, 0.5), 0 0 40px rgba(177, 18, 38, 0.2)',
                letterSpacing: '0.1em',
              } : {
                background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%)',
                letterSpacing: '0.1em',
              }}
            >
              COMPLETE LEVEL
            </button>

            {!isUnlocked && (
              <p className="text-center text-[#666666] text-sm" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>
                Read all sections to complete this level
              </p>
            )}
          </div>
        )}

        <div className="mt-6 sm:mt-8 flex justify-center gap-1.5 flex-wrap">
          {levelData?.lessons.map((l) => {
            const isCurrent = l.id === lesson.id;
            const isDone = completedInLevel.has(l.id);
            return (
              <div
                key={l.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-[#B11226] scale-125'
                    : isDone
                    ? 'bg-[#B11226]/50'
                    : 'bg-[#2E2E2E]'
                }`}
              />
            );
          })}
        </div>
      </div>

      {showCompletionPopup && (
        <LessonCompletePopup onContinue={handlePopupContinue} />
      )}

      {newRank && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <div className="text-center animate-scale-in">
            <div className="text-2xl text-[#A0A0A0] mb-4">RANK UP!</div>
            <div className="text-7xl font-bold text-[#B11226] mb-8">{newRank}</div>
            <button
              onClick={handleRankUpContinue}
              className="transition-transform hover:scale-105 active:scale-95 w-64"
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
      )}
    </div>
  );
}
