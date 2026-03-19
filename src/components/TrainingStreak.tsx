import { useStreakContext } from '../contexts/StreakContext';
import { BGPattern } from './ui/bg-pattern';

export default function TrainingStreak() {
  const { currentStreak, trainedToday, justIncreased, loading } = useStreakContext();

  if (loading) return null;

  let subMessage: string;
  if (justIncreased) {
    subMessage = 'Great work. Your streak continues.';
  } else if (trainedToday) {
    subMessage = 'Training complete today.';
  } else {
    subMessage = 'Train today to keep your streak alive.';
  }

  return (
    <div
      className="bg-[#1A1A1A] border-2 border-[#B11226] rounded-lg p-5 sm:p-6 flex flex-col gap-3 relative overflow-hidden"
      style={{
        boxShadow:
          '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
        isolation: 'isolate',
      }}
    >
      <BGPattern variant="grid" fill="#3a3a3a" size={20} opacity={0.35} />
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-base sm:text-lg leading-none">🔥</span>
          <h3
            className="text-[10px] sm:text-xs tracking-[0.2em] font-bold text-[#B11226] uppercase"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Training Streak
          </h3>
        </div>

        <div className="flex items-end gap-3 justify-center">
          <span
            className="text-4xl sm:text-5xl font-black text-white leading-none"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              textShadow: trainedToday
                ? '0 0 20px rgba(177,18,38,0.8), 0 0 40px rgba(177,18,38,0.4)'
                : 'none',
            }}
          >
            {currentStreak}
          </span>
          <span
            className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-white uppercase pb-1.5"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            DAY{currentStreak !== 1 ? 'S' : ''} STREAK
          </span>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${trainedToday ? 'bg-[#4CAF50]' : 'bg-[#B11226]'}`}
          />
          <p
            className={`text-[10px] sm:text-[11px] tracking-wide font-medium ${
              trainedToday ? 'text-[#4CAF50]' : 'text-[#A0A0A0]'
            }`}
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {subMessage}
          </p>
        </div>

        {currentStreak >= 3 && (
          <div className="flex gap-1 flex-wrap pt-1 justify-center">
            {Array.from({ length: Math.min(currentStreak, 10) }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-1.5 rounded-full"
                style={{
                  background: i < currentStreak ? '#B11226' : '#2E2E2E',
                  boxShadow: i < currentStreak ? '0 0 4px rgba(177,18,38,0.6)' : 'none',
                }}
              />
            ))}
            {currentStreak > 10 && (
              <span
                className="text-[9px] text-[#A0A0A0] self-center ml-1"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                +{currentStreak - 10}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
