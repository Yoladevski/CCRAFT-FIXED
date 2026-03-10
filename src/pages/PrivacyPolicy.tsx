import BackButton from '../components/BackButton';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onBack={onBack} />
        </div>
        <h1 className="cc-outline-text text-4xl md:text-5xl font-bold text-white mb-4">
          PRIVACY POLICY
        </h1>
        <p className="text-[#A0A0A0] mb-12 text-lg">Last Updated: 10/03/2026</p>

        <div className="space-y-8 text-[#E0E0E0]">
          <p className="text-lg leading-relaxed">
            This Privacy Policy explains how CombatCraft collects, uses, and protects your information when you use the CombatCraft platform, including the website, mobile applications, and related services (collectively referred to as the "Platform").
          </p>
          <p className="text-lg leading-relaxed">
            By using CombatCraft, you agree to the practices described in this Privacy Policy.
          </p>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4 leading-relaxed">When you create an account or use CombatCraft, we may collect the following information:</p>

            <h3 className="text-xl font-semibold text-white mb-2">Account Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Email address</li>
              <li>Login credentials</li>
              <li>Account preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">Usage Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Training progress</li>
              <li>Lessons completed</li>
              <li>Interaction with the platform</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">Technical Information</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Device type</li>
              <li>Browser type</li>
              <li>IP address</li>
              <li>Basic analytics information</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-2">Payment Information</h3>
            <p className="mb-2 leading-relaxed">Payments are processed securely through third-party payment providers.</p>
            <p className="leading-relaxed">CombatCraft does not store or have access to your full payment card details.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4 leading-relaxed">CombatCraft uses collected information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Create and manage your account</li>
              <li>Track training progress and user experience</li>
              <li>Provide access to training content</li>
              <li>Process subscriptions and payments</li>
              <li>Improve the platform and services</li>
              <li>Communicate important updates</li>
            </ul>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">3. Payment Processing</h2>
            <p className="mb-4 leading-relaxed">Payments and subscriptions are processed through third-party payment providers such as:</p>
            <p className="mb-4 leading-relaxed font-semibold">Stripe</p>
            <p className="leading-relaxed">These providers handle payment details securely. CombatCraft does not store credit card information on its servers.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">4. How We Protect Your Information</h2>
            <p className="mb-4 leading-relaxed">CombatCraft takes reasonable steps to protect user information through:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>secure systems and infrastructure</li>
              <li>encrypted connections where appropriate</li>
              <li>restricted access to sensitive data</li>
            </ul>
            <p className="leading-relaxed">While we take reasonable security measures, no system can guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">5. Sharing of Information</h2>
            <p className="mb-4 leading-relaxed">CombatCraft does not sell or rent personal information to third parties.</p>
            <p className="mb-4 leading-relaxed">Information may only be shared with trusted service providers that help operate the platform, including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>payment processors</li>
              <li>hosting providers</li>
              <li>analytics tools</li>
            </ul>
            <p className="leading-relaxed">These providers only receive the minimum information required to perform their services.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">6. Data Retention</h2>
            <p className="mb-4 leading-relaxed">We retain user data only for as long as necessary to provide the CombatCraft service or comply with legal obligations.</p>
            <p className="leading-relaxed">Users may request deletion of their account and associated data.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">7. Your Rights</h2>
            <p className="mb-4 leading-relaxed">Depending on your location and applicable law, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>access your personal data</li>
              <li>request correction of inaccurate data</li>
              <li>request deletion of your account data</li>
              <li>withdraw consent for certain processing activities</li>
            </ul>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">8. Cookies and Analytics</h2>
            <p className="mb-4 leading-relaxed">CombatCraft may use cookies or analytics tools to understand how users interact with the platform.</p>
            <p className="leading-relaxed">This helps improve functionality and user experience.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
            <p className="mb-4 leading-relaxed">CombatCraft is intended for users aged 16 years or older.</p>
            <p className="leading-relaxed">Users under 18 must obtain parental or guardian consent before using the platform.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
            <p className="mb-4 leading-relaxed">CombatCraft may update this Privacy Policy from time to time.</p>
            <p className="leading-relaxed">Updates will be posted on the platform and the revised date will be updated above.</p>
          </section>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">11. Contact</h2>
            <p className="mb-4 leading-relaxed">If you have questions about this Privacy Policy or your personal data, please contact:</p>
            <p className="leading-relaxed font-semibold">support@combatcraft.co.uk</p>
          </section>

          <p className="text-lg leading-relaxed mt-8 pt-8 border-t border-[#2E2E2E]">
            By using CombatCraft you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
