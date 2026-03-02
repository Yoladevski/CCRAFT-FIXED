import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';
import continueButton from '../assets/continue.webp';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface DashboardProps {
  onNavigate: (page: string) => void;
}


const motivationalMessages = [
  "RISE AND GRIND",
  "EMBRACE THE WARRIOR WITHIN",
  "EVERY CHAMPION WAS ONCE A CONTENDER",
  "TRAIN HARD, FIGHT EASY",
  "YOUR ONLY LIMIT IS YOU",
  "PUSH BEYOND YOUR LIMITS",
  "VICTORY LOVES PREPARATION",
  "DISCIPLINE IS FREEDOM",
  "BE STRONGER THAN YOUR EXCUSES",
  "CHAMPIONS TRAIN, LOSERS COMPLAIN",
  "SWEAT NOW, SHINE LATER",
  "NO PAIN, NO GAIN",
  "THE FIGHT IS WON IN TRAINING",
  "RESPECT ALL, FEAR NONE",
  "TRAIN LIKE A BEAST, FIGHT LIKE A WARRIOR",
  "MASTER YOUR CRAFT",
  "UNLEASH YOUR POTENTIAL",
  "PAIN IS TEMPORARY, GLORY IS FOREVER",
  "FORGE YOUR LEGACY",
  "DOMINATE YOUR DOUBTS"
];

