import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [heroReady, setHeroReady] = useState(false);
  const heroReadyRef = useRef(false);

  const markReady = () => {
    if (heroReadyRef.current) return;
    heroReadyRef.current = true;
    setHeroReady(true);
  };

  useEffect(() => {
    const fallback = setTimeout(markReady, 3000);

    const setupVideo = (video: HTMLVideoElement | null) => {
      if (!video) return;
      const handler = () => {
        markReady();
        video.play().catch(() => {});
      };
      if (video.readyState >= 3) {
        handler();
      } else {
        video.addEventListener('canplay', handler, { once: true });
      }
      video.load();
      return () => video.removeEventListener('canplay', handler);
    };

    const cleanupDesktop = setupVideo(desktopVideoRef.current);
    const cleanupMobile = setupVideo(mobileVideoRef.current);

    return () => {
      clearTimeout(fallback);
      cleanupDesktop?.();
      cleanupMobile?.();
    };
  }, []);

  return (
    <div>
      <section className="relative w-full overflow-hidden -mt-20" style={{ height: '100vh', minHeight: '640px' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0E0E0E] z-10" />

        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={desktopVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full hidden md:block"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: 1,
            }}
          >
            <source
              src="https://image2url.com/r2/default/videos/1771664442251-d7340661-5e0d-4641-afae-c12227116d28.mp4"
              type="video/mp4"
            />
          </video>
          <video
            ref={mobileVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full md:hidden"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 20%',
              opacity: 1,
            }}
          >
            <source
              src="https://image2url.com/r2/default/videos/1770858582620-ae5b1808-3859-4637-b784-cc115c44e502.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div
          className="absolute inset-0 z-30 flex flex-col items-center justify-between px-6 py-0"
          style={{
            paddingTop: 'clamp(80px, 15vh, 120px)',
            paddingBottom: 'clamp(0px, 2vh, 80px)',
            opacity: heroReady ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div className="flex justify-center w-full -translate-y-[50px] md:-translate-y-[100px]">
            <img
              src="https://api.combatcraft.co.uk/storage/v1/object/public/images/headings/h1.PNG"
              alt="Built by real coaches trusted by fighters powered by AI"
              className="w-auto h-auto home-heading-glow"
              style={{ maxWidth: 'clamp(312px, 86vw, 576px)' }}
            />
          </div>

          <div className="flex flex-col items-center gap-0">
            <img
              src="https://api.combatcraft.co.uk/storage/v1/object/public/images/headings/h2.PNG"
              alt="Build Real Combat Skills Step By Step"
              className="w-auto h-auto -translate-y-[125px] md:-translate-y-[50px] home-heading-glow"
              style={{ maxWidth: 'clamp(260px, 72vw, 480px)', marginBottom: '16px' }}
            />
            <button
              onClick={() => navigate(user ? '/dashboard' : '/auth')}
              className="transition-all transform hover:scale-105 cursor-pointer bg-transparent border-0 p-0 -translate-y-[150px] md:-translate-y-[150px]"
              style={{ width: 'clamp(280px, 72vw, 440px)', maxWidth: '100%', filter: 'drop-shadow(0 0 12px rgba(177,18,38,0.9)) drop-shadow(0 0 24px rgba(177,18,38,0.5))' }}
            >
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20start%20training.png"
                alt="Start Training"
                decoding="async"
                className="w-full h-auto"
                style={{ objectFit: 'contain', display: 'block' }}
              />
            </button>
          </div>

          <div className="flex justify-center w-full -translate-y-[150px] md:-translate-y-[150px]">
            <img
              src="https://api.combatcraft.co.uk/storage/v1/object/public/images/headings/h3.PNG"
              alt="Start Free No Commitment Cancel Anytime"
              className="w-auto h-auto home-heading-glow"
              style={{ maxWidth: 'clamp(220px, 65vw, 380px)' }}
            />
          </div>
        </div>
      </section>

      <section className="pt-4 pb-16 sm:py-24 px-4 bg-black relative main-grid">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-6 sm:gap-8 mt-[10px] items-stretch">
            <button
              onClick={() => navigate('/combat-craft')}
              className="w-full bg-black p-6 rounded-none border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
                minHeight: '160px',
                isolation: 'isolate',
              }}
            >
              <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                letterSpacing: '3px',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 0 4px #ff0000',
                textTransform: 'uppercase',
                lineHeight: '1.3',
                whiteSpace: 'nowrap',
              }}>
                COMBATCRAFT
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: 1.5,
                letterSpacing: '0.02em',
                color: '#C8C8C8',
                textAlign: 'center',
                margin: 0,
              }}>
                A structured training platform built to teach real combat skills step by step.
              </p>
              </div>
            </button>

            <button
              onClick={() => navigate('/ai-instruction')}
              className="w-full bg-black p-6 rounded-none border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
                minHeight: '160px',
                isolation: 'isolate',
              }}
            >
              <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                letterSpacing: '3px',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 0 4px #ff0000',
                lineHeight: '1.3',
              }}>
                Inside<br />CombatCraft
              </div>
              <ul style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: 1.5,
                letterSpacing: '0.02em',
                color: '#C8C8C8',
                listStyle: 'none',
                textAlign: 'center',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}>
                <li>Structured training pathway</li>
                <li>Progress tracking</li>
                <li>Guided workout sessions</li>
                <li>AI-powered lesson videos</li>
              </ul>
              </div>
            </button>

            <button
              onClick={() => navigate('/explore-disciplines')}
              className="w-full bg-black p-6 rounded-none border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
                minHeight: '160px',
                isolation: 'isolate',
              }}
            >
              <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                letterSpacing: '3px',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 0 4px #ff0000',
                textTransform: 'uppercase',
                lineHeight: '1.3',
              }}>
                EXPLORE<br />DISCIPLINES
              </div>
              <ul style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: 1.5,
                letterSpacing: '0.02em',
                color: '#C8C8C8',
                listStyle: 'none',
                textAlign: 'center',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}>
                <li>Boxing available at launch</li>
                <li>Muay Thai coming next</li>
                <li>More disciplines planned</li>
              </ul>
              </div>
            </button>

            <button
              onClick={() => navigate('/how-it-works')}
              className="w-full bg-black p-6 rounded-none border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
                minHeight: '160px',
                isolation: 'isolate',
              }}
            >
              <div className="relative z-10 flex flex-col items-center">
              <div className="mb-4" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                letterSpacing: '3px',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 0 4px #ff0000',
                textTransform: 'uppercase',
                lineHeight: '1.3',
              }}>
                HOW IT<br />WORKS
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: 1.5,
                letterSpacing: '0.02em',
                color: '#C8C8C8',
                textAlign: 'center',
                margin: 0,
              }}>
                Learn the technique.<br />Apply it in training.<br />Build real skills step by step.
              </p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
