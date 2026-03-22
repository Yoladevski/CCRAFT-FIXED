import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

export default function Affiliates() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <h1 className="cc-outline-text text-4xl md:text-5xl font-bold text-white mb-12">
          AFFILIATES
        </h1>

        <div className="space-y-8 text-[#E0E0E0] text-lg leading-relaxed">
          <p>
            COMBATCRAFT partners with training facilities, equipment brands, and performance platforms.
          </p>

          <p>
            Affiliate partnerships are structured around value, integrity, and performance alignment.
          </p>

          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-8 rounded-lg mt-8 relative overflow-hidden">
            <BGPattern variant="grid" fill="#2a2a2a" size={20} mask="fade-edges" />
            <h2 className="cc-outline-text text-white font-bold text-xl mb-4">Apply for Affiliate Opportunities</h2>
            <div className="flex items-center gap-4">
              <Mail className="text-[#B11226] flex-shrink-0" size={32} />
              <a
                href="mailto:affiliates@combatcraft.co.uk"
                className="text-white hover:text-[#B11226] transition-colors font-semibold text-lg"
              >
                affiliates@combatcraft.co.uk
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
