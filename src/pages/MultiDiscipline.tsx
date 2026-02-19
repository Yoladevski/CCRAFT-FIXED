import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface MultiDisciplineProps {
  onBack: () => void;
}

export default function MultiDiscipline({ onBack }: MultiDisciplineProps) {
  return (
    <div className="min-h-screen py-8 px-4 relative">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onClick={onBack} />

        <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] p-6 sm:p-12 mt-8">
          <div className="mb-8 flex justify-center">
            <img
              src="https://i.postimg.cc/zvD100cG/fightcraft3.jpg"
              alt="Multi Discipline System"
              className="w-32 h-32 object-cover rounded-lg border-2 border-[#B11226]"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            MULTI DISCIPLINE SYSTEM
          </h1>

          <div className="space-y-6 text-[#E0E0E0] text-body leading-relaxed">
            <p className="text-lg">
              Train across Boxing, Muay Thai, BJJ, and more. Become a complete fighter.
            </p>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">What is the Multi Discipline System?</h2>
              <p>
                Modern combat sports demand versatility. COMBATCRAFT's Multi Discipline System gives you access to comprehensive training across multiple martial arts and combat sports disciplines, all within a single unified platform. Train like a complete mixed martial artist, not just a specialist.
              </p>
            </div>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Available Disciplines</h2>
              <div className="space-y-4">
                <div className="bg-[#0E0E0E] border border-[#2E2E2E] rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2 text-white">Boxing</h3>
                  <p>Master the sweet science with comprehensive striking techniques, footwork, defense, and combination work that builds elite hand skills.</p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#2E2E2E] rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2 text-white">Muay Thai</h3>
                  <p>Learn the art of eight limbs with detailed instruction on punches, kicks, elbows, knees, clinch work, and the devastating techniques that make Muay Thai so effective.</p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#2E2E2E] rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2 text-white">Brazilian Jiu-Jitsu (Coming Soon)</h3>
                  <p>Develop world-class grappling with positions, submissions, escapes, and the strategic ground game that defines modern MMA.</p>
                </div>
                <div className="bg-[#0E0E0E] border border-[#2E2E2E] rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2 text-white">More Disciplines Coming</h3>
                  <p>We're constantly expanding our system with new disciplines including Wrestling, Kickboxing, Judo, and more.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Why Train Multiple Disciplines?</h2>
              <ul className="space-y-3 list-disc list-inside ml-4">
                <li>Develop a complete skill set for any combat situation</li>
                <li>Understand how different styles complement each other</li>
                <li>Identify and fix weaknesses in your game</li>
                <li>Gain competitive advantages through versatility</li>
                <li>Build a deeper understanding of combat sports</li>
                <li>Stay motivated with diverse training options</li>
              </ul>
            </div>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Integrated Training Approach</h2>
              <p className="mb-4">
                Our Multi Discipline System isn't just a collection of separate martial arts. We've designed it to help you:
              </p>
              <ul className="space-y-4 list-none">
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">→</span>
                  <div>
                    <span className="font-bold text-white">Cross-Train Effectively:</span> Learn how techniques from one discipline enhance another (e.g., Boxing footwork improving your Muay Thai).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">→</span>
                  <div>
                    <span className="font-bold text-white">Build Rounded Skills:</span> Develop striking, clinching, and grappling abilities that work together seamlessly.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">→</span>
                  <div>
                    <span className="font-bold text-white">Progress Systematically:</span> Each discipline uses the same proven progression system, ensuring consistent growth across all areas.
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#B11226]/10 border border-[#B11226] rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-3 text-white">Become a Complete Fighter</h3>
              <p>
                Whether you're training for MMA, looking to improve your overall martial arts skills, or simply want to experience different combat sports, our Multi Discipline System gives you everything you need in one place. Train at your own pace, track progress across all disciplines, and become the well-rounded fighter you've always wanted to be.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
