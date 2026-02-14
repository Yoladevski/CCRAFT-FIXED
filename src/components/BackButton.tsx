import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onBack: () => void;
}

export default function BackButton({ onBack }: BackButtonProps) {
  return (
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors mb-6 group"
    >
      <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
      <span className="font-medium">Back</span>
    </button>
  );
}
