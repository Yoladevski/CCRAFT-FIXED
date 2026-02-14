import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          profile_picture_url: string | null;
          weight: number | null;
          height: number | null;
          experience_level: string | null;
          preferred_discipline: string | null;
          power_level: number;
          rank: string;
          referral_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          profile_picture_url?: string | null;
          weight?: number | null;
          height?: number | null;
          experience_level?: string | null;
          preferred_discipline?: string | null;
          power_level?: number;
          rank?: string;
          referral_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          profile_picture_url?: string | null;
          weight?: number | null;
          height?: number | null;
          experience_level?: string | null;
          preferred_discipline?: string | null;
          power_level?: number;
          rank?: string;
          referral_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      disciplines: {
        Row: {
          id: string;
          name: string;
          is_active: boolean;
          description: string | null;
          order_index: number;
          created_at: string;
        };
      };
      categories: {
        Row: {
          id: string;
          discipline_id: string;
          name: string;
          order_index: number;
          is_active: boolean;
          created_at: string;
        };
      };
      techniques: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          order_index: number;
          video_url: string | null;
          xp_reward: number;
          why: string | null;
          how: string | null;
          when_to_use: string | null;
          common_mistakes: string | null;
          tactical_uses: string | null;
          simple_drills: string | null;
          created_at: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          technique_id: string;
          completed: boolean;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          technique_id: string;
          completed?: boolean;
          completed_at?: string;
        };
      };
    };
  };
};
