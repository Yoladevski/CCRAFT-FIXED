interface OutlinedTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
  redOutline?: boolean;
  glowColor?: string;
  glowStdDeviation?: number;
  fillColor?: string;
}

export function OutlinedText({
  children,
  className = '',
  style = {},
  strokeWidth = 8,
  redOutline = false,
  glowColor,
  glowStdDeviation = 2,
  fillColor = '#EDEDED',
}: OutlinedTextProps) {
  const fontSize = style.fontSize || '1rem';
  const filterId = glowColor ? `glow-${Math.random().toString(36).slice(2, 7)}` : undefined;

  return (
    <svg
      className={`outlined-text ${className}`}
      style={{
        width: '100%',
        height: 'auto',
        overflow: 'visible',
        ...style,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
            .outlined-text text {
              font-family: inherit;
              font-weight: inherit;
              font-size: ${fontSize};
              letter-spacing: inherit;
            }
          `}
        </style>
        {glowColor && filterId && (
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={glowStdDeviation} result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {redOutline && strokeWidth > 0 && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="#cc0000"
          strokeWidth={strokeWidth + 3}
          fill="none"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          paintOrder="stroke fill"
          shapeRendering="geometricPrecision"
          textRendering="optimizeLegibility"
        >
          {children}
        </text>
      )}

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="#000000"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        paintOrder="stroke fill"
        shapeRendering="geometricPrecision"
        textRendering="optimizeLegibility"
      >
        {children}
      </text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={fillColor}
        stroke="none"
        paintOrder="stroke fill"
        shapeRendering="geometricPrecision"
        textRendering="optimizeLegibility"
        filter={filterId ? `url(#${filterId})` : undefined}
      >
        {children}
      </text>
    </svg>
  );
}
