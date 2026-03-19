interface LevelProgressIndicatorProps {
  level: number;
  completed: number;
  total: number;
  compact?: boolean;
}

export default function LevelProgressIndicator({
  level,
  completed,
  total,
  compact = false,
}: LevelProgressIndicatorProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isComplete = completed === total && total > 0;

  return (
    <div
      className="w-full flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #111111 100%)',
        border: `1px solid ${isComplete ? 'rgba(177,18,38,0.7)' : 'rgba(177,18,38,0.3)'}`,
        borderRadius: '0.75rem',
        padding: compact ? '0.75rem 1rem' : '1.1rem 1.4rem',
        gap: compact ? '0.5rem' : '0.65rem',
        boxShadow: isComplete
          ? '0 0 14px rgba(177,18,38,0.4), 0 0 28px rgba(177,18,38,0.15)'
          : '0 0 8px rgba(177,18,38,0.15)',
      }}
    >
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <p
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900,
            fontSize: compact ? '0.62rem' : '0.68rem',
            color: '#A0A0A0',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          Level {level} &mdash; Technique Progress
        </p>
        <p
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 900,
            fontSize: compact ? '0.72rem' : '0.8rem',
            color: isComplete ? '#B11226' : '#FFFFFF',
            letterSpacing: '0.04em',
            textShadow: isComplete ? '0 0 14px rgba(177,18,38,0.8)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {completed} / {total} Techniques Complete
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{
            height: compact ? '6px' : '8px',
            background: '#1E1E1E',
            border: '1px solid #2E2E2E',
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${percentage}%`,
              background: percentage === 100
                ? 'linear-gradient(90deg, #B11226 0%, #ff2a44 100%)'
                : 'linear-gradient(90deg, #8a0d1c 0%, #B11226 100%)',
              boxShadow: percentage > 0 ? '0 0 8px rgba(177,18,38,0.7), 0 0 16px rgba(177,18,38,0.3)' : 'none',
              transition: 'width 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        <p
          style={{
            fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
            fontWeight: 600,
            fontSize: compact ? '0.65rem' : '0.7rem',
            color: isComplete ? '#B11226' : '#666666',
            letterSpacing: '0.06em',
            textAlign: 'right',
          }}
        >
          {percentage}% Complete
        </p>
      </div>
    </div>
  );
}
