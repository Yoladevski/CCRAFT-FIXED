interface MobileNavMenuItemProps {
  children: string;
  onClick: () => void;
  isActive: boolean;
}

export function MobileNavMenuItem({ children, onClick, isActive }: MobileNavMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left text-xl py-4 px-4 rounded transition-all ${
        isActive ? 'bg-[#B11226] text-white' : 'text-[#A0A0A0] hover:bg-[#2E2E2E]'
      }`}
      style={{
        fontFamily: 'Orbitron, sans-serif',
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: '5px',
        fontSize: '18px',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = 'white';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = '#A0A0A0';
        }
      }}
    >
      {children}
    </button>
  );
}
