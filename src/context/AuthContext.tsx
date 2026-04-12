"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  logout: () => Promise<void>;
  devLogin: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_KEY = 'trysycle_mock_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [session, setSession] = React.useState<Session | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for mock user first (for demo purposes)
        const savedMockUser = localStorage.getItem(MOCK_USER_KEY);
        if (savedMockUser) {
          const parsedUser = JSON.parse(savedMockUser);
          setUser(parsedUser);
          setLoading(false);
          return;
        }

        // Otherwise check real Supabase session
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
      if (session) {
        setSession(session);
        setUser(session.user);
        localStorage.removeItem(MOCK_USER_KEY); // Clear mock if real login happens
      } else if (!localStorage.getItem(MOCK_USER_KEY)) {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      localStorage.removeItem(MOCK_USER_KEY);
      toast.info("Logged out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const devLogin = () => {
    const mockUser = {
      id: 'dev-admin-id',
      email: 'admin@trysycle.com',
      app_metadata: { role: 'admin' },
      user_metadata: { full_name: 'Demo Admin' },
      aud: 'authenticated',
      created_at: new Date().toISOString()
    } as User;
    
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    toast.success("Demo Mode: Logged in as Admin");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.email?.includes('admin') || user?.app_metadata?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, session, logout, devLogin, isAuthenticated, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};