import BackButton from '../components/BackButton';

interface LegalProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export default function Legal({ onNavigate, onBack }: LegalProps) {
  const legalPages = [
    { id: 'PrivacyPolicy', name: 'Privacy Policy', description: 'How we collect, use, and protect your data' },
    { id: 'TermsOfService', name: 'Terms of Service', description: 'Rules and guidelines for using our platform' },
    { id: 'CookiePolicy', name: 'Cookie Policy', description: 'How we use cookies and tracking technologies' },
    { id: 'Disclaimer', name: 'Disclaimer', description: 'Important legal disclaimers and limitations' },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <BackButton onBack={onBack} />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 heading-font">
          LEGAL
        </h1>
        <p className="text-[#A0A0A0] text-lg mb-12">
          Access our legal documents and policies
        </p>

        <div className="grid gap-6">
          {legalPages.map((page) => (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-lg text-left hover:border-[#B11226] transition-all group"
            >
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#B11226] transition-colors">
                {page.name}
              </h2>
              <p className="text-[#A0A0A0]">
                {page.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
