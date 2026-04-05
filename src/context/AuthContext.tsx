"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { showSuccess } from '@/utils/toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, name: string) => {
    const newUser = { id: '1', email, name };
    setUser(newUser);
    showSuccess(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    showSuccess("Logged out successfully.");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};