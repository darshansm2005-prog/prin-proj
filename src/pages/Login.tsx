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
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-24 lg:px-32 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-orange-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Bike className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
            </Link>
            <Button asChild variant="ghost" size="sm" className="rounded-full hover:bg-orange-50 hover:text-orange-600">
              <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
            </Button>
          </div>
          
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tight text-zinc-900 mb-3">Welcome Back</h1>
            <p className="text-zinc-500">Sign in to your account to manage your orders and wishlist.</p>
          </div>
          
          <div className="supabase-auth-container bg-white rounded-3xl">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#ea580c',
                      brandAccent: '#c2410c',
                      inputBackground: 'white',
                      inputText: '#18181b',
                      inputPlaceholder: '#a1a1aa',
                      inputBorder: '#e4e4e7',
                      inputBorderFocus: '#ea580c',
                      inputBorderHover: '#d4d4d8',
                    },
                    radii: {
                      buttonRadius: '16px',
                      inputRadius: '16px',
                    },
                    fonts: {
                      bodyFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                      buttonFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                      inputFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                      labelFontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
                    }
                  }
                },
                className: {
                  button: 'font-bold py-3 transition-all active:scale-[0.98]',
                  input: 'py-3 border-zinc-200 focus:border-orange-600 transition-all',
                  label: 'text-sm font-bold text-zinc-700 mb-1',
                }
              }}
              providers={[]}
              theme="light"
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email address',
                    password_label: 'Password',
                  },
                },
              }}
            />
          </div>
          
          <p className="mt-8 text-center text-xs text-zinc-400">
            By signing in, you agree to our <a href="#" className="underline hover:text-orange-600">Terms of Service</a> and <a href="#" className="underline hover:text-orange-600">Privacy Policy</a>.
          </p>
        </div>
      </div>
      
      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-zinc-900 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop" 
          alt="Cycling" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 hover:scale-100 transition-transform duration-[10s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="relative z-10 mt-auto p-20 max-w-2xl">
          <div className="h-1 w-20 bg-orange-600 mb-8" />
          <blockquote className="space-y-6">
            <p className="text-4xl font-black text-white leading-tight tracking-tight">
              "Life is like riding a bicycle. To keep your balance, you must keep moving."
            </p>
            <footer className="flex items-center gap-4">
              <div className="h-px w-8 bg-zinc-700" />
              <span className="text-orange-500 font-black tracking-widest uppercase text-sm">
                Albert Einstein
              </span>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Login;