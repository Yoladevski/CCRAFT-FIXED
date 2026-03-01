import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface CookiePolicyProps {
  onBack: () => void;
}

export default function CookiePolicy({ onBack }: CookiePolicyProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: 'url(https://api.combatcraft.co.uk/storage/v1/object/public/images/new%202.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08
        }}
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onBack={onBack} />
        </div>
        <h1 className="cc-outline-text text-4xl md:text-5xl font-bold text-white mb-12">
          COOKIE POLICY
        </h1>

        <div className="space-y-8 text-[#E0E0E0]">
          <p className="text-lg leading-relaxed">
            COMBATCRAFT uses cookies to enhance user experience.
          </p>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">Cookies may be used to:</h2>
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
