import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';
import { BGPattern } from '../components/ui/bg-pattern';
import { useAuth } from '../contexts/AuthContext';
import Auth from './Auth';

type Discipline = Database['public']['Tables']['disciplines']['Row'];

interface DisciplinesProps {
  onNavigate: (page: string, disciplineId?: string) => void;
}

const buttonImages: Record<string, string> = {
  'Boxing': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/boxing.png',
  'Muay Thai': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/mauythai.png',
  'BJJ': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/bjj.png',
  'Karate': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/karate.png',
  'Taekwondo': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/taekwondo.png',
  'Judo': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/judo.png',
};

const cardImages: Record<string, string> = {
  'Boxing': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/booxing.PNG',
  'Muay Thai': 'https://i.postimg.cc/qMxH91nW/fightcraft3.jpg',
  'BJJ': 'https://i.postimg.cc/MHT6KD7s/bjjjj.png',
  'Karate': 'https://i.postimg.cc/3xZrFKnC/karate.png',
  'Taekwondo': 'https://i.postimg.cc/MpntyTW0/tikwan.png',
  'Judo': 'https://i.postimg.cc/JzQ751PX/judo.png',
};

export default function Disciplines({ onNavigate }: DisciplinesProps) {
  const { user, isAdmin } = useAuth();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">LOADING...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth onNavigate={onNavigate} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: 'url(https://api.combatcraft.co.uk/storage/v1/object/public/images/new%202.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="cc-red-shadow-text text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12">
          CHOOSE YOUR DISCIPLINE
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {disciplines.map((discipline) => (
            <div
              key={discipline.id}
              className="flex flex-col"
            >
              <div
                className={`relative h-64 sm:h-72 rounded-lg overflow-hidden border-2 border-[#B11226] ${
                  !discipline.is_active && !isAdmin ? 'opacity-60' : ''
                }`}
                style={{
                  boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
                }}
              >
                {!discipline.is_active && !isAdmin && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-2 sm:p-4">
                    <img
                      src="https://i.postimg.cc/Xq2XLnVk/coming-soon.png"
                      alt="Coming Soon"
                      className="w-[300%] h-[300%] object-contain"
                      style={{
                        filter: 'drop-shadow(0 0 3px black) drop-shadow(0 0 3px black) drop-shadow(0 0 3px black)'
                      }}
                    />
                  </div>
                )}

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
                onClick={() => (discipline.is_active || isAdmin) && onNavigate('Discipline', discipline.id)}
                disabled={!discipline.is_active && !isAdmin}
                className={`mt-1 focus:outline-none group w-full ${!discipline.is_active && !isAdmin ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                <div className="w-full h-[205px] sm:h-[256px] flex items-center justify-center">
                  <img
                    src={buttonImages[discipline.name] || buttonImages['Boxing']}
                    alt={`${discipline.name} button`}
                    className="max-w-full max-h-full object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                {!discipline.is_active && isAdmin && (
                  <span className="block text-xs text-[#B11226] mt-1 text-center">(ADMIN ACCESS)</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
