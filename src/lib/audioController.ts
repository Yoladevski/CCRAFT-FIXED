let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioCtx!();
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
      console.log('[Audio] AudioContext unlocked, state:', ctx.state);
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

// ─── Speech Synthesis ──────────────────────────────────────────────────────

let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

function loadVoices(): void {
  if (!('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoice = pickVoice(voices);
    voicesLoaded = true;
    console.log('[Audio] Voices loaded:', voices.length, '| Selected:', cachedVoice?.name ?? 'none');
  }
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const preferred = [
    'Samantha', 'Karen', 'Moira', 'Tessa',
    'Google US English', 'Google UK English Female',
    'Alex', 'Daniel', 'en-US', 'en-GB',
  ];
  for (const name of preferred) {
    const match = voices.find(v => v.name === name || v.name.includes(name));
    if (match) return match;
  }
  const english = voices.find(v => v.lang.startsWith('en'));
  return english ?? voices[0] ?? null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

function _speakNow(text: string): void {
  if (!('speechSynthesis' in window)) {
    console.warn('[Audio] speechSynthesis not available');
    return;
  }
  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    if (!voicesLoaded) {
      loadVoices();
    }

    if (cachedVoice) {
      utterance.voice = cachedVoice;
      utterance.lang = cachedVoice.lang;
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onstart = () => console.log('[Audio] Speech started:', text);
    utterance.onend = () => console.log('[Audio] Speech ended:', text);
    utterance.onerror = (e) => console.error('[Audio] Speech error:', e.error, 'text:', text);

    console.log('[Audio] Attempting to speak:', text, '| Voice:', utterance.voice?.name ?? 'default');
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('[Audio] Speech exception:', err);
  }
}

export function speak(text: string, voiceEnabled: boolean): void {
  if (!voiceEnabled) return;
  _speakNow(text);
}

export function playBellThenSpeak(text: string, voiceEnabled: boolean, delayMs = 500): void {
  try {
    ensureResumed().then(ctx => {
      _playBellTones(ctx);
      console.log('[Audio] Bell played');
      if (voiceEnabled) {
        setTimeout(() => {
          _speakNow(text);
        }, delayMs);
      }
    }).catch(err => {
      console.error('[Audio] Bell+voice error:', err);
      if (voiceEnabled) {
        setTimeout(() => _speakNow(text), delayMs);
      }
    });
  } catch (err) {
    console.error('[Audio] Bell+voice exception:', err);
  }
}
