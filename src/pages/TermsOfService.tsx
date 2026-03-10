import BackButton from '../components/BackButton';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onBack={onBack} />
        </div>
        <h1 className="cc-outline-text text-4xl md:text-5xl font-bold text-white mb-4">
          TERMS OF SERVICE
        </h1>
        <p className="text-[#A0A0A0] mb-12 text-lg">Last Updated: 10/03/2026</p>

        <div className="space-y-8 text-[#E0E0E0]">
          <p className="text-lg leading-relaxed">
            Welcome to CombatCraft.
          </p>
          <p className="text-lg leading-relaxed">
            These Terms of Service govern your access to and use of the CombatCraft platform, including the CombatCraft website, applications, training content, and services (collectively referred to as the "Platform").
          </p>
          <p className="text-lg leading-relaxed">
            By creating an account or using CombatCraft, you agree to these Terms.
          </p>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">1. About CombatCraft</h2>
            <p className="mb-4 leading-relaxed">CombatCraft is a digital training platform designed to provide structured martial arts education through instructional videos, lessons, drills, and training pathways.</p>
            <p className="mb-4 leading-relaxed">CombatCraft provides educational content related to martial arts disciplines including, but not limited to, boxing and other combat sports.</p>
            <p className="leading-relaxed">CombatCraft does not provide personalised coaching or real-time supervision.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">2. Eligibility</h2>
            <p className="mb-4 leading-relaxed">To use CombatCraft you must:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Be at least 16 years of age, or</li>
              <li>Have permission from a parent or legal guardian if under 18.</li>
            </ul>
            <p className="leading-relaxed">By creating an account you confirm that you meet these eligibility requirements.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">3. User Accounts</h2>
            <p className="mb-4 leading-relaxed">When creating an account you agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Provide accurate information</li>
              <li>Keep your login details secure</li>
              <li>Accept responsibility for all activity under your account</li>
            </ul>
            <p className="mb-4 leading-relaxed">You must not share your account with others.</p>
            <p className="leading-relaxed">CombatCraft reserves the right to suspend or terminate accounts that violate these Terms.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">4. Training and Educational Content</h2>
            <p className="mb-4 leading-relaxed">CombatCraft provides martial arts instruction for educational purposes only.</p>
            <p className="mb-4 leading-relaxed">Participation in any physical activity carries inherent risks. By using the Platform you acknowledge that you train voluntarily and accept responsibility for your training decisions.</p>
            <p className="leading-relaxed">Users are responsible for ensuring they practise techniques safely and in an appropriate training environment.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">5. Subscriptions and Payments</h2>
            <p className="mb-4 leading-relaxed">Certain areas of the Platform may require a paid subscription.</p>
            <p className="mb-4 leading-relaxed">Subscription details, including pricing and billing cycles, will be clearly presented before purchase.</p>
            <p className="mb-4 leading-relaxed">Subscriptions renew automatically unless cancelled before the renewal date.</p>
            <p className="mb-4 leading-relaxed">Payments are processed securely through third-party payment providers.</p>
            <p className="leading-relaxed">CombatCraft does not store payment card information.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">6. Cancellation</h2>
            <p className="mb-4 leading-relaxed">Users may cancel their subscription at any time through their account settings or payment provider.</p>
            <p className="leading-relaxed">Access to premium content will remain available until the end of the current billing period.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
            <p className="mb-4 leading-relaxed">All content available on CombatCraft, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>videos</li>
              <li>lesson materials</li>
              <li>graphics</li>
              <li>text</li>
              <li>branding</li>
            </ul>
            <p className="mb-4 leading-relaxed">is the property of CombatCraft and is protected by intellectual property laws.</p>
            <p className="leading-relaxed">Users may not copy, reproduce, distribute, or commercially use CombatCraft content without written permission.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">8. Acceptable Use</h2>
            <p className="mb-4 leading-relaxed">Users agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the Platform for unlawful purposes</li>
              <li>Attempt to copy or redistribute training content</li>
              <li>Interfere with the operation or security of the Platform</li>
              <li>Use the Platform in a way that harms other users</li>
            </ul>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p className="mb-4 leading-relaxed">To the fullest extent permitted by law, CombatCraft and its creators shall not be liable for any injury, loss, or damage resulting from the use of the Platform or participation in training activities.</p>
            <p className="leading-relaxed">All training activities are performed at the user's own risk.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">10. Platform Changes</h2>
            <p className="leading-relaxed">CombatCraft may update or modify the Platform, features, or content at any time in order to improve the service.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">11. Termination</h2>
            <p className="leading-relaxed">CombatCraft reserves the right to suspend or terminate access to the Platform for users who violate these Terms.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">12. Changes to These Terms</h2>
            <p className="mb-4 leading-relaxed">CombatCraft may update these Terms of Service periodically.</p>
            <p className="leading-relaxed">Users will be notified of significant changes where appropriate.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">13. Contact</h2>
            <p className="mb-4 leading-relaxed">If you have questions regarding these Terms of Service, please contact:</p>
            <p className="leading-relaxed font-semibold">support@combatcraft.co.uk</p>
          </section>

          <p className="text-lg leading-relaxed mt-8 pt-8 border-t border-[#2E2E2E]">
            By using CombatCraft you acknowledge that you have read and agreed to these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
