import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BackButton from '../components/BackButton';

const appScreenshots = [
  {
    url: 'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/vidss.JPG',
    description: 'Each technique is demonstrated through AI-generated video designed to show movements clearly and consistently. The visuals focus on precision so users can study the mechanics of each technique in detail. Real coaches provide the voiceover explanations, combining advanced technology with authentic coaching instruction.',
  },
  {
    url: 'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.44.jpeg',
    description: 'CombatCraft includes a personal dashboard that tracks your training journey. Users can continue their current pathway, view completed techniques and monitor their overall progress. The system also displays rank, power level and completion percentage, giving a clear overview of development through the training program.',
  },
  {
    url: 'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.11.47.jpeg',
    description: 'CombatCraft offers training across multiple martial arts disciplines within one platform. Users can explore systems such as boxing, Muay Thai, Brazilian Jiu-Jitsu and karate, with new disciplines continuously being added. Each discipline follows the same structured pathway approach to develop skills step-by-step.',
  },
  {
    url: 'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.43%20(2).jpeg',
    description: 'Technique library with full access to all moves across disciplines',
  },
  {
    url: 'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.43.jpeg',
    description: 'Coach tips and common mistakes to accelerate your learning',
  },
  {
    url: 'https://api.combatcraft.co.uk/storage/v1/object/public/images/ssc/WhatsApp%20Image%202026-03-10%20at%2016.10.44%20(1).jpeg',
    description: 'Track your progress and unlock new levels as you train',
  },
];

export default function AIInstruction() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToHome = () => {
    navigate('/');
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? appScreenshots.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === appScreenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onClick={goToHome} />

        <h1 className="cc-outline-text text-2xl sm:text-3xl font-bold mb-8 text-center mt-8">
          INSIDE COMBATCRAFT
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
                  src={appScreenshots[currentIndex].url}
                  alt={appScreenshots[currentIndex].description}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center mt-4 px-2" style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                color: '#A0A0A0',
                lineHeight: '1.6',
              }}>
                {appScreenshots[currentIndex].description}
              </p>
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
            {appScreenshots.map((_item, index) => (
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
