import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, CheckCircle, ChevronDown, Check, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';

type Technique = Database['public']['Tables']['techniques']['Row'];

interface TechniquePageProps {
  techniqueId: string;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export default function TechniquePage({ techniqueId, onNavigate, onBack }: TechniquePageProps) {
  const { user } = useAuth();
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [newRank, setNewRank] = useState<string | null>(null);
  const [nextTechnique, setNextTechnique] = useState<Technique | null>(null);
  const [progressId, setProgressId] = useState<string | null>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const [openSections, setOpenSections] = useState({
    why: false,
    how: false,
    mistakes: false,
    drills: false,
  });

  const [sectionsRead, setSectionsRead] = useState({
    why: false,
    how: false,
    mistakes: false,
    drills: false,
  });

  const toggleSection = async (section: keyof typeof openSections) => {
    const wasOpen = openSections[section];
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));

    if (!wasOpen && !sectionsRead[section] && user) {
      const newSectionsRead = { ...sectionsRead, [section]: true };
      setSectionsRead(newSectionsRead);

      await supabase
        .from('user_progress')
        .update({ sections_read: newSectionsRead })
        .eq('id', progressId || '');
    }
  };

  useEffect(() => {
    async function loadTechnique() {
      const { data: techniqueData } = await supabase
        .from('techniques')
        .select('*, categories(id)')
        .eq('id', techniqueId)
        .single();

      if (techniqueData) {
        setTechnique(techniqueData);

        const { data: nextTechData } = await supabase
          .from('techniques')
          .select('*')
          .eq('category_id', techniqueData.categories?.id)
          .gt('order_index', techniqueData.order_index)
          .order('order_index', { ascending: true })
          .limit(1)
          .maybeSingle();

        if (nextTechData) {
          setNextTechnique(nextTechData);
        }
      }

      if (user) {
        let { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('technique_id', techniqueId)
          .maybeSingle();

        if (!progressData) {
          const { data: newProgress } = await supabase
            .from('user_progress')
            .insert({
              user_id: user.id,
              technique_id: techniqueId,
              completed: false,
              sections_read: {}
            })
            .select()
            .single();

          progressData = newProgress;
        }

        if (progressData) {
          setProgressId(progressData.id);
          setIsCompleted(progressData.completed || false);

          const savedSections = progressData.sections_read as Record<string, boolean> || {};
          setSectionsRead({
            why: savedSections.why || false,
            how: savedSections.how || false,
            mistakes: savedSections.mistakes || false,
            drills: savedSections.drills || false,
          });
        }
      }

      setLoading(false);
    }

    loadTechnique();
  }, [techniqueId, user]);

  const handleComplete = async () => {
    if (!user || !technique || isCompleted) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('power_level, rank')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      const oldRank = profile.rank;
      const newPowerLevel = profile.power_level + technique.xp_reward;

      await supabase
        .from('user_progress')
        .update({ completed: true })
        .eq('id', progressId || '');

      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ power_level: newPowerLevel })
        .eq('user_id', user.id)
        .select()
        .single();

      setIsCompleted(true);
      setXpGained(technique.xp_reward);
      setShowXPGain(true);

      if (updatedProfile && updatedProfile.rank !== oldRank) {
        setNewRank(updatedProfile.rank);
      }

      setTimeout(() => {
        setShowXPGain(false);
        if (newRank) {
          setTimeout(() => setNewRank(null), 3000);
        }
      }, 2000);
    } catch (error) {
      console.error('Error completing technique:', error);
    }
  };

  const allSectionsRead = () => {
    const availableSections = [
      technique?.why ? 'why' : null,
      technique?.how ? 'how' : null,
      technique?.common_mistakes ? 'mistakes' : null,
      technique?.simple_drills ? 'drills' : null,
    ].filter(Boolean) as (keyof typeof sectionsRead)[];

    return availableSections.every(section => sectionsRead[section]);
  };

  const handleNextTechnique = () => {
    if (nextTechnique) {
      onNavigate(`technique/${nextTechnique.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">LOADING...</div>
      </div>
    );
  }

  if (!technique) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]">TECHNIQUE NOT FOUND</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="text-body">BACK TO CATEGORY</span>
        </button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold">{technique.name}</h1>
          {isCompleted && (
            <CheckCircle size={48} className="text-[#B11226]" />
          )}
        </div>

        {technique.video_url && (
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-12">
            <iframe
              ref={videoRef}
              src={technique.video_url}
              title={technique.name}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {!isCompleted && (
          <button
            onClick={handleComplete}
            className="w-full py-4 bg-[#B11226] text-white text-xl font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105 mb-12"
          >
            MARK AS COMPLETE
          </button>
        )}

        <div className="space-y-4">
          {technique.why && (
            <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] overflow-hidden">
              <button
                onClick={() => toggleSection('why')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-[#B11226]">WHY</h3>
                  {sectionsRead.why && (
                    <Check size={24} className="text-[#B11226]" />
                  )}
                </div>
                <ChevronDown
                  size={24}
                  className={`text-[#B11226] transition-transform ${openSections.why ? 'rotate-180' : ''}`}
                />
              </button>
              {openSections.why && (
                <div className="px-6 pb-6">
                  <p className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">{technique.why}</p>
                </div>
              )}
            </div>
          )}

          {technique.how && (
            <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] overflow-hidden">
              <button
                onClick={() => toggleSection('how')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-[#B11226]">HOW</h3>
                  {sectionsRead.how && (
                    <Check size={24} className="text-[#B11226]" />
                  )}
                </div>
                <ChevronDown
                  size={24}
                  className={`text-[#B11226] transition-transform ${openSections.how ? 'rotate-180' : ''}`}
                />
              </button>
              {openSections.how && (
                <div className="px-6 pb-6">
                  <p className="text-[#A0A0A0] text-body leading-relaxed">{technique.how}</p>
                </div>
              )}
            </div>
          )}

          {technique.common_mistakes && (
            <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] overflow-hidden">
              <button
                onClick={() => toggleSection('mistakes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-[#B11226]">COMMON MISTAKES</h3>
                  {sectionsRead.mistakes && (
                    <Check size={24} className="text-[#B11226]" />
                  )}
                </div>
                <ChevronDown
                  size={24}
                  className={`text-[#B11226] transition-transform ${openSections.mistakes ? 'rotate-180' : ''}`}
                />
              </button>
              {openSections.mistakes && (
                <div className="px-6 pb-6">
                  <p className="text-[#A0A0A0] text-body leading-relaxed">{technique.common_mistakes}</p>
                </div>
              )}
            </div>
          )}

          {technique.simple_drills && (
            <div className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] overflow-hidden">
              <button
                onClick={() => toggleSection('drills')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-[#B11226]">SIMPLE DRILLS</h3>
                  {sectionsRead.drills && (
                    <Check size={24} className="text-[#B11226]" />
                  )}
                </div>
                <ChevronDown
                  size={24}
                  className={`text-[#B11226] transition-transform ${openSections.drills ? 'rotate-180' : ''}`}
                />
              </button>
              {openSections.drills && (
                <div className="px-6 pb-6">
                  <p className="text-[#A0A0A0] text-body leading-relaxed">{technique.simple_drills}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {user && nextTechnique && (
          <div className="mt-12">
            <button
              onClick={handleNextTechnique}
              disabled={!allSectionsRead()}
              className={`w-full py-4 flex items-center justify-center gap-3 text-xl font-bold rounded transition-all transform ${
                allSectionsRead()
                  ? 'bg-[#B11226] text-white hover:bg-[#8B0E1C] hover:scale-105'
                  : 'bg-[#2E2E2E] text-[#666666] cursor-not-allowed'
              }`}
            >
              <span>NEXT TECHNIQUE: {nextTechnique.name}</span>
              <ChevronRight size={24} />
            </button>
            {!allSectionsRead() && (
              <p className="text-center text-[#666666] mt-4 text-sm">
                Read all sections to unlock the next technique
              </p>
            )}
          </div>
        )}
      </div>

      {showXPGain && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-scale-in">
            <div className="text-6xl font-bold text-[#B11226]">+{xpGained} XP</div>
          </div>
        </div>
      )}

      {newRank && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <div className="text-center animate-scale-in">
            <div className="text-2xl text-[#A0A0A0] mb-4">RANK UP!</div>
            <div className="text-7xl font-bold text-[#B11226] mb-8">{newRank}</div>
            <button
              onClick={() => setNewRank(null)}
              className="px-8 py-4 bg-[#B11226] text-white font-bold rounded hover:bg-[#8B0E1C] transition-all"
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
