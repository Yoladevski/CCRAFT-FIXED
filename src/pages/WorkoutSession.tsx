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
          <p className="text-[#B11226] text-sm font-semibold tracking-widest uppercase mb-2">
            Session {session.number}
          </p>
          <h1 className="cc-outline-text text-3xl sm:text-4xl md:text-5xl font-bold">
            {session.title.toUpperCase()}
          </h1>
          <p className="text-[#A0A0A0] text-base sm:text-lg mt-3 leading-relaxed">
            {session.description}
          </p>
        </div>

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
      </div>
    </div>
  );
}
