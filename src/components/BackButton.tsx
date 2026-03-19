import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-all mb-6 group border border-[#B11226] rounded-md px-3 py-1.5"
      style={{ boxShadow: '0 0 8px rgba(177, 18, 38, 0.5), 0 0 16px rgba(177, 18, 38, 0.2)' }}
    >
      <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
      <span className="font-medium">Back</span>
    </button>
  );
}
