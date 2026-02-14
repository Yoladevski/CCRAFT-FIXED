import { useState } from 'react';
import BackButton from '../components/BackButton';
import { BGPattern } from '../components/ui/bg-pattern';

interface NewsProps {
  onBack: () => void;
}

const mockArticles = [
  {
    id: 1,
    title: 'NEW MUAY THAI DISCIPLINE COMING SOON',
    discipline: 'Muay Thai',
    summary: 'The art of eight limbs will be available next month. Master devastating elbow and knee strikes.',
    date: '2024-02-15',
    image: '🥋',
  },
  {
    id: 2,
    title: 'BOXING FUNDAMENTALS UPDATE',
    discipline: 'Boxing',
    summary: 'New advanced combinations and defensive techniques added to the Boxing curriculum.',
    date: '2024-02-10',
    image: '🥊',
  },
  {
    id: 3,
    title: 'INTRODUCING RANK CHALLENGES',
    discipline: 'All',
    summary: 'Test your skills with rank-specific challenges and earn bonus XP.',
    date: '2024-02-05',
    image: '🏆',
  },
];

export default function News({ onBack }: NewsProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState('All');

  const disciplines = ['All', 'Boxing', 'Muay Thai', 'BJJ', 'General'];

  const filteredArticles =
    selectedDiscipline === 'All'
      ? mockArticles
      : mockArticles.filter((article) => article.discipline === selectedDiscipline);

  return (
    <div className="min-h-screen py-12 px-4 relative -mt-20 pt-20">
      <BGPattern variant="grid" size={24} fill="#1a1a1a" mask="fade-edges" className="opacity-30" />
      <div className="max-w-6xl mx-auto relative z-10">
        <BackButton onBack={onBack} />
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12" style={{ textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000' }}>NEWS</h1>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {disciplines.map((discipline) => (
            <button
              key={discipline}
              onClick={() => setSelectedDiscipline(discipline)}
              className={`px-6 py-3 rounded font-bold transition-all ${
                selectedDiscipline === discipline
                  ? 'bg-[#B11226] text-white'
                  : 'bg-[#2E2E2E] text-[#A0A0A0] hover:bg-[#3E3E3E]'
              }`}
            >
              {discipline}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-[#1A1A1A] rounded-lg border border-[#2E2E2E] overflow-hidden hover:border-[#B11226] transition-all transform hover:scale-105"
            >
              <div className="h-48 bg-[#2E2E2E] flex items-center justify-center text-7xl">
                {article.image}
              </div>
              <div className="p-6">
                <div className="text-xs text-[#B11226] font-bold mb-2">
                  {article.discipline}
                </div>
                <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                <p className="text-[#A0A0A0] text-body mb-4 leading-relaxed">
                  {article.summary}
                </p>
                <div className="text-sm text-[#A0A0A0] text-body">
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
