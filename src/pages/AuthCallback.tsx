import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error during OAuth callback:', error);
        navigate('/', { replace: true });
        return;
      }

      if (data.session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('user_id', data.session.user.id)
          .maybeSingle();

        if (!profile?.full_name) {
          navigate('/create-profile', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        navigate('/', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B11226] mx-auto"></div>
        <p className="mt-4 text-[#A0A0A0]">Completing sign in...</p>
      </div>
    </div>
  );
}
