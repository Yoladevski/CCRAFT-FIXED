import { useEffect, useState } from 'react';
import { User, Shield, Award, Star, Crown, Trophy, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';
import { BGPattern } from '../components/ui/bg-pattern';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Technique = Database['public']['Tables']['techniques']['Row'];
type UserProgress = Database['public']['Tables']['user_progress']['Row'];
type Discipline = Database['public']['Tables']['disciplines']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];

interface DashboardProps {
  onNavigate: (page: string) => void;
}

interface CircularProgressProps {
  percentage: number;
  completed: number;
  total: number;
}

interface ProfileImageProps {
  rank: string;
  imageUrl?: string | null;
}

function ProfileImage({ rank, imageUrl }: ProfileImageProps) {
  const getRankBadgeClass = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 'champion':
        return 'rank-badge-champion';
      case 'elite':
        return 'rank-badge-elite';
      case 'challenger':
        return 'rank-badge-challenger';
      case 'contender':
        return 'rank-badge-contender';
      default:
        return 'rank-badge-amateur';
    }
  };

  const getRankEmblem = (rank: string) => {
    const iconSize = 20;
    const iconColor = '#FFD700';

    switch (rank.toLowerCase()) {
      case 'champion':
        return <Crown size={iconSize} color={iconColor} strokeWidth={2.5} />;
      case 'elite':
        return <Trophy size={iconSize} color="#C0C0C0" strokeWidth={2.5} />;
      case 'challenger':
        return <Star size={iconSize} color="#4A90E2" strokeWidth={2.5} />;
      case 'contender':
        return <Award size={iconSize} color="#6BCF7F" strokeWidth={2.5} />;
      default:
        return <Shield size={iconSize} color="#A0A0A0" strokeWidth={2.5} />;
    }
  };

  return (
    <div className="profile-container">
      {imageUrl ? (
        <img src={imageUrl} alt="Profile" className="profile-image" width="90" height="90" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#1A1A1A] rounded-full">
          <User size={48} className="text-[#A0A0A0]" />
        </div>
      )}
      <div className={`rank-badge ${getRankBadgeClass(rank)}`}>
        {getRankEmblem(rank)}
      </div>
    </div>
  );
}

