"use client";

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Bike, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

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
            
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 mb-2">Welcome Back</h1>
            <p className="text-zinc-500 text-sm">Sign in to access your orders and wishlist.</p>
          </div>
          
          <div className="supabase-auth-container">
            {supabase ? (
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
            ) : (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-bold">
                Supabase client not initialized.
              </div>
            )}
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