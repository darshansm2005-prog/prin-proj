"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Bike, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="container px-4 md:px-8 mb-24">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-orange-600 font-black tracking-widest uppercase text-sm"
            >
              Our Story
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 mt-4 mb-8"
            >
              WE LIVE FOR THE <span className="text-orange-600">RIDE.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 leading-relaxed"
            >
              Founded in 2024, TRYsycle was born from a simple obsession: creating the ultimate destination for cyclists who refuse to compromise on performance, style, or quality.
            </motion.p>
          </div>
        </section>

        {/* Image Section */}
        <section className="w-full h-[600px] mb-24 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2000&auto=format&fit=crop" 
            alt="Cycling Culture" 
            className="w-full h-full object-cover"
          />
        </section>

        {/* Values Section */}
        <section className="container px-4 md:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-black">Our Mission</h3>
              <p className="text-zinc-500">To empower every rider with the world's most advanced cycling technology and a community that inspires growth.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-black">Community First</h3>
              <p className="text-zinc-500">We're more than a shop. We're a hub for local riders, hosting weekly events and supporting cycling advocacy.</p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-black">Unmatched Quality</h3>
              <p className="text-zinc-500">We only stock brands that meet our rigorous standards for durability, performance, and innovation.</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;