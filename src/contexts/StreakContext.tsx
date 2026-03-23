import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface StreakState {
  currentStreak: number;
  trainedToday: boolean;
  justIncreased: boolean;
  loading: boolean;
}

interface StreakContextType extends StreakState {
  recordTraining: () => Promise<number>;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

function getTodayLocalDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getYesterdayLocalDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function StreakProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<StreakState>({
    currentStreak: 0,
    trainedToday: false,
    justIncreased: false,
    loading: true,
  });

  useEffect(() => {
    if (!user) {
      setState({ currentStreak: 0, trainedToday: false, justIncreased: false, loading: false });
      return;
    }
    async function load() {
      const { data } = await supabase
        .from('profiles')
        .select('current_streak, last_training_date')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (!data) {
        setState({ currentStreak: 0, trainedToday: false, justIncreased: false, loading: false });
        return;
      }

      const today = getTodayLocalDate();
      setState({
        currentStreak: data.current_streak ?? 0,
        trainedToday: data.last_training_date === today,
        justIncreased: false,
        loading: false,
      });
    }
    load();
  }, [user]);

  const recordTraining = useCallback(async (): Promise<number> => {
    if (!user) return 0;

    const today = getTodayLocalDate();
    const yesterday = getYesterdayLocalDate();

    const { data } = await supabase
      .from('profiles')
      .select('current_streak, last_training_date')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!data) return 0;

    if (data.last_training_date === today) {
      return data.current_streak ?? 0;
    }

    const newStreak =
      data.last_training_date === yesterday ? (data.current_streak ?? 0) + 1 : 1;

    await supabase
      .from('profiles')
      .update({ current_streak: newStreak, last_training_date: today })
      .eq('user_id', user.id);

    setState({
      currentStreak: newStreak,
      trainedToday: true,
      justIncreased: true,
      loading: false,
    });

    return newStreak;
  }, [user]);

  return (
    <StreakContext.Provider value={{ ...state, recordTraining }}>
      {children}
    </StreakContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStreakContext() {
  const ctx = useContext(StreakContext);
  if (!ctx) throw new Error('useStreakContext must be used within StreakProvider');
  return ctx;
}
