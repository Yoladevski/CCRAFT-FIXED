import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';
import { BGPattern } from '../components/ui/bg-pattern';

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

  return (
    <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20 z-10" />

              {!discipline.is_active && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/Xq2XLnVk/coming-soon.png"
                    alt="Coming Soon"
                    className="w-full h-full object-cover opacity-70"
                  />
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
                      ? 'https://i.postimg.cc/zGrGjPbd/boxing.png'
                      : discipline.name === 'Muay Thai'
                      ? 'https://i.postimg.cc/HxwGnkJn/muaythai.png'
                      : discipline.name === 'BJJ'
                      ? 'https://i.postimg.cc/MHT6KD7s/bjjjj.png'
                      : discipline.name === 'Kickboxing'
                      ? 'https://i.postimg.cc/qRBvLNb4/kickboxing.png'
                      : discipline.name === 'Karate'
                      ? 'https://i.postimg.cc/Bn0hyCYd/karate.png'
                      : discipline.name === 'Taekwondo'
                      ? 'https://i.postimg.cc/zfQSRXBJ/taekwondo.png'
                      : discipline.name === 'Judo'
                      ? 'https://i.postimg.cc/zfxKCJxN/judo.png'
                      : 'https://i.postimg.cc/zGrGjPbd/boxing.png'
                  }
                  alt={discipline.name}
                  className="w-full h-full object-cover object-center brightness-90 contrast-125"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
