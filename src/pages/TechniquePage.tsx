import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronDown, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Database } from '../lib/supabase';
import { BGPattern } from '../components/ui/bg-pattern';

type Technique = Database['public']['Tables']['techniques']['Row'];

interface TechniquePageProps {
  techniqueId?: string;
  onNavigate: (page: string, id?: string) => void;
  onBack: () => void;
}

function formatHowSection(text: string) {
  const lines = text.split('\n');
  const items: { heading: string; body: string[] }[] = [];
  let current: { heading: string; body: string[] } | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const isBullet = trimmed.startsWith('•');
    const isNumbered = /^\d+\.\s/.test(trimmed);
    if (isBullet || isNumbered) {
      if (current) items.push(current);
      const heading = isBullet
        ? trimmed.replace(/^•\s*/, '')
        : trimmed.replace(/^\d+\.\s*/, '');
      current = { heading, body: [] };
    } else {
      if (current) {
        current.body.push(trimmed);
      } else {
        items.push({ heading: trimmed, body: [] });
      }
    }
  }
  if (current) items.push(current);

  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-[#B11226] font-bold text-body shrink-0" style={{ fontFamily: 'Orbitron, sans-serif', minWidth: '1.5rem' }}>{i + 1}.</span>
          <div>
            <span className="text-white font-semibold text-body">{item.heading}</span>
            {item.body.map((b, j) => (
              <p key={j} className="text-[#A0A0A0] text-body leading-relaxed mt-1">{b}</p>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

function formatText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return <span key={index} className="text-2xl font-bold text-white">{content}</span>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default function TechniquePage({ onNavigate, onBack }: TechniquePageProps) {
  const { id: techniqueId = '' } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextTechnique, setNextTechnique] = useState<Technique | null>(null);
  const [progressId, setProgressId] = useState<string | null>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const [openSections, setOpenSections] = useState({
    why: false,
    how: false,
    mistakes: false,
    drills: false,
    coachesTips: false,
  });

  const [sectionsRead, setSectionsRead] = useState({
    why: false,
    how: false,
    mistakes: false,
    drills: false,
    coachesTips: false,
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
            coachesTips: savedSections.coachesTips || false,
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
      await supabase
        .from('user_progress')
        .update({ completed: true })
        .eq('id', progressId || '');

      setIsCompleted(true);
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
      technique?.coaches_tips ? 'coachesTips' : null,
    ].filter(Boolean) as (keyof typeof sectionsRead)[];

    return availableSections.every(section => sectionsRead[section]);
  };

  const handleNextTechnique = () => {
    if (nextTechnique) {
      onNavigate('Technique', nextTechnique.id);
      window.scrollTo(0, 0);
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
    <div className="min-h-screen py-6 sm:py-12 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            <span className="text-body font-medium">BACK TO CATEGORY</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="cc-outline-text text-4xl sm:text-5xl font-bold">{technique.name}</h1>
          {isCompleted && (
            <CheckCircle size={48} className="text-[#B11226]" />
          )}
        </div>

        {technique.video_url && (
          <div className="flex justify-center mb-12">
          <div className="relative w-full md:w-64 aspect-[9/16] bg-black rounded-lg overflow-hidden">
            <iframe
              ref={videoRef}
              src={technique.video_url}
              title={technique.name}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          </div>
        )}

        {!isCompleted && (
          <button
            onClick={handleComplete}
            className="button-text w-full py-4 bg-[#B11226] text-white text-xl font-bold rounded hover:bg-[#8B0E1C] transition-all transform hover:scale-105 mb-12"
          >
            MARK AS COMPLETE
          </button>
        )}

        <div className="space-y-8">
          {technique.why && (
            <div
              className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <BGPattern variant="grid" fill="#1E1E1E" size={20} mask="fade-edges" />
              <button
                onClick={() => toggleSection('why')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">WHY</h3>
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
            <div
              className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <BGPattern variant="grid" fill="#1E1E1E" size={20} mask="fade-edges" />
              <button
                onClick={() => toggleSection('how')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">HOW</h3>
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
                  {formatHowSection(technique.how)}
                </div>
              )}
            </div>
          )}

          {technique.common_mistakes && (
            <div
              className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <BGPattern variant="grid" fill="#1E1E1E" size={20} mask="fade-edges" />
              <button
                onClick={() => toggleSection('mistakes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">COMMON MISTAKES</h3>
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
                  <p className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">{technique.common_mistakes}</p>
                </div>
              )}
            </div>
          )}

          {technique.simple_drills && (
            <div
              className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <BGPattern variant="grid" fill="#1E1E1E" size={20} mask="fade-edges" />
              <button
                onClick={() => toggleSection('drills')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">SIMPLE DRILLS</h3>
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
                  <div className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">
                    {formatText(technique.simple_drills)}
                  </div>
                </div>
              )}
            </div>
          )}

          {technique.coaches_tips && (
            <div
              className="bg-[#1A1A1A] rounded-2xl border-2 border-[#B11226] overflow-hidden relative"
              style={{
                boxShadow: '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)'
              }}
            >
              <BGPattern variant="grid" fill="#1E1E1E" size={20} mask="fade-edges" />
              <button
                onClick={() => toggleSection('coachesTips')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="cc-outline-text text-2xl font-bold text-[#B11226]">COACHES' TIPS</h3>
                  {sectionsRead.coachesTips && (
                    <Check size={24} className="text-[#B11226]" />
                  )}
                </div>
                <ChevronDown
                  size={24}
                  className={`text-[#B11226] transition-transform ${openSections.coachesTips ? 'rotate-180' : ''}`}
                />
              </button>
              {openSections.coachesTips && (
                <div className="px-6 pb-6">
                  <p className="text-[#A0A0A0] text-body leading-relaxed whitespace-pre-line">{technique.coaches_tips}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {user && nextTechnique && (
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={handleNextTechnique}
              disabled={!allSectionsRead()}
              className={`transition-all transform ${
                allSectionsRead()
                  ? 'hover:scale-105 opacity-100'
                  : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <img
                src="https://api.combatcraft.co.uk/storage/v1/object/public/images/nr.png"
                alt="Next Technique"
                className="w-full max-w-[300px] sm:max-w-[400px] h-auto"
              />
            </button>
            {!allSectionsRead() && (
              <p className="text-center text-[#666666] mt-4 text-sm">
                Read all sections to unlock the next technique
              </p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
