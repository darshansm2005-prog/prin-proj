"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const guides = [
  {
    title: "How to Choose Your First Mountain Bike",
    category: "Buying Guide",
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=800&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "The Ultimate E-Bike Battery Care Guide",
    category: "Maintenance",
    image: "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Road vs. Gravel: Which One is Right for You?",
    category: "Comparison",
    image: "https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800&auto=format&fit=crop",
    link: "#"
  }
];

const Guides = () => {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="container px-4 md:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Expert Advice</h2>
            <p className="text-muted-foreground max-w-xl">
              Not sure what you need? Our experts have put together comprehensive guides to help you make the right choice.
            </p>
          </div>
          <Link to="#" className="hidden md:flex items-center text-orange-600 font-bold hover:underline">
            View All Guides <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {guide.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors leading-tight">
                {guide.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guides;