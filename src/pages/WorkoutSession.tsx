import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { BOXING_WORKOUT_SESSIONS } from '../data/boxingWorkouts';

export default function WorkoutSession() {
  const navigate = useNavigate();
  const { sessionSlug } = useParams<{ sessionSlug: string }>();

  const session = BOXING_WORKOUT_SESSIONS.find(s => s.slug === sessionSlug);

  if (!session) {
    return (
      <div className="min-h-screen py-6 px-4 relative -mt-20 pt-20 sm:pt-24">
        <div className="max-w-3xl mx-auto relative z-10">
          <button
            onClick={() => navigate('/boxing-workouts')}
            className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-body font-medium">BACK</span>
          </button>
          <p className="text-[#A0A0A0] text-center">Session not found.</p>
        </div>
      </div>
    );
  }

  const hasFullContent = session.rounds && session.rounds.length > 0;

  return (
    <div className="min-h-screen py-6 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/boxing-workouts')}
            className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-body font-medium">BACK</span>
          </button>
        </div>

        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[#B11226] text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Session {session.number}
          </p>
          <h1 className="cc-outline-text text-3xl sm:text-4xl md:text-5xl font-bold">
            {session.title.toUpperCase()}
          </h1>
          <p className="text-[#A0A0A0] text-base sm:text-lg mt-3 leading-relaxed">
            {session.description}
          </p>
        </div>

        {hasFullContent ? (
          <div className="flex flex-col gap-4">
            <div
              className="rounded-lg p-5 text-center"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #B11226',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: '1.9',
              }}
            >
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Total Rounds', value: String(session.totalRounds) },
                  { label: 'Round Length', value: session.roundLength ?? '' },
                  { label: 'Rest', value: session.rest ?? '' },
                  { label: 'Suitable For', value: session.suitableFor ?? '' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-[#B11226] uppercase tracking-widest" style={{ fontSize: '9px' }}>{label}</span>
                    <span className="text-white" style={{ fontSize: '11px' }}>{value}</span>
                  </div>
                ))}
              </div>
              {session.focus && (
                <div className="border-t border-[#3a3a3a] pt-3 mt-1">
                  <span className="text-[#B11226] uppercase tracking-widest" style={{ fontSize: '9px' }}>Focus</span>
                  <p className="text-white mt-1" style={{ fontSize: '11px' }}>{session.focus}</p>
                </div>
              )}
            </div>

            {session.coachsBrief && (
              <div
                className="rounded-lg p-5 text-center"
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #B11226',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#ffffff',
                  lineHeight: '1.9',
                }}
              >
                <p className="mb-3 text-[#B11226] uppercase tracking-widest" style={{ fontSize: '9px' }}>
                  Coach's Brief
                </p>
                <p>{session.coachsBrief}</p>
              </div>
            )}

            {session.rounds?.map((round) => (
              <div
                key={round.number}
                className="rounded-lg p-5 text-center"
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #B11226',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#ffffff',
                  lineHeight: '1.9',
                }}
              >
                <p
                  className="mb-4 text-white"
                  style={{ fontWeight: 900, fontSize: '13px', letterSpacing: '0.03em', lineHeight: '1.3' }}
                >
                  Round {round.number} – {round.title.toUpperCase()}
                </p>
                <p>{round.body}</p>
              </div>
            ))}

            {session.closingNote && (
              <div
                className="rounded-lg p-5 text-center"
                style={{
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #B11226',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  color: '#ffffff',
                  lineHeight: '1.9',
                }}
              >
                <p
                  className="mb-4 text-[#B11226] uppercase tracking-widest"
                  style={{ fontSize: '9px' }}
                >
                  Session Complete
                </p>
                <p className="mb-6">{session.closingNote}</p>
                <div className="border-t border-[#3a3a3a] pt-4 flex flex-col gap-1 text-[#A0A0A0]" style={{ fontSize: '10px' }}>
                  <span>Train consistently.</span>
                  <span>Progress step-by-step.</span>
                  <span>Build real skill.</span>
                </div>
                <p
                  className="mt-4 text-white"
                  style={{ fontWeight: 900, fontSize: '13px', letterSpacing: '0.08em' }}
                >
                  COMBATCRAFT
                </p>
              </div>
            )}
          </div>
        ) : (
          <div
            className="rounded-2xl border-2 border-[#B11226] p-4 sm:p-6 text-center"
            style={{
              background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
              boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
            }}
          >
            <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
              Session content coming soon. This workout will include detailed round-by-round instructions, drill breakdowns and technique cues.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
