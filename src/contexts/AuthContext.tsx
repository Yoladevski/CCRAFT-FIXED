import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ data: { user: User | null } | null; error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);
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

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
