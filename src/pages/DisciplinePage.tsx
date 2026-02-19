import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';
import { BGPattern } from '../components/ui/bg-pattern';

type Category = Database['public']['Tables']['categories']['Row'];
type Discipline = Database['public']['Tables']['disciplines']['Row'];

interface DisciplinePageProps {
  disciplineId?: string;
  onNavigate: (page: string, id?: string) => void;
}

export default function DisciplinePage({ onNavigate }: DisciplinePageProps) {
  const { id } = useParams<{ id: string }>();
  const disciplineId = id || '';
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDisciplineAndCategories() {
      const { data: disciplineData } = await supabase
        .from('disciplines')
        .select('*')
        .eq('id', disciplineId)
        .single();

      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('discipline_id', disciplineId)
        .order('order_index');

      if (disciplineData) setDiscipline(disciplineData);
      if (categoriesData) setCategories(categoriesData);
      setLoading(false);
    }

    loadDisciplineAndCategories();
  }, [disciplineId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 relative -mt-20 pt-20 sm:pt-24">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => onNavigate('Disciplines')}
            className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-body font-medium">BACK TO DISCIPLINES</span>
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12">
          {discipline?.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                category.is_active && onNavigate('Category', category.id)
              }
              disabled={!category.is_active}
              className={`relative group h-48 rounded-lg overflow-hidden border-2 transition-all transform ${
                category.is_active
                  ? 'border-[#2E2E2E] hover:border-[#B11226] hover:scale-105 cursor-pointer'
                  : 'border-[#2E2E2E] opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E]" />

              {!category.is_active && (
                <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center">
                  <div className="text-center">
                    <Lock size={40} className="mx-auto mb-3 text-[#A0A0A0]" />
                    <p className="text-lg font-bold text-[#A0A0A0]">LOCKED</p>
                  </div>
                </div>
              )}

              <div className="relative z-10 h-full flex items-center justify-center p-6">
                <h3 className="text-3xl font-bold text-center">{category.name}</h3>
              </div>

              {category.is_active && (
                <div className="absolute inset-0 bg-[#B11226]/0 group-hover:bg-[#B11226]/10 transition-colors" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
