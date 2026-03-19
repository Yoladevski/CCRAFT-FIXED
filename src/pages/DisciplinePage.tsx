import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-[#A0A0A0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={18} />
          </button>
          {discipline?.name === 'Boxing' && (
            <button
              onClick={() => navigate(`/boxing/${disciplineId}`)}
              className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
              <span className="text-body font-medium">BOXING MENU</span>
            </button>
          )}
          {discipline?.name !== 'Boxing' && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
              <span className="text-body font-medium">BACK</span>
            </button>
          )}
        </div>

        <h1 className="cc-outline-text text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 sm:mb-12">
          {discipline?.name === 'Boxing' ? 'TECHNIQUE LIBRARY' : discipline?.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                category.is_active && onNavigate('Category', category.id)
              }
              disabled={!category.is_active}
              className={`relative group h-48 rounded-2xl overflow-hidden border-2 transition-all transform ${
                category.is_active
                  ? 'border-[#B11226] hover:scale-105 cursor-pointer'
                  : 'border-[#2E2E2E] opacity-60 cursor-not-allowed'
              }`}
              style={category.is_active ? {
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              } : undefined}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E]" />
              <BGPattern variant="grid" fill="#2a2a2a" size={20} mask="fade-edges" />

              {!category.is_active && (
                <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center">
                  <div className="text-center">
                    <Lock size={40} className="mx-auto mb-3 text-[#A0A0A0]" />
                    <p className="text-lg font-bold text-[#A0A0A0]">LOCKED</p>
                  </div>
                </div>
              )}

              <div className="relative z-10 h-full flex items-center justify-center p-6">
                <h3 className="cc-outline-text text-3xl font-bold text-center">{category.name}</h3>
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
