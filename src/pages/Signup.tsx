"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bike, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup
    login(email, name);
    navigate('/');
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
            <h1 className="text-3xl font-extrabold tracking-tight">Join VELOSHOP</h1>
            <p className="text-muted-foreground mt-2">Create an account to start shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="rounded-xl h-12"
              />
            </div>
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
              <Label htmlFor="password">Password</Label>
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
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Save your favorite bikes to your wishlist</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Track your orders and shipping status</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Exclusive access to new arrivals and sales</span>
            </div>
          </div>

          <div className="mt-8 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="font-bold text-orange-600 hover:underline">Sign in here</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;