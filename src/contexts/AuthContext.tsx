import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string) => Promise<{ data: { user: User | null } | null; error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        setIsAdmin(profile?.role === 'admin');
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();

          setIsAdmin(profile?.role === 'admin');
        } else {
          setIsAdmin(false);
        }

        setLoading(false);

        if (session?.user && _event === 'SIGNED_IN') {
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (!existingProfile) {
            await supabase.from('profiles').insert({
              user_id: session.user.id,
              power_level: 0,
              rank: 'Amateur',
              onboarding_complete: false,
            });
          }

          const pendingGoogleSignUp = sessionStorage.getItem('pendingGoogleSignUp');
          const waiverVersion = sessionStorage.getItem('waiverVersion');

          if (pendingGoogleSignUp === 'true' && waiverVersion) {
            const { data: existingAcceptance } = await supabase
              .from('user_legal_acceptance')
              .select('id')
              .eq('user_id', session.user.id)
              .maybeSingle();

            if (!existingAcceptance) {
              await supabase.from('user_legal_acceptance').insert({
                user_id: session.user.id,
                waiver_version: waiverVersion,
              });
            }

            sessionStorage.removeItem('pendingGoogleSignUp');
            sessionStorage.removeItem('waiverVersion');
          }
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const contextValue = useMemo(
    () => ({ user, session, loading, isAdmin, signUp, signIn, signInWithGoogle, signOut }),
    [user, session, loading, isAdmin, signUp, signIn, signInWithGoogle, signOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}