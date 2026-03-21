import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = 'BACK' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-all group border border-[#B11226] rounded-full px-4 py-2"
      style={{
        boxShadow: '0 0 8px rgba(177, 18, 38, 0.6), 0 0 20px rgba(177, 18, 38, 0.3)',
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        fontWeight: 700,
      }}
    >
      <ArrowLeft className="group-hover:-translate-x-1 transition-transform flex-shrink-0" size={16} />
      <span>{label}</span>
    </button>
  );
}
