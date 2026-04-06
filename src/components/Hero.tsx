"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden bg-zinc-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=2000&auto=format&fit=crop" 
          alt="Mountain Biking" 
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      <div className="container relative h-full flex items-center px-4 md:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 rounded-full border border-orange-500/20">
              New Season 2024
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              RIDE THE <br />
              <span className="text-orange-600">UNTHINKABLE.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-xl leading-relaxed">
              Engineered for those who push boundaries. Discover our collection of world-class mountain, road, and electric bikes.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white h-14 px-8 rounded-2xl text-lg font-bold">
                <Link to="/shop">Explore Collection <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold border-white/20 text-white hover:bg-white/10">
                <Play className="mr-2 h-5 w-5 fill-current" /> Watch Film
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-0 right-0 hidden lg:block p-12">
        <div className="flex gap-12">
          {[
            { label: "Models", value: "120+" },
            { label: "Countries", value: "45" },
            { label: "Awards", value: "12" }
          ].map((stat, i) => (
            <div key={i} className="text-right">
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;