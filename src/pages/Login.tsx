"use client";

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Bike, ArrowLeft, Loader2, Eye, EyeOff, Mail, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Check your email for the confirmation link!");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin1017@test.com');
    setPassword('admin123');
    toast.info("Admin credentials filled. Click Sign Up if this is your first time!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-xl shadow-orange-900/5 border border-zinc-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
              <div className="bg-orange-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
                <Bike className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
            </Link>
            
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-zinc-500 text-sm">
              {isLogin ? "Sign in to access your orders and wishlist." : "Join our community of riders today."}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input 
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="pl-11 h-12 rounded-xl border-zinc-200 focus-visible:ring-orange-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="pl-11 pr-11 h-12 rounded-xl border-zinc-200 focus-visible:ring-orange-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 h-12 rounded-xl font-bold text-lg shadow-lg shadow-orange-600/20"
              >
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (isLogin ? "Sign In" : "Sign Up")}
              </Button>

              <Button 
                type="button"
                variant="outline"
                onClick={fillDemoAdmin}
                className="w-full h-12 rounded-xl font-bold border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              >
                <ShieldCheck className="mr-2 h-4 w-4 text-orange-600" /> Demo Admin Access
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-zinc-500 hover:text-orange-600 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-100">
            <Button asChild variant="ghost" className="w-full rounded-xl text-zinc-500 hover:text-orange-600">
              <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;