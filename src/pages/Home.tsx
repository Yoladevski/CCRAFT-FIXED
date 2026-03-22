import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { OutlinedText } from '../components/OutlinedText';
import { BGPattern } from '../components/ui/bg-pattern';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tryPlay = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };
    tryPlay(desktopVideoRef.current);
    tryPlay(mobileVideoRef.current);
  }, []);

  return (
    <div>
      <section className="relative w-full overflow-hidden -mt-20" style={{ height: '100vh' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0E0E0E] z-10" />

        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={desktopVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full hidden md:block"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              transition: 'opacity 0.4s ease',
            }}
            onCanPlay={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = '1'; }}
            onLoadStart={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = '0'; }}
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
            preload="auto"
            className="w-full h-full md:hidden"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 20%',
              transition: 'opacity 0.4s ease',
            }}
            onCanPlay={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = '1'; }}
            onLoadStart={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = '0'; }}
          >
            <source
              src="https://image2url.com/r2/default/videos/1770858582620-ae5b1808-3859-4637-b784-cc115c44e502.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="hero-content-grid px-6">
          <div
            className="hero-top-text animate-fade-in"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              width: '100%',
            }}
          >
            <OutlinedText
              className="hero-main-heading"
              strokeWidth={3}
              style={{
                fontSize: 'clamp(1.3rem, 4.5vw, 2.7rem)',
                fontFamily: 'Beantown, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.6rem, 5.2vw, 3.2rem)',
                letterSpacing: '0.15em',
              }}
            >
              MASTER MARTIAL ARTS
            </OutlinedText>
            <OutlinedText
              className="hero-main-heading"
              strokeWidth={3}
              style={{
                fontSize: 'clamp(1.3rem, 4.5vw, 2.7rem)',
                fontFamily: 'Beantown, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.6rem, 5.2vw, 3.2rem)',
                letterSpacing: '0.15em',
              }}
            >
              STEP BY STEP
            </OutlinedText>
          </div>

          <div
            className="hero-taglines"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              width: '100%',
            }}
          >
            <OutlinedText
              strokeWidth={3}
              redOutline
              style={{
                fontSize: 'clamp(0.85rem, 3vw, 1.6rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.1rem, 3.6vw, 2rem)',
                letterSpacing: '0.2em',
              }}
            >
              BUILT BY REAL COACHES
            </OutlinedText>
            <OutlinedText
              strokeWidth={3}
              redOutline
              style={{
                fontSize: 'clamp(0.85rem, 3vw, 1.6rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.1rem, 3.6vw, 2rem)',
                letterSpacing: '0.2em',
              }}
            >
              TRUSTED BY FIGHTERS
            </OutlinedText>
            <OutlinedText
              strokeWidth={3}
              redOutline
              style={{
                fontSize: 'clamp(0.85rem, 3vw, 1.6rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.1rem, 3.6vw, 2rem)',
                letterSpacing: '0.2em',
              }}
            >
              POWERED BY AI
            </OutlinedText>
          </div>

          <div className="hero-middle-button">
            <button
              onClick={() => navigate(user ? '/dashboard' : '/auth')}
              className="transition-all transform hover:scale-105 cursor-pointer bg-transparent border-0 p-0"
              style={{
                width: 'clamp(325px, 78vw, 520px)',
                maxWidth: '100%',
              }}
            >
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20start%20training.png"
                alt="Start Training"
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
                style={{
                  width: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))',
                }}
              />
            </button>
          </div>

          <div
            className="hero-bottom-text"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              width: '100%',
            }}
          >
            <OutlinedText
              strokeWidth={0}
              glowColor="rgba(255,0,0,0.35)"
              glowStdDeviation={2}
              style={{
                fontSize: 'clamp(0.75rem, 2.6vw, 1.5rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1rem, 3.2vw, 1.9rem)',
                letterSpacing: '0.2em',
              }}
            >
              START FREE
            </OutlinedText>
            <OutlinedText
              strokeWidth={0}
              glowColor="rgba(255,0,0,0.35)"
              glowStdDeviation={2}
              style={{
                fontSize: 'clamp(0.75rem, 2.6vw, 1.5rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1rem, 3.2vw, 1.9rem)',
                letterSpacing: '0.2em',
              }}
            >
              NO COMMITMENT
            </OutlinedText>
            <OutlinedText
              strokeWidth={0}
              glowColor="rgba(255,0,0,0.35)"
              glowStdDeviation={2}
              style={{
                fontSize: 'clamp(0.75rem, 2.6vw, 1.5rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1rem, 3.2vw, 1.9rem)',
                letterSpacing: '0.2em',
              }}
            >
              CANCEL ANYTIME
            </OutlinedText>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-[#0E0E0E] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:grid md:grid-cols-4 gap-6 sm:gap-8 mt-[10px] items-stretch">
            <button
              onClick={() => navigate('/combat-craft')}
              className="w-full bg-[#0D0D0D] p-6 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
                minHeight: '160px',
                isolation: 'isolate',
              }}
            >
              <BGPattern variant="grid" fill="#4a4a4a" size={20} opacity={0.15} />
              <div className="relative z-10 flex flex-col items-center">
              <h3 className="mb-4" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                letterSpacing: '3px',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 0 4px #ff0000',
                textTransform: 'uppercase',
                lineHeight: '1.3',
              }}>
                COMBAT<br />CRAFT
              </h3>
              <p className="leading-relaxed text-body" style={{ color: '#FFFFFF' }}>
                Structured martial arts training platform designed to teach real fighting techniques step-by-step.
              </p>
              </div>
            </button>

            <button
              onClick={() => navigate('/ai-instruction')}
              className="w-full bg-[#0D0D0D] p-6 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
                minHeight: '160px',
                isolation: 'isolate',
              }}
            >
              <BGPattern variant="grid" fill="#4a4a4a" size={20} opacity={0.15} />
              <div className="relative z-10 flex flex-col items-center">
              <h3 className="mb-4" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '18px',
                letterSpacing: '3px',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 0 4px #ff0000',
                textTransform: 'uppercase',
                lineHeight: '1.3',
              }}>
                INSIDE<br />COMBATCRAFT
              </h3>
              <ul className="text-center space-y-1 text-body" style={{ color: '#FFFFFF', listStyle: 'none' }}>
                <li>&#8226; Progress Tracking</li>
                <li>&#8226; Structured Pathway</li>
                <li>&#8226; AI Generated Videos</li>
              </ul>
              </div>
            </button>

            <button
              onClick={() => navigate('/explore-disciplines')}
              className="w-full bg-[#0D0D0D] p-6 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
                minHeight: '160px',
                isolation: 'isolate',
              }}
            >
              <BGPattern variant="grid" fill="#4a4a4a" size={20} opacity={0.15} />
              <div className="relative z-10 flex flex-col items-center">
              <h3 className="mb-4" style={{
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
              </h3>
              <ul className="text-center space-y-1 text-body" style={{ color: '#FFFFFF', listStyle: 'none' }}>
                <li>&#8226; Boxing</li>
                <li>&#8226; Muay Thai</li>
                <li>&#8226; Brazilian Jiu-Jitsu</li>
                <li>&#8226; Judo</li>
                <li>&#8226; Taekwondo</li>
              </ul>
              </div>
            </button>

            <button
              onClick={() => navigate('/how-it-works')}
              className="w-full bg-[#0D0D0D] p-6 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
                minHeight: '160px',
                isolation: 'isolate',
              }}
            >
              <BGPattern variant="grid" fill="#4a4a4a" size={20} opacity={0.15} />
              <div className="relative z-10 flex flex-col items-center">
              <h3 className="mb-4" style={{
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
              </h3>
              <p className="leading-relaxed text-body" style={{ color: '#FFFFFF' }}>
                Learn how the CombatCraft training system works and how techniques, lessons and workouts combine to build real martial arts skills through structured training.
              </p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
