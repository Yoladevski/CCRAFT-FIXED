import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Pause, Play, RotateCcw, ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import type { WorkoutSession } from '../data/boxingWorkouts';

type Phase = 'round' | 'rest' | 'complete';

interface WorkoutModeProps {
  session: WorkoutSession;
  onExit: () => void;
}

const ROUND_DURATION = 3 * 60;
const REST_DURATION = 1 * 60;
const URGENCY_THRESHOLD = 10;

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

function speak(text: string, voiceEnabled: boolean) {
  if (!voiceEnabled) return;
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.85;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  } catch {
    // speech not supported
  }
}

interface RoundDotsProps {
  rounds: unknown[];
  roundIndex: number;
  phase: Phase;
}

function RoundDots({ rounds, roundIndex, phase }: RoundDotsProps) {
  const totalDots = rounds.length;
  const dotSize = totalDots > 10 ? 7 : totalDots > 7 ? 8 : 10;
  const gap = totalDots > 10 ? 5 : 7;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: `${gap}px` }}>
      {rounds.map((_, i) => {
        const isActive = i === roundIndex && phase !== 'complete';
        const isCompleted = i < roundIndex || phase === 'complete';
        return (
          <div
            key={i}
            style={{
              borderRadius: '9999px',
              transition: 'all 0.35s ease',
              width: isActive ? `${dotSize * 2.2}px` : `${dotSize}px`,
              height: `${dotSize}px`,
              background: isCompleted
                ? '#5a1520'
                : isActive
                ? '#B11226'
                : '#2a2a2a',
              border: isCompleted ? '1px solid #7a1a28' : isActive ? 'none' : '1px solid #3a3a3a',
              boxShadow: isActive
                ? '0 0 10px rgba(177,18,38,1), 0 0 20px rgba(177,18,38,0.5)'
                : 'none',
              animation: isActive ? 'dotPulse 1.8s ease-in-out infinite' : 'none',
            }}
          />
        );
      })}
    </div>
  );
}

interface TransitionOverlayProps {
  visible: boolean;
  label: string;
  sublabel?: string;
}

function TransitionOverlay({ visible, label, sublabel }: TransitionOverlayProps) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.92)',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transition: 'opacity 0.25s ease',
    }}>
      {sublabel && (
        <p style={{
          fontFamily: 'Orbitron, sans-serif',
          color: '#B11226',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: '0 0 10px',
        }}>{sublabel}</p>
      )}
      <h1 style={{
        fontFamily: 'Orbitron, sans-serif',
        color: '#fff',
        fontSize: 'clamp(42px, 12vw, 64px)',
        fontWeight: 900,
        letterSpacing: '0.05em',
        margin: 0,
        textShadow: '0 0 40px rgba(177,18,38,0.6), 0 0 80px rgba(177,18,38,0.2)',
        animation: visible ? 'overlayFlash 0.35s ease-out' : 'none',
      }}>{label}</h1>
    </div>
  );
}

