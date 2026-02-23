import { CSSProperties, useEffect, useRef, useState } from 'react';

interface OutlinedTextProps {
  children: string;
  className?: string;
  style?: CSSProperties;
}

export default function OutlinedText({
  children,
  className = '',
  style = {}
}: OutlinedTextProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [bbox, setBbox] = useState({ width: 100, height: 20 });

  useEffect(() => {
    if (!measureRef.current) return;

    const measure = () => {
      if (!measureRef.current) return;
      const rect = measureRef.current.getBoundingClientRect();
      setBbox({
        width: Math.ceil(rect.width) + 20,
        height: Math.ceil(rect.height) + 20
      });
    };

    measure();
    const timeout = setTimeout(measure, 100);
    window.addEventListener('resize', measure);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', measure);
    };
  }, [children, style]);

  return (
    <span
      className={`outlined-text ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        ...style
      }}
    >
      <span
        ref={measureRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          fontFamily: 'Redhawk, sans-serif',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          whiteSpace: 'nowrap'
        }}
      >
        {children}
      </span>

      <svg
        width={bbox.width}
        height={bbox.height}
        viewBox={`0 0 ${bbox.width} ${bbox.height}`}
        style={{
          display: 'block',
          overflow: 'visible'
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x={bbox.width / 2}
          y={bbox.height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Redhawk, sans-serif"
          fontWeight="700"
          textTransform="uppercase"
          fontSize={style.fontSize || '1em'}
          letterSpacing={style.letterSpacing || '0.08em'}
          stroke="#B11226"
          strokeWidth="6"
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
          x={bbox.width / 2}
          y={bbox.height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Redhawk, sans-serif"
          fontWeight="700"
          textTransform="uppercase"
          fontSize={style.fontSize || '1em'}
          letterSpacing={style.letterSpacing || '0.08em'}
          stroke="#000000"
          strokeWidth="3"
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
          x={bbox.width / 2}
          y={bbox.height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Redhawk, sans-serif"
          fontWeight="700"
          textTransform="uppercase"
          fontSize={style.fontSize || '1em'}
          letterSpacing={style.letterSpacing || '0.08em'}
          fill="#FFFFFF"
          stroke="none"
          shapeRendering="geometricPrecision"
          textRendering="optimizeLegibility"
        >
          {children}
        </text>
      </svg>
    </span>
  );
}
