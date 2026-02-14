import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface AboutUsProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export default function AboutUs({ onNavigate, onBack }: AboutUsProps) {
  const companyPages = [
    { id: 'AboutUs', name: 'About Us', description: 'Learn about our mission and values' },
    { id: 'Vision', name: 'Vision', description: 'Our vision for the future of combat training' },
    { id: 'Contact', name: 'Contact', description: 'Get in touch with our team' },
    { id: 'Affiliates', name: 'Affiliates', description: 'Partnership and affiliate opportunities' },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E] py-16 px-4 sm:px-6 lg:px-8 relative">
      <BGPattern variant="grid" size={24} fill="#252525" mask="fade-edges" />
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onBack={onBack} />
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 heading-font">
            ABOUT US
          </h1>

          <div className="space-y-6 text-[#E0E0E0] text-lg leading-relaxed mb-12">
            <p>
              COMBATCRAFT was created to bring structured, scalable combat training into the digital era.
            </p>

            <p>
              Our mission is to combine disciplined progression systems with modern AI driven production to deliver accessible, high quality training experiences.
            </p>

            <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-8 rounded-lg">
              <p className="text-white font-bold text-xl italic text-center">
                We believe training should be structured, measurable, and earned.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-6 heading-font">
            LEARN MORE
          </h2>
          <div className="grid gap-6">
            {companyPages.map((page) => (
              <button
                key={page.id}
                onClick={() => onNavigate(page.id)}
                className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-lg text-left hover:border-[#B11226] transition-all group"
              >
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#B11226] transition-colors">
                  {page.name}
                </h3>
                <p className="text-[#A0A0A0]">
                  {page.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
