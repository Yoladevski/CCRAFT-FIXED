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
    }).catch(() => {});
  } catch {
    // best effort
  }
}

// ─── Bell via HTMLAudioElement ──────────────────────────────────────────────

function generateBellWavBlob(): Blob {
  const sampleRate = 22050;
  const duration = 1.5;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 3.5);
    const sample =
      0.55 * Math.sin(2 * Math.PI * 880 * t) * env +
      0.30 * Math.sin(2 * Math.PI * 1100 * t) * Math.exp(-t * 4.5) +
      0.20 * Math.sin(2 * Math.PI * 660 * t) * Math.exp(-t * 5.0);
    const clamped = Math.max(-1, Math.min(1, sample));
    view.setInt16(44 + i * 2, Math.round(clamped * 32767), true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

let bellBlobUrl: string | null = null;
let bellAudio: HTMLAudioElement | null = null;
let bellPrimed = false;

function getBellAudio(): HTMLAudioElement {
  if (!bellAudio) {
    if (!bellBlobUrl) {
      bellBlobUrl = URL.createObjectURL(generateBellWavBlob());
    }
    bellAudio = new Audio(bellBlobUrl);
    bellAudio.preload = 'auto';
    bellAudio.volume = 1.0;
  }
  return bellAudio;
}

export function primeBell(): void {
  try {
    const bell = getBellAudio();
    bell.volume = 0;
    bell.currentTime = 0;
    const playPromise = bell.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        bell.pause();
        bell.currentTime = 0;
        bell.volume = 1.0;
        bellPrimed = true;
        console.log('[Bell] Bell primed on Start Workout');
      }).catch(() => {
        bellPrimed = true;
        bell.volume = 1.0;
        console.log('[Bell] Bell primed (play rejected, unlocked via attempt)');
      });
    } else {
      bell.pause();
      bell.currentTime = 0;
      bell.volume = 1.0;
      bellPrimed = true;
      console.log('[Bell] Bell primed on Start Workout');
    }
  } catch (err) {
    bellPrimed = true;
    console.warn('[Bell] Prime failed:', err);
  }
}

export function playBell(): void {
  try {
    const bell = getBellAudio();
    bell.currentTime = 0;
    bell.volume = 1.0;
    const playPromise = bell.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.error('[Bell] playBell error:', err);
      });
    }
    if (!bellPrimed) {
      console.warn('[Bell] Bell played without being primed - may fail on mobile');
    }
  } catch (err) {
    console.error('[Bell] playBell exception:', err);
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

    utterance.onerror = (e) => console.error('[Audio] Speech error:', e.error, 'text:', text);

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
  playBell();
  if (voiceEnabled) {
    setTimeout(() => {
      _speakNow(text);
    }, delayMs);
  }
}
