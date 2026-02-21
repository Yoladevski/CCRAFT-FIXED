import { useAuth } from '../contexts/AuthContext';
import { BGPattern } from '../components/ui/bg-pattern';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { user } = useAuth();

  return (
    <div>
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden -mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0E0E0E] z-10" />

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
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

        <div className="relative z-20 text-center px-6 max-w-6xl animate-fade-in flex flex-col h-full justify-center pt-12">
          <p
            className="text-white mb-8 lg:mb-16 -mt-2.5 lg:mt-0 tracking-[0.08em] mx-auto"
            style={{
              fontSize: 'clamp(1.452rem, 4.95vw, 2.475rem)',
              lineHeight: '1.5',
              textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9)',
              fontFamily: 'Redhawk, sans-serif',
              fontWeight: 700,
            }}
          >
            <span className="block" style={{ fontFamily: 'Redhawk, sans-serif', fontWeight: 700 }}>Structured Training</span>
            <span className="block" style={{ fontFamily: 'Redhawk, sans-serif', fontWeight: 700 }}>Powered by AI</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-8 lg:mb-16 mt-2.5 lg:mt-0">
            <button
              onClick={() => onNavigate(user ? 'Dashboard' : 'Auth')}
              className="bg-[#B11226] text-white font-bold rounded-lg hover:bg-[#8B0E1C] transition-all transform hover:scale-105 shadow-lg tracking-wide"
              style={{
                fontSize: 'clamp(1.2375rem, 4.125vw, 1.65rem)',
                padding: 'clamp(0.5775rem, 1.98vw, 1.2375rem) clamp(1.65rem, 4.95vw, 2.8875rem)',
                display: 'inline-block',
                textAlign: 'center',
                textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 1px 1px 3px rgba(0, 0, 0, 0.9)',
                fontFamily: 'Redhawk, sans-serif',
                fontWeight: 700,
              }}
            >
              START TRAINING
            </button>
          </div>

          <div className="text-center mt-5 lg:mt-0">
            <p
              className="font-bold tracking-[0.08em] leading-snug mx-auto"
              style={{
                fontSize: 'clamp(1.2375rem, 3.3vw, 1.65rem)',
                textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9)',
                fontFamily: 'Redhawk, sans-serif',
                fontWeight: 700,
              }}
            >
              <span className="hidden lg:inline" style={{ whiteSpace: 'nowrap', fontFamily: 'Redhawk, sans-serif', fontWeight: 700 }}>Train with purpose, improve with structure.</span>
              <span className="lg:hidden block" style={{ whiteSpace: 'pre-line', fontFamily: 'Redhawk, sans-serif', fontWeight: 700 }}>{'Train with purpose\nImprove with structure.'}</span>
            </p>
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
