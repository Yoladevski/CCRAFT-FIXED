import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

export default function CombatCraft() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <BackButton onClick={goToHome} />

        <h1 className="cc-outline-text text-2xl sm:text-3xl font-bold mb-8 text-center mt-8">
          COMBAT CRAFT
        </h1>

        <div className="space-y-6 text-center" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '12px', fontWeight: 500, color: '#A0A0A0', lineHeight: '1.8' }}>
          <p>CombatCraft is a structured martial arts learning platform designed to teach real fighting techniques step-by-step.</p>

          <p>Unlike random tutorials or unstructured training videos, CombatCraft follows a clear progression system similar to how techniques are taught in real gyms. Each discipline is organised into pathways that guide users through the fundamentals first, before unlocking more advanced skills.</p>

          <p>Every lesson focuses on a single technique and breaks it down into clear sections so users understand not only how to perform the movement, but also why it works and when it should be used.</p>

          <div className="bg-[#1A1A1A] rounded-lg border border-[#B11226]/30 p-6 my-8 text-left">
            <p className="mb-4 text-center" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px' }}>Inside each lesson you will find:</p>
            <ul className="space-y-2 inline-block text-left mx-auto">
              <li>&#8226; A visual demonstration of the technique</li>
              <li>&#8226; Step-by-step coaching instructions</li>
              <li>&#8226; The tactical purpose of the move</li>
              <li>&#8226; Common mistakes beginners make</li>
              <li>&#8226; Simple drills to practise and improve the skill</li>
            </ul>
          </div>

          <p>This approach allows users to develop real understanding rather than simply copying movements.</p>

          <p>CombatCraft is designed for beginners and martial artists who want a structured way to build their skills. Techniques are introduced gradually, allowing users to develop strong foundations before progressing to combinations, defensive systems, and more advanced applications.</p>

          <p>Progress through the platform is tracked through structured pathways, where techniques unlock in sequence as you train. As lessons are completed, users gain experience points, build rank, and unlock new areas of training.</p>

          <p>The goal of CombatCraft is simple: to make learning martial arts accessible, structured, and engaging for anyone who wants to improve their skills.</p>

          <p>Users can train at their own pace, revisit techniques as often as needed, and follow a progression system designed to build real fighting fundamentals over time.</p>

          <p>CombatCraft will continue expanding to include multiple martial arts disciplines, allowing users to develop a complete understanding of striking, grappling, and combat fundamentals within one learning platform.</p>

          <div className="mt-10 space-y-2" style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '14px' }}>
            <p>Train consistently. Progress step-by-step. Build real skill.</p>
            <p>CombatCraft.</p>
            <p>Learn like a fighter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