const getRandomMotivation = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [totalTechniques, setTotalTechniques] = useState(0);
  const [completedTechniques, setCompletedTechniques] = useState(0);
  const [nextTechnique, setNextTechnique] = useState<{ discipline: string; category: string; technique: string; techniqueId: number; disciplineId: number; categoryId: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [dailyMotivation] = useState(getRandomMotivation());

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Check if onboarding is complete
      if (profileData && (!profileData.onboarding_complete || !profileData.full_name)) {
        navigate('/create-profile', { replace: true });
        return;
      }

      // Get Boxing discipline ID
      const { data: boxingDiscipline } = await supabase
        .from('disciplines')
        .select('id')
        .eq('name', 'Boxing')
        .single();

      if (!boxingDiscipline) {
        setLoading(false);
        return;
      }

      // Get Boxing categories
      const { data: boxingCategories } = await supabase
        .from('categories')
        .select('id')
        .eq('discipline_id', boxingDiscipline.id);

      const boxingCategoryIds = boxingCategories?.map(c => c.id) || [];

      // Get only Boxing techniques
      const { data: techniquesData } = await supabase
        .from('techniques')
        .select('*')
        .in('category_id', boxingCategoryIds);

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('technique_id')
        .eq('user_id', user.id);

      if (profileData) setProfile(profileData);
      if (techniquesData) setTotalTechniques(techniquesData.length);
      if (progressData) {
        setCompletedTechniques(progressData.length);
      }

      if (techniquesData && progressData) {
        const completedIds = new Set(progressData.map(p => p.technique_id));
        const nextIncomplete = techniquesData.find(t => !completedIds.has(t.id));

        if (nextIncomplete) {
          const { data: categoryData } = await supabase
            .from('categories')
            .select('name, discipline_id')
            .eq('id', nextIncomplete.category_id)
            .single();

          if (categoryData) {
            const { data: disciplineData } = await supabase
              .from('disciplines')
              .select('name')
              .eq('id', categoryData.discipline_id)
              .single();

            if (disciplineData) {
              setNextTechnique({
                discipline: disciplineData.name,
                category: categoryData.name,
                technique: nextIncomplete.name,
                techniqueId: nextIncomplete.id,
                disciplineId: categoryData.discipline_id,
                categoryId: nextIncomplete.category_id
              });
            }
          }
        }
      }

      setLoading(false);
    }

    loadDashboardData();
  }, [user]);

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Champion': return '#FFD700';
      case 'Elite': return '#C0C0C0';
      case 'Challenger': return '#4A90E2';
      case 'Contender': return '#6BCF7F';
      default: return '#A0A0A0';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]" style={{ fontFamily: 'Redhawk' }}>LOADING...</div>
      </div>
    );
  }

  // Show sign-up prompt for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg p-6 sm:p-8 text-center">
            <div className="mb-6">
              <Lock size={64} className="mx-auto text-[#B11226]" />
            </div>
            <h2 className="cc-outline-text text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              AUTHENTICATION REQUIRED
            </h2>
            <p className="text-[#A0A0A0] text-base sm:text-lg mb-8 leading-relaxed">
              The dashboard is only accessible to registered members. Sign up or log in to track your progress, view your stats, and continue your training journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('Auth')}
                className="button-text px-8 py-4 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105"
              >
                SIGN UP / LOG IN
              </button>
              <button
                onClick={() => onNavigate('Home')}
                className="button-text px-8 py-4 bg-[#2E2E2E] text-white font-bold rounded hover:bg-[#3E3E3E] transition-all"
              >
                BACK TO HOME
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E]">
        <div className="text-center max-w-md px-4">
          <div className="text-2xl text-[#B11226] mb-4" style={{ fontFamily: 'Redhawk' }}>PROFILE NOT FOUND</div>
          <p className="text-[#A0A0A0] mb-6" style={{ fontFamily: 'Redhawk' }}>
            Please complete your profile setup to access the dashboard.
          </p>
          <button
            onClick={() => onNavigate('Account')}
            className="button-text px-6 py-3 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all"
          >
            COMPLETE PROFILE
          </button>
        </div>
      </div>
    );
  }

  if (!profile.full_name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E]">
        <div className="text-center max-w-md px-4">
          <div className="text-2xl text-[#B11226] mb-4" style={{ fontFamily: 'Redhawk' }}>COMPLETE YOUR PROFILE</div>
          <p className="text-[#A0A0A0] mb-6" style={{ fontFamily: 'Redhawk' }}>
            Welcome! Let's set up your profile to get started with your training journey.
          </p>
          <button
            onClick={() => onNavigate('Account')}
            className="button-text px-6 py-3 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all"
          >
            SET UP PROFILE
          </button>
        </div>
      </div>
    );
  }

  const completionPercentage = totalTechniques > 0 ? Math.round((completedTechniques / totalTechniques) * 100) : 0;

  return (
    <div className="min-h-screen py-4 px-4 relative -mt-20 pt-20">
      <div className="max-w-7xl mx-auto space-y-4 relative z-10">

        {/* WELCOME MESSAGE */}
        <div
          className="bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg p-4 md:p-6 text-center"
          style={{
            boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
          }}
        >
          <h2 className="cc-primary-title mb-2 hidden sm:block" data-text={`WELCOME BACK ${(profile.full_name || 'FIGHTER').toUpperCase()}`}>
            WELCOME BACK {(profile.full_name || 'FIGHTER').toUpperCase()}
          </h2>
          <div className="sm:hidden mb-2">
            <h2 className="cc-primary-title text-[0.7rem]" style={{ fontSize: '0.7rem' }} data-text="WELCOME BACK">
              WELCOME BACK
            </h2>
            <h2 className="cc-primary-title text-[0.7rem]" style={{ fontSize: '0.7rem' }} data-text={(profile.full_name || 'FIGHTER').toUpperCase()}>
              {(profile.full_name || 'FIGHTER').toUpperCase()}
            </h2>
          </div>
          <p className="cc-quote hidden sm:block">
            {dailyMotivation}
          </p>
          <p className="cc-quote sm:hidden" style={{ fontSize: '0.6rem' }}>
            {dailyMotivation}
          </p>
        </div>

        {/* CONTINUE BUTTON */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (nextTechnique) {
                navigate(`/technique/${nextTechnique.techniqueId}`);
              } else {
                onNavigate('Disciplines');
              }
            }}
            className="w-full lg:w-3/5 transition-transform hover:scale-105"
          >
            <img
              src={continueButton}
              alt={nextTechnique ? `Continue: ${nextTechnique.technique}` : 'View Disciplines'}
              className="w-full h-auto"
            />
          </button>
        </div>

        {/* CURRENT TRAINING AND RANK - Mobile: Stacked, Desktop: Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* CURRENT TRAINING PANEL */}
          <div
            className="bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg p-6 md:p-10 text-center flex flex-col justify-center"
            style={{
              boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
            }}
          >
            <h2 className="cc-section-heading mb-6 md:mb-8 hidden sm:block" data-text="CURRENT TRAINING">
              CURRENT TRAINING
            </h2>
            <h2 className="cc-section-heading mb-6 sm:hidden whitespace-nowrap" data-text="CURRENT TRAINING" style={{ fontSize: '0.96rem', textShadow: '1px 1px 0 #B11226, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000' }}>
              CURRENT TRAINING
            </h2>

            {nextTechnique ? (
              <div className="space-y-6 md:space-y-8">
                <div>
                  <p className="cc-card-label mb-2 md:mb-3 tracking-wider">
                    DISCIPLINE
                  </p>
                  <p className="cc-card-value">
                    {nextTechnique.discipline}
                  </p>
                </div>

                <div>
                  <p className="cc-card-label mb-2 md:mb-3 tracking-wider">
                    CATEGORY
                  </p>
                  <p className="cc-card-value">
                    {nextTechnique.category}
                  </p>
                </div>

                <div>
                  <p className="cc-card-label mb-2 md:mb-3 tracking-wider">
                    NEXT TECHNIQUE
                  </p>
                  <p className="cc-card-value text-[#B11226]">
                    {nextTechnique.technique}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="cc-body">
                  All techniques completed!
                </p>
              </div>
            )}
          </div>

          {/* CURRENT RANK CARD */}
          <div
            className="bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg p-4 md:p-6 flex flex-col items-center justify-center"
            style={{
              boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
            }}
          >
            <h2 className="cc-section-heading mb-3 md:mb-4 hidden sm:block" data-text="CURRENT RANK">
              CURRENT RANK
            </h2>
            <h2 className="cc-section-heading mb-3 sm:hidden" data-text="CURRENT RANK" style={{ textShadow: '1px 1px 0 #B11226, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000' }}>
              CURRENT RANK
            </h2>
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <h1
                className="cc-primary-title mb-3 text-center max-w-full px-2 whitespace-nowrap hidden sm:block"
                style={{
                  color: getRankColor(profile.rank),
                  WebkitTextStroke: '2px black',
                  textStroke: '2px black',
                  paintOrder: 'stroke fill'
                }}
                data-text={profile.rank.toUpperCase()}
              >
                {profile.rank.toUpperCase()}
              </h1>
              <h1
                className="cc-primary-title mb-3 text-center max-w-full px-2 whitespace-nowrap sm:hidden"
                style={{
                  color: getRankColor(profile.rank),
                  WebkitTextStroke: '1px black',
                  textStroke: '1px black',
                  paintOrder: 'stroke fill',
                  fontSize: '0.56rem'
                }}
                data-text={profile.rank.toUpperCase()}
              >
                {profile.rank.toUpperCase()}
              </h1>
              <div className="text-center mb-3">
                <p className="cc-card-label mb-1">
                  POWER LEVEL
                </p>
                <div
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#B11226]"
                  style={{ fontFamily: 'Inter' }}
                >
                  {profile.power_level}
                </div>
              </div>
            </div>

            {/* Progress Info */}
            <div className="w-full pt-3 border-t border-[#2E2E2E]">
              <div className="text-center">
                <p className="cc-card-label mb-1">
                  OVERALL PROGRESS
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Inter' }}>
                    {completionPercentage}%
                  </span>
                  <span className="text-xs sm:text-sm md:text-base text-[#A0A0A0]" style={{ fontFamily: 'Inter' }}>
                    ({completedTechniques}/{totalTechniques})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
