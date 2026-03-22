import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

const newsCards = [
  {
    id: 1,
    title: 'BOXING',
    image: 'https://api.combatcraft.co.uk/storage/v1/object/public/images/booxing.PNG',
    description: 'Explore the latest updates, techniques, and content added to the Boxing discipline.',
  },
  {
    id: 2,
    title: 'COMING NEXT',
    image: 'https://i.postimg.cc/qMxH91nW/fightcraft3.jpg',
    description: 'Muay Thai — the art of eight limbs — is coming soon. Master devastating elbow and knee strikes.',
  },
];

export default function News() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <h1 className="cc-outline-text text-4xl sm:text-5xl font-bold text-center mb-10 sm:mb-14">NEWS</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {newsCards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg overflow-hidden border-2 border-[#B11226] relative"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <BGPattern variant="grid" fill="#2a2a2a" size={20} mask="fade-edges" />
              <div className="h-56 sm:h-64 bg-[#1A1A1A] overflow-hidden relative z-10">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center brightness-90 contrast-125"
                />
              </div>
              <div className="bg-[#2E2E2E] px-5 py-4 relative z-10">
                <h2 className="cc-outline-text text-xl sm:text-2xl font-bold mb-2">{card.title}</h2>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
