import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const cards = [
  {
    content: (
      <>
        <p className="mb-4" style={{ fontWeight: 900, fontSize: '19px', letterSpacing: '0.03em', lineHeight: '1.3' }}>1. Learn Martial Arts The Right Way</p>
        <p>CombatCraft teaches martial arts through structured training designed by real coaches. Instead of random videos or techniques, users follow a clear progression that builds skills step-by-step. This mirrors how fighters are trained in real gyms, helping beginners develop strong fundamentals before advancing to more complex techniques.</p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="mb-4" style={{ fontWeight: 900, fontSize: '19px', letterSpacing: '0.03em', lineHeight: '1.3' }}>2. Clear Lessons & Real Training</p>
        <p>Each technique is demonstrated visually and explained through clear coaching instruction so users understand exactly how the movement works. Lessons are combined with structured training sessions using timed rounds, allowing users to practise techniques through shadowboxing, bag work or partner drills.</p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="mb-4" style={{ fontWeight: 900, fontSize: '19px', letterSpacing: '0.03em', lineHeight: '1.3' }}>3. One Platform For Martial Arts Training</p>
        <p>CombatCraft is designed to become a complete training platform for martial arts. Starting with boxing, the system will expand to include multiple disciplines so users can develop striking, grappling and movement skills all in one place.</p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="mb-4" style={{ fontWeight: 900, fontSize: '19px', letterSpacing: '0.03em', lineHeight: '1.3' }}>4. Who CombatCraft Is For</p>
        <p>CombatCraft is designed for beginners, martial arts enthusiasts and fighters who want structured training they can follow anywhere. Whether training at home, in the gym, or alongside regular classes, the system provides clear guidance to help users improve their skills step-by-step.</p>
      </>
    ),
  },
];

export default function CombatCraft() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onClick={() => navigate('/')} />

        <h1 className="cc-outline-text text-2xl sm:text-3xl font-bold mb-8 text-center mt-8">
          COMBAT CRAFT
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-lg p-5 text-center"
              style={{
                backgroundColor: '#000000',
                border: '1px solid #B11226',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: '1.9',
              }}
            >
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
