import { Mail } from 'lucide-react';
import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface ContactProps {
  onBack: () => void;
}

export default function Contact({ onBack }: ContactProps) {
  return (
    <div className="min-h-screen py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onClick={onBack} />
        </div>
        <h1 className="cc-outline-text text-4xl md:text-5xl font-bold text-white mb-12">
          CONTACT
        </h1>

        <div className="space-y-8 text-[#E0E0E0] text-lg leading-relaxed">
          <p>
            For support, inquiries, or partnerships, contact:
          </p>

          <div className="space-y-6 mt-8">
            <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-lg flex items-center gap-4 relative overflow-hidden">
              <BGPattern variant="grid" fill="#2a2a2a" size={20} mask="fade-edges" />
              <Mail className="text-[#B11226] flex-shrink-0" size={32} />
              <div>
                <p className="text-[#A0A0A0] text-sm mb-1">Email</p>
                <a
                  href="mailto:support@combatcraft.co.uk"
                  className="text-white hover:text-[#B11226] transition-colors font-semibold"
                >
                  support@combatcraft.co.uk
                </a>
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-lg flex items-center gap-4 relative overflow-hidden">
              <BGPattern variant="grid" fill="#2a2a2a" size={20} mask="fade-edges" />
              <Mail className="text-[#B11226] flex-shrink-0" size={32} />
              <div>
                <p className="text-[#A0A0A0] text-sm mb-1">Business Inquiries</p>
                <a
                  href="mailto:business@combatcraft.co.uk"
                  className="text-white hover:text-[#B11226] transition-colors font-semibold"
                >
                  business@combatcraft.co.uk
                </a>
              </div>
            </div>
          </div>

          <p className="text-[#A0A0A0] mt-8">
            Response time: 1–3 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
