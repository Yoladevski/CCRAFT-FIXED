import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfile?: boolean;
}

export default function ProtectedRoute({ children, requireProfile = false }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(requireProfile);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    async function checkProfile() {
      if (!user) {
        navigate('/auth', { replace: true });
        return;
      }

      if (requireProfile) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_complete, full_name')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!profile || !profile.onboarding_complete || !profile.full_name) {
          navigate('/create-profile', { replace: true });
          return;
        }

        setProfileComplete(true);
      }

      setChecking(false);
    }

    if (!authLoading) {
      checkProfile();
    }
  }, [user, authLoading, requireProfile, navigate]);

  if (authLoading || checking) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="text-2xl text-[#A0A0A0]" style={{ fontFamily: 'Redhawk' }}>LOADING...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireProfile && !profileComplete) {
    return null;
  }

  return <>{children}</>;
}
