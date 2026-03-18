import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
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

function RoundDots({ rounds, roundIndex }: { rounds: unknown[]; roundIndex: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {rounds.map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === roundIndex ? '18px' : '6px',
            height: '6px',
            background: i <= roundIndex ? '#B11226' : '#2a2a2a',
            boxShadow: i === roundIndex ? '0 0 6px rgba(177,18,38,0.7)' : 'none',
          }}
        />
      ))}
    </div>
  );
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 16px 8px',
  flexShrink: 0,
};

const exitBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#444',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '9px',
  letterSpacing: '0.08em',
};

const progressBarStyle: React.CSSProperties = {
  flexShrink: 0,
  borderTop: '1px solid #181818',
  background: '#080808',
  padding: '10px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
};

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

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleRestart = () => {
    setRoundIndex(0);
    setPhase('round');
    setTimeLeft(ROUND_DURATION);
    setPaused(false);
    bellPlayedRef.current = false;
  };

  const duration = phase === 'round' ? ROUND_DURATION : REST_DURATION;
  const progress = ((duration - timeLeft) / duration) * 100;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const bg = paused ? '#070707' : '#0a0a0a';

  const pauseBtn = (
    <button
      onClick={() => setPaused(p => !p)}
      style={{
        fontFamily: 'Orbitron, sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '13px 40px',
        borderRadius: '8px',
        color: paused ? '#fff' : '#888',
        fontSize: '11px',
        fontWeight: 900,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        background: paused ? 'linear-gradient(135deg, #B11226, #8a0d1c)' : 'transparent',
        border: paused ? 'none' : '1px solid #2a2a2a',
        boxShadow: paused ? '0 0 20px rgba(177,18,38,0.4)' : 'none',
        cursor: 'pointer',
      }}
    >
      {paused ? <Play size={14} /> : <Pause size={14} />}
      {paused ? 'RESUME' : 'PAUSE'}
    </button>
  );

  let content: React.ReactNode;

  if (phase === 'complete') {
    content = (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          overflow: 'hidden',
        }}
      >
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '320px' }}>
          <p style={{ fontFamily: 'Orbitron, sans-serif', color: '#B11226', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Session Complete
          </p>
          <h1 style={{ fontFamily: 'Orbitron, sans-serif', color: '#fff', fontSize: '36px', fontWeight: 900, lineHeight: 1.2, marginBottom: '16px', textShadow: '0 0 30px rgba(177,18,38,0.5)' }}>
            WORKOUT<br />COMPLETE
          </h1>
          <p style={{ fontFamily: 'Orbitron, sans-serif', color: '#A0A0A0', fontSize: '11px', lineHeight: 1.7, marginBottom: '32px' }}>
            Great work. You've completed this CombatCraft session.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={onExit}
              style={{
                fontFamily: 'Orbitron, sans-serif',
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #B11226, #8a0d1c)',
                boxShadow: '0 0 20px rgba(177,18,38,0.4)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Return to Workouts
            </button>
            <button
              onClick={handleRestart}
              style={{
                fontFamily: 'Orbitron, sans-serif',
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                color: '#A0A0A0',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: 'transparent',
                border: '1px solid #3a3a3a',
                cursor: 'pointer',
              }}
            >
              Restart Session
            </button>
          </div>
        </div>
      </div>
    );
  } else if (phase === 'rest') {
    content = (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          background: bg,
          transition: 'background 0.3s',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* NAV */}
        <div style={navStyle}>
          <button onClick={onExit} style={exitBtnStyle}>
            <ChevronLeft size={13} />
            EXIT
          </button>
          <span style={{ fontFamily: 'Orbitron, sans-serif', color: '#3a3a3a', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {session.title}
          </span>
          <button onClick={handleRestart} style={{ color: '#444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <RotateCcw size={13} />
          </button>
        </div>

        {/* TOP SECTION — ~30% */}
        <div style={{
          flex: '0 0 30%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#fff',
            fontSize: 'clamp(26px, 6vw, 32px)',
            fontWeight: 900,
            margin: '0 0 10px',
            letterSpacing: '0.06em',
          }}>REST</h2>
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#555',
            fontSize: 'clamp(10px, 2.5vw, 12px)',
            lineHeight: 1.65,
            textAlign: 'center',
            maxWidth: '280px',
            margin: 0,
          }}>
            Recover, breathe and prepare for the next round.
          </p>
        </div>

        {/* MIDDLE SECTION — ~42%, timer */}
        <div style={{
          flex: '0 0 42%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width="240"
              height="240"
              style={{ transform: 'rotate(-90deg)', width: 'clamp(200px, 62vw, 240px)', height: 'clamp(200px, 62vw, 240px)' }}
            >
              <circle cx="120" cy="120" r={radius} fill="none" stroke="#1c1c1c" strokeWidth="8" />
              <circle cx="120" cy="120" r={radius} fill="none" stroke="#3a3a3a" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                color: '#ffffff',
                fontSize: 'clamp(46px, 12vw, 54px)',
                fontWeight: 900,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}>
                {formatTime(timeLeft)}
              </span>
              <p style={{
                fontFamily: 'Orbitron, sans-serif',
                color: paused ? '#B11226' : '#3a3a3a',
                fontSize: '9px',
                marginTop: '4px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {paused ? 'PAUSED' : 'REMAINING'}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION — ~28% */}
        <div style={{
          flex: '0 0 28%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          padding: '0 24px',
        }}>
          {nextRound && (
            <p style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#555',
              fontSize: 'clamp(10px, 2.5vw, 11.5px)',
              letterSpacing: '0.06em',
              textAlign: 'center',
              margin: 0,
            }}>
              Next: Round {nextRound.number} – {nextRound.title}
            </p>
          )}
          {pauseBtn}
        </div>

        {/* PROGRESS BAR */}
        <div style={progressBarStyle}>
          <span style={{ fontFamily: 'Orbitron, sans-serif', color: '#3a3a3a', fontSize: '9px', letterSpacing: '0.1em' }}>Rest</span>
          <RoundDots rounds={rounds} roundIndex={roundIndex} />
          <span style={{ fontFamily: 'Orbitron, sans-serif', color: '#666', fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em' }}>
            {roundIndex + 1} / {totalRounds}
          </span>
        </div>
      </div>
    );
  } else {
    content = (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          background: bg,
          transition: 'background 0.3s',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* NAV */}
        <div style={navStyle}>
          <button onClick={onExit} style={exitBtnStyle}>
            <ChevronLeft size={13} />
            EXIT
          </button>
          <span style={{ fontFamily: 'Orbitron, sans-serif', color: '#3a3a3a', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {session.title}
          </span>
          <button onClick={handleRestart} style={{ color: '#444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <RotateCcw size={13} />
          </button>
        </div>

        {/* TOP SECTION — ~32%: round label + title + description */}
        <div style={{
          flex: '0 0 32%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          overflow: 'hidden',
        }}>
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#B11226',
            fontSize: '9px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            margin: '0 0 6px',
          }}>
            Round {currentRound.number}
          </p>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#fff',
            fontSize: 'clamp(15px, 4vw, 18px)',
            fontWeight: 900,
            lineHeight: 1.25,
            margin: '0 0 12px',
            textShadow: '0 0 16px rgba(177,18,38,0.35)',
            letterSpacing: '0.04em',
            textAlign: 'center',
          }}>
            {currentRound.title.toUpperCase()}
          </h2>
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#666',
            fontSize: 'clamp(10px, 2.5vw, 11.5px)',
            lineHeight: 1.7,
            textAlign: 'center',
            maxWidth: '300px',
            margin: 0,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
          }}>
            {currentRound.body}
          </p>
        </div>

        {/* MIDDLE SECTION — ~42%: timer */}
        <div style={{
          flex: '0 0 42%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width="240"
              height="240"
              style={{ transform: 'rotate(-90deg)', width: 'clamp(200px, 62vw, 240px)', height: 'clamp(200px, 62vw, 240px)' }}
            >
              <circle cx="120" cy="120" r={radius} fill="none" stroke="#1c1c1c" strokeWidth="8" />
              <circle cx="120" cy="120" r={radius} fill="none" stroke="#B11226" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 1s linear',
                  filter: 'drop-shadow(0 0 10px rgba(177,18,38,0.8)) drop-shadow(0 0 20px rgba(177,18,38,0.35))',
                }} />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                color: '#ffffff',
                fontSize: 'clamp(46px, 12vw, 54px)',
                fontWeight: 900,
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 0 24px rgba(255,255,255,0.15)',
                letterSpacing: '-0.02em',
              }}>
                {formatTime(timeLeft)}
              </span>
              <p style={{
                fontFamily: 'Orbitron, sans-serif',
                color: paused ? '#B11226' : '#3a3a3a',
                fontSize: '9px',
                marginTop: '4px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {paused ? 'PAUSED' : 'REMAINING'}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION — ~26%: next + pause */}
        <div style={{
          flex: '0 0 26%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          padding: '0 24px',
        }}>
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#555',
            fontSize: 'clamp(10px, 2.5vw, 11.5px)',
            letterSpacing: '0.06em',
            textAlign: 'center',
            margin: 0,
          }}>
            {nextRound
              ? `Next: Round ${nextRound.number} – ${nextRound.title}`
              : roundIndex < totalRounds - 1 ? 'Next: Rest' : 'Final Round'}
          </p>
          {pauseBtn}
        </div>

        {/* PROGRESS BAR */}
        <div style={progressBarStyle}>
          <span style={{ fontFamily: 'Orbitron, sans-serif', color: '#3a3a3a', fontSize: '9px', letterSpacing: '0.1em' }}>Round</span>
          <RoundDots rounds={rounds} roundIndex={roundIndex} />
          <span style={{ fontFamily: 'Orbitron, sans-serif', color: '#666', fontSize: '10px', fontWeight: 900, letterSpacing: '0.1em' }}>
            {roundIndex + 1} / {totalRounds}
          </span>
        </div>
      </div>
    );
  }

  return createPortal(content, document.body);
}
