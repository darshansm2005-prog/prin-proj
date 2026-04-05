"use client";

import React from 'react';
import { Product } from '@/data/products';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView = ({ product, isOpen, onClose }: QuickViewProps) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden rounded-3xl border-none">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square bg-zinc-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex flex-col">
            <DialogHeader className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                  {product.category}
                </Badge>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {product.brand}
                </span>
              </div>
              <DialogTitle className="text-2xl font-extrabold">{product.name}</DialogTitle>
            </DialogHeader>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1 text-orange-600">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold text-sm">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">(128 Reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              {product.isSale ? (
                <>
                  <span className="text-3xl font-bold text-red-600">${product.salePrice?.toLocaleString()}</span>
                  <span className="text-lg text-muted-foreground line-through">${product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
              )}
            </div>

            <p className="text-sm text-zinc-600 mb-8 line-clamp-3">
              Experience the ultimate ride with the {product.name}. Engineered for performance and designed for the modern cyclist.
            </p>

            <div className="mt-auto space-y-3">
              <Button 
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 rounded-full"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button asChild variant="ghost" className="w-full h-12 rounded-full">
                <Link to={`/product/${product.id}`}>
                  View Full Details <Eye className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickView;