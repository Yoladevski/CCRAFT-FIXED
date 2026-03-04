import { useAuth } from '../contexts/AuthContext';
import { OutlinedText } from '../components/OutlinedText';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { user } = useAuth();

  return (
    <div>
      <section className="relative w-full overflow-hidden -mt-20" style={{ height: '100vh' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0E0E0E] z-10" />

        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full hidden md:block"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%231A1A1A'/%3E%3C/svg%3E"
          >
            <source
              src="https://image2url.com/r2/default/videos/1771664442251-d7340661-5e0d-4641-afae-c12227116d28.mp4"
              type="video/mp4"
            />
          </video>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full md:hidden"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 20%'
            }}
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%231A1A1A'/%3E%3C/svg%3E"
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
              style={{
                fontSize: 'clamp(1.02rem, 3.6vw, 2.16rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.3rem, 4.2vw, 2.7rem)',
                letterSpacing: '0.27em',
              }}
            >
              BUILT BY REAL COACHES
            </OutlinedText>
            <OutlinedText
              style={{
                fontSize: 'clamp(1.02rem, 3.6vw, 2.16rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.3rem, 4.2vw, 2.7rem)',
                letterSpacing: '0.27em',
              }}
            >
              USED BY FIGHTERS
            </OutlinedText>
            <OutlinedText
              style={{
                fontSize: 'clamp(1.02rem, 3.6vw, 2.16rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.3rem, 4.2vw, 2.7rem)',
                letterSpacing: '0.27em',
              }}
            >
              POWERED BY AI
            </OutlinedText>
          </div>

          <div className="hero-middle-button">
            <button
              onClick={() => onNavigate(user ? 'Dashboard' : 'Auth')}
              className="transition-all transform hover:scale-105 cursor-pointer bg-transparent border-0 p-0"
              style={{
                width: 'clamp(325px, 78vw, 520px)',
                maxWidth: '100%',
              }}
            >
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/BUTTON.png"
                alt="Start Training"
                className="w-full h-auto"
                style={{
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
              gap: '0.5rem',
              width: '100%',
            }}
          >
            <OutlinedText
              style={{
                fontSize: 'clamp(0.765rem, 2.7vw, 1.62rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1rem, 3.3vw, 2rem)',
                letterSpacing: '0.27em',
              }}
            >
              START FREE. TRAIN FREE. AD FREE
            </OutlinedText>
            <OutlinedText
              style={{
                fontSize: 'clamp(0.3825rem, 1.35vw, 0.81rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(0.5rem, 1.65vw, 1rem)',
                letterSpacing: '0.27em',
              }}
            >
              NO COMMITMENT. CANCEL ANYTIME
            </OutlinedText>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-[#0E0E0E] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mt-[10px]">
            <button
              onClick={() => onNavigate('StructuredProgression')}
              className="bg-[#1A1A1A] p-8 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer text-left"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.4), 0 0 30px rgba(177, 18, 38, 0.2)'
              }}
            >
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/D0fKBBM2/fightcraft1.jpg"
                  alt="Structured Progression"
                  className="w-24 h-24 object-cover rounded-full border-2 border-[#B11226]"
                  width="96"
                  height="96"
                  style={{
                    boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                  }}
                />
              </div>
              <h3 className="cc-section-heading text-center mb-4" data-text="STRUCTURED PROGRESSION" style={{ fontSize: '19.2px' }}>
                STRUCTURED PROGRESSION
              </h3>
              <p className="text-center leading-relaxed" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11.2px', fontWeight: 500, color: '#A0A0A0' }}>
                Sequential unlock system ensures mastery before advancement. Build foundations properly.
              </p>
            </button>

            <button
              onClick={() => onNavigate('AIInstruction')}
              className="bg-[#1A1A1A] p-8 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer text-left"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.4), 0 0 30px rgba(177, 18, 38, 0.2)'
              }}
            >
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/fyWhBBrT/fightcraft2.jpg"
                  alt="AI Enhanced Instruction"
                  className="w-24 h-24 object-cover rounded-full border-2 border-[#B11226]"
                  width="96"
                  height="96"
                  style={{
                    boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                  }}
                />
              </div>
              <h3 className="cc-section-heading text-center mb-4" data-text="AI ENHANCED INSTRUCTION" style={{ fontSize: '19.2px' }}>
                AI ENHANCED INSTRUCTION
              </h3>
              <p className="text-center leading-relaxed" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11.2px', fontWeight: 500, color: '#A0A0A0' }}>
                Detailed technique breakdowns with common mistakes and tactical applications.
              </p>
            </button>

            <button
              onClick={() => onNavigate('MultiDiscipline')}
              className="bg-[#1A1A1A] p-8 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer text-left"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.4), 0 0 30px rgba(177, 18, 38, 0.2)'
              }}
            >
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/zvD100cG/fightcraft3.jpg"
                  alt="Multi Discipline System"
                  className="w-24 h-24 object-cover rounded-full border-2 border-[#B11226]"
                  width="96"
                  height="96"
                  style={{
                    boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                  }}
                />
              </div>
              <h3 className="cc-section-heading text-center mb-4" data-text="MULTI DISCIPLINE SYSTEM" style={{ fontSize: '19.2px' }}>
                MULTI DISCIPLINE SYSTEM
              </h3>
              <p className="text-center leading-relaxed" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11.2px', fontWeight: 500, color: '#A0A0A0' }}>
                Train across Boxing, Muay Thai, BJJ, and more. Become a complete fighter.
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
