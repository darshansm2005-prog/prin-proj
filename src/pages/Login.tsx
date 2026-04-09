"use client";

import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Bike, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 lg:px-32 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center space-x-2">
              <Bike className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-black tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
            </Link>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
            </Button>
          </div>
          
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">Welcome</h1>
          <p className="text-zinc-500 mb-8">Sign in or create an account to start your journey.</p>
          
          <div className="supabase-auth-container">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#ea580c',
                      brandAccent: '#c2410c',
                    },
                    radii: {
                      buttonRadius: '12px',
                      inputRadius: '12px',
                    }
                  }
                }
              }}
              providers={[]}
              theme="light"
            />
          </div>
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