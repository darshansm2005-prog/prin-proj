"use client";

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bike, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login(email, email.split('@')[0]);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
              <Bike className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Login to your VELOSHOP account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-xs font-bold text-orange-600 hover:underline">Forgot password?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="rounded-xl h-12"
              />
            </div>
            <Button type="submit" className="w-full bg-zinc-900 hover:bg-orange-600 text-white h-12 rounded-xl transition-colors">
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="font-bold text-orange-600 hover:underline">Create one now</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;