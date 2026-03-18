import { useState, useEffect, useRef, useCallback } from 'react';
import { Pause, Play, RotateCcw, ChevronLeft } from 'lucide-react';
import type { WorkoutSession } from '../data/boxingWorkouts';

type Phase = 'round' | 'rest' | 'complete';

interface WorkoutModeProps {
  session: WorkoutSession;
  onExit: () => void;
}

const ROUND_DURATION = 3 * 60;
const REST_DURATION = 1 * 60;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function playBell() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const createTone = (freq: number, startTime: number, duration: number, gainVal: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    createTone(880, now, 1.2, 0.6);
    createTone(1100, now + 0.05, 1.0, 0.4);
    createTone(660, now + 0.1, 0.8, 0.3);
  } catch {
    // audio not supported
  }
}

export default function WorkoutMode({ session, onExit }: WorkoutModeProps) {
  const rounds = session.rounds ?? [];
  const totalRounds = rounds.length;

  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('round');
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [paused, setPaused] = useState(false);
  const bellPlayedRef = useRef(false);

  const currentRound = rounds[roundIndex];
  const nextRound = rounds[roundIndex + 1];

  const handleTransition = useCallback(() => {
    if (phase === 'round') {
      playBell();
      if (roundIndex >= totalRounds - 1) {
        setPhase('complete');
      } else {
        setPhase('rest');
        setTimeLeft(REST_DURATION);
        bellPlayedRef.current = false;
      }
    } else if (phase === 'rest') {
      playBell();
      setRoundIndex(i => i + 1);
      setPhase('round');
      setTimeLeft(ROUND_DURATION);
      bellPlayedRef.current = false;
    }
  }, [phase, roundIndex, totalRounds]);

  useEffect(() => {
    if (phase === 'complete' || paused) return;
    if (timeLeft <= 0) {
      handleTransition();
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, paused, phase, handleTransition]);

  useEffect(() => {
    if (!bellPlayedRef.current && phase !== 'complete') {
      bellPlayedRef.current = true;
      playBell();
    }
  }, [phase, roundIndex]);

  const handleRestart = () => {
    setRoundIndex(0);
    setPhase('round');
    setTimeLeft(ROUND_DURATION);
    setPaused(false);
    bellPlayedRef.current = false;
  };

  const progress = phase === 'round'
    ? ((ROUND_DURATION - timeLeft) / ROUND_DURATION) * 100
    : ((REST_DURATION - timeLeft) / REST_DURATION) * 100;

  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (phase === 'complete') {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
        style={{ background: '#0a0a0a' }}
      >
        <div className="text-center max-w-sm w-full">
          <p
            className="text-[#B11226] text-xs tracking-widest uppercase mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Session Complete
          </p>
          <h1
            className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 30px rgba(177,18,38,0.5)' }}
          >
            WORKOUT<br />COMPLETE
          </h1>
          <p className="text-[#A0A0A0] text-sm leading-relaxed mb-10" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Great work. You've completed this CombatCraft session.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={onExit}
              className="w-full py-4 rounded-lg text-white text-xs font-black tracking-widest uppercase transition-all active:scale-95"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                background: 'linear-gradient(135deg, #B11226, #8a0d1c)',
                boxShadow: '0 0 20px rgba(177,18,38,0.4)',
              }}
            >
              Return to Workouts
            </button>
            <button
              onClick={handleRestart}
              className="w-full py-4 rounded-lg text-[#A0A0A0] text-xs font-black tracking-widest uppercase border border-[#3a3a3a] transition-all active:scale-95 hover:border-[#B11226] hover:text-white"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Restart Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'rest') {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          background: paused ? '#070707' : '#0a0a0a',
          transition: 'background 0.3s',
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <div className="text-center max-w-sm w-full">
            <p
              className="text-[#A0A0A0] text-xs tracking-widest uppercase mb-2"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {paused ? 'PAUSED' : 'REST'}
            </p>
            <h2
              className="text-4xl sm:text-5xl font-black text-white mb-3"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              REST
            </h2>
            <p className="text-[#A0A0A0] text-xs mb-10 leading-relaxed" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Recover, breathe and prepare for the next round.
            </p>

            <div className="relative flex items-center justify-center mb-6">
              <svg width="260" height="260" className="transform -rotate-90">
                <circle cx="130" cy="130" r="110" fill="none" stroke="#1a1a1a" strokeWidth="6" />
                <circle
                  cx="130" cy="130" r="110"
                  fill="none"
                  stroke="#555555"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              <div className="absolute text-center">
                <span
                  className="text-5xl sm:text-6xl font-black text-white tabular-nums"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {nextRound && (
              <div className="mb-8 py-3 px-4 rounded-lg border border-[#2a2a2a]">
                <p className="text-[#A0A0A0] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Next Up
                </p>
                <p className="text-white text-xs font-black tracking-wide" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Round {nextRound.number} – {nextRound.title.toUpperCase()}
                </p>
              </div>
            )}

            <button
              onClick={() => setPaused(p => !p)}
              className="flex items-center gap-2 mx-auto py-3 px-8 rounded-lg text-white text-xs font-black tracking-widest uppercase border border-[#3a3a3a] hover:border-[#555] transition-all active:scale-95"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
              {paused ? 'RESUME' : 'PAUSE'}
            </button>
          </div>
        </div>

        <div
          className="fixed bottom-0 left-0 right-0 py-4 px-6 flex items-center justify-center gap-3 border-t border-[#1a1a1a]"
          style={{ background: '#0a0a0a' }}
        >
          <span className="text-[#555] text-xs tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            REST BEFORE ROUND
          </span>
          <span className="text-[#A0A0A0] text-xs font-black tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            {roundIndex + 2} / {totalRounds}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{
        background: paused ? '#070707' : '#0a0a0a',
        transition: 'background 0.3s',
      }}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={onExit}
          className="flex items-center gap-1 text-[#555] hover:text-[#A0A0A0] transition-colors active:scale-95"
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '10px' }}
        >
          <ChevronLeft size={14} />
          EXIT
        </button>
        <span
          className="text-[#555] text-xs tracking-widest"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {paused ? 'PAUSED' : session.title.toUpperCase()}
        </span>
        <button
          onClick={handleRestart}
          className="text-[#555] hover:text-[#A0A0A0] transition-colors active:scale-95 p-1"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center max-w-sm w-full">
          <p
            className="text-[#B11226] text-xs tracking-widest uppercase mb-1"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Round {currentRound.number}
          </p>
          <h2
            className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 20px rgba(177,18,38,0.3)',
            }}
          >
            {currentRound.title.toUpperCase()}
          </h2>
          <p
            className="text-[#888] text-xs leading-relaxed mb-8"
            style={{ fontFamily: 'Orbitron, sans-serif', maxWidth: '280px', margin: '0 auto 2rem' }}
          >
            {currentRound.body}
          </p>

          <div className="relative flex items-center justify-center mb-8">
            <svg width="260" height="260" className="transform -rotate-90">
              <circle cx="130" cy="130" r="110" fill="none" stroke="#1a1a1a" strokeWidth="6" />
              <circle
                cx="130" cy="130" r="110"
                fill="none"
                stroke="#B11226"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 1s linear',
                  filter: 'drop-shadow(0 0 6px rgba(177,18,38,0.6))',
                }}
              />
            </svg>
            <div className="absolute text-center">
              <span
                className="text-5xl sm:text-6xl font-black text-white tabular-nums"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {formatTime(timeLeft)}
              </span>
              <p className="text-[#555] text-xs mt-1 tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {paused ? 'PAUSED' : 'REMAINING'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setPaused(p => !p)}
            className="flex items-center gap-2 mx-auto py-3 px-8 rounded-lg text-white text-xs font-black tracking-widest uppercase transition-all active:scale-95"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: paused
                ? 'linear-gradient(135deg, #B11226, #8a0d1c)'
                : 'transparent',
              border: paused ? 'none' : '1px solid #3a3a3a',
              boxShadow: paused ? '0 0 20px rgba(177,18,38,0.4)' : 'none',
            }}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            {paused ? 'RESUME' : 'PAUSE'}
          </button>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 py-4 px-6 flex items-center justify-center gap-3 border-t border-[#1a1a1a]"
        style={{ background: '#0a0a0a' }}
      >
        <span className="text-[#555] text-xs tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Round
        </span>
        <div className="flex items-center gap-1.5">
          {rounds.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === roundIndex ? '20px' : '6px',
                height: '6px',
                background: i < roundIndex
                  ? '#B11226'
                  : i === roundIndex
                  ? '#B11226'
                  : '#2a2a2a',
                boxShadow: i === roundIndex ? '0 0 6px rgba(177,18,38,0.7)' : 'none',
              }}
            />
          ))}
        </div>
        <span className="text-[#A0A0A0] text-xs font-black tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {roundIndex + 1} / {totalRounds}
        </span>
      </div>
    </div>
  );
}
