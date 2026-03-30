import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { BOXING_WORKOUT_SESSIONS } from '../data/boxingWorkouts';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useStreakContext } from '../contexts/StreakContext';
function getTodayWorkout() {
  const epoch = new Date('2024-01-01').getTime();
  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const dayIndex = Math.floor((todayUtc - epoch) / 86400000);
  return BOXING_WORKOUT_SESSIONS[dayIndex % BOXING_WORKOUT_SESSIONS.length];
}

function getTodayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function WorkoutOfTheDay() {
  const { user } = useAuth();
  const { recordTraining } = useStreakContext();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [marking, setMarking] = useState(false);

  const workout = getTodayWorkout();
  const todayStr = getTodayDateString();

  useEffect(() => {
    if (!user || !workout) return;
    async function checkCompletion() {
      const { data } = await supabase
        .from('workout_completions')
        .select('id')
        .eq('user_id', user!.id)
        .eq('session_slug', workout.slug)
        .eq('completed_date', todayStr)
        .maybeSingle();
      if (data) setCompleted(true);
    }
    checkCompletion();
  }, [user, workout, todayStr]);

  function handleTrainAgain() {
    const others = BOXING_WORKOUT_SESSIONS.filter(w => w.slug !== workout.slug);
    const pick = others[Math.floor(Math.random() * others.length)];
    navigate(`/boxing-workouts/${pick.slug}`);
  }

  async function handleStart() {
    if (!user) {
      navigate(`/boxing-workouts/${workout.slug}`);
      return;
    }
    setMarking(true);
    await supabase.from('workout_completions').upsert(
      { user_id: user.id, session_slug: workout.slug, completed_date: todayStr },
      { onConflict: 'user_id,completed_date,session_slug' }
    );
    await recordTraining();
    setCompleted(true);
    setMarking(false);
    navigate(`/boxing-workouts/${workout.slug}`);
  }

  if (!workout) return null;

  return (
    <div
      className="bg-[#0D0D0D] border-2 border-[#B11226] rounded-lg p-5 sm:p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{
        boxShadow:
          '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
        isolation: 'isolate',
      }}
    >
      <div className="relative z-10 flex flex-col gap-4">
        {/* Header - mobile: larger, no flame emoji */}
        <div className="flex items-center justify-center">
          <h1
            className="tracking-[0.2em] font-bold text-white uppercase text-center sm:text-[10px] sm:text-[#B11226]"
            style={{
              fontFamily: "'OrbitronBold', 'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(0.72rem, 3.5vw, 0.72rem)',
              color: '#FFFFFF',
              textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            Workout of the Day
          </h1>
        </div>

        {/* Session info - centralised */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: '0.6rem',
              color: '#A0A0A0',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Session {workout.number}
          </h2>
          <h2
            style={{
              fontFamily: 'Beantown, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.82rem, 4vw, 0.92rem)',
              color: '#B11226',
              textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1.3,
              textAlign: 'center',
            }}
          >
            {workout.title}
          </h2>
          <p
            className="text-[11px] sm:text-xs text-[#A0A0A0] leading-relaxed pt-1 text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {workout.description}
          </p>
        </div>

        {/* Round badges - equal size, centred */}
        <div className="flex flex-wrap gap-2 justify-center">
          {workout.roundLength && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full tracking-widest uppercase font-bold text-[#A0A0A0] border border-[#2E2E2E] bg-[#111]"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', minWidth: '90px', justifyContent: 'center' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B11226] inline-block shrink-0" />
              {workout.roundLength} rounds
            </span>
          )}
          {workout.totalRounds && (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full tracking-widest uppercase font-bold text-[#A0A0A0] border border-[#2E2E2E] bg-[#111]"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.55rem', minWidth: '90px', justifyContent: 'center' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B11226] inline-block shrink-0" />
              {workout.totalRounds} rounds total
            </span>
          )}
        </div>

        {completed ? (
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded border border-[#2E7D32] bg-[#1B2B1B] text-[#4CAF50]"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <CheckCircle size={14} className="shrink-0" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.18em] font-bold uppercase">
                Workout Completed Today
              </span>
            </div>
            <button
              onClick={handleTrainAgain}
              className="w-full py-3 px-4 rounded font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#A0A0A0] transition-all duration-200 hover:scale-[1.02] hover:text-white active:scale-[0.98] border border-[#3E3E3E] bg-[#111] hover:border-[#B11226] hover:bg-[#1A0A0D]"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Train Again
            </button>
          </div>
        ) : (
          <button
            onClick={handleStart}
            disabled={marking}
            className="w-full py-3 px-4 rounded font-bold text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 mobile-btn-glow"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: '#B11226',
              boxShadow: '0 0 0 1.5px #000, 0 0 12px rgba(177, 18, 38, 0.7), 0 0 24px rgba(177, 18, 38, 0.35)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 0 1.5px #000, 0 0 18px rgba(177, 18, 38, 0.9), 0 0 36px rgba(177, 18, 38, 0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 0 1.5px #000, 0 0 12px rgba(177, 18, 38, 0.7), 0 0 24px rgba(177, 18, 38, 0.35)';
            }}
          >
            {marking ? 'Loading...' : 'Start Workout'}
          </button>
        )}
      </div>
    </div>
  );
}
