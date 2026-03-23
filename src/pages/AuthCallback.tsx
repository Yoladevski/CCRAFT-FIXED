import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    let cancelled = false;

    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (cancelled) return;

      if (error) {
        console.error('Error during callback:', error);
        setMessage('Error signing in. Please try again.');
        navigate('/auth', { replace: true });
        return;
      }

      if (!data.session) {
        setMessage('No session found. Redirecting...');
        navigate('/auth', { replace: true });
        return;
      }

      const userId = data.session.user.id;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, onboarding_complete, full_name')
        .eq('user_id', userId)
        .maybeSingle();

      if (cancelled) return;

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        setMessage('Error loading profile. Redirecting...');
        navigate('/auth', { replace: true });
        return;
      }

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

        if (cancelled) return;

        if (insertError) {
          console.error('Error creating profile:', insertError);
          setMessage('Error setting up profile. Please try again.');
          navigate('/auth', { replace: true });
          return;
        }

        setMessage('Welcome! Let\'s complete your profile...');
        navigate('/create-profile', { replace: true });
        return;
      }

      if (profile.onboarding_complete === true && profile.full_name) {
        setMessage('Welcome back! Redirecting to dashboard...');
        navigate('/dashboard', { replace: true });
      } else {
        setMessage('Welcome! Let\'s complete your profile...');
        navigate('/create-profile', { replace: true });
      }
    };

    handleCallback();

    return () => { cancelled = true; };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B11226] mx-auto"></div>
        <p className="mt-4 text-[#A0A0A0]" style={{ fontFamily: 'system-ui, -apple-system, Arial, sans-serif' }}>{message}</p>
      </div>
    </div>
  );
}
