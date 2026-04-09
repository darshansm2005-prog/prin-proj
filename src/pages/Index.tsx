"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { fetchProducts, Product, products as fallbackProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Globe, Loader2 } from 'lucide-react';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      const data = await fetchProducts();
      // If DB is empty, use fallback, otherwise take first 4
      setFeaturedProducts(data.length > 0 ? data.slice(0, 4) : fallbackProducts.slice(0, 4));
      setIsLoading(false);
    };
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Featured Categories */}
      <section className="py-24 container px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 mb-4">SHOP BY CATEGORY</h2>
            <p className="text-zinc-500 max-w-md">Find the perfect ride for your next adventure, whether it's on the road or off the beaten path.</p>
          </div>
          <Button asChild variant="ghost" className="text-orange-600 font-bold hover:text-orange-700 hover:bg-orange-50">
            <Link to="/shop">View All Categories <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Mountain', img: 'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800', count: '45 Models' },
            { name: 'Road', img: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800', count: '32 Models' },
            { name: 'Electric', img: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800', count: '18 Models' }
          ].map((cat, i) => (
            <Link 
              key={i} 
              to={`/shop?category=${cat.name}`}
              className="group relative h-[400px] rounded-3xl overflow-hidden"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-black text-white mb-1">{cat.name}</h3>
                <p className="text-orange-500 font-bold text-sm uppercase tracking-widest">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-50">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-black tracking-widest uppercase text-sm">Top Picks</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 mt-2">FEATURED GEAR</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-zinc-900 hover:bg-orange-600 text-white h-14 px-12 rounded-2xl text-lg font-bold transition-colors">
              <Link to="/shop">Explore Full Shop</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features/Trust */}
      <section className="py-24 container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
            <h4 className="text-xl font-black mb-4">Pro Performance</h4>
            <p className="text-zinc-500">Every bike is tuned by professional mechanics before shipping to ensure peak performance.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
            <h4 className="text-xl font-black mb-4">Lifetime Warranty</h4>
            <p className="text-zinc-500">We stand behind our frames with a lifetime warranty. Ride with total peace of mind.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
            <h4 className="text-xl font-black mb-4">Global Shipping</h4>
            <p className="text-zinc-500">We ship to over 45 countries with specialized bike packaging to prevent any damage.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;