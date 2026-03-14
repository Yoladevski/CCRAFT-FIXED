import BackButton from '../components/BackButton';

interface HowItWorksProps {
  onBack: () => void;
}

export default function HowItWorks({ onBack }: HowItWorksProps) {
  return (
    <div className="min-h-screen py-6 sm:py-16 px-4 sm:px-6 lg:px-8 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onClick={onBack} />
        </div>

        <h1 className="cc-outline-text text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          HOW IT WORKS
        </h1>

        <div className="space-y-10 text-[#E0E0E0] text-base sm:text-lg leading-relaxed text-center">

          <section className="space-y-4">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">START WITH THE FOUNDATIONS</h2>
            <p>Begin with the CombatCraft training pathway where techniques are introduced step-by-step. This structured progression helps build strong fundamentals before advancing to more complex skills.</p>
          </section>

          <section className="space-y-4">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">LEARN TECHNIQUES CLEARLY</h2>
            <p>Each lesson breaks down techniques through visual demonstrations and coaching explanations so users understand how the movement works and how it should be performed.</p>
          </section>

          <section className="space-y-4">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">TRAIN WITH STRUCTURED WORKOUTS</h2>
            <p>CombatCraft also includes training sessions that apply the techniques learned in lessons. These workouts follow timed rounds similar to real combat sports training and can be completed through shadowboxing, bag work, or partner drills.</p>
          </section>

          <section className="space-y-4">
            <h2 className="cc-outline-text text-2xl sm:text-3xl font-bold text-white">PROGRESS AND DEVELOP SKILLS</h2>
            <p>As users complete lessons and training sessions they continue progressing through the system, unlocking more advanced techniques, combinations and training content.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
