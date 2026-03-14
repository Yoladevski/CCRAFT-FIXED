import BackButton from '../components/BackButton';

interface MerchandiseProps {
  onBack: () => void;
}

export default function Merchandise({ onBack }: MerchandiseProps) {
  return (
    <div className="min-h-screen text-white relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <BackButton onClick={onBack} />

        <div className="text-center mb-8 sm:mb-12 mt-8">
          <h1
            className="cc-outline-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-wide"
          >
            MERCHANDISE
          </h1>
          <div className="w-24 h-1 bg-[#B11226] mx-auto mb-6" />
          <p className="text-[#A0A0A0] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            Official COMBATCRAFT gear. Represent the grind.
          </p>
        </div>

        <div
          className="mt-12 sm:mt-16 bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg p-6 sm:p-8 max-w-3xl mx-auto text-center"
          style={{
            boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
          }}
        >
          <div className="w-16 h-16 mx-auto bg-[#B11226]/20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-[#B11226]"
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
            className="cc-outline-text text-xl sm:text-2xl font-bold mb-3"
          >
            STORE OPENING SOON
          </h2>
          <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
            We're finalizing our store setup. Products will be available for purchase soon. Sign up to get notified when we launch.
          </p>
        </div>
      </div>
    </div>
  );
}
