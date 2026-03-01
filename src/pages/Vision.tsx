import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface VisionProps {
  onBack: () => void;
}

export default function Vision({ onBack }: VisionProps) {
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
          VISION
        </h1>

        <div className="space-y-8 text-[#E0E0E0] text-lg leading-relaxed">
          <p>
            Our vision is to build the leading structured combat progression platform in the world.
          </p>

          <section>
            <h2 className="cc-outline-text text-2xl font-bold text-white mb-4">We aim to:</h2>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li>Standardize digital fight education</li>
              <li>Create scalable AI enhanced instruction</li>
              <li>Build a ranking and progression ecosystem</li>
              <li>Empower disciplined training worldwide</li>
            </ul>
          </section>

          <div className="bg-[#1A1A1A] border-l-4 border-[#B11226] p-8 mt-8">
            <p className="text-white font-bold text-xl text-center">
              COMBATCRAFT is built around progression, not shortcuts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
