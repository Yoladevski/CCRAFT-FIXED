import BackButton from '../components/BackButton';

interface NewsProps {
  onBack: () => void;
}

export default function News({ onBack }: NewsProps) {
  return (
    <div className="min-h-screen py-6 sm:py-12 px-4 relative -mt-20 pt-20 sm:pt-24">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-4 sm:mb-6">
          <BackButton onClick={onBack} />
        </div>
        <h1 className="cc-outline-text text-4xl sm:text-5xl font-bold text-center mb-12">NEWS</h1>
      </div>
    </div>
  );
}
