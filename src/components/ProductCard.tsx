"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const currentPrice = product.salePrice || product.price;

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl border border-zinc-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isSale && (
            <Badge className="bg-red-600 hover:bg-red-600 font-bold px-3 py-1 rounded-full">SALE</Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-zinc-900 font-bold px-3 py-1 rounded-full border-none shadow-sm">
            {product.category}
          </Badge>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <Button 
            size="icon" 
            variant="secondary" 
            className={`rounded-full shadow-lg ${isInWishlist(product.id) ? 'text-red-600' : ''}`}
            onClick={() => toggleWishlist(product)}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </Button>
          <Button 
            asChild
            size="icon" 
            variant="secondary" 
            className="rounded-full shadow-lg"
          >
            <Link to={`/product/${product.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="hover:text-orange-600 transition-colors">
          <h3 className="font-extrabold text-zinc-900 mb-2 line-clamp-1 text-lg">{product.name}</h3>
        </Link>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-zinc-900">${currentPrice.toLocaleString()}</span>
            {product.isSale && (
              <span className="text-sm text-muted-foreground line-through">${product.price.toLocaleString()}</span>
            )}
          </div>
          <Button 
            size="icon" 
            className="bg-zinc-900 hover:bg-orange-600 text-white rounded-2xl h-12 w-12 transition-colors"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;