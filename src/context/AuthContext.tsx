"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          setSession(session);
          setUser(session.user);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }
    
    toast.success("Logged in successfully");
  };

  const signup = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (error) {
      toast.error(error.message);
      throw error;
    }
    
    toast.success("Check your email for the confirmation link!");
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.info("Logged out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const isAuthenticated = !!user;
  // For this demo, we'll consider any user with 'admin' in their email as an admin
  const isAdmin = user?.email?.includes('admin') || user?.app_metadata?.role === 'admin';

  // Create default admin user if it doesn't exist
  useEffect(() => {
    const createDefaultAdmin = async () => {
      if (!user && !loading) {
        try {
          // Check if admin user exists
          const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', 'admin@trysycle.com');

          if (error) throw error;

          // If admin user doesn't exist, create it
          if (!data || data.length === 0) {
            const { data: userData, error: userError } = await supabase.auth.signUp({
              email: 'admin@trysycle.com',
              password: 'admin123',
            });

            if (userError) throw userError;

            // Update user metadata to include admin role
            await supabase
              .from('profiles')
              .upsert({
                id: userData.user.id,
                first_name: 'Admin',
                last_name: 'User',
                avatar_url: 'https://example.com/admin-avatar.png',
                user_metadata: { role: 'admin' }
              });
          }
        } catch (error) {
          console.error("Failed to create default admin user:", error);
        }
      }
    };

    createDefaultAdmin();
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, session, login, signup, logout, isAuthenticated, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};