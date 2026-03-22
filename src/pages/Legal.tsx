import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function Legal() {
  const navigate = useNavigate();
  const legalPages = [
    { route: '/privacy-policy', name: 'Privacy Policy', description: 'How we collect, use, and protect your data' },
    { route: '/terms-of-service', name: 'Terms of Service', description: 'Rules and guidelines for using our platform' },
    { route: '/cookie-policy', name: 'Cookie Policy', description: 'How we use cookies and tracking technologies' },
    { route: '/disclaimer', name: 'Disclaimer', description: 'Important legal disclaimers and limitations' },
  ];

  return (
    <div className="min-h-screen py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <h1 className="cc-outline-text text-4xl md:text-5xl font-bold text-white mb-4">
          LEGAL
        </h1>
        <p className="text-[#A0A0A0] text-lg mb-12">
          Access our legal documents and policies
        </p>

        <div className="grid gap-6">
          {legalPages.map((page) => (
            <button
              key={page.route}
              onClick={() => navigate(page.route)}
              className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 rounded-lg text-left hover:border-[#B11226] transition-all group"
            >
              <h2 className="cc-outline-text text-2xl font-bold text-white mb-2 group-hover:text-[#B11226] transition-colors">
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
