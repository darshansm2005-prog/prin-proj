"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { USER_ROLES } from '@/lib/supabase';
import { logAudit } from '@/lib/auditLog';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  enable2FA: (enabled: boolean) => Promise<void>;
  verify2FA: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

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
      setUser(session?.user?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        await logAudit('LOGIN_FAILURE', {
          user_id: user?.id ?? '',
          email,
          event: 'LOGIN_FAILURE',
          details: { error: error.message },
          ip_address: '127.0.0.1',
          user_agent: navigator.userAgent,
        });
        toast.error(error.message);
        throw error;
      }

      await logAudit('LOGIN_SUCCESS', {
        user_id: user?.id ?? '',
        email,
        event: 'LOGIN_SUCCESS',
        details: { session_id: session?.id },
        ip_address: '127.0.0.1',
        user_agent: navigator.userAgent,
      });
      
      toast.success("Logged in successfully");
    } catch (error: any) {
      throw error;
    }
  };

  const signup = async (email: string, pass: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password: pass,
      });

      if (error) {
        await logAudit('SIGNUP_FAILED', {
          user_id: user?.id ?? '',
          email,
          event: 'SIGNUP_FAILED',
          details: { error: error.message },
          ip_address: '127.0.0.1',
          user_agent: navigator.userAgent,
        });
        toast.error(error.message);
        throw error;
      }
      
      await logAudit('SIGNUP_SUCCESS', {
        user_id: user?.id ?? '',
        email,
        event: 'SIGNUP_SUCCESS',
        details: {},
        ip_address: '127.0.0.1',
        user_agent: navigator.userAgent,
      });
      
      toast.success("Check your email for the confirmation link!");
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      await logAudit('LOGOUT', {
        user_id: user?.id ?? '',
        email: user?.email ?? '',
        event: 'LOGOUT',
        details: {},
        ip_address: '127.0.0.1',
        user_agent: navigator.userAgent,
      });
      toast.info("Logged out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const enable2FA = async (enabled: boolean) => {
    if (!user) return;
        try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_2fa_enabled: enabled })
        .eq('id', user.id);

      if (error) throw error;
      
      setIs2FAEnabled(enabled);
      
      await logAudit(enabled ? '2FA_ENABLED' : '2FA_DISABLED', {
        user_id: user.id,
        email: user.email ?? '',
        event: enabled ? '2FA_ENABLED' : '2FA_DISABLED',
        details: {},
        ip_address: '127.0.0.1',
        user_agent: navigator.userAgent,
      });
    } catch (error) {
      console.error('Failed to update 2FA status:', error);
    }
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    if (!user || !is2FAEnabled) return false;
    
    // In a real implementation, we'd verify the OTP code with Supabase    // For now, we'll simulate verification    if (code === '123456') {
      await logAudit('2FA_VERIFIED', {
        user_id: user.id,
        email: user.email ?? '',
        event: '2FA_VERIFIED',
        details: { code },
        ip_address: '127.0.0.1',
        user_agent: navigator.userAgent,
      });
      return true;
    }
    
    return false;
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.app_metadata?.role === USER_ROLES.ADMIN;

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      login, 
      signup, 
      logout, 
      isAuthenticated, 
      isAdmin, 
      loading,
      enable2FA,
      verify2FA
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};