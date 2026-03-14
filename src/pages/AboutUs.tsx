interface AboutUsProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export default function AboutUs({ onNavigate, onBack }: AboutUsProps) {
  return (
    <div className="min-h-screen" />
  );
}
