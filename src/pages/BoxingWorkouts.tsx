import { useNavigate } from 'react-router-dom';
import { BOXING_WORKOUT_SESSIONS } from '../data/boxingWorkouts';
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
            background: '#000000',
            boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
            isolation: 'isolate',
          }}
        >
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

        {/* SESSIONS LIST */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {BOXING_WORKOUT_SESSIONS.map((session) => (
            <button
              key={session.id}
              onClick={() => navigate(`/boxing-workouts/${session.slug}`)}
              className="w-full flex items-center cursor-pointer transition-all sm:hover:scale-[1.01] card-btn"
              style={{
                background: '#000000',
                border: '1px solid rgba(177, 18, 38, 0.6)',
                borderRadius: '0.625rem',
                boxShadow: '0 0 10px rgba(177, 18, 38, 0.35)',
                padding: '0.875rem 0.875rem 0.875rem 1rem',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 18px rgba(177, 18, 38, 0.65), 0 0 36px rgba(177, 18, 38, 0.2)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(177, 18, 38, 0.9)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 10px rgba(177, 18, 38, 0.35)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(177, 18, 38, 0.6)';
              }}
            >
              <div className="flex flex-col gap-1 flex-1 text-left min-w-0">
                <span
                  className="text-[#B11226] text-[10px] font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  Session {session.number}
                </span>
                <span
                  className="text-white font-bold text-sm sm:text-base tracking-wide"
                  style={{ fontFamily: 'Orbitron, sans-serif', lineHeight: 1.3 }}
                >
                  {session.title}
                </span>
                <span className="text-[#A0A0A0] text-[11px] sm:text-xs leading-relaxed break-words mt-0.5">
                  {session.description}
                </span>
              </div>
              <svg
                className="text-[#B11226] flex-shrink-0 ml-2"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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
  );
}
