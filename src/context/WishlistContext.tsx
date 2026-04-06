"use client";

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        toast.info("Removed from wishlist");
        return prev.filter(item => item.id !== product.id);
      }
      toast.success("Added to wishlist");
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => wishlist.some(item => item.id === productId);
  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};