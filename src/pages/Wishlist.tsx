"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24 container px-4 md:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-zinc-900 mb-4">YOUR WISHLIST</h1>
          <p className="text-zinc-500 max-w-md">
            Keep track of the bikes and gear you're eyeing for your next ride.
          </p>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-zinc-300" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">Your wishlist is empty</h3>
            <p className="text-zinc-500 mb-8 max-w-xs">
              Start exploring our collection and save your favorite items here.
            </p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 rounded-2xl px-8 font-bold">
              <Link to="/shop">Go to Shop <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;