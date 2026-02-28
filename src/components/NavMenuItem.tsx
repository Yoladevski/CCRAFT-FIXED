interface NavMenuItemProps {
  children: string;
  onClick: () => void;
  isActive: boolean;
}

export function NavMenuItem({ children, onClick, isActive }: NavMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="relative transition-all duration-300 pb-1"
      style={{
        fontSize: '18px',
        fontFamily: 'Orbitron, sans-serif',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '5px',
        color: '#EDEDED',
        WebkitTextStroke: '3px #000000',
        textShadow: `
          -1px -1px 0 #B11226,
          1px -1px 0 #B11226,
          -1px 1px 0 #B11226,
          1px 1px 0 #B11226,
          -2px -2px 0 #B11226,
          2px -2px 0 #B11226,
          -2px 2px 0 #B11226,
          2px 2px 0 #B11226,
          -3px -3px 0 #B11226,
          3px -3px 0 #B11226,
          -3px 3px 0 #B11226,
          3px 3px 0 #B11226,
          -4px -4px 0 #B11226,
          4px -4px 0 #B11226,
          -4px 4px 0 #B11226,
          4px 4px 0 #B11226,
          -5px -5px 0 #B11226,
          5px -5px 0 #B11226,
          -5px 5px 0 #B11226,
          5px 5px 0 #B11226
        `,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.textShadow = `
          -1px -1px 0 #B11226,
          1px -1px 0 #B11226,
          -1px 1px 0 #B11226,
          1px 1px 0 #B11226,
          -2px -2px 0 #B11226,
          2px -2px 0 #B11226,
          -2px 2px 0 #B11226,
          2px 2px 0 #B11226,
          -3px -3px 0 #B11226,
          3px -3px 0 #B11226,
          -3px 3px 0 #B11226,
          3px 3px 0 #B11226,
          -4px -4px 0 #B11226,
          4px -4px 0 #B11226,
          -4px 4px 0 #B11226,
          4px 4px 0 #B11226,
          -5px -5px 0 #B11226,
          5px -5px 0 #B11226,
          -5px 5px 0 #B11226,
          5px 5px 0 #B11226,
          0 0 10px #B11226,
          0 0 20px #B11226,
          0 0 30px #B11226
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.textShadow = `
          -1px -1px 0 #B11226,
          1px -1px 0 #B11226,
          -1px 1px 0 #B11226,
          1px 1px 0 #B11226,
          -2px -2px 0 #B11226,
          2px -2px 0 #B11226,
          -2px 2px 0 #B11226,
          2px 2px 0 #B11226,
          -3px -3px 0 #B11226,
          3px -3px 0 #B11226,
          -3px 3px 0 #B11226,
          3px 3px 0 #B11226,
          -4px -4px 0 #B11226,
          4px -4px 0 #B11226,
          -4px 4px 0 #B11226,
          4px 4px 0 #B11226,
          -5px -5px 0 #B11226,
          5px -5px 0 #B11226,
          -5px 5px 0 #B11226,
          5px 5px 0 #B11226
        `;
      }}
    >
      {children}
      {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B11226]" />}
    </button>
  );
}
