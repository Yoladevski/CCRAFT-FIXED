import { BGPattern } from '../components/ui/bg-pattern';

interface MerchandiseProps {
  onBack: () => void;
}

export default function Merchandise({ onBack }: MerchandiseProps) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white relative">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-wide"
            style={{ fontFamily: 'Progress, sans-serif' }}
          >
            MERCHANDISE
          </h1>
          <div className="w-24 h-1 bg-[#B11226] mx-auto mb-8" />
          <p className="text-[#A0A0A0] text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Coming Soon
          </p>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 py-12">
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] rounded-lg p-12 sm:p-16 max-w-2xl w-full text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-[#B11226]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-[#B11226]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ fontFamily: 'Progress, sans-serif' }}
              >
                STORE OPENING SOON
              </h2>
              <p className="text-[#A0A0A0] text-base sm:text-lg leading-relaxed">
                We're working on bringing you premium combat sports merchandise. Check back soon for exclusive gear and apparel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
