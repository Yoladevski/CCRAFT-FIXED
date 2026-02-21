import { useAuth } from '../contexts/AuthContext';
import { BGPattern } from '../components/ui/bg-pattern';

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
            className="w-full h-full"
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
            className="hero-top-text text-white tracking-[0.08em] animate-fade-in"
            style={{
              fontSize: 'clamp(1.452rem, 4.95vw, 2.475rem)',
              lineHeight: '1.5',
              textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9)',
              fontFamily: 'Redhawk, sans-serif',
              fontWeight: 700,
            }}
          >
            <span style={{ fontFamily: 'Redhawk, sans-serif', fontWeight: 700 }}>STRUCTURED TRAINING</span>
            <span style={{ fontFamily: 'Redhawk, sans-serif', fontWeight: 700 }}>POWERED BY AI</span>
          </div>

          <div className="hero-middle-button">
            <button
              onClick={() => onNavigate(user ? 'Dashboard' : 'Auth')}
              className="transition-all transform hover:scale-105 cursor-pointer bg-transparent border-0 p-0"
              style={{
                width: 'clamp(250px, 60vw, 400px)',
                maxWidth: '100%',
              }}
            >
              <img
                src="https://i.postimg.cc/3rvPNrqD/gpptbutton.png"
                alt="Start Training"
                className="w-full h-auto"
                style={{
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5))',
                }}
              />
            </button>
          </div>

          <div
            className="hero-bottom-text font-bold tracking-[0.08em] leading-snug"
            style={{
              fontSize: 'clamp(1.2375rem, 3.3vw, 1.65rem)',
              textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9)',
              fontFamily: 'Redhawk, sans-serif',
              fontWeight: 700,
            }}
          >
            <span style={{ fontFamily: 'Redhawk, sans-serif', fontWeight: 700 }}>TRAIN WITH PURPOSE</span>
            <span style={{ fontFamily: 'Redhawk, sans-serif', fontWeight: 700 }}>IMPROVE WITH STRUCTURE</span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-[#0E0E0E] relative">
        <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <button
              onClick={() => onNavigate('StructuredProgression')}
              className="bg-[#1A1A1A] p-8 rounded-lg border border-[#2E2E2E] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer text-left"
            >
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/D0fKBBM2/fightcraft1.jpg"
                  alt="Structured Progression"
                  className="w-24 h-24 object-cover rounded"
                  width="96"
                  height="96"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">STRUCTURED PROGRESSION</h3>
              <p className="text-[#A0A0A0] text-center text-body leading-relaxed">
                Sequential unlock system ensures mastery before advancement. Build foundations properly.
              </p>
            </button>

            <button
              onClick={() => onNavigate('AIInstruction')}
              className="bg-[#1A1A1A] p-8 rounded-lg border border-[#2E2E2E] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer text-left"
            >
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/fyWhBBrT/fightcraft2.jpg"
                  alt="AI Enhanced Instruction"
                  className="w-24 h-24 object-cover rounded"
                  width="96"
                  height="96"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">AI ENHANCED INSTRUCTION</h3>
              <p className="text-[#A0A0A0] text-center text-body leading-relaxed">
                Detailed technique breakdowns with common mistakes and tactical applications.
              </p>
            </button>

            <button
              onClick={() => onNavigate('MultiDiscipline')}
              className="bg-[#1A1A1A] p-8 rounded-lg border border-[#2E2E2E] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer text-left"
            >
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/zvD100cG/fightcraft3.jpg"
                  alt="Multi Discipline System"
                  className="w-24 h-24 object-cover rounded"
                  width="96"
                  height="96"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">MULTI DISCIPLINE SYSTEM</h3>
              <p className="text-[#A0A0A0] text-center text-body leading-relaxed">
                Train across Boxing, Muay Thai, BJJ, and more. Become a complete fighter.
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
