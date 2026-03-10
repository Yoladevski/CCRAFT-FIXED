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
                fontSize: 'clamp(1.3rem, 4.5vw, 2.7rem)',
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                height: 'clamp(1.6rem, 5.2vw, 3.2rem)',
                letterSpacing: '0.15em',
              }}
            >
              LEARN MARTIAL ARTS
            </OutlinedText>
            <OutlinedText
              style={{
                fontSize: 'clamp(1.3rem, 4.5vw, 2.7rem)',
                fontFamily: 'Orbitron, sans-serif',
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
              gap: '0.4rem',
              width: '100%',
            }}
          >
            <OutlinedText
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mt-[10px]">
            <div
              onClick={() => onNavigate('StructuredProgression')}
              className="bg-[#1A1A1A] p-6 sm:p-8 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-[1.02] cursor-pointer text-left md:col-span-3"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.4), 0 0 30px rgba(177, 18, 38, 0.2)'
              }}
            >
              <h3 className="text-center mb-6" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '19.2px',
                letterSpacing: '5px',
                color: '#FFFFFF',
                WebkitTextStroke: '1px #000000',
                textTransform: 'uppercase'
              }}>
                COMBAT CRAFT
              </h3>
              <div className="space-y-4 text-center" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11.2px', fontWeight: 500, color: '#A0A0A0', lineHeight: '1.8' }}>
                <p>CombatCraft is a structured martial arts learning platform designed to teach real fighting techniques step-by-step.</p>
                <p>Unlike random tutorials or unstructured training videos, CombatCraft follows a clear progression system similar to how techniques are taught in real gyms. Each discipline is organised into pathways that guide users through the fundamentals first, before unlocking more advanced skills.</p>
                <p>Every lesson focuses on a single technique and breaks it down into clear sections so users understand not only how to perform the movement, but also why it works and when it should be used.</p>
                <p className="mt-4 mb-2" style={{ color: '#FFFFFF', fontWeight: 700 }}>Inside each lesson you will find:</p>
                <ul className="space-y-1" style={{ listStyle: 'none' }}>
                  <li>A visual demonstration of the technique</li>
                  <li>Step-by-step coaching instructions</li>
                  <li>The tactical purpose of the move</li>
                  <li>Common mistakes beginners make</li>
                  <li>Simple drills to practise and improve the skill</li>
                </ul>
                <p className="mt-4">This approach allows users to develop real understanding rather than simply copying movements.</p>
                <p>CombatCraft is designed for beginners and martial artists who want a structured way to build their skills. Techniques are introduced gradually, allowing users to develop strong foundations before progressing to combinations, defensive systems, and more advanced applications.</p>
                <p>Progress through the platform is tracked through structured pathways, where techniques unlock in sequence as you train. As lessons are completed, users gain experience points, build rank, and unlock new areas of training.</p>
                <p>The goal of CombatCraft is simple: to make learning martial arts accessible, structured, and engaging for anyone who wants to improve their skills.</p>
                <p>Users can train at their own pace, revisit techniques as often as needed, and follow a progression system designed to build real fighting fundamentals over time.</p>
                <p>CombatCraft will continue expanding to include multiple martial arts disciplines, allowing users to develop a complete understanding of striking, grappling, and combat fundamentals within one learning platform.</p>
                <p className="mt-6" style={{ color: '#FFFFFF', fontWeight: 700 }}>Train consistently. Progress step-by-step. Build real skill.</p>
                <p style={{ color: '#FFFFFF', fontWeight: 700 }}>CombatCraft.</p>
                <p style={{ color: '#FFFFFF', fontWeight: 700 }}>Learn like a fighter.</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('AIInstruction')}
              className="bg-[#1A1A1A] p-8 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer text-left flex flex-col justify-center"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.4), 0 0 30px rgba(177, 18, 38, 0.2)'
              }}
            >
              <h3 className="text-center mb-4" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '19.2px',
                letterSpacing: '5px',
                color: '#FFFFFF',
                WebkitTextStroke: '1px #000000',
                textTransform: 'uppercase'
              }}>
                INSIDE THE APP
              </h3>
              <ul className="text-center space-y-2" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11.2px', fontWeight: 500, color: '#A0A0A0', listStyle: 'none' }}>
                <li>Progress Tracking</li>
                <li>Structured Pathway</li>
                <li>AI Generated Videos</li>
              </ul>
            </button>

            <button
              onClick={() => onNavigate('MultiDiscipline')}
              className="bg-[#1A1A1A] p-8 rounded-lg border border-[#B11226] hover:border-[#B11226] transition-all transform hover:scale-105 cursor-pointer text-left flex flex-col justify-center"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.4), 0 0 30px rgba(177, 18, 38, 0.2)'
              }}
            >
              <h3 className="text-center mb-4" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: '19.2px',
                letterSpacing: '5px',
                color: '#FFFFFF',
                WebkitTextStroke: '1px #000000',
                textTransform: 'uppercase'
              }}>
                EXPLORE DISCIPLINES
              </h3>
              <ul className="text-center space-y-2" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11.2px', fontWeight: 500, color: '#A0A0A0', listStyle: 'none' }}>
                <li>Boxing</li>
                <li>Muay Thai</li>
                <li>Brazilian Jiu-Jitsu</li>
                <li>Wrestling</li>
                <li>Karate</li>
              </ul>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
