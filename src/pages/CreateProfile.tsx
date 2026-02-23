import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function CreateProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
          onboarding_complete: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Navigate to dashboard after successful profile completion
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-md w-full bg-[#1A1A1A] rounded-lg p-6 sm:p-8 border border-[#B11226]/30">
        <h1
          className="text-3xl sm:text-4xl font-bold text-white text-center mb-2"
          style={{ fontFamily: 'Redhawk' }}
        >
          COMPLETE YOUR PROFILE
        </h1>
        <p className="text-sm sm:text-base text-[#A0A0A0] text-center mb-8">
          Let's get you set up to start your training
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#A0A0A0] mb-2"
              style={{ fontFamily: 'Redhawk' }}
            >
              FULL NAME
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#2E2E2E] rounded-lg text-white placeholder-[#555] focus:outline-none focus:border-[#B11226] transition-colors"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-[#B11226]/10 border border-[#B11226]/30 rounded-lg p-3">
              <p className="text-sm text-[#B11226]">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-[#B11226] hover:bg-[#8B0E1C] text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Redhawk' }}
          >
            {loading ? 'SAVING...' : 'CONTINUE TO DASHBOARD'}
          </button>
        </form>

        <p className="text-xs text-[#555] text-center mt-6">
          You can update your profile information anytime from your account settings
        </p>
      </div>
    </div>
  );
}
