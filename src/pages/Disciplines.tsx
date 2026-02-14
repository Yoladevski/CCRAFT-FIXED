import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

type Discipline = Database['public']['Tables']['disciplines']['Row'];

interface DisciplinesProps {
  onNavigate: (page: string, disciplineId?: string) => void;
}

export default function Disciplines({ onNavigate }: DisciplinesProps) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDisciplines() {
      const { data } = await supabase
        .from('disciplines')
        .select('*')
        .order('order_index');

      if (data) {
        setDisciplines(data);
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

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12">
          CHOOSE YOUR DISCIPLINE
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((discipline) => (
            <button
              key={discipline.id}
              onClick={() =>
                discipline.is_active && onNavigate('Discipline', discipline.id)
              }
              disabled={!discipline.is_active}
              className={`relative group h-64 rounded-lg overflow-hidden border-2 transition-all transform ${
                discipline.is_active
                  ? 'border-[#2E2E2E] hover:border-[#B11226] hover:scale-105 cursor-pointer'
                  : 'border-[#2E2E2E] opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

              {!discipline.is_active && (
                <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center">
                  <div className="text-center">
                    <Lock size={48} className="mx-auto mb-4 text-[#A0A0A0]" />
                    <p className="text-xl font-bold text-[#A0A0A0]">COMING SOON</p>
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                <h3 className="text-2xl font-bold mb-2">{discipline.name}</h3>
                {discipline.description && (
                  <p className="text-sm text-[#A0A0A0] text-body">
                    {discipline.description}
                  </p>
                )}
              </div>

              <div className="absolute inset-0 bg-[#1A1A1A]">
                <img
                  src={
                    discipline.name === 'Boxing'
                      ? 'https://images.pexels.com/photos/4761774/pexels-photo-4761774.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : discipline.name === 'Muay Thai'
                      ? 'https://images.pexels.com/photos/7045856/pexels-photo-7045856.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : discipline.name === 'BJJ'
                      ? 'https://images.pexels.com/photos/7045594/pexels-photo-7045594.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : discipline.name === 'Kickboxing'
                      ? 'https://images.pexels.com/photos/7045849/pexels-photo-7045849.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : discipline.name === 'Karate'
                      ? 'https://images.pexels.com/photos/7045577/pexels-photo-7045577.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : discipline.name === 'Taekwondo'
                      ? 'https://images.pexels.com/photos/7045624/pexels-photo-7045624.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : discipline.name === 'Judo'
                      ? 'https://images.pexels.com/photos/6253310/pexels-photo-6253310.jpeg?auto=compress&cs=tinysrgb&w=800'
                      : 'https://images.pexels.com/photos/4761792/pexels-photo-4761792.jpeg?auto=compress&cs=tinysrgb&w=800'
                  }
                  alt={discipline.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
