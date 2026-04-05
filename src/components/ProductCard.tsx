"use client";

import React from 'react';
import { Product } from '@/data/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToCart = () => {
    showSuccess(`${product.name} added to cart!`);
  };

  return (
    <Card className="group overflow-hidden border-none bg-card transition-all hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
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
        <h3 className="mb-2 text-lg font-bold leading-tight group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          {product.isSale ? (
            <>
              <span className="text-xl font-bold text-red-600">${product.salePrice}</span>
              <span className="text-sm text-muted-foreground line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-xl font-bold">${product.price}</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-zinc-900 hover:bg-orange-600 text-white transition-colors"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;