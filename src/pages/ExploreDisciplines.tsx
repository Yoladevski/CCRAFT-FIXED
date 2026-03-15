const cardImages: Record<string, string> = {
  'Boxing': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/booxing.PNG',
  'Muay Thai': 'https://i.postimg.cc/qMxH91nW/fightcraft3.jpg',
  'Brazilian Jiu Jitsu': 'https://i.postimg.cc/MHT6KD7s/bjjjj.png',
  'Karate': 'https://i.postimg.cc/3xZrFKnC/karate.png',
  'Taekwondo': 'https://images.pexels.com/photos/7045523/pexels-photo-7045523.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Judo': 'https://i.postimg.cc/JzQ751PX/judo.png',
};

const disciplines = [
  { name: 'Boxing', comingSoon: false },
  { name: 'Muay Thai', comingSoon: true },
  { name: 'Brazilian Jiu Jitsu', comingSoon: true },
  { name: 'Karate', comingSoon: true },
  { name: 'Taekwondo', comingSoon: true },
  { name: 'Judo', comingSoon: true },
];

export default function ExploreDisciplines() {
  return (
    <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="cc-red-shadow-text text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12">
          EXPLORE DISCIPLINES
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {disciplines.map((discipline) => (
            <div key={discipline.name} className="flex flex-col">
              <div
                className="relative h-64 sm:h-72 rounded-lg overflow-hidden border-2 border-[#B11226]"
                style={{
                  boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                }}
              >
                {discipline.comingSoon && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <img
                      src="https://api.combatcraft.co.uk/storage/v1/object/public/images/coming%20soon.png"
                      alt="Coming Soon"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-[#1A1A1A]">
                  <img
                    src={cardImages[discipline.name] || cardImages['Boxing']}
                    alt={discipline.name}
                    className={`w-full h-full object-cover object-center brightness-90 contrast-125 ${discipline.comingSoon ? 'opacity-60' : ''}`}
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p
                    className="text-white text-center font-bold tracking-wider"
                    style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem', letterSpacing: '0.15em' }}
                  >
                    {discipline.name.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
