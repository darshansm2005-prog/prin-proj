"use client";

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bike, ArrowRight, Github } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 lg:px-32 bg-white">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="flex items-center space-x-2 mb-12">
            <Bike className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-black tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
          </Link>
          
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">Welcome back</h1>
          <p className="text-zinc-500 mb-8">Enter your details to access your account.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-zinc-700">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
                className="h-12 rounded-xl border-zinc-200 focus-visible:ring-orange-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="font-bold text-zinc-700">Password</Label>
                <a href="#" className="text-sm font-bold text-orange-600 hover:underline">Forgot?</a>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="h-12 rounded-xl border-zinc-200 focus-visible:ring-orange-600"
              />
            </div>
            
            <Button type="submit" className="w-full bg-zinc-900 hover:bg-orange-600 text-white h-12 rounded-xl font-bold text-lg transition-colors">
              Sign In <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-100"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-zinc-400 font-bold">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-zinc-200 font-bold">
              <Github className="mr-2 h-5 w-5" /> Github
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-zinc-200 font-bold">
              Google
            </Button>
          </div>
          
          <p className="mt-8 text-center text-sm text-zinc-500">
            Don't have an account? <a href="#" className="font-bold text-orange-600 hover:underline">Sign up for free</a>
          </p>
        </div>
      </div>
      
      {/* Right Side - Image/Quote */}
      <div className="hidden lg:flex flex-1 bg-zinc-900 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop" 
          alt="Cycling" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
        <div className="relative z-10 mt-auto p-16">
          <blockquote className="space-y-4">
            <p className="text-3xl font-bold text-white leading-tight italic">
              "Life is like riding a bicycle. To keep your balance, you must keep moving."
            </p>
            <footer className="text-orange-500 font-black tracking-widest uppercase text-sm">
              — Albert Einstein
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Login;