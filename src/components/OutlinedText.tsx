interface OutlinedTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

export function OutlinedText({ children, className = '', style = {} }: OutlinedTextProps) {
  const fontSize = style.fontSize || '1rem';

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
      </defs>

      {/* Layer 1: Red outline (bottom) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="#B11226"
        strokeWidth="9"
        fill="none"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        paintOrder="stroke fill"
        shapeRendering="geometricPrecision"
        textRendering="optimizeLegibility"
      >
        {children}
      </text>

      {/* Layer 2: Black outline (middle) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="#000000"
        strokeWidth="8"
        fill="none"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        paintOrder="stroke fill"
        shapeRendering="geometricPrecision"
        textRendering="optimizeLegibility"
      >
        {children}
      </text>

      {/* Layer 3: White fill (top) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#EDEDED"
        stroke="none"
        paintOrder="stroke fill"
        shapeRendering="geometricPrecision"
        textRendering="optimizeLegibility"
      >
        {children}
      </text>
    </svg>
  );
}
