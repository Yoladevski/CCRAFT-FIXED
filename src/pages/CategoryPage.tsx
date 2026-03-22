import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, CheckCircle } from 'lucide-react';
import BackButton from '../components/BackButton';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';

type Category = Database['public']['Tables']['categories']['Row'];
type Technique = Database['public']['Tables']['techniques']['Row'];
type UserProgress = Database['public']['Tables']['user_progress']['Row'];

interface CategoryPageProps {
  categoryId?: string;
  onNavigate: (page: string, id?: string) => void;
}

export default function CategoryPage({ onNavigate }: CategoryPageProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const categoryId = id || '';
  const { user } = useAuth();
  const [category, setCategory] = useState<Category | null>(null);
  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryAndTechniques() {
      const parts = categoryId.split('-');
      let actualCategoryId = categoryId;

      if (parts.length >= 2) {
        const disciplineSlug = parts.slice(0, -1).join('-');
        const categorySlug = parts[parts.length - 1];

        const disciplineNameMap: { [key: string]: string } = {
          'boxing': 'Boxing',
          'muay-thai': 'Muay Thai',
          'bjj': 'BJJ',
          'kickboxing': 'Kickboxing',
          'karate': 'Karate',
          'taekwondo': 'Taekwondo',
          'judo': 'Judo'
        };

        const categoryNameMap: { [key: string]: string } = {
          'attacks': 'Attacks',
          'defence': 'Defence',
          'footwork': 'Footwork',
          'combos': 'Combos',
          'positions': 'Positions',
          'submissions': 'Submissions',
          'escapes': 'Escapes',
          'transitions': 'Transitions',
          'kihon': 'Kihon',
          'kata': 'Kata',
          'kumite': 'Kumite',
          'kicks': 'Kicks',
          'poomsae': 'Poomsae',
          'sparring': 'Sparring',
          'throws': 'Throws',
          'groundwork': 'Groundwork',
          'pins': 'Pins'
        };

        const disciplineName = disciplineNameMap[disciplineSlug];
        const categoryName = categoryNameMap[categorySlug];

        const { data: disciplineData } = await supabase
          .from('disciplines')
          .select('id')
          .eq('name', disciplineName)
          .maybeSingle();

        if (disciplineData) {
          const { data: categoryData } = await supabase
            .from('categories')
            .select('*')
            .eq('discipline_id', disciplineData.id)
            .eq('name', categoryName)
            .maybeSingle();

          if (categoryData) {
            actualCategoryId = categoryData.id;
            setCategory(categoryData);
          }
        }
      } else {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('*')
          .eq('id', categoryId)
          .maybeSingle();

        if (categoryData) setCategory(categoryData);
      }

      const { data: techniquesData } = await supabase
        .from('techniques')
        .select('*')
        .eq('category_id', actualCategoryId)
        .order('order_index');

      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressData) setProgress(progressData);
      }

      if (techniquesData) setTechniques(techniquesData);
      setLoading(false);
    }

    loadCategoryAndTechniques();
  }, [categoryId, user]);

  const isCompleted = (techniqueId: string) => {
    return progress.some((p) => p.technique_id === techniqueId && p.completed);
  };

  const isUnlocked = (orderIndex: number) => {
    if (orderIndex === 1) return true;

    const previousTechnique = techniques.find((t) => t.order_index === orderIndex - 1);
    if (!previousTechnique) return false;

    return isCompleted(previousTechnique.id);
  };

  const completedCount = techniques.filter((t) => isCompleted(t.id)).length;
  const progressPercentage = (completedCount / techniques.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <BackButton onClick={() => navigate(-1)} />
        </div>

        <h1 className="cc-outline-text text-4xl sm:text-5xl font-bold text-center mb-8">
          {category?.name}
        </h1>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#A0A0A0] text-body">PROGRESS</span>
            <span className="text-sm font-bold text-[#B11226]">
              {completedCount}/{techniques.length}
            </span>
          </div>
          <div className="w-full h-3 bg-[#2E2E2E] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#B11226] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {techniques.map((technique) => {
            const unlocked = isUnlocked(technique.order_index);
            const completed = isCompleted(technique.id);

            return (
              <button
                key={technique.id}
                onClick={() => unlocked && onNavigate('Technique', technique.id)}
                disabled={!unlocked}
                className={`w-full px-4 py-3 sm:p-6 border-2 transition-all sm:transform card-btn ${
                  completed
                    ? 'border-[#B11226] bg-[#B11226]/10'
                    : unlocked
                    ? 'border-[#B11226] sm:hover:scale-105 bg-[#1A1A1A]'
                    : 'border-[#2E2E2E] opacity-50 cursor-not-allowed bg-[#1A1A1A]'
                }`}
                style={{
                  borderRadius: '0.625rem',
                  ...(unlocked ? {
                    boxShadow: '0 0 12px rgba(177, 18, 38, 0.5), 0 0 24px rgba(177, 18, 38, 0.2)'
                  } : {}),
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="text-base sm:text-3xl font-bold shrink-0"
                      style={{ color: '#3E3E3E', fontFamily: 'Orbitron, sans-serif', minWidth: '1.5rem' }}
                    >
                      {technique.order_index}
                    </div>
                    <div className="text-left min-w-0">
                      <h3
                        className="font-bold text-sm sm:text-2xl text-white"
                        style={{ fontFamily: 'Orbitron, sans-serif', lineHeight: 1.3 }}
                      >
                        {technique.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A0A0A0] mt-0.5">
                        {technique.xp_reward} XP
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {completed ? (
                      <CheckCircle size={20} className="text-[#B11226]" />
                    ) : !unlocked ? (
                      <Lock size={20} className="text-[#A0A0A0]" />
                    ) : (
                      <svg className="text-[#B11226]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
