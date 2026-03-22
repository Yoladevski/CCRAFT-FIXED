import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import BackButton from '../components/BackButton';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';
import { BGPattern } from '../components/ui/bg-pattern';

type Category = Database['public']['Tables']['categories']['Row'];
type Discipline = Database['public']['Tables']['disciplines']['Row'];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Punches': 'From jabs and crosses to hooks and uppercuts. Learn your core striking fundamentals.',
  'Attacks': 'From jabs and crosses to hooks and uppercuts. Learn your core striking fundamentals.',
  'Defence': 'Closed guard, parry, block, slip, lean back, clinch and pivot. Master defensive movement.',
  'Footwork': 'Stance, step back, pivots and positioning. Build balance and control in every movement.',
  'Combos': 'Jab cross, jab cross jab, lead hook cross and more. Learn fluid, fight-ready combinations.',
  'Combinations': 'Jab cross, jab cross jab, lead hook cross and more. Learn fluid, fight-ready combinations.',
};

export default function DisciplinePage() {
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

  const categoryCards = useMemo(() => categories.map((category) => {
    const displayName = category.name === 'Combinations' ? 'Combos' : category.name;
    const description = CATEGORY_DESCRIPTIONS[category.name] || CATEGORY_DESCRIPTIONS[displayName] || '';

    return (
      <button
        key={category.id}
        onClick={() => category.is_active && navigate(`/category/${category.id}`)}
        disabled={!category.is_active}
        className={`relative group overflow-hidden border-2 transition-all card-btn ${
          category.is_active
            ? 'border-[#B11226] sm:hover:scale-105 cursor-pointer'
            : 'border-[#2E2E2E] opacity-60 cursor-not-allowed'
        }`}
        style={{
          ...(category.is_active ? {
            boxShadow: '0 0 10px rgba(177, 18, 38, 0.45), 0 0 22px rgba(177, 18, 38, 0.2), inset 0 0 8px rgba(177, 18, 38, 0.07)',
          } : {}),
          isolation: 'isolate',
          borderRadius: '0.75rem',
          padding: '1.5rem 1.25rem 1.5rem 1.25rem',
          minHeight: '7.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0E0E0E]" />
        <BGPattern variant="grid" fill="#2a2a2a" size={20} mask="fade-edges" />

        {!category.is_active && (
          <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Lock size={18} className="text-[#A0A0A0]" />
              <p className="text-sm font-bold text-[#A0A0A0]">LOCKED</p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex-1 flex flex-col justify-center gap-2 pr-4 text-center">
          <h3
            className="font-bold text-lg sm:text-xl"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: '#FFFFFF',
              textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {displayName}
          </h3>
          {description && (
            <p
              className="text-[#A0A0A0]"
              style={{
                fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
                fontSize: '0.72rem',
                lineHeight: 1.55,
                fontWeight: 400,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {category.is_active && (
          <svg
            className="text-[#B11226] flex-shrink-0 self-center"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>
    );
  }), [categories, navigate]);

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
        <div className="mb-6 sm:mb-8">
          <BackButton
            onClick={() =>
              discipline?.name === 'Boxing'
                ? navigate(`/boxing/${disciplineId}`)
                : navigate('/disciplines')
            }
          />
        </div>

        <h1 className="cc-outline-text text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 sm:mb-12">
          {discipline?.name === 'Boxing' ? 'TECHNIQUE LIBRARY' : discipline?.name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {categoryCards}
        </div>
      </div>
    </div>
  );
}
