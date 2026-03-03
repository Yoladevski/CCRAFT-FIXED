import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    const handleCallback = async () => {
      // Detect session after email verification
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error during callback:', error);
        setMessage('Error signing in. Please try again.');
        setTimeout(() => navigate('/auth', { replace: true }), 2000);
        return;
      }

      // No session means verification failed - redirect to auth
      if (!data.session) {
        setMessage('No session found. Redirecting...');
        setTimeout(() => navigate('/auth', { replace: true }), 1500);
        return;
      }

      const userId = data.session.user.id;

      // Check if profile exists and get onboarding status
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, onboarding_complete, full_name')
        .eq('user_id', userId)
        .maybeSingle();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        setMessage('Error loading profile. Redirecting...');
        setTimeout(() => navigate('/auth', { replace: true }), 2000);
        return;
      }

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
          setMessage('Error setting up profile. Please try again.');
          setTimeout(() => navigate('/auth', { replace: true }), 2000);
          return;
        }

        // Redirect to complete profile (never to homepage)
        setMessage('Welcome! Let\'s complete your profile...');
        setTimeout(() => navigate('/create-profile', { replace: true }), 1000);
        return;
      }

      // Profile exists - check onboarding_complete status
      if (profile.onboarding_complete === true && profile.full_name) {
        // Onboarding complete - redirect to dashboard
        setMessage('Welcome back! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
      } else {
        // Onboarding incomplete - redirect to complete profile
        setMessage('Welcome! Let\'s complete your profile...');
        setTimeout(() => navigate('/create-profile', { replace: true }), 1000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B11226] mx-auto"></div>
        <p className="mt-4 text-[#A0A0A0]" style={{ fontFamily: 'Redhawk' }}>{message}</p>
      </div>
    </div>
  );
}
