import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface DisclaimerProps {
  onBack: () => void;
}

export default function Disclaimer({ onBack }: DisclaimerProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onBack={onBack} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 heading-font">
          DISCLAIMER
        </h1>

        <div className="space-y-8 text-[#E0E0E0] text-lg leading-relaxed">
          <p>
            COMBATCRAFT provides structured training guidance for informational purposes only.
          </p>

          <div className="bg-[#1A1A1A] border-l-4 border-[#B11226] p-6 space-y-4">
            <p className="font-semibold text-white">We do not provide medical advice.</p>
            <p className="font-semibold text-white">We do not replace professional coaching.</p>
          </div>

          <p className="font-semibold">
            Always consult a qualified professional before beginning any training program.
          </p>

          <p className="text-[#B11226] font-bold text-xl">
            Users accept full responsibility for any injuries sustained during training.
          </p>
        </div>
      </div>
    </div>
  );
}
