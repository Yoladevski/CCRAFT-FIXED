import { useNavigate } from 'react-router-dom';
import { BOXING_WORKOUT_SESSIONS } from '../data/boxingWorkouts';
import { BGPattern } from '../components/ui/bg-pattern';
import BackButton from '../components/BackButton';

export default function BoxingWorkouts() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-6 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <BackButton onClick={() => navigate(-1)} />
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h1 className="cc-outline-text text-4xl sm:text-5xl md:text-6xl font-bold">
            WORKOUT SESSIONS
          </h1>
          <p className="text-[#A0A0A0] text-sm sm:text-base mt-3 leading-relaxed max-w-xl mx-auto">
            Structured training sessions designed to apply techniques through timed rounds and drills.
          </p>
        </div>

        {/* WORKOUT FORMAT CARD */}
        <div
          className="rounded-2xl border-2 border-[#B11226] p-4 sm:p-6 mb-6 sm:mb-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
            boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
            isolation: 'isolate',
          }}
        >
          <BGPattern variant="grid" fill="#4a4a4a" size={20} opacity={0.15} />
          <div className="relative z-10">
            <h2
              className="text-white font-bold text-base sm:text-lg mb-3 tracking-wide text-center"
              style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0 0 4px #ff0000' }}
            >
              Workout Format
            </h2>
            <ul className="space-y-2 flex flex-col items-center">
              {[
                '3 minute rounds',
                '1 minute rest',
                '6–7 rounds per session',
                'Suitable for shadow boxing, heavy bag or pad work',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#A0A0A0] text-sm sm:text-base leading-relaxed text-center">
                  <span className="text-[#B11226] font-bold mt-0.5 flex-shrink-0">•</span>
                  <span className="text-center">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SESSIONS CONTAINER CARD */}
        <div
          className="rounded-2xl border-2 p-4 sm:p-6 relative overflow-hidden"
          style={{
            borderColor: '#B11226',
            background: '#1c1c1c',
            boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
            isolation: 'isolate',
          }}
        >
          <BGPattern variant="grid" fill="#4a4a4a" size={20} opacity={0.15} />
          <div className="flex flex-col gap-2 sm:gap-3 relative z-10">
            {BOXING_WORKOUT_SESSIONS.map((session) => (
              <button
                key={session.id}
                onClick={() => navigate(`/boxing-workouts/${session.slug}`)}
                className="w-full flex items-center px-4 sm:px-5 py-3 sm:py-4 rounded-xl transition-all hover:scale-[1.01] cursor-pointer"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(177, 18, 38, 0.6)',
                  boxShadow: '0 0 12px rgba(177, 18, 38, 0.4)',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(177, 18, 38, 0.7), 0 0 40px rgba(177, 18, 38, 0.25)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(177, 18, 38, 0.9)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 12px rgba(177, 18, 38, 0.4)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(177, 18, 38, 0.6)';
                }}
              >
                <div className="flex flex-col gap-1.5 flex-1 text-center min-w-0 px-2">
                  <span
                    className="text-[#B11226] text-xs font-semibold tracking-widest uppercase block"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Session {session.number}
                  </span>
                  <span className="text-white font-bold text-sm sm:text-base tracking-wide block text-center">
                    {session.title}
                  </span>
                  <span className="text-[#A0A0A0] text-xs leading-relaxed block break-words text-center">
                    {session.description}
                  </span>
                </div>
                <svg
                  className="text-[#B11226] flex-shrink-0 ml-3"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
