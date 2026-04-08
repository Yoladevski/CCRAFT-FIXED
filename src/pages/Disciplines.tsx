import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Auth from './Auth';

type Discipline = Database['public']['Tables']['disciplines']['Row'];

const buttonImages: Record<string, string> = {
  'Boxing': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20boxing%20(2).png',
  'Muay Thai': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20mauythai.png',
  'BJJ': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20bjj.png',
  'Karate': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20karate.png',
  'Taekwondo': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/new%20taekwando%20(2).png',
  'Judo': 'https://api.combatcraft.co.uk/storage/v1/object/public/images/buttons/judo%20new.png',
};

export default function Disciplines() {
  const navigate = useNavigate();
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
    return <Auth />;
  }

  return (
    <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 sm:cc-red-shadow-text"
          style={{
            fontFamily: "'OrbitronBold', 'Orbitron', sans-serif",
            fontWeight: 700,
            color: '#FFFFFF',
            textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          CHOOSE YOUR DISCIPLINE
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {disciplines.map((discipline) => (
            <div key={discipline.id} className="flex flex-col">
              <button
                onClick={() => {
                  if (!discipline.is_active && !isAdmin) return;
                  if (discipline.name === 'Boxing') {
                    navigate(`/boxing/${discipline.id}`);
                  } else {
                    navigate(`/discipline/${discipline.id}`);
                  }
                }}
                disabled={!discipline.is_active && !isAdmin}
                className={`focus:outline-none group w-full ${!discipline.is_active && !isAdmin ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                <div
                  className="w-full h-[205px] sm:h-[256px] flex items-center justify-center"
                  style={{ filter: 'drop-shadow(0 0 9px rgba(177,18,38,0.7)) drop-shadow(0 0 20px rgba(177,18,38,0.4))' }}
                >
                  <img
                    src={buttonImages[discipline.name] || buttonImages['Boxing']}
                    alt={`${discipline.name} button`}
                    loading="lazy"
                    decoding="async"
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
