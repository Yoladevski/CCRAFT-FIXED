import BackButton from '../components/BackButton';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <BackButton onBack={onBack} />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 heading-font">
          PRIVACY POLICY
        </h1>
        <p className="text-[#A0A0A0] mb-12 text-lg">Effective Date: January 1, 2025</p>

        <div className="space-y-8 text-[#E0E0E0]">
          <p className="text-lg leading-relaxed">
            COMBATCRAFT ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">1. Information We Collect</h2>
            <p className="mb-4 leading-relaxed">We may collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Account information such as email address</li>
              <li>Profile information such as height, weight, experience level</li>
              <li>Usage data such as completed techniques and progress</li>
              <li>Technical data such as device type, browser, and IP address</li>
            </ul>
            <p className="mt-4 font-semibold">We do not sell personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">2. How We Use Information</h2>
            <p className="mb-4 leading-relaxed">We use collected data to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and improve the platform</li>
              <li>Track user progression</li>
              <li>Maintain account functionality</li>
              <li>Enhance training recommendations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">3. Data Security</h2>
            <p className="leading-relaxed">
              We implement industry standard security measures to protect your data. However, no digital platform can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">4. Data Retention</h2>
            <p className="leading-relaxed">
              User data is retained for as long as an account remains active.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">5. Your Rights</h2>
            <p className="leading-relaxed">
              Users may request access, correction, or deletion of their data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">6. Updates</h2>
            <p className="leading-relaxed">
              We may update this policy from time to time. Continued use of the platform constitutes acceptance of any changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
