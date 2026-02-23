import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error during callback:', error);
        setMessage('Error signing in. Redirecting...');
        setTimeout(() => navigate('/', { replace: true }), 2000);
        return;
      }

      if (data.session) {
        const userId = data.session.user.id;
        const userEmail = data.session.user.email;

        // Check if profile exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, onboarding_complete, full_name')
          .eq('user_id', userId)
          .maybeSingle();

        // If no profile exists, create one immediately
        if (!profile) {
          setMessage('Setting up your account...');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              user_id: userId,
              power_level: 0,
              rank: 'Amateur',
              onboarding_complete: false,
            });

          if (insertError) {
            console.error('Error creating profile:', insertError);
            setMessage('Error setting up profile. Redirecting...');
            setTimeout(() => navigate('/', { replace: true }), 2000);
            return;
          }

          // Route to complete profile
          setMessage('Welcome! Let\'s complete your profile...');
          setTimeout(() => navigate('/create-profile', { replace: true }), 1500);
          return;
        }

        // Profile exists - check if onboarding is complete
        if (!profile.onboarding_complete || !profile.full_name) {
          setMessage('Welcome! Let\'s complete your profile...');
          setTimeout(() => navigate('/create-profile', { replace: true }), 1500);
        } else {
          setMessage('Welcome back! Redirecting to dashboard...');
          setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
        }
      } else {
        navigate('/', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0E0E]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B11226] mx-auto"></div>
        <p className="mt-4 text-[#A0A0A0]" style={{ fontFamily: 'Redhawk' }}>{message}</p>
      </div>
    </div>
  );
}
