import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface BoxingOverviewProps {
  onNavigate: (page: string, id?: string) => void;
}

export default function BoxingOverview({ onNavigate }: BoxingOverviewProps) {
  const navigate = useNavigate();
  const { disciplineId } = useParams<{ disciplineId: string }>();

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
            BOXING
          </h1>
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mt-2 tracking-wide">
            Choose Your Training
          </h2>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={() => navigate('/boxing/foundations')}
              className="flex-1 relative group rounded-2xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer min-h-[140px] sm:min-h-[180px] flex items-center justify-center bg-transparent border-0 p-0"
            >
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/technique%20librarytrans%20(1).png"
                alt="Foundation Pathway"
                className="w-full h-full object-contain"
              />
            </button>

            <div
              className="flex-1 rounded-2xl border-2 border-[#B11226] p-6 sm:p-8 min-h-[140px] sm:min-h-[180px] flex items-center"
              style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                The Foundation Pathway is a structured beginner progression that builds boxing fundamentals step by step. Each level introduces movement, control and combinations. Users must complete each level before unlocking the next stage.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div
              className="flex-1 rounded-2xl border-2 border-[#B11226] p-6 sm:p-8 min-h-[140px] sm:min-h-[180px] flex items-center order-2 sm:order-1"
              style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                The Technique Library contains the full boxing technique database where users can explore punches, defence, footwork and combinations individually.
              </p>
            </div>

            <button
              onClick={() => onNavigate('Discipline', disciplineId)}
              className="flex-1 relative group rounded-2xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer min-h-[140px] sm:min-h-[180px] flex items-center justify-center order-1 sm:order-2 bg-transparent border-0 p-0"
            >
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/techniquetrans.png"
                alt="Technique Library"
                className="w-full h-full object-contain"
              />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button
              onClick={() => navigate('/boxing-workouts')}
              className="flex-1 relative group rounded-2xl border-2 border-[#B11226] overflow-hidden transition-all hover:scale-[1.02] cursor-pointer min-h-[140px] sm:min-h-[180px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
              }}
            >
              <span
                className="cc-outline-text text-2xl sm:text-3xl font-bold tracking-widest px-4 text-center"
              >
                WORK OUTS
              </span>
            </button>

            <div
              className="flex-1 rounded-2xl border-2 border-[#B11226] p-6 sm:p-8 min-h-[140px] sm:min-h-[180px] flex items-center"
              style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #0E0E0E 100%)',
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
              }}
            >
              <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                Structured training sessions designed to apply techniques through timed rounds and drills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
