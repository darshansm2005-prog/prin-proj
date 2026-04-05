"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2000&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="container relative flex h-full flex-col items-center justify-center text-center text-white px-4">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          RIDE THE <span className="text-orange-500">FUTURE</span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg font-medium text-gray-200 sm:text-xl">
          Discover our curated collection of world-class mountain, road, and electric bikes. Engineered for performance, designed for the trail.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg rounded-full">
            <Link to="/shop">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-white px-8 py-6 text-lg rounded-full">
            <Link to="/shop?category=Electric">Explore E-Bikes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;