"use client";

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Bike, ArrowLeft, Loader2, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const { login, signup, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  const handleAuth = async (type: 'login' | 'signup') => {
    setIsSubmitting(true);
    try {
      if (type === 'login') {
        await login(email, password);
      } else {
        await signup(email, password);
      }
    } catch (error) {
      // Error is handled in context via toast
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-orange-900/5 border border-zinc-100 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <Link to="/" className="inline-flex items-center space-x-2 mb-8 group">
              <div className="bg-orange-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-600/20">
                <Bike className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
            </Link>
            
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-zinc-500 text-sm">
              Enter your details to access your account.
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-100 rounded-2xl p-1">
              <TabsTrigger value="login" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Register</TabsTrigger>
            </TabsList>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-11 h-12 rounded-xl border-zinc-200 focus-visible:ring-orange-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <button className="text-xs font-bold text-orange-600 hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
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

              <TabsContent value="login" className="m-0">
                <Button 
                  className="w-full bg-zinc-900 hover:bg-orange-600 text-white h-14 rounded-2xl text-lg font-bold transition-all shadow-lg shadow-zinc-900/10"
                  onClick={() => handleAuth('login')}
                  disabled={isSubmitting || !email || !password}
                >
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="m-0">
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-14 rounded-2xl text-lg font-bold transition-all shadow-lg shadow-orange-600/10"
                  onClick={() => handleAuth('signup')}
                  disabled={isSubmitting || !email || !password}
                >
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                </Button>
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-10 pt-8 border-t border-zinc-100">
            <Button asChild variant="ghost" className="w-full rounded-xl text-zinc-500 hover:text-orange-600 font-bold">
              <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;