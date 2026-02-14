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

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:scale-75"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%231A1A1A'/%3E%3C/svg%3E"
        >
          <source
            src="https://image2url.com/r2/default/videos/1770858582620-ae5b1808-3859-4637-b784-cc115c44e502.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-20 text-center px-6 max-w-6xl animate-fade-in flex flex-col h-full justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 tracking-[0.05em] leading-tight" style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.9), -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000' }}>
            MASTER YOUR CRAFT
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#A0A0A0] mb-14 sm:mb-16 tracking-[0.08em] max-w-4xl mx-auto" style={{ textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.9)' }}>
            Structured AI Powered<br />Combat Training
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <button
              onClick={() => onNavigate(user ? 'Dashboard' : 'Auth')}
              className="w-full sm:w-auto px-12 py-6 bg-[#B11226] text-white text-xl font-bold rounded-lg hover:bg-[#8B0E1C] transition-all transform hover:scale-105 shadow-lg tracking-wide"
              style={{ textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 1px 1px 3px rgba(0, 0, 0, 0.9)' }}
            >
              START TRAINING
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 bg-[#0E0E0E] relative">
        <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#2E2E2E] hover:border-[#B11226] transition-all transform hover:scale-105">
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/D0fKBBM2/fightcraft1.jpg"
                  alt="Structured Progression"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">STRUCTURED PROGRESSION</h3>
              <p className="text-[#A0A0A0] text-center text-body leading-relaxed">
                Sequential unlock system ensures mastery before advancement. Build foundations properly.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#2E2E2E] hover:border-[#B11226] transition-all transform hover:scale-105">
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/fyWhBBrT/fightcraft2.jpg"
                  alt="AI Enhanced Instruction"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">AI ENHANCED INSTRUCTION</h3>
              <p className="text-[#A0A0A0] text-center text-body leading-relaxed">
                Detailed technique breakdowns with common mistakes and tactical applications.
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#2E2E2E] hover:border-[#B11226] transition-all transform hover:scale-105">
              <div className="mb-6 mx-auto flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/zvD100cG/fightcraft3.jpg"
                  alt="Multi Discipline System"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">MULTI DISCIPLINE SYSTEM</h3>
              <p className="text-[#A0A0A0] text-center text-body leading-relaxed">
                Train across Boxing, Muay Thai, BJJ, and more. Become a complete fighter.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
