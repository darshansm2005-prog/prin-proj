"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // Mock login logic
    // For demo purposes, any email containing "admin" gets admin privileges
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role,
    };
    setUser(mockUser);
    toast.success(`Welcome back, ${mockUser.name}! ${role === 'admin' ? '(Admin Access)' : ''}`);
  };

  const logout = () => {
    setUser(null);
    toast.info("Logged out successfully");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};