import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface StructuredProgressionProps {
  onBack: () => void;
}

export default function StructuredProgression({ onBack }: StructuredProgressionProps) {
  return (
    <div className="min-h-screen py-8 px-4 relative">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onClick={onBack} />

        <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] p-6 sm:p-12 mt-8">
          <div className="mb-8 flex justify-center">
            <img
              src="https://i.postimg.cc/D0fKBBM2/fightcraft1.jpg"
              alt="Structured Progression"
              className="w-32 h-32 object-cover rounded-lg border-2 border-[#B11226]"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            STRUCTURED PROGRESSION
          </h1>

          <div className="space-y-6 text-[#E0E0E0] text-body leading-relaxed">
            <p className="text-lg">
              Sequential unlock system ensures mastery before advancement. Build foundations properly.
            </p>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">What is Structured Progression?</h2>
              <p>
                Our structured progression system is built on the principle that mastery comes from solid foundations. Unlike traditional training where you can jump between techniques randomly, COMBATCRAFT uses a sequential unlock system that ensures you've truly mastered the fundamentals before moving forward.
              </p>
            </div>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">How It Works</h2>
              <ul className="space-y-4 list-none">
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">1.</span>
                  <div>
                    <span className="font-bold text-white">Start with Fundamentals:</span> Every discipline begins with core techniques that form the foundation of your training.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">2.</span>
                  <div>
                    <span className="font-bold text-white">Master Each Level:</span> Complete all techniques in your current section before unlocking the next level.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">3.</span>
                  <div>
                    <span className="font-bold text-white">Track Your Progress:</span> Visual indicators show which techniques you've completed and what's available next.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">4.</span>
                  <div>
                    <span className="font-bold text-white">Build Systematically:</span> Each technique builds upon previous ones, creating a comprehensive skill set.
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Why This Matters</h2>
              <p className="mb-4">
                Many fighters plateau because they skip fundamentals or train techniques beyond their current skill level. Our structured approach prevents this by:
              </p>
              <ul className="space-y-3 list-disc list-inside ml-4">
                <li>Ensuring proper technique development from day one</li>
                <li>Building muscle memory through progressive complexity</li>
                <li>Preventing bad habits that come from rushing ahead</li>
                <li>Creating confidence through proven mastery</li>
                <li>Establishing clear goals and measurable progress</li>
              </ul>
            </div>

            <div className="bg-[#B11226]/10 border border-[#B11226] rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-3 text-white">The COMBATCRAFT Difference</h3>
              <p>
                We don't just show you techniques—we guide you through a proven progression system used by professional fighters and coaches worldwide. Every step is purposeful, every technique is earned, and your foundation becomes unshakeable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
