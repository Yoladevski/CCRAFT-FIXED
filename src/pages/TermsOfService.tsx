import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] py-16 px-4 sm:px-6 lg:px-8 relative">
      <BGPattern variant="grid" size={24} fill="#252525" mask="fade-edges" />
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onBack={onBack} />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 heading-font">
          TERMS OF SERVICE
        </h1>
        <p className="text-[#A0A0A0] mb-12 text-lg">Effective Date: January 1, 2025</p>

        <div className="space-y-8 text-[#E0E0E0]">
          <p className="text-lg leading-relaxed">
            By accessing or using COMBATCRAFT, you agree to these terms.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">1. Use of Platform</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>COMBATCRAFT provides structured training content for educational and informational purposes only.</li>
              <li>Users must be 16 years or older to create an account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">2. Health Disclaimer</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Combat sports carry risk. Users assume full responsibility for their participation in any physical activity.</li>
              <li>COMBATCRAFT is not liable for injuries resulting from training activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">3. Accounts</h2>
            <p className="leading-relaxed">
              Users are responsible for maintaining the confidentiality of their login credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">4. Intellectual Property</h2>
            <p className="leading-relaxed">
              All platform content, branding, and materials are the property of COMBATCRAFT and may not be reproduced without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">5. Termination</h2>
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">6. Limitation of Liability</h2>
            <p className="leading-relaxed">
              COMBATCRAFT is not liable for indirect, incidental, or consequential damages arising from use of the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
