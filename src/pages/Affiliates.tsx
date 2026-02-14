import { Mail } from 'lucide-react';
import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface AffiliatesProps {
  onBack: () => void;
}

export default function Affiliates({ onBack }: AffiliatesProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onBack={onBack} />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 heading-font">
          AFFILIATES
        </h1>

        <div className="space-y-8 text-[#E0E0E0] text-lg leading-relaxed">
          <p>
            COMBATCRAFT partners with training facilities, equipment brands, and performance platforms.
          </p>

          <p>
            Affiliate partnerships are structured around value, integrity, and performance alignment.
          </p>

          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-8 rounded-lg mt-8">
            <h2 className="text-white font-bold text-xl mb-4 heading-font">Apply for Affiliate Opportunities</h2>
            <div className="flex items-center gap-4">
              <Mail className="text-[#B11226] flex-shrink-0" size={32} />
              <a
                href="mailto:affiliates@combatcraft.com"
                className="text-white hover:text-[#B11226] transition-colors font-semibold text-lg"
              >
                affiliates@combatcraft.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