function CircularProgress({ percentage, completed, total }: CircularProgressProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 min-w-[128px] min-h-[128px]">
        <svg className="circular-progress w-full h-full" viewBox="0 0 100 100" width="128" height="128">
          <circle className="circular-progress-ring" cx="50" cy="50" r={radius} />
          <circle
            className="circular-progress-value"
            cx="50"
            cy="50"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Inter' }}>
            {percentage}%
          </span>
        </div>
      </div>
      <p className="text-sm text-[#A0A0A0] mt-4" style={{ fontFamily: 'Redhawk' }}>
        <span className="text-white font-bold" style={{ fontFamily: 'Inter' }}>{completed}</span> / <span className="text-white font-bold" style={{ fontFamily: 'Inter' }}>{total}</span> Techniques Mastered
      </p>
    </div>
  );
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [totalTechniques, setTotalTechniques] = useState(0);
  const [completedTechniques, setCompletedTechniques] = useState(0);
  const [recentProgress, setRecentProgress] = useState<(UserProgress & { technique: Technique })[]>([]);
  const [nextTechnique, setNextTechnique] = useState<{ discipline: string; category: string; technique: string } | null>(null);
  const [lastSessionDate, setLastSessionDate] = useState<string>('');
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

      const { data: techniquesData } = await supabase
        .from('techniques')
        .select('*');

      const { data: progressData } = await supabase
        .from('user_progress')
        .select(`
          *,
          technique:techniques(*)
        `)
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(3);

      const { data: allProgressData } = await supabase
        .from('user_progress')
        .select('id, completed_at')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(1);

      if (profileData) setProfile(profileData);
      if (techniquesData) setTotalTechniques(techniquesData.length);
      if (progressData) {
        setCompletedTechniques(progressData.length);
        setRecentProgress(progressData as any);
      }

      if (allProgressData && allProgressData.length > 0) {
        setLastSessionDate(new Date(allProgressData[0].completed_at).toLocaleDateString());
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
                technique: nextIncomplete.name
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

  const getNextRankThreshold = (powerLevel: number) => {
    if (powerLevel < 200) return { next: 'Contender', required: 200 };
    if (powerLevel < 500) return { next: 'Challenger', required: 500 };
    if (powerLevel < 1000) return { next: 'Elite', required: 1000 };
    if (powerLevel < 2000) return { next: 'Champion', required: 2000 };
    return null;
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
        <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg p-6 sm:p-8 text-center">
            <div className="mb-6">
              <Lock size={64} className="mx-auto text-[#B11226]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              AUTHENTICATION REQUIRED
            </h2>
            <p className="text-[#A0A0A0] text-base sm:text-lg mb-8 leading-relaxed">
              The dashboard is only accessible to registered members. Sign up or log in to track your progress, view your stats, and continue your training journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('Auth')}
                className="px-8 py-4 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105"
              >
                SIGN UP / LOG IN
              </button>
              <button
                onClick={() => onNavigate('Home')}
                className="px-8 py-4 bg-[#2E2E2E] text-white font-bold rounded hover:bg-[#3E3E3E] transition-all"
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]" style={{ fontFamily: 'Redhawk' }}>PROFILE NOT FOUND</div>
      </div>
    );
  }

  const nextRank = getNextRankThreshold(profile.power_level);
  const progressToNext = nextRank
    ? ((profile.power_level - (nextRank.required === 200 ? 0 : nextRank.required === 500 ? 200 : nextRank.required === 1000 ? 500 : 1000)) / (nextRank.required - (nextRank.required === 200 ? 0 : nextRank.required === 500 ? 200 : nextRank.required === 1000 ? 500 : 1000))) * 100
    : 100;

  const completionPercentage = totalTechniques > 0 ? Math.round((completedTechniques / totalTechniques) * 100) : 0;

  return (
    <div className="min-h-screen py-6 px-4 relative -mt-20 pt-20">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">

        {/* WELCOME MESSAGE */}
        <div className="bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-transparent border-l-4 border-[#B11226] p-4 md:p-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Redhawk, sans-serif' }}>
            WELCOME BACK {(profile.full_name || 'FIGHTER').toUpperCase()}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#B11226] font-bold" style={{ fontFamily: 'Redhawk, sans-serif' }}>
            {dailyMotivation}
          </p>
        </div>

        {/* CONTINUE BUTTON */}
        <button
          onClick={() => onNavigate('Disciplines')}
          className="w-full py-4 md:py-5 bg-[#B11226] text-white text-lg md:text-2xl font-bold hover:bg-[#8B0E1C] transition-colors"
          style={{ fontFamily: 'Redhawk, sans-serif' }}
        >
          {nextTechnique ? `CONTINUE: ${nextTechnique.technique.toUpperCase()}` : 'VIEW DISCIPLINES'}
        </button>

        {/* CURRENT TRAINING AND RANK - Mobile: Stacked, Desktop: Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CURRENT TRAINING PANEL */}
          <div className="bg-[#1A1A1A] border-2 border-[#B11226] p-6 md:p-8 text-center flex flex-col justify-center min-h-[280px]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Redhawk, sans-serif' }}>
              CURRENT TRAINING
            </h2>

            {nextTechnique ? (
              <div className="space-y-4 md:space-y-5">
                <div>
                  <p className="text-sm md:text-base text-[#A0A0A0] mb-2 tracking-wider" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                    DISCIPLINE
                  </p>
                  <p className="text-lg md:text-2xl text-white font-bold" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                    {nextTechnique.discipline}
                  </p>
                </div>

                <div>
                  <p className="text-sm md:text-base text-[#A0A0A0] mb-2 tracking-wider" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                    CATEGORY
                  </p>
                  <p className="text-lg md:text-2xl text-white font-bold" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                    {nextTechnique.category}
                  </p>
                </div>

                <div>
                  <p className="text-sm md:text-base text-[#A0A0A0] mb-2 tracking-wider" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                    NEXT TECHNIQUE
                  </p>
                  <p className="text-xl md:text-3xl font-bold text-[#B11226]" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                    {nextTechnique.technique}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-[#A0A0A0] text-lg md:text-xl" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                  All techniques completed!
                </p>
              </div>
            )}
          </div>

          {/* CURRENT RANK CARD */}
          <div className="bg-[#1A1A1A] border-2 border-[#B11226] p-6 md:p-8 flex flex-col items-center justify-center min-h-[280px]">
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <p className="text-base md:text-lg text-[#A0A0A0] mb-3 tracking-wider" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                CURRENT RANK
              </p>
              <h1
                className="text-5xl md:text-6xl font-bold mb-5"
                style={{
                  fontFamily: 'Redhawk, sans-serif',
                  color: getRankColor(profile.rank),
                  WebkitTextStroke: '2px black',
                  textStroke: '2px black',
                  paintOrder: 'stroke fill'
                }}
              >
                {profile.rank.toUpperCase()}
              </h1>
              <div className="text-center mb-5">
                <p className="text-base md:text-lg text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                  POWER LEVEL
                </p>
                <div
                  className="text-4xl md:text-5xl font-bold text-[#B11226]"
                  style={{ fontFamily: 'Inter' }}
                >
                  {profile.power_level}
                </div>
              </div>
            </div>

            {/* Progress Info */}
            <div className="w-full pt-5 border-t border-[#2E2E2E]">
              <div className="text-center">
                <p className="text-base md:text-lg text-[#A0A0A0] mb-2" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                  OVERALL PROGRESS
                </p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Inter' }}>
                    {completionPercentage}%
                  </span>
                  <span className="text-base md:text-lg text-[#A0A0A0]" style={{ fontFamily: 'Inter' }}>
                    ({completedTechniques}/{totalTechniques})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* XP PROGRESS BAR TO NEXT RANK */}
        {nextRank && (
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-5 md:p-6 text-center">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm md:text-base text-[#A0A0A0] tracking-wider font-bold" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                NEXT RANK: {nextRank.next.toUpperCase()}
              </p>
              <p className="text-base md:text-lg font-bold text-[#B11226]" style={{ fontFamily: 'Inter' }}>
                {profile.power_level} / {nextRank.required}
              </p>
            </div>
            <div className="w-full h-4 md:h-5 bg-[#2E2E2E] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B11226] to-[#FFD700] transition-all duration-1000 ease-out origin-left"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <p className="text-sm md:text-base text-[#A0A0A0] mt-3" style={{ fontFamily: 'Redhawk, sans-serif' }}>
              <span className="text-white font-bold text-lg md:text-xl" style={{ fontFamily: 'Inter' }}>{nextRank.required - profile.power_level}</span> XP REMAINING
            </p>
          </div>
        )}


        {/* STAT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-5 md:p-6 text-center">
            <p className="text-sm md:text-base text-[#A0A0A0] mb-2 tracking-wider font-bold" style={{ fontFamily: 'Redhawk, sans-serif' }}>
              TECHNIQUES
            </p>
            <p className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Inter' }}>
              {completedTechniques}
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-5 md:p-6 text-center">
            <p className="text-sm md:text-base text-[#A0A0A0] mb-2 tracking-wider font-bold" style={{ fontFamily: 'Redhawk, sans-serif' }}>
              TOTAL XP
            </p>
            <p className="text-3xl md:text-4xl font-bold text-[#B11226]" style={{ fontFamily: 'Inter' }}>
              {profile.power_level}
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-5 md:p-6 text-center">
            <p className="text-sm md:text-base text-[#A0A0A0] mb-2 tracking-wider font-bold" style={{ fontFamily: 'Redhawk, sans-serif' }}>
              RANK
            </p>
            <p className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Redhawk, sans-serif', color: getRankColor(profile.rank) }}>
              {profile.rank}
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-5 md:p-6 text-center">
            <p className="text-sm md:text-base text-[#A0A0A0] mb-2 tracking-wider font-bold" style={{ fontFamily: 'Redhawk, sans-serif' }}>
              LAST SESSION
            </p>
            <p className="text-base md:text-xl font-bold text-white" style={{ fontFamily: 'Inter' }}>
              {lastSessionDate || 'N/A'}
            </p>
          </div>
        </div>

        {/* RECENT VICTORIES */}
        {recentProgress.length > 0 && (
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-5 text-center" style={{ fontFamily: 'Redhawk, sans-serif' }}>
              RECENT VICTORIES
            </h2>
            <div className="space-y-3">
              {recentProgress.map((progress) => (
                <div
                  key={progress.id}
                  className="bg-[#1A1A1A] border border-[#2E2E2E] p-5 md:p-6 flex items-center justify-between hover:border-[#B11226] transition-colors"
                >
                  <div className="flex-1 min-w-0 text-center">
                    <h3 className="text-lg md:text-2xl font-bold mb-2 truncate" style={{ fontFamily: 'Redhawk, sans-serif' }}>
                      {progress.technique?.name}
                    </h3>
                    <p className="text-sm md:text-base text-[#A0A0A0]" style={{ fontFamily: 'Inter' }}>
                      {new Date(progress.completed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-[#B11226] font-bold text-2xl md:text-3xl ml-4 flex-shrink-0" style={{ fontFamily: 'Inter' }}>
                    +{progress.technique?.xp_reward}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
