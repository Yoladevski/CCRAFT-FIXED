import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface AIInstructionProps {
  onBack: () => void;
}

export default function AIInstruction({ onBack }: AIInstructionProps) {
  return (
    <div className="min-h-screen py-8 px-4 relative">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onClick={onBack} />

        <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] p-6 sm:p-12 mt-8">
          <div className="mb-8 flex justify-center">
            <img
              src="https://i.postimg.cc/fyWhBBrT/fightcraft2.jpg"
              alt="AI Enhanced Instruction"
              className="w-32 h-32 object-cover rounded-lg border-2 border-[#B11226]"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            AI ENHANCED INSTRUCTION
          </h1>

          <div className="space-y-6 text-[#E0E0E0] text-body leading-relaxed">
            <p className="text-lg">
              Detailed technique breakdowns with common mistakes and tactical applications.
            </p>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">What is AI Enhanced Instruction?</h2>
              <p>
                COMBATCRAFT leverages cutting-edge artificial intelligence to provide you with the most comprehensive technique instruction available. Every technique in our system includes detailed breakdowns, common mistakes to avoid, and tactical applications—all powered by AI analysis of professional fighters and coaches.
              </p>
            </div>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">What You Get</h2>
              <ul className="space-y-4 list-none">
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">•</span>
                  <div>
                    <span className="font-bold text-white">Step-by-Step Breakdowns:</span> Every technique is broken down into clear, executable steps with precise details on body mechanics, timing, and positioning.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">•</span>
                  <div>
                    <span className="font-bold text-white">Common Mistakes Identified:</span> Learn what NOT to do with our comprehensive list of common errors that beginners and intermediate fighters make.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">•</span>
                  <div>
                    <span className="font-bold text-white">Tactical Applications:</span> Understand when and how to use each technique in real combat situations, including setups and follow-ups.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B11226] font-bold mr-3">•</span>
                  <div>
                    <span className="font-bold text-white">Pro Tips & Insights:</span> Access advanced details and strategic considerations that separate good fighters from great ones.
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">How AI Enhances Your Training</h2>
              <p className="mb-4">
                Our AI system analyzes thousands of techniques from professional fighters, coaches, and combat sports experts to provide:
              </p>
              <ul className="space-y-3 list-disc list-inside ml-4">
                <li>Personalized learning paths based on your skill level</li>
                <li>Detailed explanations that adapt to your progress</li>
                <li>Pattern recognition for common mistakes</li>
                <li>Strategic insights from professional-level analysis</li>
                <li>Continuously updated content based on the latest techniques</li>
              </ul>
            </div>

            <div className="border-t border-[#2E2E2E] pt-6">
              <h2 className="text-2xl font-bold mb-4 text-white">Beyond Traditional Training</h2>
              <p>
                Traditional training relies on what a single coach knows and can communicate in the moment. AI Enhanced Instruction gives you access to the collective knowledge of elite fighters and coaches worldwide, available 24/7, with details no human could consistently recall for every technique.
              </p>
            </div>

            <div className="bg-[#B11226]/10 border border-[#B11226] rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold mb-3 text-white">Your Virtual Coach</h3>
              <p>
                Think of AI Enhanced Instruction as having a world-class coach who never gets tired, never forgets details, and can explain techniques in as much depth as you need. It's not replacing human coaching—it's giving you the best possible preparation for your training sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
