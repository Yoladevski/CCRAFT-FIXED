interface OutlinedTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: 'black' | 'black-red';
}

export function OutlinedText({ children, className = '', style = {}, variant = 'black' }: OutlinedTextProps) {
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

      {variant === 'black-red' && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          stroke="#B11226"
          strokeWidth="14"
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
