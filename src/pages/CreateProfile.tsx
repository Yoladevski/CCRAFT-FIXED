import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

export default function CreateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-2xl w-full bg-neutral-900 rounded-lg p-4 sm:p-6 md:p-8 border border-red-600/30">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 text-center mb-4 sm:mb-6">
          Create Your Profile
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 text-center mb-6 sm:mb-8">
          Profile creation page coming soon...
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 px-4 sm:px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base rounded-lg transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
