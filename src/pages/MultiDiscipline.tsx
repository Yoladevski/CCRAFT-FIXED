import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, Database } from '../lib/supabase';
import BackButton from '../components/BackButton';

type Discipline = Database['public']['Tables']['disciplines']['Row'];

interface MultiDisciplineProps {
  onNavigate: (page: string, disciplineId?: string) => void;
}

const buttonImages: Record<string, string> = {
  'Boxing': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20boxing.png',
  'Muay Thai': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20mauythai.png',
  'BJJ': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20bjj.png',
  'Karate': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20karate.png',
  'Taekwondo': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20taekwando.png',
  'Judo': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/judo%20new.png',
};

const cardImages: Record<string, string> = {
  'Boxing': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/booxing.PNG',
  'Muay Thai': 'https://i.postimg.cc/qMxH91nW/fightcraft3.jpg',
  'BJJ': 'https://i.postimg.cc/MHT6KD7s/bjjjj.png',
  'Karate': 'https://i.postimg.cc/3xZrFKnC/karate.png',
  'Taekwondo': 'https://i.postimg.cc/MpntyTW0/tikwan.png',
  'Judo': 'https://i.postimg.cc/JzQ751PX/judo.png',
};

export default function MultiDiscipline({ onNavigate }: MultiDisciplineProps) {
  const navigate = useNavigate();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);

  const goToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    async function loadDisciplines() {
      const { data } = await supabase
        .from('disciplines')
        .select('*')
        .order('order_index');

      if (data) {
        setDisciplines(data.filter(d => d.name !== 'Kickboxing'));
      }
      setLoading(false);
    }

    loadDisciplines();
  }, []);

  const handleDisciplineClick = (discipline: Discipline) => {
    if (discipline.name === 'Boxing') {
      onNavigate('BoxingOverview', discipline.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <BackButton onClick={goToHome} />

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 mt-8 text-white"
          style={{
            fontFamily: 'Beantown, sans-serif',
            textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -3px 0 0 #000, 3px 0 0 #000, 0 -3px 0 #000, 0 3px 0 #000'
          }}
        >
          EXPLORE DISCIPLINES
        </h1>

        <p className="text-center text-[#A0A0A0] mb-12">
          Discover the martial arts we teach and start your training journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {disciplines.map((discipline) => {
            const isBoxing = discipline.name === 'Boxing';
            const isClickable = isBoxing;

            return (
              <div
                key={discipline.id}
                className="flex flex-col"
              >
                <div
                  className={`relative h-64 sm:h-72 rounded-lg overflow-hidden border-2 border-[#B11226] ${
                    !isClickable ? 'opacity-60' : ''
                  }`}
                  style={{
                    boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                  }}
                >
                  <div className="absolute inset-0 bg-[#1A1A1A]">
                    <img
                      src={cardImages[discipline.name] || cardImages['Boxing']}
                      alt={discipline.name}
                      className="w-full h-full object-cover object-center brightness-90 contrast-125"
                    />
                  </div>
                </div>

                <div className="h-[2.5rem] flex items-center justify-center px-2 mt-1">
                  {discipline.description && (
                    <p className="text-sm text-[#A0A0A0] text-center line-clamp-2">
                      {discipline.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDisciplineClick(discipline)}
                  className={`mt-1 focus:outline-none group w-full ${!isClickable ? 'cursor-not-allowed opacity-60' : ''}`}
                >
                  <div className="w-full h-[205px] sm:h-[256px] flex items-center justify-center">
                    <img
                      src={buttonImages[discipline.name] || buttonImages['Boxing']}
                      alt={`${discipline.name} button`}
                      className={`max-w-full max-h-full object-contain transition-transform duration-200 ${isClickable ? 'group-hover:scale-105' : ''}`}
                    />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
