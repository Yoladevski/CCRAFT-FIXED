import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const cards = [
  {
    content: (
      <>
        <p className="mb-4">CombatCraft is a structured martial arts learning platform designed to teach real fighting techniques step-by-step.</p>
        <p className="mb-4">Unlike random tutorials or unstructured training videos, CombatCraft follows a clear progression system similar to how techniques are taught in real gyms. Each discipline is organised into pathways that guide users through the fundamentals first, before unlocking more advanced skills.</p>
        <p>Every lesson focuses on a single technique and breaks it down into clear sections so users understand not only how to perform the movement, but also why it works and when it should be used.</p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="mb-4">Inside each lesson you will find:</p>
        <ul className="space-y-3 inline-block text-left w-full">
          <li>&#8226;&nbsp; A visual demonstration of the technique</li>
          <li>&#8226;&nbsp; Step-by-step coaching instructions</li>
          <li>&#8226;&nbsp; The tactical purpose of the move</li>
          <li>&#8226;&nbsp; Common mistakes beginners make</li>
          <li>&#8226;&nbsp; Simple drills to practise and improve the skill</li>
        </ul>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="mb-4">This approach allows users to develop real understanding rather than simply copying movements.</p>
        <p className="mb-4">CombatCraft is designed for beginners and martial artists who want a structured way to build their skills. Techniques are introduced gradually, allowing users to develop strong foundations before progressing to combinations, defensive systems, and more advanced applications.</p>
        <p className="mb-4">Progress through the platform is tracked through structured pathways, where techniques unlock in sequence as you train. As lessons are completed, users gain experience points, build rank, and unlock new areas of training.</p>
        <p>The goal of CombatCraft is simple: to make learning martial arts accessible, structured, and engaging for anyone who wants to improve their skills.</p>
      </>
    ),
  },
  {
    content: (
      <>
        <p className="mb-4">Users can train at their own pace, revisit techniques as often as needed, and follow a progression system designed to build real fighting fundamentals over time.</p>
        <p className="mb-4">CombatCraft will continue expanding to include multiple martial arts disciplines, allowing users to develop a complete understanding of striking, grappling, and combat fundamentals within one learning platform.</p>
        <p className="mb-4">Train consistently. Progress step-by-step. Build real skill.</p>
        <p className="mb-1 font-bold">CombatCraft.</p>
        <p className="font-bold">Learn like a fighter.</p>
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
                backgroundColor: '#2a2a2a',
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