export default function WorkoutMode({ session, onExit }: WorkoutModeProps) {
  const rounds = session.rounds ?? [];
  const totalRounds = rounds.length;

  const [mounted, setMounted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('round');
  const [timeLeft, setTimeLeft] = useState(ROUND_DURATION);
  const [paused, setPaused] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [overlay, setOverlay] = useState<{ visible: boolean; label: string; sublabel?: string }>({ visible: false, label: '' });

  const bellPlayedRef = useRef(false);
  const voicePlayedRef = useRef(false);
  const urgencySpokenRef = useRef(false);
  const voiceEnabledRef = useRef(true);

  useEffect(() => { voiceEnabledRef.current = voiceEnabled; }, [voiceEnabled]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.classList.add('workout-active');
    document.documentElement.classList.add('workout-active');
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.classList.remove('workout-active');
      document.documentElement.classList.remove('workout-active');
      document.body.style.overflow = prev;
    };
  }, []);

  const currentRound = rounds[roundIndex];
  const nextRound = rounds[roundIndex + 1];
  const isUrgent = timeLeft <= URGENCY_THRESHOLD && phase !== 'complete';
  const isFinalRound = phase === 'round' && roundIndex === totalRounds - 1;

  const showOverlay = useCallback((label: string, sublabel?: string) => {
    setOverlay({ visible: true, label, sublabel });
    setTimeout(() => setOverlay({ visible: false, label: '', sublabel: undefined }), 1000);
  }, []);

  const handleTransition = useCallback(() => {
    if (phase === 'round') {
      playBell();
      if (roundIndex >= totalRounds - 1) {
        setPhase('complete');
        speak('Workout complete. Outstanding work.', voiceEnabledRef.current);
      } else {
        setPhase('rest');
        setTimeLeft(REST_DURATION);
        bellPlayedRef.current = false;
        voicePlayedRef.current = false;
        urgencySpokenRef.current = false;
        showOverlay('REST', 'ROUND OVER');
        setTimeout(() => speak('Rest. Recover.', voiceEnabledRef.current), 400);
      }
    } else if (phase === 'rest') {
      playBell();
      const nextIndex = roundIndex + 1;
      setRoundIndex(nextIndex);
      setPhase('round');
      setTimeLeft(ROUND_DURATION);
      bellPlayedRef.current = false;
      voicePlayedRef.current = false;
      urgencySpokenRef.current = false;
      const isFinal = nextIndex === totalRounds - 1;
      const label = isFinal ? 'FINAL ROUND' : `ROUND ${nextIndex + 1}`;
      showOverlay(label);
      setTimeout(() => {
        if (isFinal) {
          speak('Final round. Give everything.', voiceEnabledRef.current);
        } else {
          speak(`Round ${nextIndex + 1}. Let's go.`, voiceEnabledRef.current);
        }
      }, 400);
    }
  }, [phase, roundIndex, totalRounds, showOverlay]);

  useEffect(() => {
    if (!mounted || phase === 'complete' || paused) return;
    if (timeLeft <= 0) { handleTransition(); return; }
    if (timeLeft === URGENCY_THRESHOLD && !urgencySpokenRef.current) {
      urgencySpokenRef.current = true;
      setTimeout(() => speak('Ten seconds.', voiceEnabledRef.current), 100);
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [mounted, timeLeft, paused, phase, handleTransition]);

  useEffect(() => {
    if (!mounted) return;
    if (!bellPlayedRef.current && phase !== 'complete') {
      bellPlayedRef.current = true;
      playBell();
    }
  }, [mounted, phase, roundIndex]);

  useEffect(() => {
    if (!mounted) return;
    if (phase === 'round' && !voicePlayedRef.current) {
      voicePlayedRef.current = true;
      if (roundIndex === 0) {
        setTimeout(() => speak('Round 1. Begin.', voiceEnabledRef.current), 600);
        showOverlay('ROUND 1');
      }
    }
  }, [mounted, phase, roundIndex, totalRounds, showOverlay]);

  const handleRestart = () => {
    setRoundIndex(0);
    setPhase('round');
    setTimeLeft(ROUND_DURATION);
    setPaused(false);
    bellPlayedRef.current = false;
    voicePlayedRef.current = false;
    urgencySpokenRef.current = false;
    setOverlay({ visible: false, label: '' });
  };

  const duration = phase === 'round' ? ROUND_DURATION : REST_DURATION;
  const progress = ((duration - timeLeft) / duration) * 100;
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const timerColor = isUrgent ? '#FF1A33' : phase === 'rest' ? '#3a3a3a' : '#B11226';
  const timerGlow = isUrgent
    ? 'drop-shadow(0 0 12px rgba(255,26,51,1)) drop-shadow(0 0 24px rgba(255,26,51,0.5))'
    : 'drop-shadow(0 0 10px rgba(177,18,38,0.8)) drop-shadow(0 0 20px rgba(177,18,38,0.3))';

  const bgColor = paused ? '#060606' : '#0a0a0a';

  const roundTypeLabel = phase === 'rest'
    ? 'REST • RECOVER'
    : isFinalRound
    ? 'FINAL ROUND'
    : `ROUND ${(currentRound?.number ?? roundIndex + 1)} • WORK`;

  const shell: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100dvh',
    maxHeight: '100dvh',
    background: bgColor,
    transition: 'background 0.4s',
    overflow: 'hidden',
  };

  if (phase === 'complete') {
    return (
      <>
        <style>{keyframes}</style>
        <div style={{ ...shell, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', width: '100%', maxWidth: '320px' }}>
            <p style={{
              fontFamily: 'Orbitron, sans-serif', color: '#B11226',
              fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              Session Complete
            </p>
            <h1 style={{
              fontFamily: 'Orbitron, sans-serif', color: '#fff',
              fontSize: '36px', fontWeight: 900, lineHeight: 1.2,
              marginBottom: '16px', textShadow: '0 0 30px rgba(177,18,38,0.5)',
            }}>
              WORKOUT<br />COMPLETE
            </h1>
            <p style={{
              fontFamily: 'Orbitron, sans-serif', color: '#4a4a4a',
              fontSize: '11px', lineHeight: 1.7, marginBottom: '36px',
            }}>
              Great work. You've completed this CombatCraft session.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={onExit} style={{
                fontFamily: 'Orbitron, sans-serif', width: '100%', padding: '16px',
                borderRadius: '8px', color: '#fff', fontSize: '11px', fontWeight: 900,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #B11226, #8a0d1c)',
                boxShadow: '0 0 20px rgba(177,18,38,0.4)', border: 'none', cursor: 'pointer',
              }}>Return to Workouts</button>
              <button onClick={handleRestart} style={{
                fontFamily: 'Orbitron, sans-serif', width: '100%', padding: '16px',
                borderRadius: '8px', color: '#A0A0A0', fontSize: '11px', fontWeight: 900,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: 'transparent', border: '1px solid #3a3a3a', cursor: 'pointer',
              }}>Restart Session</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const isRest = phase === 'rest';
  const titleText = isRest ? 'REST' : currentRound.title.toUpperCase();
  const bodyText = isRest
    ? 'Recover, breathe and prepare for the next round.'
    : currentRound.body;
  const labelColor = isRest ? '#3a8a5a' : isFinalRound ? '#e8a020' : '#B11226';

  const nextText = isRest && nextRound
    ? `Next: Round ${nextRound.number} – ${nextRound.title}`
    : !isRest && nextRound
    ? `Next: Round ${nextRound.number} – ${nextRound.title}`
    : !isRest && roundIndex < totalRounds - 1
    ? 'Next: Rest'
    : !isRest
    ? 'Final Round'
    : undefined;

  return (
    <>
      <style>{keyframes}</style>
      <div style={shell}>
        <TransitionOverlay visible={overlay.visible} label={overlay.label} sublabel={overlay.sublabel} />

        {/* TOP: header nav — locked to top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
          paddingBottom: '8px',
          paddingLeft: '16px',
          paddingRight: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
        }}>
          <button onClick={onExit} style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            color: '#444', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Orbitron, sans-serif', fontSize: '9px', letterSpacing: '0.08em',
          }}>
            <ChevronLeft size={13} />EXIT
          </button>
          <span style={{
            fontFamily: 'Orbitron, sans-serif', color: '#2e2e2e',
            fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            {session.title}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setVoiceEnabled(v => !v)}
              title={voiceEnabled ? 'Voice ON' : 'Voice OFF'}
              style={{ color: voiceEnabled ? '#B11226' : '#3a3a3a', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', transition: 'color 0.2s' }}
            >
              {voiceEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>
            <button onClick={handleRestart} style={{ color: '#444', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* TOP: round info — locked just below nav */}
        <div style={{
          position: 'absolute',
          top: 'calc(44px + env(safe-area-inset-top, 0px))',
          left: 0,
          right: 0,
          textAlign: 'center',
          padding: '0 28px',
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            color: labelColor,
            fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
            margin: '0 0 5px',
            transition: 'color 0.3s',
          }}>{roundTypeLabel}</p>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif', color: '#fff',
            fontSize: 'clamp(15px, 4vw, 18px)', fontWeight: 900,
            lineHeight: 1.25, margin: '0 0 8px',
            textShadow: '0 0 16px rgba(177,18,38,0.35)',
            letterSpacing: '0.04em',
          }}>{titleText}</h2>
          <p style={{
            fontFamily: 'Orbitron, sans-serif',
            color: isRest ? '#444' : '#5a5a5a',
            fontSize: 'clamp(9.5px, 2.3vw, 11px)', lineHeight: 1.7,
            textAlign: 'center', margin: 0,
            maxWidth: '280px',
            marginLeft: 'auto',
            marginRight: 'auto',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            opacity: isUrgent ? 0.3 : 1,
            transition: 'opacity 0.5s ease',
          }}>{bodyText}</p>
        </div>

        {/* CENTER + BOTTOM: timer and all bottom elements grouped together */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -38%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          zIndex: 1,
        }}>
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: isUrgent ? 'timerPulse 0.6s ease-in-out infinite' : 'none',
          }}>
            <svg
              style={{ transform: 'rotate(-90deg)', width: 'clamp(190px, 52vw, 220px)', height: 'clamp(190px, 52vw, 220px)' }}
              viewBox="0 0 240 240"
            >
              <circle cx="120" cy="120" r={radius} fill="none" stroke="#1c1c1c" strokeWidth="8" />
              <circle cx="120" cy="120" r={radius} fill="none" stroke={timerColor} strokeWidth="8" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease', filter: isUrgent ? timerGlow : 'none' }} />
            </svg>
            <div style={{ position: 'absolute', textAlign: 'center' }}>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                color: isUrgent ? '#FF1A33' : '#fff',
                fontSize: 'clamp(42px, 11vw, 52px)', fontWeight: 900,
                fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em',
                transition: 'color 0.3s ease',
                textShadow: isUrgent ? '0 0 24px rgba(255,26,51,0.4)' : '0 0 24px rgba(255,255,255,0.08)',
              }}>{formatTime(timeLeft)}</span>
              <p style={{
                fontFamily: 'Orbitron, sans-serif',
                color: paused ? '#B11226' : isUrgent ? '#FF1A33' : '#3a3a3a',
                fontSize: '9px', marginTop: '4px', letterSpacing: '0.12em', textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}>{paused ? 'PAUSED' : 'REMAINING'}</p>
            </div>
          </div>

        </div>

        {/* BOTTOM: pause + next + progress — anchored to bottom */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          zIndex: 2,
        }}>
          <button
            onClick={() => setPaused(p => !p)}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 38px', borderRadius: '8px',
              color: paused ? '#fff' : '#888',
              fontSize: '11px', fontWeight: 900,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: paused ? 'linear-gradient(135deg, #B11226, #8a0d1c)' : 'transparent',
              border: paused ? 'none' : '1px solid #2a2a2a',
              boxShadow: paused ? '0 0 20px rgba(177,18,38,0.4)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            {paused ? 'RESUME' : 'PAUSE'}
          </button>

          {nextText && (
            <p style={{
              fontFamily: 'Orbitron, sans-serif', color: '#4a4a4a',
              fontSize: 'clamp(9.5px, 2.3vw, 11px)', letterSpacing: '0.06em',
              textAlign: 'center', margin: 0,
            }}>
              {nextText}
            </p>
          )}

          <div style={{
            borderTop: '1px solid #181818',
            width: '100%',
            background: '#080808',
            paddingTop: '10px',
            paddingBottom: '2px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}>
            <RoundDots rounds={rounds} roundIndex={roundIndex} phase={phase} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                color: '#3a3a3a',
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {phase === 'rest' ? 'REST' : phase === 'complete' ? 'DONE' : `ROUND ${roundIndex + 1}`}
              </span>
              <span style={{ color: '#282828', fontSize: '9px' }}>/</span>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                color: '#3a3a3a',
                fontSize: '9px',
                letterSpacing: '0.12em',
              }}>
                {totalRounds}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const keyframes = `
  @keyframes timerPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.025); }
  }
  @keyframes dotPulse {
    0%, 100% { box-shadow: 0 0 6px rgba(177,18,38,0.7); }
    50% { box-shadow: 0 0 12px rgba(177,18,38,1), 0 0 24px rgba(177,18,38,0.5); }
  }
  @keyframes overlayFlash {
    0% { opacity: 0; transform: scale(0.92); }
    40% { opacity: 1; transform: scale(1.04); }
    100% { opacity: 1; transform: scale(1); }
  }
`;
