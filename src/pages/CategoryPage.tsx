import { useEffect, useState } from 'react';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';
import { BGPattern } from '../components/ui/bg-pattern';

type Category = Database['public']['Tables']['categories']['Row'];
type Technique = Database['public']['Tables']['techniques']['Row'];
type UserProgress = Database['public']['Tables']['user_progress']['Row'];

interface CategoryPageProps {
  categoryId: string;
  onNavigate: (page: string, id?: string) => void;
}

export default function CategoryPage({ categoryId, onNavigate }: CategoryPageProps) {
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
    <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <button
          onClick={() => onNavigate('Disciplines')}
          className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="text-body">BACK</span>
        </button>

        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
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

        <div className="space-y-4">
          {techniques.map((technique) => {
            const unlocked = isUnlocked(technique.order_index);
            const completed = isCompleted(technique.id);

            return (
              <button
                key={technique.id}
                onClick={() => unlocked && onNavigate('Technique', technique.id)}
                disabled={!unlocked}
                className={`w-full p-6 rounded-lg border-2 transition-all transform ${
                  completed
                    ? 'border-[#B11226] bg-[#B11226]/10'
                    : unlocked
                    ? 'border-[#2E2E2E] hover:border-[#B11226] hover:scale-105 bg-[#1A1A1A]'
                    : 'border-[#2E2E2E] opacity-50 cursor-not-allowed bg-[#1A1A1A]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-[#2E2E2E]">
                      {technique.order_index}
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold">{technique.name}</h3>
                      <p className="text-sm text-[#A0A0A0] text-body">
                        {technique.xp_reward} XP
                      </p>
                    </div>
                  </div>
                  <div>
                    {completed ? (
                      <CheckCircle size={32} className="text-[#B11226]" />
                    ) : !unlocked ? (
                      <Lock size={32} className="text-[#A0A0A0]" />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-[#2E2E2E]" />
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
