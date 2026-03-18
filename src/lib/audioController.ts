let audioCtx: AudioContext | null = null;
let unlocked = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export async function unlockAudio(): Promise<void> {
  if (unlocked) return;

  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    src.stop(0.001);

    unlocked = true;
  } catch {
    // best effort
  }

  try {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    }
  } catch {
    // best effort
  }
}

export function playBell(): void {
  try {
    const ctx = getAudioContext();

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => _playBellTones(ctx));
    } else {
      _playBellTones(ctx);
    }
  } catch {
    // audio not supported
  }
}

function _playBellTones(ctx: AudioContext): void {
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
}

export function speak(text: string, voiceEnabled: boolean): void {
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
