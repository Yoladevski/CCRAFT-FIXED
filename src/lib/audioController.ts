let audioCtx: AudioContext | null = null;
let audioUnlocked = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

export function unlockAudioContext(): void {
  try {
    const ctx = getAudioContext();
    const resume = ctx.state === 'suspended' ? ctx.resume() : Promise.resolve();
    resume.then(() => {
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
      src.stop(0.001);
      audioUnlocked = true;
      console.log('[Audio] Context unlocked, state:', ctx.state);
    }).catch(() => {});
  } catch {
    // best effort
  }
}

function ensureResumed(): Promise<AudioContext> {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    return ctx.resume().then(() => ctx);
  }
  return Promise.resolve(ctx);
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

export function playBell(): void {
  try {
    ensureResumed().then(ctx => {
      _playBellTones(ctx);
      console.log('[Audio] Bell played');
    }).catch(err => {
      console.error('[Audio] Bell playback error:', err);
    });
  } catch (err) {
    console.error('[Audio] Bell error:', err);
  }
}

function _speakText(text: string): void {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.85;
    utterance.volume = 1;
    utterance.onerror = (e) => console.error('[Audio] Speech error:', e.error);
    window.speechSynthesis.speak(utterance);
    console.log('[Audio] Voice played:', text);
  } catch (err) {
    console.error('[Audio] Speech exception:', err);
  }
}

export function speak(text: string, voiceEnabled: boolean): void {
  if (!voiceEnabled) return;
  _speakText(text);
}

export function playBellThenSpeak(text: string, voiceEnabled: boolean, delayMs = 400): void {
  try {
    ensureResumed().then(ctx => {
      _playBellTones(ctx);
      console.log('[Audio] Bell played');
      if (voiceEnabled) {
        setTimeout(() => {
          _speakText(text);
        }, delayMs);
      }
    }).catch(err => {
      console.error('[Audio] Bell+voice error:', err);
      if (voiceEnabled) {
        setTimeout(() => _speakText(text), delayMs);
      }
    });
  } catch (err) {
    console.error('[Audio] Bell+voice exception:', err);
  }
}

export { audioUnlocked };
