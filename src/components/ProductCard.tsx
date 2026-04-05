"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import QuickView from './QuickView';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      <Card className="group overflow-hidden border-none bg-card transition-all hover:shadow-xl relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Link to={`/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
          
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-orange-600 hover:text-white transition-colors"
              onClick={() => setIsQuickViewOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className={`rounded-full bg-white/90 backdrop-blur-sm transition-colors ${isInWishlist(product.id) ? 'text-red-600' : 'hover:text-red-600'}`}
              onClick={() => toggleWishlist(product)}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {product.isSale && (
            <Badge className="absolute left-3 top-3 bg-red-600 text-white">SALE</Badge>
          )}
          <Badge variant="secondary" className="absolute right-3 top-3 bg-white/90 backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-orange-600">
              <Star className="h-3 w-3 fill-current" />
              {product.rating}
            </div>
          </div>
          <Link to={`/product/${product.id}`}>
            <h3 className="mb-2 text-lg font-bold leading-tight group-hover:text-orange-600 transition-colors truncate">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-baseline gap-2">
            {product.isSale ? (
              <>
                <span className="text-xl font-bold text-red-600">${product.salePrice?.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-xl font-bold">${product.price.toLocaleString()}</span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={() => addToCart(product)}
            className="w-full bg-zinc-900 hover:bg-orange-600 text-white transition-colors rounded-full"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>

      <QuickView 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
};

export default ProductCard;