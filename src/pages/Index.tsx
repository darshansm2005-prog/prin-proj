"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import BrandShowcase from '@/components/BrandShowcase';
import Guides from '@/components/Guides';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Wrench } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <BrandShowcase />
      
      {/* Features Section */}
      <section className="py-16 bg-zinc-50">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On all orders over $1000" },
              { icon: ShieldCheck, title: "Lifetime Warranty", desc: "On all premium frames" },
              { icon: RotateCcw, title: "30-Day Returns", desc: "No questions asked policy" },
              { icon: Wrench, title: "Expert Assembly", desc: "Ready to ride out of the box" }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900">{feature.title}</h4>
                  <p className="text-sm text-zinc-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container px-4 md:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Featured Arrivals</h2>
              <p className="text-muted-foreground max-w-xl">
                The latest and greatest from the world's leading bike manufacturers. Hand-picked for performance.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden md:flex text-orange-600 hover:text-orange-700 hover:bg-orange-50">
              <Link to="/shop">View All Bikes <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Guides />

      {/* Promo Section */}
      <section className="py-24 bg-zinc-900 text-white overflow-hidden">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl" />
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                Upgrade Your Ride with <span className="text-orange-500">E-Performance</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Experience the thrill of the trail with less effort. Our new range of electric mountain bikes features the latest motor technology and long-range batteries.
              </p>
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 rounded-full">
                <Link to="/shop?category=Electric">Shop E-Bikes</Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=1200&auto=format&fit=crop" 
                alt="E-Bike Performance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;