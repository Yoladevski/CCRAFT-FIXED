import BackButton from '../components/BackButton';

interface CookiePolicyProps {
  onBack: () => void;
}

export default function CookiePolicy({ onBack }: CookiePolicyProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <BackButton onBack={onBack} />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 heading-font">
          COOKIE POLICY
        </h1>

        <div className="space-y-8 text-[#E0E0E0]">
          <p className="text-lg leading-relaxed">
            COMBATCRAFT uses cookies to enhance user experience.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 heading-font">Cookies may be used to:</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Maintain login sessions</li>
              <li>Store user preferences</li>
              <li>Analyze platform usage</li>
            </ul>
          </section>

          <section className="mt-8">
            <p className="leading-relaxed">
              Users may disable cookies through browser settings, though some functionality may be limited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
