"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
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
        const savedMockUser = localStorage.getItem(MOCK_USER_KEY);
        if (savedMockUser) {
          const parsedUser = JSON.parse(savedMockUser);
          setUser(parsedUser);
          setLoading(false);
          return;
        }

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
        localStorage.removeItem(MOCK_USER_KEY);
      } else if (!localStorage.getItem(MOCK_USER_KEY)) {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    // Check for specific admin credentials
    if (email === 'admin@test.com' && pass === 'admin123') {
      const mockUser = {
        id: 'demo-admin-id',
        email: 'admin@test.com',
        app_metadata: { role: 'admin' },
        user_metadata: { full_name: 'System Admin' },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      } as User;
      
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Logged in as Admin");
      return;
    }

    // For any other credentials, simulate a normal user login
    const mockUser = {
      id: `demo-user-${Math.random().toString(36).substr(2, 9)}`,
      email: email,
      app_metadata: { role: 'user' },
      user_metadata: { full_name: email.split('@')[0] },
      aud: 'authenticated',
      created_at: new Date().toISOString()
    } as User;
    
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    
    // Simulate sending a message to mail
    toast.info(`Login notification sent to ${email}`);
    toast.success("Logged in successfully (No confirmation required)");
  };

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

  const isAuthenticated = !!user;
  const isAdmin = user?.email?.includes('admin') || user?.app_metadata?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, session, login, logout, isAuthenticated, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};