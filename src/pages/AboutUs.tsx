import BackButton from '../components/BackButton';

interface AboutUsProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export default function AboutUs({ onNavigate, onBack }: AboutUsProps) {
  return (
    <div className="min-h-screen py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onClick={onBack} />
        </div>

        <h1 className="cc-outline-text text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-8 text-center leading-tight">
          ABOUT COMBATCRAFT
        </h1>

        <div className="space-y-10 text-[#E0E0E0] text-base sm:text-lg leading-relaxed text-center">

          <section className="space-y-4">
            <p>CombatCraft is a structured martial arts training platform designed to help anyone learn and develop real combat skills step-by-step.</p>
            <p>CombatCraft was created by martial artists who wanted a clearer, more structured way to learn combat sports.</p>
            <p>Traditional combat sports are usually learned in gyms through years of coaching and repetition. While this is the ideal environment, not everyone has regular access to quality coaching or the ability to train consistently in person. CombatCraft was designed to help bridge that gap.</p>
            <p>Our goal is to provide a clear system that teaches martial arts techniques step-by-step, in the same logical order they would typically be taught by experienced coaches.</p>
          </section>

          <section className="space-y-4">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">STRUCTURED LEARNING</h2>
            <p>Many online martial arts resources show techniques without explaining how they fit together. CombatCraft takes a different approach.</p>
            <p>Techniques are organised into structured learning pathways so users develop skills progressively. Each lesson builds on previous techniques, allowing beginners to develop strong foundations before moving into more advanced movements and combinations.</p>
            <p>This structured approach mirrors the way fighters are trained in real gyms.</p>
          </section>

          <section className="space-y-4">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">BUILT BY COACHES</h2>
            <p>CombatCraft is designed by martial arts coaches with real training experience. The goal is to create a learning system that reflects how techniques are actually taught in gyms and training camps.</p>
            <p>Rather than overwhelming users with random techniques, the focus is on building real ability through structured progression and consistent practice.</p>
          </section>

          <section className="space-y-4">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">OUR MISSION</h2>
            <p>CombatCraft's mission is to make structured martial arts training accessible to anyone, anywhere.</p>
            <p>By combining coaching knowledge, structured learning systems, and modern technology, CombatCraft aims to create a platform where people can develop real martial arts skills regardless of location, experience level, or access to a gym.</p>
            <p>The long-term vision is to build a complete training ecosystem that allows users to learn multiple disciplines, improve their skills consistently, and experience the progression of martial arts in a clear and structured way.</p>
          </section>

          <section className="space-y-4">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">THE FUTURE OF COMBATCRAFT</h2>
            <p>CombatCraft begins with boxing as its first discipline, but the platform is designed to grow into a complete martial arts training system.</p>
            <p>Future disciplines will expand the platform to include additional striking and grappling arts, allowing users to develop a wide range of combat skills within a single structured learning system.</p>
          </section>

          <div
            className="bg-[#0D0D0D] border border-[#B11226] rounded-lg p-6 sm:p-8 space-y-4"
            style={{ boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)' }}
          >
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">TRAIN ANYWHERE. PROGRESS STEP BY STEP.</h2>
            <p>CombatCraft is built for anyone who wants to improve their martial arts skills through clear instruction, structured training, and consistent practice.</p>
            <ul className="space-y-1 mt-2">
              <li className="text-white font-semibold">Train at home.</li>
              <li className="text-white font-semibold">Train in the gym.</li>
              <li className="text-white font-semibold">Train at your own pace.</li>
            </ul>
            <p className="text-white font-bold mt-2">CombatCraft is where structured martial arts training begins.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
