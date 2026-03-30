import { useStreakContext } from '../contexts/StreakContext';

export default function TrainingStreak() {
  const { currentStreak, trainedToday, justIncreased, loading } = useStreakContext();

  if (loading) return null;

  let subMessage: string;
  if (justIncreased) {
    subMessage = 'Great work. Your streak continues.';
  } else if (trainedToday) {
    subMessage = 'Training complete today.';
  } else {
    subMessage = 'Train today to keep\nyour streak alive.';
  }

  return (
    <div
      className="bg-black border-2 border-[#B11226] rounded-lg p-5 sm:p-6 flex flex-col gap-3 relative overflow-hidden"
      style={{
        boxShadow:
          '0 0 15px rgba(177, 18, 38, 0.6), 0 0 30px rgba(177, 18, 38, 0.3), inset 0 0 10px rgba(177, 18, 38, 0.1)',
        isolation: 'isolate',
      }}
    >
      <div className="relative z-10 flex flex-col gap-3 items-center text-center">
        {/* Title - no flame emoji, larger on mobile */}
        <h3
          className="sm:text-xs"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(0.72rem, 3.5vw, 0.75rem)',
            letterSpacing: '0.2em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          Training Streak
        </h3>

        {/* Streak number + label */}
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
            className="sm:text-xs font-bold tracking-[0.22em] uppercase pb-1.5"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(0.62rem, 3vw, 0.75rem)',
              color: '#B11226',
              textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
            }}
          >
            DAY{currentStreak !== 1 ? 'S' : ''} STREAK
          </span>
        </div>

        {/* Sub message - no bullet point, centred, two lines if needed */}
        <p
          className={`sm:text-[11px] tracking-wide font-medium whitespace-pre-line ${
            trainedToday ? 'text-[#4CAF50]' : 'text-[#A0A0A0]'
          }`}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(0.6rem, 2.5vw, 0.69rem)',
            textAlign: 'center',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {subMessage}
        </p>

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
