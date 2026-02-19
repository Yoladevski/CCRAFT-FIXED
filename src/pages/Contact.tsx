import { Mail } from 'lucide-react';
import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface ContactProps {
  onBack: () => void;
}

export default function Contact({ onBack }: ContactProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onBack={onBack} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 heading-font">
          CONTACT
        </h1>

        <div className="space-y-8 text-[#E0E0E0] text-lg leading-relaxed">
          <p>
            For support, inquiries, or partnerships, contact:
          </p>

          <div className="space-y-6 mt-8">
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-lg flex items-center gap-4">
              <Mail className="text-[#B11226] flex-shrink-0" size={32} />
              <div>
                <p className="text-[#A0A0A0] text-sm mb-1">Email</p>
                <a
                  href="mailto:support@combatcraft.com"
                  className="text-white hover:text-[#B11226] transition-colors font-semibold"
                >
                  support@combatcraft.com
                </a>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-lg flex items-center gap-4">
              <Mail className="text-[#B11226] flex-shrink-0" size={32} />
              <div>
                <p className="text-[#A0A0A0] text-sm mb-1">Business Inquiries</p>
                <a
                  href="mailto:business@combatcraft.com"
                  className="text-white hover:text-[#B11226] transition-colors font-semibold"
                >
                  business@combatcraft.com
                </a>
              </div>
            </div>
          </div>

          <p className="text-[#A0A0A0] mt-8">
            Response time: 1–3 business days.
          </p>

          <div className="border-t border-[#2E2E2E] pt-12 mt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 heading-font">
              AFFILIATES
            </h2>

            <p className="mb-4">
              COMBATCRAFT partners with training facilities, equipment brands, and performance platforms.
            </p>

            <p className="mb-6">
              Affiliate partnerships are structured around value, integrity, and performance alignment.
            </p>

            <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-lg flex items-center gap-4">
              <Mail className="text-[#B11226] flex-shrink-0" size={32} />
              <div>
                <p className="text-[#A0A0A0] text-sm mb-1">Affiliate Opportunities</p>
                <a
                  href="mailto:affiliates@combatcraft.com"
                  className="text-white hover:text-[#B11226] transition-colors font-semibold"
                >
                  affiliates@combatcraft.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
