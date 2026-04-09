import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// We check if the variables exist before creating the client to avoid the "supabaseUrl is required" error
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please ensure the Supabase integration is complete and restart the app.');
}

// If variables are missing, we export a proxy or a dummy to prevent the app from crashing immediately
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {} as any; // Fallback to prevent crash, though queries will fail until keys are provided