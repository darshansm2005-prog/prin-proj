"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="container px-4 md:px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistCount} items saved for later
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-100 rounded-full mb-6">
              <Heart className="h-10 w-10 text-zinc-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save your favorite bikes to keep track of them.</p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 rounded-full px-8">
              <Link to="/shop">Explore Bikes</Link>
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;