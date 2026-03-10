import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BackButton from '../components/BackButton';

interface AIInstructionProps {
  onBack: () => void;
}

const appScreenshots = [
  'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.44.jpeg',
  'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/Capture.PNG',
  'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.11.47.jpeg',
  'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.43%20(2).jpeg',
  'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.43.jpeg',
  'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.43%20(1).jpeg',
  'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.44%20(1).jpeg',
];

export default function AIInstruction({ onBack }: AIInstructionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? appScreenshots.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === appScreenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onClick={onBack} />

        <h1 className="cc-outline-text text-2xl sm:text-3xl font-bold mb-8 text-center mt-8">
          INSIDE THE APP
        </h1>

        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              onClick={goToPrevious}
              className="absolute left-0 z-10 bg-black/50 hover:bg-[#B11226]/80 text-white p-2 sm:p-3 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="w-full max-w-md mx-12 sm:mx-16">
              <div className="relative aspect-[9/16] rounded-lg overflow-hidden border-2 border-[#B11226]" style={{
                boxShadow: '0 0 20px rgba(177, 18, 38, 0.4), 0 0 40px rgba(177, 18, 38, 0.2)'
              }}>
                <img
                  src={appScreenshots[currentIndex]}
                  alt={`App screenshot ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <button
              onClick={goToNext}
              className="absolute right-0 z-10 bg-black/50 hover:bg-[#B11226]/80 text-white p-2 sm:p-3 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {appScreenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#B11226]' : 'bg-[#3E3E3E] hover:bg-[#5E5E5E]'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
