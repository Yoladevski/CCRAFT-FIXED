import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BoxingWorkouts() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-6 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-body font-medium">BACK</span>
          </button>
        </div>

        <div className="text-center mb-10 sm:mb-14">
          <h1 className="cc-outline-text text-4xl sm:text-5xl md:text-6xl font-bold">
            WORK OUTS
          </h1>
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mt-2 tracking-wide">
            Boxing Training Sessions
          </h2>
        </div>

        <div
          className="rounded-2xl border-2 border-[#B11226] p-8 sm:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
            boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
          }}
        >
          <p
            className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Structured training sessions are coming soon. This section will feature timed rounds, drills, and
            workout programs designed to apply your techniques in a real training environment.
          </p>
        </div>
      </div>
    </div>
  );
}
